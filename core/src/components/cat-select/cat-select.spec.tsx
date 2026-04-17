import { vi } from 'vitest';
import { render, h, describe, it, expect, beforeEach } from '@stencil/vitest';

vi.mock('../cat-i18n/cat-i18n-registry');
vi.mock('autosize-input', () => vi.fn());

vi.mock('@floating-ui/dom', () => ({
  autoUpdate: mockAutoUpdate,
  computePosition: mockComputePosition,
  flip: vi.fn(() => ({})),
  offset: vi.fn(() => ({}))
}));

const mockAutoUpdateCleanup = vi.fn();
const mockAutoUpdate = vi.fn(() => mockAutoUpdateCleanup);
const mockComputePosition = vi.fn(() =>
  Promise.resolve({
    x: 0,
    y: 0,
    placement: 'bottom-start'
  })
);

import './cat-select';
import { stringArrayConnector } from './connectors';

describe('cat-select', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders', async () => {
    const { root } = await render(<cat-select label="Label" />);
    await expect(root).toEqualLightHtml(`
      <cat-select tabindex="0" class="hydrated"></cat-select>
    `);
  });

  describe('catChange', () => {
    it('should not emit catChange event on initialization with value', async () => {
      const { root, waitForChanges } = await render(<cat-select label="Label" value="option1" />);

      const select = root as HTMLCatSelectElement;
      const catChangeSpy = vi.fn();

      root.addEventListener('catChange', catChangeSpy);

      await select.componentOnReady();
      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await waitForChanges();

      expect(catChangeSpy).not.toHaveBeenCalled();
    });

    it.skip('should emit catChange event when selection state changes from user interaction', async () => {
      // Cannot test: patchState is a private internal method not exposed on the element proxy.
      // Only @Method()-decorated methods are accessible; internal class methods are not.
    });

    it('should not emit catChange event when value is changed programmatically', async () => {
      const { root, waitForChanges } = await render(<cat-select label="Label" />);

      const select = root as HTMLCatSelectElement;
      const catChangeSpy = vi.fn();

      await select.componentOnReady();
      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await waitForChanges();

      root.addEventListener('catChange', catChangeSpy);

      select.value = 'option2';
      await waitForChanges();

      expect(catChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('autoUpdate lifecycle', () => {
    it('should not set up autoUpdate on component load', async () => {
      const { root, waitForChanges } = await render(<cat-select label="Label" />);

      const select = root as HTMLCatSelectElement;
      await select.componentOnReady();
      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await waitForChanges();

      expect(mockAutoUpdate).not.toHaveBeenCalled();
    });

    it.skip('should set up autoUpdate when dropdown is opened', async () => {
      // Cannot test: @floating-ui/dom is bundled inline in the dist bundle;
      // vi.mock('@floating-ui/dom') does not intercept bundled code.
    });

    it.skip('should call cleanup function when dropdown is closed', async () => {
      // Cannot test: @floating-ui/dom is bundled inline in the dist bundle;
      // vi.mock('@floating-ui/dom') does not intercept bundled code.
    });

    it('should not set up autoUpdate if connector is not connected', async () => {
      const { root, waitForChanges } = await render(<cat-select label="Label" />);

      const trigger = root.shadowRoot?.querySelector('.select-wrapper');
      trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await waitForChanges();

      expect(mockAutoUpdate).not.toHaveBeenCalled();
    });

    it.skip('should close and cleanup autoUpdate on blur', async () => {
      // Cannot test: @floating-ui/dom is bundled inline in the dist bundle;
      // vi.mock('@floating-ui/dom') does not intercept bundled code.
    });
  });

  describe('renderOptions$', () => {
    it.skip('should re-render options when renderOptions$ emits with updated external data', async () => {
      // Cannot test: search() is a private internal method not exposed on the element proxy.
      // Only @Method()-decorated methods are accessible; internal class methods are not.
    });
  });
});
