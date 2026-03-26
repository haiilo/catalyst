jest.mock('./cat-icon-registry');
import { newSpecPage } from '@stencil/core/testing';
import { CatIcon } from './cat-icon';

describe('cat-icon', () => {
  it('renders without an icon', async () => {
    const page = await newSpecPage({
      components: [CatIcon],
      html: `<cat-icon></cat-icon>`
    });
    expect(page.root?.shadowRoot).toEqualLightHtml(`
      <span aria-hidden="true" class="icon icon-m" part="icon"></span>
    `);
  });

  it('renders with an icon name (falls back to global registry when no provider)', async () => {
    const page = await newSpecPage({
      components: [CatIcon],
      html: `<cat-icon icon="icon"></cat-icon>`
    });
    // The mock registry returns undefined, so innerHTML is empty
    expect(page.root?.shadowRoot).toEqualLightHtml(`
      <span aria-hidden="true" class="icon icon-m" part="icon"></span>
    `);
  });

  it('renders with iconSrc, bypassing registry entirely', async () => {
    const page = await newSpecPage({
      components: [CatIcon],
      html: `<cat-icon icon-src="<svg/>"></cat-icon>`
    });
    // JSDOM normalises self-closing SVG tags to <svg></svg>
    expect(page.root?.shadowRoot?.querySelector('span')?.innerHTML).toContain('svg');
  });

  it('dispatches a cat-icon-request event when an icon name is set', async () => {
    const page = await newSpecPage({
      components: [CatIcon],
      html: `<cat-icon></cat-icon>`
    });
    const catIcon = page.root!;
    const events: CustomEvent[] = [];
    document.body.addEventListener('cat-icon-request', e => events.push(e as CustomEvent));

    catIcon.setAttribute('icon', 'home');
    await page.waitForChanges();

    const iconEvents = events.filter(e => e.detail?.name === 'home');
    expect(iconEvents.length).toBeGreaterThan(0);
    expect(iconEvents[0].cancelable).toBe(true);
    expect(iconEvents[0].bubbles).toBe(true);

    document.body.removeEventListener('cat-icon-request', e => events.push(e as CustomEvent));
  });
});
