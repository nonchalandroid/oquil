import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { deferTracking } from './tracking.js';

deferTracking();
hydrateRoot(document.getElementById('root'), <App />);
