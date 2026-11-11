import React, { useEffect, useRef, useState } from 'react';
import { biography } from './storyTyping.js';

// Keep whitespace and paragraph breaks intact so the visual layer never reflows.
const phrases = biography.match(/(?:\S+\s*){1,5}/g) || [biography];

export default function Story() {
  const article = useRef(null);
  const [readAll, setReadAll] = useState(false);

  useEffect(() => {
    const element = article.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const parts = [...element.querySelectorAll('.story-phrase')];
    let frame = 0;
    let visible = true;
    const enabled = () => !motion.matches && !readAll;
    const update = () => {
      frame = 0;
      if (!enabled() || !visible) return;
      const viewport = window.innerHeight;
      const end = Math.max(170, viewport * .38);
      const start = Math.max(end + 80, viewport * .84);
      // Read every position first, then update only opacity. No character timers.
      const progress = parts.map(part => {
        const rect = part.getBoundingClientRect();
        return Math.max(0, Math.min(1, (start - (rect.top + rect.height / 2)) / (start - end)));
      });
      parts.forEach((part, index) => {
        part.style.opacity = .12 + progress[index] * .88;
      });
    };
    const schedule = () => {
      if (enabled() && visible && !frame) frame = requestAnimationFrame(update);
    };
    const configure = () => {
      element.toggleAttribute('data-reveal', enabled());
      if (enabled()) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    }, { rootMargin: '100px' }) : null;
    observer?.observe(element);
    configure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', configure);
    const resize = 'ResizeObserver' in window ? new ResizeObserver(schedule) : null;
    resize?.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      resize?.disconnect();
      element.removeAttribute('data-reveal');
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', configure);
    };
  }, [readAll]);

  return <article className="narrative-copy" aria-label="A história de o Quil" ref={article}>
    <p className="narrative-lead"><span className="story-full">{biography}</span><span className="story-reveal" aria-hidden="true">{phrases.map((phrase, index) => <span className="story-phrase" key={index}>{phrase}</span>)}</span></p>
    {!readAll && <button className="story-read" type="button" onClick={() => setReadAll(true)}>Ler texto completo</button>}
  </article>;
}
