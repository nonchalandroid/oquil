import React, { useEffect, useId, useRef } from 'react';
import { releases, archive } from './content.json';
import { BrandIcon, Icon } from './Icons.jsx';

const platformBrands = {
  Spotify: 'spotify',
  'YouTube Music': 'youtubemusic',
  'Apple Music': 'applemusic',
  'Amazon Music': 'amazonmusic',
  YouTube: 'youtube'
};

function ReleaseDialog({ release }) {
  const dialog = useRef(null);
  const scrollLock = useRef(null);
  const entrance = useRef(null);
  const instanceId = useId().replaceAll(':', '');
  const dialogId = `release-window-${instanceId}`;
  const titleId = `release-title-${instanceId}`;

  const unlock = () => {
    if (!scrollLock.current) return;
    const { top, position, width, scrollY, overflow } = scrollLock.current;
    Object.assign(document.body.style, { top, position, width });
    document.documentElement.style.overflow = overflow;
    scrollLock.current = null;
    window.scrollTo({ top: scrollY, behavior: 'instant' });
  };

  useEffect(() => () => {
    entrance.current?.cancel();
    if (dialog.current?.open) dialog.current.close();
    unlock();
  }, []);

  const open = () => {
    if (dialog.current.open) return;
    scrollLock.current = {
      top: document.body.style.top,
      position: document.body.style.position,
      width: document.body.style.width,
      scrollY: window.scrollY,
      overflow: document.documentElement.style.overflow
    };
    Object.assign(document.body.style, {
      position: 'fixed',
      top: `-${window.scrollY}px`,
      width: '100%'
    });
    document.documentElement.style.overflow = 'hidden';
    dialog.current.showModal();

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      entrance.current = dialog.current.animate([
        { opacity: 0, transform: 'translateY(16px) scale(.98)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ], { duration: 280, easing: 'cubic-bezier(.2,.7,.2,1)' });
    }
  };

  const close = () => dialog.current?.close();
  const closeOutside = event => {
    if (event.target !== dialog.current) return;
    const rect = dialog.current.getBoundingClientRect();
    if (
      event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom
    ) close();
  };

  return <>
    <button
      className="release-trigger"
      type="button"
      aria-label={`Abrir plataformas de ${release.title}`}
      aria-haspopup="dialog"
      aria-controls={dialogId}
      onClick={open}
    >
      <img
        className="release-cover"
        src={release.cover.src}
        alt={`Capa de ${release.title}`}
        width={release.cover.width}
        height={release.cover.height}
        loading="lazy"
        decoding="async"
      />
      <span className="release-title">{release.title}</span>
      <span className="release-action">Ouvir<Icon name="plus" className="stream-toggle" /></span>
    </button>

    <dialog
      className="music-window release-dialog"
      id={dialogId}
      ref={dialog}
      aria-labelledby={titleId}
      onClose={unlock}
      onClick={closeOutside}
    >
      <div className="music-window-hero">
        <img
          className="music-window-backdrop"
          src={release.cover.src}
          alt=""
          width={release.cover.width}
          height={release.cover.height}
          loading="lazy"
          decoding="async"
        />
        <button
          className="music-window-close"
          type="button"
          onClick={close}
          aria-label={`Fechar plataformas de ${release.title}`}
          autoFocus
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="music-window-release">
          <img
            className="music-window-cover"
            src={release.cover.src}
            alt=""
            width={release.cover.width}
            height={release.cover.height}
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="section-kicker">o Quil · Lançamento</p>
            <h2 id={titleId}>{release.title}</h2>
            <p>Escolha onde ouvir</p>
          </div>
        </div>
      </div>

      <nav className="music-window-links" aria-label={`Plataformas de ${release.title}`}>
        {release.links.map(link => {
          const action = /busc/i.test(link.title || '')
            ? `Buscar no ${link.label}`
            : /abrir/i.test(link.title || '')
              ? `Abrir no ${link.label}`
              : `Ouvir no ${link.label}`;

          return <a
            key={`${link.label}:${link.href}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.title || action}
          >
            {platformBrands[link.label] && <BrandIcon name={platformBrands[link.label]} />}
            <span><strong>{link.label}</strong><small>{action}</small></span>
            <Icon />
          </a>;
        })}
      </nav>
    </dialog>
  </>;
}

export default function Catalog() {
  return <section className="section catalog" id="catalogo" aria-labelledby="catalogo-titulo">
    <div className="section-inner">
      <header className="catalog-head" data-enter=""><div><p className="section-kicker">02 / Música</p><h2 className="section-title" id="catalogo-titulo">Últimos lançamentos</h2></div></header>
      <div className="release-list">
        {releases.map(release => <article className="release" key={release.title} data-enter="">
          <ReleaseDialog release={release} />
        </article>)}
      </div>
      <div className="archive"><header data-enter=""><p className="section-kicker">Arquivo</p><h3>linha do tempo</h3></header>
        <ol className="archive-timeline" aria-label="Cronologia dos lançamentos">{archive.map(release => <li className="archive-row" key={release.title} data-enter=""><time className="archive-year" dateTime={release.year}>{release.year}</time><div><h4>{release.title}</h4></div></li>)}</ol>
      </div>
    </div>
  </section>;
}
