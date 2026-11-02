import React, { useEffect, useRef, useState } from 'react';
import { biography, createTypingSteps } from './storyTyping.js';

export default function Story() {
  const article = useRef(null);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState(biography);
  const [readAll, setReadAll] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let steps = createTypingSteps();
    let index = 0;
    let shown = '';
    let target = biography.length;
    let direction = 'forward';
    let recovering = false;
    let previousY = window.scrollY;
    let visible = false;
    let disposed = false;
    const enabled = () => !disposed && !motion.matches && !readAll;
    const publish = value => { shown = value; setText(value); };
    const advance = () => {
      timer = undefined;
      if (!enabled()) return;
      if (direction === 'backward') {
        if (shown.length <= target) return;
        publish(shown.slice(0, -1));
        if (!shown.length) { steps = createTypingSteps(); index = 0; }
        timer = window.setTimeout(advance, 32);
      } else if (visible && index < steps.length) {
        // Um erro ainda visível é apagado antes de retomar o prefixo correto.
        if (recovering) {
          publish(shown.slice(0, -1));
          index = shown ? steps.findIndex(step => step.text === shown) + 1 : 0;
          recovering = !biography.startsWith(shown);
          timer = window.setTimeout(advance, 80);
          return;
        }
        const step = steps[index++];
        publish(step.text);
        timer = window.setTimeout(advance, step.delay);
      }
    };
    const schedule = (delay = 100) => {
      if (enabled() && timer === undefined) timer = window.setTimeout(advance, delay);
    };
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - previousY;
      previousY = y;
      if (!enabled() || Math.abs(delta) < 1) return;
      const rect = article.current.getBoundingClientRect();
      if (delta < 0 && rect.bottom > 0) {
        if (direction !== 'backward') target = shown.length;
        direction = 'backward';
        target = Math.max(0, target + delta * biography.length / Math.max(window.innerHeight * .85, rect.height));
        if (rect.top >= window.innerHeight * .9) target = 0;
        schedule(0);
      } else if (delta > 0 && direction !== 'forward') {
        direction = 'forward';
        recovering = !biography.startsWith(shown);
        index = shown ? steps.findIndex(step => step.text === shown) + 1 : 0;
        schedule();
      }
    };
    const configure = () => {
      clearTimeout(timer);
      timer = undefined;
      setTyping(enabled());
      setText(enabled() ? shown : biography);
      if (enabled() && visible) schedule(400);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && direction === 'forward') { clearTimeout(timer); timer = undefined; }
      else schedule(400);
    }, { threshold: .15 });
    configure();
    observer.observe(article.current);
    window.addEventListener('scroll', onScroll, { passive: true });
    motion.addEventListener('change', configure);
    return () => {
      disposed = true;
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      motion.removeEventListener('change', configure);
    };
  }, [readAll]);

  return <article className="narrative-copy" aria-label="A história de o Quil" ref={article} data-typing={typing || undefined}>
    <p className="narrative-lead"><span className="story-full">{biography}</span>{typing && <span className="story-typed" aria-hidden="true">{text}{text !== biography && <span className="typing-caret" />}</span>}</p>
    {typing && !readAll && <button className="story-read" type="button" onClick={() => setReadAll(true)}>ler sem animação</button>}
  </article>;
}
