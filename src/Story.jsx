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
      const distance = Math.min(rect.height + window.innerHeight * .2, window.innerHeight * .65);
      const progress = Math.max(0, Math.min(1, (window.innerHeight * .9 - rect.top) / distance));
      return Math.round(progress * biography.length);
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
      } else if (delta > 0) {
        if (direction !== 'forward') index = shown.length;
        direction = 'forward';
        target = Math.max(shown.length, scrollTarget());
        schedule(0);
      }
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
