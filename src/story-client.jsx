import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import Story from './Story.jsx';
const root = document.getElementById('artist-story');
if (root) hydrateRoot(root, <Story />);
