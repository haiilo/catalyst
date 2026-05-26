import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-alert screenshot', () => {
  it('renders with success color', async () => {
    const { root } = await render(
      <cat-alert color="success">
        <p>
          Lorem ipsum dolore <a href="https://google.de">dolore magna</a> sit amet.
        </p>
      </cat-alert>
    );
    await expect(root).toMatchScreenshot();
  });
});
