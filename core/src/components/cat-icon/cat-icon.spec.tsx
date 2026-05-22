import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('./cat-icon-registry', () => ({
  CAT_ICON_SET_ATTR: 'data-cat-icon-set',
  catIconRegistry: {
    hasIcon: vi.fn(() => false),
    getIcon: vi.fn(() => undefined)
  }
}));

import './cat-icon';
import { catIconRegistry } from './cat-icon-registry';

describe('cat-icon', () => {
  beforeEach(() => {
    vi.mocked(catIconRegistry.hasIcon).mockReset().mockReturnValue(false);
    vi.mocked(catIconRegistry.getIcon).mockReset().mockReturnValue(undefined);
  });

  describe('rendering', () => {
    it('renders empty span when no icon or iconSrc provided', async () => {
      const { root } = await render(<cat-icon />);
      await expect(root.shadowRoot).toEqualHtml(`
        <span aria-hidden="true" part="icon" class="icon icon-m"></span>
      `);
    });

    it('renders with iconSrc bypassing registry', async () => {
      const svg = '<svg><circle r="5"/></svg>';
      const { root } = await render(<cat-icon iconSrc={svg} />);
      await expect(root.shadowRoot).toEqualHtml(`
        <span aria-hidden="true" part="icon" class="icon icon-m"><svg><circle r="5"></circle></svg></span>
      `);
      expect(catIconRegistry.getIcon).not.toHaveBeenCalled();
    });

    it('calls getIcon with icon name when no set is found', async () => {
      vi.mocked(catIconRegistry.getIcon).mockReturnValue('<svg id="global"/>');
      const { root } = await render(<cat-icon icon="my-icon" />);
      expect(catIconRegistry.getIcon).toHaveBeenCalledWith('my-icon');
      await expect(root.shadowRoot).toEqualHtml(`
        <span aria-hidden="true" part="icon" class="icon icon-m"><svg id="global"></svg></span>
      `);
    });

    it('renders a11y-label and removes aria-hidden', async () => {
      const { root } = await render(<cat-icon icon="my-icon" a11yLabel="Close" />);
      await expect(root.shadowRoot).toEqualHtml(`
        <span aria-label="Close" part="icon" class="icon icon-m"></span>
      `);
    });
  });

  describe('size', () => {
    it.each(['xs', 's', 'm', 'l', 'xl'] as const)('renders size %s', async size => {
      const { root } = await render(<cat-icon size={size} />);
      expect(root.shadowRoot?.querySelector('span')?.classList.contains(`icon-${size}`)).toBe(true);
    });

    it('renders inline size without size class', async () => {
      const { root } = await render(<cat-icon size="inline" />);
      const span = root.shadowRoot?.querySelector('span');
      expect(span?.classList.contains('icon-inline')).toBe(false);
      expect(span?.classList.contains('icon')).toBe(true);
    });
  });

  describe('setName resolution', () => {
    it('uses scoped set when ancestor has data-cat-icon-set and hasIcon returns true', async () => {
      vi.mocked(catIconRegistry.hasIcon).mockImplementation((_name, setName) => setName === 'mfe1');
      vi.mocked(catIconRegistry.getIcon).mockImplementation((_name, setName) =>
        setName === 'mfe1' ? '<svg id="scoped"/>' : '<svg id="global"/>'
      );

      const { root } = await render(<cat-icon icon="my-icon" />, {
        stageAttrs: { 'data-cat-icon-set': 'mfe1', class: 'stencil-component-stage' }
      });
      expect(catIconRegistry.hasIcon).toHaveBeenCalledWith('my-icon', 'mfe1');
      expect(catIconRegistry.getIcon).toHaveBeenCalledWith('my-icon', 'mfe1');
      await expect(root.shadowRoot).toEqualHtml(`
        <span aria-hidden="true" part="icon" class="icon icon-m"><svg id="scoped"></svg></span>
      `);
    });

    it('falls back to global registry when hasIcon returns false for the set', async () => {
      vi.mocked(catIconRegistry.hasIcon).mockReturnValue(false);
      vi.mocked(catIconRegistry.getIcon).mockReturnValue('<svg id="global"/>');

      const { root } = await render(<cat-icon icon="my-icon" />, {
        stageAttrs: { 'data-cat-icon-set': 'mfe1', class: 'stencil-component-stage' }
      });
      expect(catIconRegistry.hasIcon).toHaveBeenCalledWith('my-icon', 'mfe1');
      // Falls back: called without setName
      expect(catIconRegistry.getIcon).toHaveBeenCalledWith('my-icon');
      await expect(root.shadowRoot).toEqualHtml(`
        <span aria-hidden="true" part="icon" class="icon icon-m"><svg id="global"></svg></span>
      `);
    });
  });
});
