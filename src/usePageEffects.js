import { useEffect } from 'react';

export default function usePageEffects() {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 760px), (hover: none) and (pointer: coarse)');
    let frame = 0;
    let observer;
    const animations = new Set();
    const revealed = new WeakSet();
    const readingProgress = document.querySelector('.reading-progress');
    const navLinks = [...document.querySelectorAll('.nav-links a')];
    const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
    const timeline = document.querySelector('.archive-timeline');
    const rows = [...document.querySelectorAll('.archive-row')];
    const updateProgress = () => {
      frame = 0;
      const viewportHeight = document.documentElement.clientHeight;
      const max = document.documentElement.scrollHeight - viewportHeight;
      const pageProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const readingLine = Math.max(160, viewportHeight * .32);
      let current = -1;
      let currentRow = -1;
      let timelineProgress = 0;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= readingLine) current = index;
      });
      if (timeline) {
        const rect = timeline.getBoundingClientRect();
        timelineProgress = Math.max(0, Math.min(1, (readingLine - rect.top) / rect.height));
        rows.forEach((row, index) => {
          if (row.getBoundingClientRect().top + 33 <= readingLine) currentRow = index;
        });
      }
      readingProgress?.style.setProperty('--page-progress', pageProgress);
      navLinks.forEach((link, index) => {
        const active = index === current;
        if (active === link.hasAttribute('aria-current')) return;
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      if (timeline) {
        timeline.style.setProperty('--timeline-progress', timelineProgress);
        rows.forEach((row, index) => row.toggleAttribute('data-current', index === currentRow));
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
    const observe = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      if (motion.matches || mobile.matches || !('IntersectionObserver' in window)) return;
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
              duration: timeline ? 560 : 700,
              easing: 'cubic-bezier(.22,1,.36,1)'
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
      if (event.key !== 'Escape' || document.querySelector('dialog[open]')) return;
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
    mobile.addEventListener('change', observe);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('keydown', escape);
      motion.removeEventListener('change', observe);
      mobile.removeEventListener('change', observe);
    };
  }, []);
}
