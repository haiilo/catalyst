import { describe, it, expect, afterEach } from 'vitest';
import { render, h } from '@stencil/vitest';
import { page } from '@vitest/browser/context';

const COLORS = ['secondary', 'primary', 'danger', 'info', 'success', 'warning'] as const;
const VARIANTS = ['outlined', 'filled', 'text', 'link'] as const;
type Color = (typeof COLORS)[number];
type Variant = (typeof VARIANTS)[number];

const COLORS_VARIANTS_MATRIX: [Variant, Color][] = VARIANTS.flatMap(v => COLORS.map(c => [v, c] as [Variant, Color]));

describe('cat-button', () => {
  afterEach(async () => {
    // Reset mouse position after each test to prevent hover state leaking into the next test.
    await page.elementLocator(document.body).hover();
  });

  it.each(COLORS_VARIANTS_MATRIX)('%s %s', async (variant, color) => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant={variant} color={color}>
          {variant} {color}
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it.each(COLORS_VARIANTS_MATRIX)('%s %s hover', async (variant, color) => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant={variant} color={color}>
          {variant} {color} hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root.querySelector('cat-button')!).hover();
    await expect(root).toMatchScreenshot();
  });

  it.each(COLORS_VARIANTS_MATRIX)('%s %s active', async (variant, color) => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant={variant} color={color} active>
          {variant} {color} active
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it.each(COLORS_VARIANTS_MATRIX)('%s %s disabled', async (variant, color) => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant={variant} color={color} disabled>
          {variant} {color} disabled
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('outlined primary custom', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="primary">
          Outlined Primary Custom
        </cat-button>
      </div>
    );
    (root as HTMLElement).style.setProperty('--cat-primary-text', '91, 94, 219');
    (root as HTMLElement).style.setProperty('--cat-primary-text-hover', '78, 81, 191');
    (root as HTMLElement).style.setProperty('--cat-primary-text-active', '65, 67, 159');
    (root as HTMLElement).style.setProperty('--cat-primary-bg-outlined', '253, 212, 212');
    await expect(root).toMatchScreenshot();
  });

  it.each(['xs', 's', 'm', 'l', 'xl'] as const)('size %s', async size => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button size={size}>{size}</cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('loading', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button loading>Loading</cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('with icon left', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button icon="$cat:select-open">With Icon</cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('with icon right', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button icon="$cat:select-open" iconRight>
          Icon Right
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('icon only', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button icon="$cat:select-open" iconOnly />
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('round', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button round>Round</cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('as link with url', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button url="https://example.com">Link Button</cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });
});
