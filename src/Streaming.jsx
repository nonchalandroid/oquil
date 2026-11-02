import React from 'react';
import { platforms } from './content.json';
import { BrandIcon, Icon } from './Icons.jsx';

export function StreamingBanner() {
  const items = platforms;
  const group = duplicate => <div className="streaming-group" aria-hidden={duplicate || undefined}>
    {items.map(platform => platform.href
      ? <a key={platform.id} href={platform.href} target="_blank" rel="noopener noreferrer" aria-label={platform.label} title={platform.label} tabIndex={duplicate ? -1 : undefined}><BrandIcon name={platform.id} /><span>{platform.name}</span></a>
      : <span className="streaming-brand" key={platform.id}><BrandIcon name={platform.id} /><span>{platform.name}</span></span>)}
  </div>;
  return <div className="streaming-banner">
    <label className="streaming-pause"><input type="checkbox" aria-label="Pausar movimento das plataformas" /><Icon name="pause" className="pause-symbol" /><Icon name="play" className="play-symbol" /></label>
    <nav className="streaming-window" aria-label="Plataformas de música"><div className="streaming-track">{group(false)}{group(true)}</div></nav>
  </div>;
}

export function HeroStreaming() {
  return <div className="hero-streaming" aria-labelledby="streaming-title">
    <h2 id="streaming-title">Escolha onde ouvir</h2>
    {platforms.map((platform, i) => <details className="stream-accordion" key={platform.id} name="quase-indo-streaming" open={i === 0}>
      <summary><span className="platform-name"><BrandIcon name={platform.id} />{platform.name}</span><Icon name="plus" className="stream-toggle" /></summary>
      <div className="stream-content"><p>{platform.description}</p><a className={`stream-link ${i === 0 ? 'primary' : ''}`} href={platform.href} target="_blank" rel="noopener noreferrer">{platform.label}<Icon /></a></div>
    </details>)}
  </div>;
}
