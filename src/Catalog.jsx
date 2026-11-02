import React from 'react';
import { releases, archive } from './content.json';
import { Icon } from './Icons.jsx';

function PlatformLinks({ links }) {
  return links.map(link => <a key={`${link.label}:${link.href}`} href={link.href} title={link.title || link.label} target="_blank" rel="noopener noreferrer">{link.label}<Icon /></a>);
}

export default function Catalog() {
  return <section className="section catalog" id="catalogo" aria-labelledby="catalogo-titulo">
    <div className="section-inner">
      <header className="catalog-head" data-enter=""><div><p className="section-kicker">02 / Singles · 2026</p><h2 className="section-title" id="catalogo-titulo">Lançamentos</h2></div><p className="catalog-note">Os singles mais recentes, em ordem de lançamento.</p></header>
      <div className="release-list">
        {releases.map((release, i) => <article className="release" key={release.title} data-enter="">
          <span className="release-number">{String(i + 1).padStart(2, '0')}</span>
          <img className="release-cover" src={release.cover} alt={`Capa de ${release.title}`} width="900" height="900" loading="lazy" decoding="async" />
          <div className="release-copy"><h3>{release.title}</h3><p className="release-meta">{release.meta}</p>{release.latest && <span className="release-latest">Último lançamento</span>}</div>
          <details className="release-platforms" name="catalog-platforms"><summary>Plataformas<Icon name="plus" className="stream-toggle" /></summary><nav className="release-links" aria-label={`Ouvir ${release.title}`}><PlatformLinks links={release.links} /></nav></details>
        </article>)}
      </div>
      <div className="archive"><header data-enter=""><p className="section-kicker">Arquivo</p><h3>Mais caminhos para ouvir</h3></header>
        <ol className="archive-timeline" aria-label="Cronologia dos lançamentos">{archive.map(release => <li className="archive-row" key={release.title} data-enter=""><time className="archive-year" dateTime={release.year}>{release.year}</time><div><h4>{release.title}</h4>{release.subtitle && <p>{release.subtitle}</p>}<nav aria-label={`Ouvir ${release.title}`}><PlatformLinks links={release.links} /></nav></div></li>)}</ol>
      </div>
    </div>
  </section>;
}
