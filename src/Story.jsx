import React, { useEffect, useRef, useState } from 'react';
import { biography, passages, activePassage, typingDelay } from './storyTyping.js';

export default function Story() {
  const article = useRef(null);
  const [typing, setTyping] = useState(false);
  const [progress, setProgress] = useState({ active: -1, length: 0 });
  const [readAll, setReadAll] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let frame = 0;
    let active = -1;
    let shown = 0;
    let target = 0;
    let visible = false;
    let disposed = false;
    const enabled = () => !disposed && !motion.matches && !readAll && 'IntersectionObserver' in window;
    const publish = length => { shown = length; setProgress({ active, length }); };
    const advance = () => {
      timer = undefined;
      if (!enabled() || !visible || shown >= target) return;
      publish(shown + 1);
      if (shown < target) timer = window.setTimeout(advance, typingDelay(biography[shown - 1]));
    };
    const update = () => {
      frame = 0;
      if (!enabled()) return;
      const rect = article.current.getBoundingClientRect();
      const next = activePassage(rect, window.innerHeight);
      if (next !== active) {
        clearTimeout(timer);
        timer = undefined;
        active = next;
        target = passages[active]?.end ?? 0;
        // Saltos de âncora não deixam uma fila de parágrafos digitando fora da tela.
        publish(active < 0 ? 0 : Math.max(passages[active].start, Math.min(shown, target)));
      }
      if (rect.bottom <= 0) publish(biography.length);
      if (visible && shown < target && timer === undefined) advance();
    };
    const schedule = () => {
      if (enabled() && !frame) frame = window.requestAnimationFrame(update);
    };
    const onScroll = () => { if (visible) schedule(); };
    const configure = () => {
      clearTimeout(timer);
      timer = undefined;
      window.cancelAnimationFrame(frame);
      frame = 0;
      setTyping(enabled());
      if (enabled()) schedule();
    };
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) { clearTimeout(timer); timer = undefined; }
      schedule();
    }) : null;
    configure();
    observer?.observe(article.current);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    motion.addEventListener('change', configure);
    return () => {
      disposed = true;
      clearTimeout(timer);
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      motion.removeEventListener('change', configure);
    };
  }, [readAll]);

  return <article className="narrative-copy" aria-label="A história de o Quil" ref={article} data-typing={typing || undefined}>
    <p className="narrative-lead"><span className="story-full">{biography}</span>{typing && <span className="story-typed" aria-hidden="true">{passages.map((passage, index) => {
      if (index > progress.active) return null;
      const length = Math.max(0, progress.length - passage.start);
      return <React.Fragment key={passage.start}>{index > 0 && '\n\n'}<span className={index === progress.active ? 'story-current' : 'story-past'}>{passage.text.slice(0, length)}<span className="story-pending">{passage.text.slice(length)}</span></span></React.Fragment>;
    })}</span>}</p>
    <button className="story-read" type="button" hidden={!typing || readAll} onClick={() => setReadAll(true)}>ler sem animação</button>
  </article>;
}
