import { beforeAll } from 'vitest';

beforeAll(async () => {
  // Load the lazy-loader for this project
  await import('./dist/catalyst/catalyst.esm.js');
});

export {};
