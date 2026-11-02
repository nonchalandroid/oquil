import React from 'react';

// These paths reveal the original artwork; they do not replace its lettering.
const strokes = [
  { d: 'M38 157 C62 123 94 134 97 161 C105 188 74 230 45 235 C11 242 7 219 17 194 C22 179 30 166 38 157', duration: 480, delay: 0 },
  { d: 'M310 65 C340 60 357 86 351 121 C345 165 302 214 262 226 C209 245 202 203 215 166 C229 125 255 96 279 78 C294 68 304 65 310 65', duration: 760, delay: 520 },
  { d: 'M282 173 C312 198 349 235 375 268', duration: 200, delay: 1300 },
  { d: 'M387 134 C380 158 369 183 383 190 C402 198 429 149 441 126 C432 151 428 183 429 208', duration: 380, delay: 1510 },
  { d: 'M484 120 C475 145 471 175 467 201', duration: 160, delay: 1920 },
  { d: 'M519 157 C535 103 568 19 571 19 C567 39 539 100 519 154 C506 183 509 190 532 185 C579 179 637 165 691 165', duration: 480, delay: 2120 },
  { d: 'M490 92 C486 89 482 87 487 84 C489 82 491 84 491 85 C495 81 500 84 496 88 Z', width: 9, duration: 260, delay: 2700 },
  { d: 'M95 300 C212 261 414 231 610 218 C567 230 389 245 245 267 C195 276 153 285 141 285', duration: 600, delay: 3120 }
];

export default function Signature() {
  return <svg className="signature" viewBox="0 0 700 314" role="img" aria-label="Assinatura de o Quil">
    <defs>
      <mask id="signature-writing-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="700" height="314">
        <g fill="none" stroke="white" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round">
          {strokes.map((stroke, index) => <path className="signature-stroke" key={index} d={stroke.d} strokeWidth={stroke.width} pathLength="1" style={{ '--stroke-duration': `${stroke.duration}ms`, '--stroke-delay': `${stroke.delay}ms` }} />)}
        </g>
      </mask>
    </defs>
    <image href="assets/o-quil-assinatura-360.webp" width="700" height="314" mask="url(#signature-writing-mask)" />
  </svg>;
}
