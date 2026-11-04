import { useEffect } from 'react';

export default function usePageEffects() {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let observer;
    const progress = document.querySelector('.reading-progress');
    const animations = new Set();
    const revealed = new WeakSet();
    const updateProgress = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
      if (progress) progress.style.transform = `scaleX(${value})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
    const observe = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      if (motion.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (revealed.has(entry.target)) return;
          revealed.add(entry.target);
          const timeline = entry.target.matches('.archive-row');
          if (entry.target.contains(document.activeElement)) return;
          // Observe the stable row; animate only its text so the rail and dots never move.
          const targets = timeline ? [...entry.target.children] : [entry.target];
          targets.forEach(target => {
            if (!target.animate) return;
            const animation = target.animate([
              { transform: 'translateY(12px)', opacity: .25 },
              { transform: 'translateY(0)', opacity: 1 }
            ], {
              duration: timeline ? 460 : 550,
              easing: 'cubic-bezier(.2,.7,.2,1)'
            });
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
          });
        });
      }, { threshold: .08 });
      document.querySelectorAll('[data-enter]').forEach(el => {
        if (!revealed.has(el)) observer.observe(el);
      });
    };
    const escape = event => {
      if (event.key !== 'Escape') return;
      const open = [...document.querySelectorAll('details[open]')];
      const active = [...open].reverse().find(el => el.contains(document.activeElement)) || open.at(-1);
      if (active) { active.open = false; active.querySelector('summary')?.focus(); }
    };
    observe();
    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    document.addEventListener('keydown', escape);
    motion.addEventListener('change', observe);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('keydown', escape);
      motion.removeEventListener('change', observe);
    };
  }, []);
}
