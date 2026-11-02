import React from 'react';
import { platforms } from './content.json';
import { BrandIcon, Icon } from './Icons.jsx';

export function StreamingBanner() {
  return <nav className="streaming-banner" aria-label="Explorar o Quil nas plataformas">
    {platforms.map(platform => <a key={platform.id} href={platform.href} target="_blank" rel="noopener noreferrer" aria-label={platform.label} title={platform.label}>
      <BrandIcon name={platform.id} /><span>{platform.name}</span>
    </a>)}
  </nav>;
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
