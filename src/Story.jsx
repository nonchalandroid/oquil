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
    let scrollFrame = 0;
    let viewportHeight = window.innerHeight;
    let viewportWidth = window.innerWidth;
    const touch = window.matchMedia('(pointer: coarse)').matches;
    const steps = createTypingSteps();
    let index = 0;
    let shown = '';
    let target = biography.length;
    let direction = 'forward';
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
        if (!shown.length) index = 0;
        timer = window.setTimeout(advance, 32);
      } else if (visible && index < Math.min(steps.length, target)) {
        const step = steps[index++];
        publish(step.text);
        timer = window.setTimeout(advance, step.delay);
      }
    };
    const schedule = (delay = 100) => {
      if (enabled() && timer === undefined) timer = window.setTimeout(advance, delay);
    };
    const scrollTarget = () => {
      const rect = article.current.getBoundingClientRect();
      const distance = Math.min(rect.height + viewportHeight * .2, viewportHeight * .65);
      const progress = Math.max(0, Math.min(1, (viewportHeight * .9 - rect.top) / distance));
      return Math.round(progress * biography.length);
    };
    const updateScroll = () => {
      scrollFrame = 0;
      const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
      const delta = y - previousY;
      if (!enabled() || Math.abs(delta) < 3) return;
      previousY = y;
      const rect = article.current.getBoundingClientRect();
      if (delta < 0 && rect.bottom > 0) {
        if (direction !== 'backward') target = shown.length;
        direction = 'backward';
        target = Math.max(0, target + delta * biography.length / Math.max(viewportHeight * .85, rect.height));
        if (rect.top >= viewportHeight * .9) target = 0;
        schedule(0);
      } else if (delta > 0) {
        if (direction !== 'forward') index = shown.length;
        direction = 'forward';
        const distance = Math.min(rect.height + viewportHeight * .2, viewportHeight * .65);
        const progress = Math.max(0, Math.min(1, (viewportHeight * .9 - rect.top) / distance));
        target = Math.max(shown.length, Math.round(progress * biography.length));
        schedule(0);
      }
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    };
    const onResize = () => {
      // A barra do navegador mobile muda de altura durante o gesto, não a cena.
      if (!touch || window.innerWidth !== viewportWidth) viewportHeight = window.innerHeight;
      viewportWidth = window.innerWidth;
      previousY = Math.max(0, window.scrollY);
    };
    const configure = () => {
      clearTimeout(timer);
      timer = undefined;
      setTyping(enabled());
      setText(enabled() ? shown : biography);
      if (enabled() && visible) { target = scrollTarget(); schedule(120); }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && direction === 'forward') { clearTimeout(timer); timer = undefined; }
      else {
        if (direction === 'forward') target = scrollTarget();
        schedule(120);
      }
    }, { threshold: .15 });
    configure();
    observer.observe(article.current);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    motion.addEventListener('change', configure);
    return () => {
      disposed = true;
      clearTimeout(timer);
      cancelAnimationFrame(scrollFrame);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      motion.removeEventListener('change', configure);
    };
  }, [readAll]);

  return <article className="narrative-copy" aria-label="A história de o Quil" ref={article} data-typing={typing || undefined}>
    <p className="narrative-lead"><span className="story-full">{biography}</span>{typing && <span className="story-typed" aria-hidden="true">{text}{text !== biography && <span className="typing-caret" />}</span>}</p>
    <div className="story-controls">{typing && !readAll && <button className="story-read" type="button" onClick={() => setReadAll(true)}>ler sem animação</button>}</div>
  </article>;
}
