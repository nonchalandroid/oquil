import React, { useRef, useState } from 'react';
import { platforms, releases, spotifyArtistUrl } from './content.json';
import { BrandIcon, Icon } from './Icons.jsx';

const platformBrands = { Spotify: 'spotify', 'YouTube Music': 'youtubemusic', 'Apple Music': 'applemusic', 'Amazon Music': 'amazonmusic', YouTube: 'youtube', Deezer: 'deezer' };
const featuredRelease = releases.find(release => release.title === 'Quase Indo');

export function PlatformLinks({ links }) {
  return links.map(link => <a key={`${link.label}:${link.href}`} href={link.href} title={link.title || link.label} target="_blank" rel="noopener noreferrer"><span className="platform-name">{platformBrands[link.label] && <BrandIcon name={platformBrands[link.label]} />}{link.label}</span><Icon /></a>);
}

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

export function FeaturedRelease() {
  const dialog = useRef(null);
  const cover = 'assets/quase-indo-600.webp';

  return <div className="hero-media release-object">
    <button className="album-trigger" type="button" aria-haspopup="dialog" aria-controls="featured-platforms" onClick={() => dialog.current.showModal()}>
      <span className="album-object"><span className="album-art"><img src={cover} width="600" height="600" alt="Capa de Quase Indo" decoding="async" /></span></span>
      <span className="album-listen">Ouvir em sua plataforma<Icon name="plus" /></span>
    </button>
    <dialog id="featured-platforms" ref={dialog} className="music-window" aria-labelledby="featured-title" onClick={event => {
      if (event.target === event.currentTarget) event.currentTarget.close();
    }}>
      <header className="music-window-hero">
        <img className="music-window-backdrop" src={cover} alt="" width="600" height="600" decoding="async" />
        <button className="music-window-close" type="button" aria-label="Fechar" onClick={() => dialog.current.close()}>×</button>
        <div className="music-window-release">
          <img className="music-window-cover" src={cover} alt="" width="600" height="600" decoding="async" />
          <div><p className="section-kicker">o Quil</p><h2 id="featured-title">{featuredRelease.title}</h2><p>Escolha onde ouvir</p></div>
        </div>
      </header>
      <nav className="music-window-links" aria-label={`Plataformas de ${featuredRelease.title}`}><PlatformLinks links={featuredRelease.links} /></nav>
    </dialog>
  </div>;
}

export function PlaylistStreaming() {
  return <div className="closing-playlist">
    <SpotifyEmbed path="playlist/37i9dQZF1DZ06evO3VXrSJ" title="This Is o Quil — playlist no Spotify" />
    <a className="spotify-corner-link" href="https://open.spotify.com/playlist/37i9dQZF1DZ06evO3VXrSJ" target="_blank" rel="noopener noreferrer">Abrir This Is o Quil no Spotify</a>
  </div>;
}
