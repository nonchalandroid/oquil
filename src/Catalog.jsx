import React, { useEffect, useRef } from 'react';
import { releases, archive } from './content.json';
import { BrandIcon, Icon } from './Icons.jsx';

function PlatformLinks({ links }) {
  const brand = label => ({ Spotify: 'spotify', 'YouTube Music': 'youtubemusic', 'Apple Music': 'applemusic', 'Amazon Music': 'amazonmusic', YouTube: 'youtube', Deezer: 'deezer' })[label];
  return links.map(link => <a key={`${link.label}:${link.href}`} href={link.href} title={link.title || link.label} target="_blank" rel="noopener noreferrer"><span className="platform-name">{brand(link.label) && <BrandIcon name={brand(link.label)} />}{link.label}</span><Icon /></a>);
}

function ReleaseDisclosure({ release }) {
  const panel = useRef(null);
  const animation = useRef(null);
  useEffect(() => () => animation.current?.cancel(), []);
  const onToggle = event => {
    animation.current?.cancel();
    if (event.currentTarget.open && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && panel.current?.animate) {
      animation.current = panel.current.animate([{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'ease-out' });
    }
  };
  return <details className="release-platforms" name="catalog-platforms" onToggle={onToggle}>
    <summary><img className="release-cover" src={release.cover.src.replace('assets/', 'assets/thumbs/')} alt={`Capa de ${release.title}`} width={release.cover.width} height={release.cover.height} loading="lazy" decoding="async" /><span className="release-title">{release.title}</span><span className="release-action">Ouvir<Icon name="plus" className="stream-toggle" /></span></summary>
    <nav className="release-links" ref={panel} aria-label={`Ouvir ${release.title}`}><PlatformLinks links={release.links} /></nav>
  </details>;
}

export default function Catalog() {
  return <section className="section catalog" aria-labelledby="catalogo-titulo">
    <div className="section-inner" id="catalogo">
      <header className="catalog-head" data-enter=""><div><p className="section-kicker">02 / Música</p><h2 className="section-title" id="catalogo-titulo">Últimos lançamentos</h2></div></header>
      <div className="release-list">{releases.map(release => <article className="release" key={release.title} data-enter=""><ReleaseDisclosure release={release} /></article>)}</div>
      <div className="archive" id="trajetoria"><header className="archive-heading" data-enter=""><p className="section-kicker">Arquivo / {archive[0]?.year} — {archive.at(-1)?.year}</p><h3>linha do tempo</h3><p className="archive-caption">Cada lançamento, um capítulo.<br />Os caminhos que trouxeram o Quil até aqui.</p><span className="archive-count">{archive.length.toString().padStart(2, '0')} lançamentos no arquivo</span></header>
        <ol className="archive-timeline" aria-label="Cronologia dos lançamentos">{archive.map((release, index) => <li className="archive-row" key={release.title} data-enter=""><time className="archive-year" dateTime={release.year}>{release.year}</time><div><span className="archive-chapter">Capítulo {(index + 1).toString().padStart(2, '0')}</span><h4>{release.title}</h4></div></li>)}</ol>
      </div>
    </div>
  </section>;
}
