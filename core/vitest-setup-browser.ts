import { beforeAll } from 'vitest';
import './dist/catalyst/catalyst.css';

beforeAll(async () => {
  // Load the lazy-loader for this project
  await import('./dist/catalyst/catalyst.esm.js');
});

export {};
