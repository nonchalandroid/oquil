import React, { useEffect, useRef } from 'react';
import { platforms, spotifyArtistUrl } from './content.json';
import { BrandIcon, Icon } from './Icons.jsx';

export function StreamingBanner() {
  const items = platforms;
  const group = duplicate => <div className="streaming-group" aria-hidden={duplicate || undefined}>
    {items.map(platform => <a key={platform.id} href={platform.id === 'spotify' ? spotifyArtistUrl : platform.href} target="_blank" rel="noopener noreferrer" aria-label={platform.id === 'spotify' ? 'Abrir o perfil de o Quil no Spotify' : platform.label} title={platform.id === 'spotify' ? 'Abrir o perfil de o Quil no Spotify' : platform.label} tabIndex={duplicate ? -1 : undefined}><BrandIcon name={platform.id} /><span>{platform.name}</span></a>)}
  </div>;
  return <div className="streaming-banner">
    <label className="streaming-pause"><input type="checkbox" aria-label="Pausar movimento das plataformas" /><Icon name="pause" className="pause-symbol" /><Icon name="play" className="play-symbol" /></label>
    <nav className="streaming-window" aria-label="Plataformas de música"><div className="streaming-track">{group(false)}{group(true)}</div></nav>
  </div>;
}

export function HeroStreaming() {
  const tree = useRef(null);
  const entrance = useRef(null);
  useEffect(() => () => entrance.current?.cancel(), []);
  const onToggle = event => {
    if (event.target !== event.currentTarget) return;
    entrance.current?.cancel();
    if (event.currentTarget.open && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && tree.current?.animate) {
      entrance.current = tree.current.animate([{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 320, easing: 'ease-out' });
    }
  };
  return <details className="hero-streaming release-object" onToggle={onToggle}>
    <summary className="album-trigger" aria-label="Plataformas de Quase Indo" aria-controls="hero-platform-tree">
      <span className="album-object"><span className="album-art"><img src="assets/quase-indo-original.png" alt="Capa oficial do single Quase Indo" width="3000" height="3000" fetchPriority="high" decoding="async" /></span></span>
      <span className="object-cue"><span className="cue-closed">Abrir plataformas</span><span className="cue-open">Recolher plataformas</span><Icon name="plus" className="stream-toggle" /></span>
    </summary>
    <div className="platform-diagram" id="hero-platform-tree" ref={tree}>
      <h2>Escolha onde ouvir</h2>
      <nav className="diagram-branches" aria-label="Ouvir Quase Indo">
        {[platforms.slice(0, 3), platforms.slice(3)].map((branch, i) => <div className="diagram-column" key={i}>
          {branch.map(platform => <details className="stream-accordion platform-node" key={platform.id} name="hero-platform-node" open={platform.id === 'spotify'}>
            <summary><span className="platform-name"><BrandIcon name={platform.id} />{platform.name}</span><Icon name="plus" className="stream-toggle" /></summary>
            <div className="stream-content"><p>{platform.description}</p><a className={`stream-link ${platform.id === 'spotify' ? 'primary' : ''}`} href={platform.href} target="_blank" rel="noopener noreferrer">{platform.label}<Icon /></a></div>
          </details>)}
        </div>)}
      </nav>
    </div>
  </details>;
}
