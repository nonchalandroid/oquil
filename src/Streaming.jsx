import React from 'react';
import { platforms, spotifyArtistUrl } from './content.json';
import { BrandIcon } from './Icons.jsx';

export function StreamingBanner() {
  return <nav className="streaming-banner" aria-label="Plataformas de música" tabIndex={0} onFocus={event => {
    if (event.target.tagName === 'A') event.target.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  }}>
    {platforms.map(platform => <a key={platform.id} href={platform.id === 'spotify' ? spotifyArtistUrl : (platform.profileHref || platform.href)} target="_blank" rel="noopener noreferrer" aria-label={`Abrir o perfil de o Quil no ${platform.name}`} title={`Abrir o perfil de o Quil no ${platform.name}`}><BrandIcon name={platform.id} /><span>{platform.name}</span></a>)}
  </nav>;
}

export function HeroStreaming() {
  return <aside className="spotify-corner" aria-label="Ouça Quase Indo">
    <p className="spotify-corner-label">O SOM DE AGORA <span>·</span> QUASE INDO</p>
    <iframe
      title="Quase Indo — o Quil no Spotify"
      src="https://open.spotify.com/embed/track/6PpBHXZXrt4yVlvJ6bs1Vr?utm_source=generator&theme=0"
      width="320"
      height="152"
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  </aside>;
}
