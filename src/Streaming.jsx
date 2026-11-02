import React, { useEffect, useRef } from 'react';
import { platforms, spotifyArtistUrl } from './content.json';
import { BrandIcon, Icon } from './Icons.jsx';

export function StreamingBanner() {
  return <nav className="streaming-banner" aria-label="Plataformas de música" tabIndex={0} onFocus={event => {
    if (event.target.tagName === 'A') event.target.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  }}>
    {platforms.map(platform => <a key={platform.id} href={platform.id === 'spotify' ? spotifyArtistUrl : (platform.profileHref || platform.href)} target="_blank" rel="noopener noreferrer" aria-label={`Abrir o perfil de o Quil no ${platform.name}`} title={`Abrir o perfil de o Quil no ${platform.name}`}><BrandIcon name={platform.id} /><span>{platform.name}</span></a>)}
  </nav>;
}

export function HeroStreaming() {
  const dialog = useRef(null);
  const scrollLock = useRef(null);
  const entrance = useRef(null);
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
    unlock();
  }, []);
  const open = () => {
    if (dialog.current.open) return;
    scrollLock.current = {
      top: document.body.style.top, position: document.body.style.position,
      width: document.body.style.width, scrollY: window.scrollY,
      overflow: document.documentElement.style.overflow
    };
    Object.assign(document.body.style, { position: 'fixed', top: `-${window.scrollY}px`, width: '100%' });
    document.documentElement.style.overflow = 'hidden';
    dialog.current.showModal();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      entrance.current = dialog.current.animate([
        { opacity: 0, transform: 'translateY(16px) scale(.98)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ], { duration: 260, easing: 'cubic-bezier(.2,.7,.2,1)' });
    }
  };
  const close = () => dialog.current.close();
  const closeOutside = event => {
    if (event.target !== dialog.current) return;
    const rect = dialog.current.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
  };
  return <div className="hero-streaming release-object">
    <button className="album-trigger" type="button" aria-label="Abrir plataformas de Quase Indo" aria-haspopup="dialog" aria-controls="hero-platform-window" onClick={open}>
      <span className="album-object"><span className="album-art"><img src="assets/quase-indo-600.webp" alt="Capa oficial do single Quase Indo" width="600" height="600" fetchPriority="high" decoding="async" /></span></span>
    </button>
    <dialog className="music-window" id="hero-platform-window" ref={dialog} aria-labelledby="music-window-title" onClose={unlock} onClick={closeOutside}>
      <div className="music-window-hero">
        <img className="music-window-backdrop" src="assets/quase-indo-600.webp" alt="" width="600" height="600" />
        <button className="music-window-close" type="button" onClick={close} aria-label="Fechar plataformas" autoFocus><span aria-hidden="true">×</span></button>
        <div className="music-window-release">
          <img className="music-window-cover" src="assets/quase-indo-600.webp" alt="" width="600" height="600" />
          <div><p className="section-kicker">o Quil · Single</p><h2 id="music-window-title">Quase Indo</h2><p>Escolha onde ouvir</p></div>
        </div>
      </div>
      <nav className="music-window-links" aria-label="Ouvir Quase Indo">
        {platforms.map(platform => <a key={platform.id} href={platform.href} target="_blank" rel="noopener noreferrer" title={platform.description}>
          <BrandIcon name={platform.id} /><span><strong>{platform.name}</strong><small>{platform.label}</small></span><Icon />
        </a>)}
      </nav>
    </dialog>
  </div>;
}
