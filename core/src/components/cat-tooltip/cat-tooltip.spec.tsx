import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('@floating-ui/dom', () => ({
  autoUpdate: vi.fn(() => vi.fn()),
  computePosition: vi.fn(() => Promise.resolve({ x: 0, y: 0 })),
  flip: vi.fn(() => ({})),
  offset: vi.fn(() => ({})),
  shift: vi.fn(() => ({}))
}));

import './cat-tooltip';

describe('cat-tooltip', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders', async () => {
    const { root } = await render(
      <cat-tooltip content="This is a tooltip">
        <p>Hover me</p>
      </cat-tooltip>
    );
    await expect(root).toEqualLightHtml(`
      <cat-tooltip id="cat-tooltip-0" class="hydrated">
        <p aria-describedby="cat-tooltip-0">
          Hover me
        </p>
      </cat-tooltip>
    `);
  });

  describe('trigger prop', () => {
    const waitForTimer = () => new Promise(resolve => setTimeout(resolve, 10));

    describe('default (hover-focus)', () => {
      it('should show on mouseenter', async () => {
        const { root, waitForChanges, instance } = await render(
          <cat-tooltip content="Tooltip" showDelay={0}>
            <p>Trigger</p>
          </cat-tooltip>
        );
        root.querySelector('p')!.dispatchEvent(new MouseEvent('mouseenter'));
        await waitForTimer();
        await waitForChanges();
        expect(instance.open).toBe(true);
      });

      it('should show on focusin', async () => {
        const { root, waitForChanges, instance } = await render(
          <cat-tooltip content="Tooltip" showDelay={0}>
            <p>Trigger</p>
          </cat-tooltip>
        );
        root.querySelector('p')!.dispatchEvent(new FocusEvent('focusin'));
        await waitForTimer();
        await waitForChanges();
        expect(instance.open).toBe(true);
      });
    });

    describe('trigger="hover"', () => {
      it('should show on mouseenter', async () => {
        const { root, waitForChanges, instance } = await render(
          <cat-tooltip content="Tooltip" showDelay={0} trigger="hover">
            <p>Trigger</p>
          </cat-tooltip>
        );
        root.querySelector('p')!.dispatchEvent(new MouseEvent('mouseenter'));
        await waitForTimer();
        await waitForChanges();
        expect(instance.open).toBe(true);
      });

      it('should not show on focusin', async () => {
        const { root, waitForChanges, instance } = await render(
          <cat-tooltip content="Tooltip" showDelay={0} trigger="hover">
            <p>Trigger</p>
          </cat-tooltip>
        );
        root.querySelector('p')!.dispatchEvent(new FocusEvent('focusin'));
        await waitForTimer();
        await waitForChanges();
        expect(instance.open).toBe(false);
      });
    });

    describe('trigger="focus"', () => {
      it('should show on focusin', async () => {
        const { root, waitForChanges, instance } = await render(
          <cat-tooltip content="Tooltip" showDelay={0} trigger="focus">
            <p>Trigger</p>
          </cat-tooltip>
        );
        root.querySelector('p')!.dispatchEvent(new FocusEvent('focusin'));
        await waitForTimer();
        await waitForChanges();
        expect(instance.open).toBe(true);
      });

      it('should not show on mouseenter', async () => {
        const { root, waitForChanges, instance } = await render(
          <cat-tooltip content="Tooltip" showDelay={0} trigger="focus">
            <p>Trigger</p>
          </cat-tooltip>
        );
        root.querySelector('p')!.dispatchEvent(new MouseEvent('mouseenter'));
        await waitForTimer();
        await waitForChanges();
        expect(instance.open).toBe(false);
      });
    });
  });
});
