import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { runInNewContext } from 'node:vm';
import { transform } from 'esbuild';
import { biography } from '../src/storyTyping.js';
const root = path.resolve(import.meta.dirname, '../dist');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs duplicados na página');
for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(ids.includes(target), `Âncora sem destino: #${target}`);
}
const local = new Set([...html.matchAll(/(?:src|href)="(assets\/[^"?]+)(?:\?[^"]*)?"/g)].map(match => match[1]));
for (const file of local) await stat(path.join(root, file));
for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
  if (href.startsWith('#') || href.startsWith('mailto:')) continue;
  assert.equal(new URL(href).protocol, 'https:', `Link externo inválido: ${href}`);
}
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'A página deve ter um h1');
const story = html.match(/<span class="story-full">([\s\S]*?)<\/span>/)?.[1];
assert.ok(story, 'Biografia ausente no HTML pré-renderizado');
const decodedStory = story.replace(/&(?:amp|lt|gt|quot|#x27);/g, entity => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'" })[entity]);
assert.equal(decodedStory, biography, 'Biografia publicada diverge da fonte React');
const head = html.split('</head>')[0];
const tags = [...head.matchAll(/<(?:meta|link)\s+([^>]+)>/g)].map(([, attributes]) =>
  Object.fromEntries([...attributes.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])));
const metadata = name => tags.find(tag => tag.name === name || tag.property === name)?.content;
assert.equal((head.match(/<title>[^<]+<\/title>/g) || []).length, 1, 'Título ausente ou duplicado');
assert.ok(metadata('description'), 'Meta description ausente');
const canonicals = tags.filter(tag => tag.rel === 'canonical');
assert.equal(canonicals.length, 1, 'URL canônica ausente ou duplicada');
const { href: canonical } = canonicals[0];
assert.equal(canonical, 'https://oquil.com.br/');
assert.equal(metadata('og:url'), canonical);
for (const name of ['og:type', 'og:title', 'og:description', 'og:image', 'og:image:alt']) {
  assert.ok(metadata(name), `Open Graph ausente: ${name}`);
}
const shareImage = new URL(metadata('og:image'), canonical);
assert.equal(shareImage.origin, new URL(canonical).origin);
await stat(path.join(root, shareImage.pathname));
const schema = JSON.parse(head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]);
for (const type of ['Person', 'WebSite', 'WebPage', 'MusicRecording']) {
  assert.ok(schema['@graph'].some(entity => entity['@type'] === type), `Schema ausente: ${type}`);
}
console.log(`${local.size} arquivos locais, IDs, âncoras, URLs HTTPS e conteúdo SEO conferidos.`);

const manifest = JSON.parse(await readFile(path.join(root, 'site.webmanifest'), 'utf8'));
assert.equal(manifest.short_name, 'o Quil');
for (const icon of manifest.icons) {
  const iconPath = icon.src.split('?')[0];
  if (icon.type === 'image/svg+xml') {
    const svg = await readFile(path.join(root, iconPath), 'utf8');
    assert.ok(svg.includes('<path') && !svg.includes('<image'), 'Favicon SVG deve ser vetorial');
    continue;
  }
  const png = await readFile(path.join(root, iconPath));
  const [width, height] = icon.sizes.split('x').map(Number);
  assert.equal(png.readUInt32BE(16), width, `Largura do ícone: ${icon.src}`);
  assert.equal(png.readUInt32BE(20), height, `Altura do ícone: ${icon.src}`);
}
const ico = await readFile(path.join(root, 'favicon.ico'));
assert.equal(ico.readUInt16LE(2), 1, 'Formato ICO inválido');
assert.equal(ico.readUInt16LE(4), 7, 'Tamanhos do ICO incompletos');
await stat(path.join(root, 'apple-touch-icon.png'));
await stat(path.join(root, 'browserconfig.xml'));
assert.ok(!html.includes('__ICON_HASH__'), 'Versão do favicon não gerada');
console.log('Manifesto, dimensões dos ícones, ICO e Apple Touch conferidos.');

const archive = html.split('class="archive"')[1]?.split('</section>')[0];
assert.ok(archive, 'Arquivo de lançamentos ausente');
assert.ok(!archive.includes('<img'), 'O arquivo cronológico não deve conter imagens');
assert.ok(!html.includes('Alguns links abrem buscas'), 'Aviso removido voltou à página');
const originalCover = await readFile(path.join(root, 'assets/quase-indo-original.png'));
assert.equal(originalCover.readUInt32BE(16), 3000);
assert.equal(originalCover.readUInt32BE(20), 3000);
assert.ok(html.includes('compondo, produzindo, gravando, mixando'), 'Independência artística ausente');
console.log('Arquivo sem imagens, texto independente e capa original 3000×3000 conferidos.');

const catalog = html.split('id="catalogo"')[1]?.split('</section>')[0];
assert.ok(catalog, 'Catálogo ausente');
const { releases } = JSON.parse(await readFile(path.join(root, '../src/content.json'), 'utf8'));
assert.equal((catalog.match(/class="release-cover"/g) || []).length, releases.length, 'Cada single deve ter uma capa');
for (const release of releases) {
  assert.ok(release.cover?.src, `Single sem capa: ${release.title}`);
  await stat(path.join(root, release.cover.src));
}
assert.ok(!/0[1-4](Spotify|YouTube|Apple|Amazon)/.test(html), 'Nome de plataforma com numeração colada');
assert.ok(html.includes('voltei em 2026'), 'Retorno em 2026 ausente na biografia');
console.log('Capas dos singles, nomes de plataformas e biografia atualizada conferidos.');

let spotifyEntities = 0;
for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
  if (!href.startsWith('https://open.spotify.com/')) continue;
  const url = new URL(href);
  const entity = url.pathname.match(/^\/(?:intl-[a-z]{2}\/)?(track|album|artist|playlist)\/([^/]+)\/?$/);
  if (entity) {
    assert.match(entity[2], /^[A-Za-z0-9]{22}$/, `ID Spotify incompleto: ${href}`);
    spotifyEntities++;
  } else {
    assert.ok(url.pathname.startsWith('/search/'), `Destino Spotify não previsto: ${href}`);
  }
}
console.log(`${spotifyEntities} links diretos de entidades Spotify com IDs completos conferidos.`);

const { platforms } = JSON.parse(await readFile(path.join(root, '../src/content.json'), 'utf8'));
for (const platform of platforms) {
  assert.ok(platform.href, `Plataforma sem URL: ${platform.name}`);
  assert.equal(new URL(platform.href).protocol, 'https:', `URL de plataforma inválida: ${platform.name}`);
}

assert.ok(!html.includes('__SITE_CSS__'), 'CSS de produção não foi incorporado');
assert.ok(!html.includes('fonts.googleapis.com'), 'Fonte externa voltou ao caminho crítico');
for (const [, file] of html.matchAll(/url\(assets\/([^\s)]+)\)/g)) {
  await stat(path.join(root, 'assets', file));
}
for (const release of releases) {
  await stat(path.join(root, release.cover.src.replace('assets/', 'assets/thumbs/')));
}
assert.ok(html.includes('class="hero-backdrop" fetchPriority="high" loading="eager"') || html.includes('class="hero-backdrop" fetchpriority="high" loading="eager"'), 'Retrato LCP sem prioridade alta');
for (const [tag] of html.matchAll(/<img\b[^>]+>/g)) {
  assert.match(tag, /\bsrc="assets\/[^"]+\.webp"/i, `Imagem fora do formato WebP: ${tag}`);
  assert.match(tag, /\bwidth="[1-9]\d*"/, `Imagem sem largura: ${tag}`);
  assert.match(tag, /\bheight="[1-9]\d*"/, `Imagem sem altura: ${tag}`);
  if (/class="(?:release-cover|closing-image)"|brutt-gang-marca/.test(tag)) {
    assert.match(tag, /\bloading="lazy"/, `Imagem de seção sem lazy loading: ${tag}`);
  }
}
assert.match(html, /class="footer-signature"[^>]*><img[^>]*loading="lazy"/);
assert.ok(!/<iframe\b|<script[^>]+src="https?:\/\//i.test(html), 'Mídia ou rastreador externo carregados antes de interação');
for (const [, file] of html.matchAll(/<source\b[^>]*\bsrcset="(assets\/[^"]+\.webp)"/gi)) await stat(path.join(root, file));
console.log('CSS incorporado, fontes locais, miniaturas e prioridade do retrato LCP conferidos.');

// URLs estáveis ajudam a manter uma única referência de favicon para rastreadores.
assert.ok(html.includes('href="/favicon.ico"'), 'Favicon ICO sem URL estável');
assert.ok(html.includes('href="/assets/icons/icon-192.png"'), 'Favicon PNG 192 sem URL estável');
console.log('Biografia sincronizada com a fonte e URLs estáveis do favicon conferidas.');

const trackingSource = await readFile(path.join(root, '../src/tracking.js'), 'utf8');
const trackingScript = await transform(trackingSource, {
  format: 'cjs',
  define: { __TRACKING_IDS__: JSON.stringify({ ga4: 'G-TEST', googleAds: 'AW-123', metaPixel: '123', clarity: 'test' }) },
});
const listeners = new Map();
const requests = [];
const window = {
  dataLayer: [],
  addEventListener: (type, listener) => listeners.set(type, listener),
  removeEventListener: type => listeners.delete(type),
};
const document = { createElement: () => ({}), head: { append: script => requests.push(script.src) } };
const module = { exports: {} };
runInNewContext(trackingScript.code, { window, document, module });
module.exports.deferTracking();
listeners.get('click')({ type: 'click', isTrusted: false });
assert.equal(requests.length, 0, 'Rastreadores carregados antes de uma interação real');
listeners.get('wheel')({ type: 'wheel', isTrusted: true });
assert.deepEqual(requests, [
  'https://www.googletagmanager.com/gtag/js?id=G-TEST',
  'https://connect.facebook.net/en_US/fbevents.js',
  'https://www.clarity.ms/tag/test',
]);
assert.deepEqual(window.dataLayer.filter(args => args[0] === 'config').map(args => args[1]), ['G-TEST', 'AW-123']);
assert.equal(listeners.size, 0, 'Eventos de interação devem ser removidos após o primeiro disparo');
console.log('Carregamento único dos rastreadores após interação conferido.');
