import React, { useEffect, useRef, useState } from 'react';

const paragraphs = [
  'Fillipe Queiroz começou na música usando o próprio nome. Foi assim que seus primeiros trabalhos chegaram ao público, entre o rap e a produção musical.',
  'Mais tarde, passou a assinar como o Quil. O artista e produtor do Rio de Janeiro apresenta hoje seu trabalho com esse nome, construindo uma trajetória que atravessa o rap e o R&B.',
  'o Quil é um artista independente. Ele mesmo grava, produz suas músicas e cuida de cada etapa do próprio trabalho.',
  'Na fase atual, o Dark R&B ganha espaço nessa história. Atmosferas noturnas, ambiência densa e batidas desaceleradas dão formas à musica do Quil.'
];

export default function Story() {
  const article = useRef(null);
  const [typing, setTyping] = useState(false);
  const [counts, setCounts] = useState(() => paragraphs.map(text => text.length));

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let disposed = false;
    let lastTick = 0;
    let shown = paragraphs.map(() => 0);
    let targets = [...shown];
    const tick = time => {
      frame = 0;
      if (time - lastTick >= 24) {
        // Apaga de trás para frente; digita do primeiro parágrafo em diante.
        let active = shown.length - 1;
        while (active >= 0 && shown[active] <= targets[active]) active--;
        if (active === -1) active = shown.findIndex((count, i) => count < targets[i]);
        if (active !== -1) {
          const delta = targets[active] - shown[active];
          const step = Math.min(Math.abs(delta), Math.max(1, Math.ceil(Math.abs(delta) * .16)));
          shown[active] += Math.sign(delta) * step;
          setCounts([...shown]);
        }
        lastTick = time;
      }
      if (shown.some((count, i) => count !== targets[i])) frame = requestAnimationFrame(tick);
    };
    const update = () => {
      if (motion.matches || disposed) return;
      const viewport = window.innerHeight;
      article.current.querySelectorAll('[data-paragraph]').forEach((p, i) => {
        const rect = p.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewport * .88 - rect.top) / Math.min(rect.height + viewport * .2, viewport * .65)));
        targets[i] = Math.round(progress * paragraphs[i].length);
      });
      // Os alvos formam um único prefixo, mantendo só um cursor ativo.
      for (let i = targets.length - 2; i >= 0; i--) {
        if (targets[i + 1] > 0) targets[i] = paragraphs[i].length;
      }
      if (!frame && shown.some((count, i) => count !== targets[i])) frame = requestAnimationFrame(tick);
    };
    const configure = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      setTyping(!motion.matches);
      if (motion.matches) { setCounts(paragraphs.map(text => text.length)); return; }
      shown = paragraphs.map(() => 0);
      targets = [...shown];
      setCounts([...shown]);
      update();
    };
    configure();
    document.fonts?.ready.then(() => { if (!disposed) update(); });
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    motion.addEventListener('change', configure);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      motion.removeEventListener('change', configure);
    };
  }, []);

  return <article className="narrative-copy" aria-label="A história de o Quil" ref={article} data-typing={typing || undefined}>
    {paragraphs.map((text, index) => <p key={index} data-paragraph={index} className={index === 0 ? 'narrative-lead' : undefined}>
      <span className="story-full">{text}</span>
      {typing && <span className="story-typed" aria-hidden="true">{text.slice(0, counts[index])}{counts[index] > 0 && counts[index] < text.length && <span className="typing-caret" />}</span>}
    </p>)}
  </article>;
}
