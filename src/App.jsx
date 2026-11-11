import React from 'react';
import Story from './Story.jsx';
import Signature from './Signature.jsx';
import Catalog from './Catalog.jsx';
import { HeroStreaming, PlaylistStreaming, StreamingBanner } from './Streaming.jsx';
import { BrandSymbols, Icon } from './Icons.jsx';
import { press, spotifyArtistUrl } from './content.json';
import usePageEffects from './usePageEffects.js';

function Wordmark() { return <a className="wordmark" href="#top" aria-label="o Quil, voltar ao início"><img src="assets/o-quil-assinatura-180.webp" alt="o Quil" width="180" height="81" /></a>; }

function Hero() {
  return <section className="hero" aria-labelledby="release-title">
    <img className="hero-backdrop" fetchPriority="high" loading="eager" src="assets/o-quil-retrato-ai.webp" alt="" width="1673" height="940" decoding="async" />
    <div className="hero-copy"><p className="hero-eyebrow">Rio de Janeiro <span>·</span> Brasil</p><h1 id="release-title">Quase <span>Indo</span></h1><div className="signature-writing"><Signature /></div><div className="hero-actions"><a className="text-link" href="#catalogo">Explorar catálogo<Icon name="down" /></a></div></div>
    <HeroStreaming />
    <a className="hero-scroll" href="#sobre" aria-label="Deslizar para a história de o Quil"><Icon name="down" /></a>
  </section>;
}

function ArtistStory() {
  return <section className="section intro" aria-labelledby="sobre-titulo"><div className="section-inner" id="sobre">
    <div className="narrative-layout"><header className="narrative-heading"><p className="section-kicker">01 / História</p><h2 className="section-title" id="sobre-titulo">This Is <em>o Quil</em></h2><p className="narrative-caption">o Quil. Artista independente.<br />Rio de Janeiro.</p><aside className="label-identity" aria-label="Brutt Gang, selo de o Quil"><img src="assets/brutt-gang-logo.webp" alt="Brutt Gang" width="1983" height="793" loading="lazy" decoding="async" /><p>Meu selo.<br />Em homenagem ao meu irmão.</p></aside></header><div id="artist-story"><Story /></div></div>
    <StreamingBanner />
  </div></section>;
}

function Press() {
  return <section className="section press" aria-labelledby="press-titulo"><div className="section-inner press-layout" id="press"><header data-enter=""><p className="section-kicker">03 / Arquivo</p><h2 className="section-title" id="press-titulo">Na <em>imprensa.</em></h2><p className="press-intro">Matérias e referências sobre os lançamentos e a trajetória do artista.</p></header><div className="press-list">{press.map(item => <article className="press-item" key={item.href} data-enter="">{item.datetime ? <time className="press-date" dateTime={item.datetime}>{item.date}</time> : <span className="press-date">{item.date}</span>}<div><p className="press-outlet">{item.outlet}</p><h3><a href={item.href} target="_blank" rel="noopener noreferrer">{item.title}<Icon /></a></h3><p className="press-description">{item.description}</p></div></article>)}</div></div></section>;
}

export default function App() {
  usePageEffects();
  return <div className="site-shell">
    <div id="top" className="top-anchor" aria-hidden="true" />
    <BrandSymbols /><a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
    <header className="nav"><Wordmark /><nav className="nav-links" aria-label="Navegação principal"><a href="#sobre"><span className="nav-number" aria-hidden="true">01</span>História</a><a href="#catalogo"><span className="nav-number" aria-hidden="true">02</span>Música</a><a href="#trajetoria"><span className="nav-number" aria-hidden="true">03</span>Trajetória</a><a href="#press"><span className="nav-number" aria-hidden="true">04</span>Imprensa</a></nav><div className="reading-progress" aria-hidden="true" /></header>
    <main id="conteudo" tabIndex="-1"><Hero /><ArtistStory /><Catalog /><Press />
      <section className="closing" aria-labelledby="closing-title"><img className="closing-image" src="assets/o-quil-retrato-ai.webp" alt="" width="1673" height="940" loading="lazy" decoding="async" /><div className="closing-content" data-enter=""><p className="section-kicker">o Quil</p><h2 id="closing-title">Fica mais um<br /><em>pouco.</em></h2><PlaylistStreaming /></div></section>
    </main>
    <footer><div className="footer-top"><a className="footer-signature" href="#top" aria-label="o Quil, voltar ao início"><img src="assets/o-quil-assinatura-180.webp" alt="Assinatura de o Quil" width="180" height="81" loading="lazy" decoding="async" /></a><nav className="footer-links" aria-label="Redes e contato"><a href={spotifyArtistUrl} target="_blank" rel="noopener noreferrer">Spotify</a><a href="https://www.instagram.com/o.quil/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.youtube.com/@oquil" target="_blank" rel="noopener noreferrer">YouTube</a><a href="mailto:oquil@proton.me">Contato</a><a href="https://genius.com/artists/O-quil" target="_blank" rel="noopener noreferrer">Genius</a></nav><a className="text-link" href="#top">Voltar ao topo<Icon name="up" /></a></div><div className="footer-bottom"><span>© 2026 o Quil. Todos os direitos reservados.</span><span>Rio de Janeiro · Brasil</span></div></footer>
  </div>;
}
