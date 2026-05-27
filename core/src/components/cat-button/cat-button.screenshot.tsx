import { describe, it, expect, afterEach } from 'vitest';
import { render, h } from '@stencil/vitest';
import { page } from '@vitest/browser/context';

describe('cat-button', () => {
  afterEach(async () => {
    // Reset mouse position after each test to prevent hover state leaking into the next test.
    await page.elementLocator(document.body).hover();
  });

  it('outlined secondary', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="secondary">
        Outlined Secondary
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('outlined secondary hover', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="secondary">
        Outlined Secondary Hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root).hover();
    await expect(root).toMatchScreenshot();
  });

  it('outlined secondary active', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="secondary" active>
        Outlined Secondary Active
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('outlined secondary disabled', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="secondary" disabled>
        Outlined Secondary Disabled
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('outlined primary', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="primary">
        Outlined Primary
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('outlined primary hover', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="primary">
        Outlined Primary Hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root).hover();
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

  it('outlined danger', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="danger">
        Outlined Danger
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('outlined danger hover', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="danger">
        Outlined Danger Hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root).hover();
    await expect(root).toMatchScreenshot();
  });

  it('outlined info', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="info">
        Outlined Info
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('outlined info hover', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="info">
        Outlined Info Hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root).hover();
    await expect(root).toMatchScreenshot();
  });

  it('outlined success', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="success">
        Outlined Success
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('outlined success hover', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="success">
        Outlined Success Hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root).hover();
    await expect(root).toMatchScreenshot();
  });

  it('outlined warning', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="warning">
        Outlined Warning
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('outlined warning hover', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="outlined" color="warning">
        Outlined Warning Hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root).hover();
    await expect(root).toMatchScreenshot();
  });

  it('filled secondary', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="secondary">
        Filled Secondary
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('filled secondary active', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="secondary" active>
        Filled Secondary Active
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('filled secondary hover', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="secondary">
        Filled Secondary Hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root).hover();
    await expect(root).toMatchScreenshot();
  });

  it('filled secondary disabled', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="secondary" disabled>
        Filled Secondary Disabled
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('filled primary', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="primary">
        Filled Primary
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('filled primary active', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="primary" active>
        Filled Primary Active
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('filled primary hover', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="primary">
        Filled Primary Hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root).hover();
    await expect(root).toMatchScreenshot();
  });

  it('filled danger', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="danger">
        Filled Danger
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('filled danger active', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="danger" active>
        Filled Danger Active
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('filled danger hover', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="danger">
        Filled Danger Hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root).hover();
    await expect(root).toMatchScreenshot();
  });

  it('filled info', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="info">
        Filled Info
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('filled info active', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="info" active>
        FilledInfo Danger Active
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('filled info hover', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="info">
        Filled Info Hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root).hover();
    await expect(root).toMatchScreenshot();
  });

  it('filled success', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="success">
        Filled Success
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('filled success active', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="success" active>
        Filled Success Danger Active
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('filled success hover', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="success">
        Filled Success Hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root).hover();
    await expect(root).toMatchScreenshot();
  });

  it('filled warning', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="warning">
        Filled Warning
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('filled warning active', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="warning" active>
        Filled Warning Danger Active
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('filled warning hover', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="filled" color="warning">
        Filled Warning Hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root).hover();
    await expect(root).toMatchScreenshot();
  });

  it('text secondary', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="text" color="secondary">
        Text Secondary
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('text secondary hover', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="text" color="secondary">
        Text Secondary Hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root).hover();
    await expect(root).toMatchScreenshot();
  });

  it('text primary', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="text" color="primary">
        Text Primary
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('text danger', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="text" color="danger">
        Text Danger
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('text info', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="text" color="info">
        Text Info
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('text success', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="text" color="success">
        Text Success
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('text warning', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="text" color="warning">
        Text Warning
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('link secondary', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="link" color="secondary">
        Link Secondary
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('link secondary hover', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="link" color="secondary">
        Link Secondary Hover
        </cat-button>
      </div>
    );
    await page.elementLocator(root).hover();
    await expect(root).toMatchScreenshot();
  });

  it('link primary', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="link" color="primary">
        Link Primary
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('link danger', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="link" color="danger">
        Link Danger
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('link info', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="link" color="info">
        Link Info
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('link success', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="link" color="success">
        Link Success
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('link warning', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button variant="link" color="warning">
        Link Warning
        </cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('size xs', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button size="xs">XSmall</cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('size s', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button size="s">Small</cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('size m', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button size="m">Medium</cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('size l', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button size="l">Large</cat-button>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('size xl', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-button size="xl">XLarge</cat-button>
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
