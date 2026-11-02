import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
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
assert.ok(html.includes('Fillipe Queiroz começou'), 'Narrativa ausente no HTML pré-renderizado');
for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(json);
console.log(`${local.size} arquivos locais, IDs, âncoras, URLs HTTPS e conteúdo SEO conferidos.`);

const manifest = JSON.parse(await readFile(path.join(root, 'site.webmanifest'), 'utf8'));
assert.equal(manifest.short_name, 'o Quil');
for (const icon of manifest.icons) {
  const png = await readFile(path.join(root, icon.src));
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
assert.ok(html.includes('Ele mesmo grava, produz suas músicas'), 'Independência artística ausente');
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
assert.equal((html.match(/Dark R(?:&amp;|&)B/g) || []).length, 1, 'Dark R&B deve aparecer apenas na bio');
console.log('Capas dos singles, nomes de plataformas e gênero somente na bio conferidos.');

let spotifyEntities = 0;
for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
  if (!href.startsWith('https://open.spotify.com/')) continue;
  const url = new URL(href);
  const entity = url.pathname.match(/^\/(?:intl-[a-z]{2}\/)?(track|album|artist)\/([^/]+)\/?$/);
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
