import React, { useEffect, useRef, useState } from 'react';

const biography = 'o Quil começou na música usando seu nome de batismo, fillipe queiroz. do rio de janeiro, veio do rap e da produção musical.\n\nmais tarde, passou a assinar como o Quil. independente, ele mesmo grava, produz suas músicas e cuida de cada etapa do trabalho.\n\nhoje, o dark r&b faz parte dessa história. músicas sobre conflitos e seguir em frente, entre atmosferas noturnas, espaço e emoção.';

// Pequenos enganos são escritos, apagados e corrigidos antes de continuar.
const mistakes = new Map([
  [biography.indexOf('música'), 'muscia'],
  [biography.indexOf('independente'), 'indepedente'],
  [biography.indexOf('atmosferas'), 'atmoferas']
]);
const steps = [];
for (let i = 0; i < biography.length; i++) {
  const typo = mistakes.get(i);
  if (typo) {
    for (let n = 1; n <= typo.length; n++) steps.push({ text: biography.slice(0, i) + typo.slice(0, n), delay: 110 });
    steps.push({ text: biography.slice(0, i) + typo, delay: 650 });
    for (let n = typo.length - 1; n >= 0; n--) steps.push({ text: biography.slice(0, i) + typo.slice(0, n), delay: 65 });
  }
  const char = biography[i];
  steps.push({ text: biography.slice(0, i + 1), delay: char === '\n' ? 550 : /[.,]/.test(char) ? 420 : 85 + (i % 5) * 16 });
}

export default function Story() {
  const article = useRef(null);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState(biography);
  const [readAll, setReadAll] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let index = 0;
    let visible = false;
    let disposed = false;
    const advance = () => {
      timer = undefined;
      if (disposed || !visible || motion.matches || readAll || index >= steps.length) return;
      const step = steps[index++];
      setText(step.text);
      timer = window.setTimeout(advance, step.delay);
    };
    const configure = () => {
      clearTimeout(timer);
      timer = undefined;
      const animate = !motion.matches && !readAll;
      setTyping(animate);
      setText(animate ? (index ? steps[index - 1].text : '') : biography);
      if (animate && visible) timer = window.setTimeout(advance, 400);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) { clearTimeout(timer); timer = undefined; }
      else if (timer === undefined) timer = window.setTimeout(advance, 400);
    }, { threshold: .15 });
    configure();
    observer.observe(article.current);
    motion.addEventListener('change', configure);
    return () => {
      disposed = true;
      clearTimeout(timer);
      observer.disconnect();
      motion.removeEventListener('change', configure);
    };
  }, [readAll]);

  return <article className="narrative-copy" aria-label="A história de o Quil" ref={article} data-typing={typing || undefined}>
    <p className="narrative-lead"><span className="story-full">{biography}</span>{typing && <span className="story-typed" aria-hidden="true">{text}{text !== biography && <span className="typing-caret" />}</span>}</p>
    {typing && !readAll && <button className="story-read" type="button" onClick={() => setReadAll(true)}>ler sem animação</button>}
  </article>;
}
