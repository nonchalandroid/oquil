import React from 'react';
import paths from './brand-paths.json';

export function BrandSymbols() {
  return <svg className="brand-symbols" aria-hidden="true" focusable="false"><defs>
    {Object.entries(paths).map(([name, shapes]) => <symbol id={`brand-${name}`} key={name} viewBox="0 0 24 24">
      {shapes.map((d, i) => <path key={i} d={d} />)}
    </symbol>)}
  </defs></svg>;
}

export function BrandIcon({ name }) {
  return <svg className="brand-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><use href={`#brand-${name}`} /></svg>;
}

export function Icon({ name = 'external', className = '' }) {
  const paths = { external: 'M7 17 17 7M7 7h10v10', plus: 'M12 5v14M5 12h14', down: 'M12 4v16m-6-6 6 6 6-6', up: 'M12 20V4m-6 6 6-6 6 6' };
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[name]} /></svg>;
}
