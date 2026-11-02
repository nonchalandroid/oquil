import React from 'react';
import { renderToString } from 'react-dom/server';
import Story from './Story.jsx';
export const html = renderToString(<Story />);
