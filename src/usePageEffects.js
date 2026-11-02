import { useEffect } from 'react';

export default function usePageEffects() {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let observer;
    const animations = new Set();
    const updateProgress = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--page-progress', max > 0 ? window.scrollY / max : 0);
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
          if (!entry.target.animate) return;
          const animation = entry.target.animate([
            { transform: 'translateY(14px)', opacity: .85 },
            { transform: 'translateY(0)', opacity: 1 }
          ], { duration: 550, easing: 'cubic-bezier(.2,.7,.2,1)' });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      }, { threshold: .08 });
      document.querySelectorAll('[data-enter]').forEach(el => observer.observe(el));
    };
    const escape = event => {
      if (event.key !== 'Escape') return;
      const open = [...document.querySelectorAll('details[open]')];
      const active = open.find(el => el.contains(document.activeElement)) || open.at(-1);
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
