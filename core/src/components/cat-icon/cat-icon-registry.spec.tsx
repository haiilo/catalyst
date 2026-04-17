import { describe, it, expect } from '@stencil/vitest';
import { catIconRegistry } from './cat-icon-registry';

describe('CatIconRegistry', () => {
  it('exists', async () => {
    expect(catIconRegistry).toBeTruthy();
  });
});
