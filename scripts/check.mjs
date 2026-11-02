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
