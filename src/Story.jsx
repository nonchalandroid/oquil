import React, { useEffect, useRef, useState } from 'react';

const paragraphs = [
  'Fillipe Queiroz começou na música usando o próprio nome. Foi assim que seus primeiros trabalhos chegaram ao público, entre o rap e a produção musical.',
  'Mais tarde, passou a assinar como o Quil. O artista e produtor do Rio de Janeiro apresenta hoje seu trabalho com esse nome, construindo uma trajetória que atravessa o rap e o R&B.',
  'o Quil é um artista independente. Ele mesmo grava, produz suas músicas e cuida de cada etapa do próprio trabalho.',
  'Na fase atual, o Dark R&B ganha espaço nessa história. Atmosferas noturnas, ambiência densa e batidas desaceleradas dão forma à música de o Quil.'
];

export default function Story() {
  const article = useRef(null);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window)) return;
    let observer;
    const observe = () => {
      observer?.disconnect();
      setCurrent(null);
      if (motion.matches) return;
      observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting);
        if (visible.length) setCurrent(Number(visible[0].target.dataset.paragraph));
      }, { rootMargin: '-15% 0px -35% 0px', threshold: 0 });
      article.current.querySelectorAll('[data-paragraph]').forEach(p => observer.observe(p));
    };
    observe();
    motion.addEventListener('change', observe);
    return () => {
      observer?.disconnect();
      motion.removeEventListener('change', observe);
    };
  }, []);

  return <article className="narrative-copy" aria-label="A história de o Quil" ref={article}>
    {paragraphs.map((text, index) => <p key={index} data-paragraph={index}
      className={index === 0 ? 'narrative-lead' : undefined}
      data-current={current === index ? 'true' : undefined}>{text}</p>)}
  </article>;
}
