// Gerador opcional: requer sharp. Os arquivos finais são versionados.
const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const lengths = require('./signature-path-lengths.json');
const strokes = [
  ['M38 157 C62 123 94 134 97 161 C105 188 74 230 45 235 C11 242 7 219 17 194 C22 179 30 166 38 157',480,0,26],
  ['M310 65 C340 60 357 86 351 121 C345 165 302 214 262 226 C209 245 202 203 215 166 C229 125 255 96 279 78 C294 68 304 65 310 65',760,520,26],
  ['M282 173 C312 198 349 235 375 268',200,1300,26],
  ['M387 134 C380 158 369 183 383 190 C402 198 429 149 441 126 C432 151 428 183 429 208',380,1510,26],
  ['M484 120 C475 145 471 175 467 201',160,1920,26],
  ['M519 157 C535 103 568 19 571 19 C567 39 539 100 519 154 C506 183 509 190 532 185 C579 179 637 165 691 165',480,2120,26],
  ['M490 92 C486 89 482 87 487 84 C489 82 491 84 491 85 C495 81 500 84 496 88 Z',260,2700,9],
  ['M95 300 C212 261 414 231 610 218 C567 230 389 245 245 267 C195 276 153 285 141 285',600,3120,26]
];
(async () => {
 const image=fs.readFileSync(path.join(root,'assets/o-quil-assinatura-clara.png')).toString('base64');
 const frames=32,width=240,height=108,tiles=[];
 for(let i=0;i<frames;i++){
  const time=3720*i/(frames-1);
  const paths=strokes.map(([d,duration,delay,strokeWidth],index)=>{
   const length = lengths[index];
   const progress=Math.max(0,Math.min(1,(time-delay)/duration));
   return `<path d="${d}" stroke-width="${strokeWidth}" stroke-dasharray="${length}" stroke-dashoffset="${length*(1-progress)}" opacity="${progress>0?1:0}"/>`;
  }).join('');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 700 314"><defs><mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="700" height="314"><g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round">${paths}</g></mask></defs><image href="data:image/png;base64,${image}" width="700" height="314" mask="url(#m)"/></svg>`;
  tiles.push({input:await sharp(Buffer.from(svg)).png().toBuffer(),left:i*width,top:0});
 }
 await sharp({create:{width:width*frames,height,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite(tiles).webp({quality:85,alphaQuality:100}).toFile(path.join(root,'assets/signature-writing.webp'));
 await sharp(path.join(root,'assets/o-quil-assinatura-clara.png')).resize({width:180}).webp({quality:82,alphaQuality:100}).toFile(path.join(root,'assets/o-quil-assinatura-180.webp'));
 for(const size of [400,800])await sharp(path.join(root,'assets/quase-indo-capa.webp')).resize(size,size).webp({quality:82}).toFile(path.join(root,`assets/quase-indo-${size}.webp`));
 console.log('Sequência de escrita, assinatura compacta e capas responsivas geradas.');
})().catch(e=>{console.error(e);process.exit(1)});
