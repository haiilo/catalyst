import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-button', () => {
  it('matches screenshot', async () => {
    const { root } = await render(<cat-button>Test</cat-button>);
    await expect(root).toMatchScreenshot();
  });
});
