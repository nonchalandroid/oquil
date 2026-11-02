import { build } from 'esbuild';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
await mkdir(path.join(root, '.build'), { recursive: true });
const common = { bundle: true, minify: true, define: { 'process.env.NODE_ENV': '"production"' }, absWorkingDir: root };
await build({ ...common, entryPoints: ['src/server.jsx'], outfile: '.build/server.cjs', platform: 'node', format: 'cjs' });
const { default: { html } } = await import(pathToFileURL(path.join(root, '.build/server.cjs')).href);
const js = (await build({ ...common, entryPoints: ['src/client.jsx'], outfile: 'app.js', platform: 'browser', format: 'esm', target: ['es2020'], write: false, legalComments: 'eof' })).outputFiles[0].contents;
const css = (await build({ absWorkingDir: root, entryPoints: ['src/site.css'], minify: true, outfile: 'site.css', write: false, legalComments: 'eof' })).outputFiles[0].contents;
const hash = bytes => createHash('sha256').update(bytes).digest('hex').slice(0, 12);
await writeFile(path.join(root, 'assets/app.js'), js);
await writeFile(path.join(root, 'assets/site.css'), css);
const template = await readFile(path.join(root, 'src/document.html'), 'utf8');
const page = template.replace('__APP_HTML__', html).replace('__JS_HASH__', hash(js)).replace('__CSS_HASH__', hash(css));
await writeFile(path.join(root, 'index.html'), page);
const dist = path.join(root, 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const file of ['index.html', 'assets', 'CNAME', 'robots.txt', 'sitemap.xml']) {
  await cp(path.join(root, file), path.join(dist, file), { recursive: true });
}
console.log('Página React pré-renderizada. Arquivos públicos: dist/.');
