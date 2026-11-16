import React, { useState } from 'react';
import { platforms, spotifyArtistUrl } from './content.json';
import { BrandIcon } from './Icons.jsx';

export function StreamingBanner() {
  return <nav className="streaming-banner" aria-label="Plataformas de música" tabIndex={0} onFocus={event => {
    if (event.target.tagName === 'A') event.target.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  }}>
    {platforms.map(platform => <a key={platform.id} href={platform.id === 'spotify' ? spotifyArtistUrl : (platform.profileHref || platform.href)} target="_blank" rel="noopener noreferrer" aria-label={`Abrir o perfil de o Quil no ${platform.name}`} title={`Abrir o perfil de o Quil no ${platform.name}`}><BrandIcon name={platform.id} /><span>{platform.name}</span></a>)}
  </nav>;
}

function SpotifyEmbed({ path, title }) {
  const [opened, setOpened] = useState(false);

  return <div className="spotify-embed">{opened ? <iframe
    title={title}
    src={`https://open.spotify.com/embed/${path}?utm_source=generator&theme=0`}
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    referrerPolicy="strict-origin-when-cross-origin"
    ref={frame => frame?.focus()}
  /> : <button type="button" onClick={() => setOpened(true)}>Carregar player do Spotify</button>}</div>;
}

export function HeroStreaming() {
  return <aside className="spotify-corner" aria-label="Ouça Quase Indo">
    <p className="spotify-corner-label">O SOM DE AGORA <span>·</span> QUASE INDO</p>
    <SpotifyEmbed path="track/6PpBHXZXrt4yVlvJ6bs1Vr" title="Quase Indo — o Quil no Spotify" />
    <a className="spotify-corner-link" href="https://open.spotify.com/track/6PpBHXZXrt4yVlvJ6bs1Vr" target="_blank" rel="noopener noreferrer">Abrir Quase Indo no Spotify</a>
  </aside>;
}

export function PlaylistStreaming() {
  return <div className="closing-playlist">
    <SpotifyEmbed path="playlist/37i9dQZF1DZ06evO3VXrSJ" title="This Is o Quil — playlist no Spotify" />
    <a className="spotify-corner-link" href="https://open.spotify.com/playlist/37i9dQZF1DZ06evO3VXrSJ" target="_blank" rel="noopener noreferrer">Abrir This Is o Quil no Spotify</a>
  </div>;
}
