import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('../cat-i18n/cat-i18n-registry', () => ({
  catI18nRegistry: {
    t: vi.fn(() => {})
  }
}));
vi.mock('autosize-input', () => ({
  default: vi.fn()
}));

const mockAutoUpdateCleanup = vi.fn();
const mockAutoUpdate = vi.hoisted(() => vi.fn(() => mockAutoUpdateCleanup));
const mockComputePosition = vi.hoisted(() =>
  vi.fn(() =>
    Promise.resolve({
      x: 0,
      y: 0,
      placement: 'bottom-start'
    })
  )
);

vi.mock('@floating-ui/dom', () => ({
  autoUpdate: mockAutoUpdate,
  computePosition: mockComputePosition,
  flip: vi.fn(() => ({})),
  offset: vi.fn(() => ({}))
}));

import './cat-select';
import { stringArrayConnector } from './connectors';
import {of, Subject} from "rxjs";

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

      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await waitForChanges();

      expect(catChangeSpy).not.toHaveBeenCalled();
    });

    it('should emit catChange event when selection state changes from user interaction', async () => {
      const { root, waitForChanges, instance } = await render(<cat-select label="Label" />);

      let eventEmitted = false;

      await instance.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await waitForChanges();

      root?.addEventListener('catChange', () => {
        eventEmitted = true;
      });

      // Directly update selection state (simulating what happens after user interaction)
      // This mimics the internal flow when user clicks an option
      instance['patchState']({
        selection: [{ item: { id: 'option1' }, render: { label: 'option1' } }],
        tempSelection: []
      });
      await waitForChanges();

      expect(eventEmitted).toBe(true);
    });

    it('should not emit catChange event when value is changed programmatically', async () => {
      const { root, waitForChanges } = await render(<cat-select label="Label" />);

      const select = root as HTMLCatSelectElement;
      const catChangeSpy = vi.fn();

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
      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await waitForChanges();

      expect(mockAutoUpdate).not.toHaveBeenCalled();
    });

    it('should set up autoUpdate when dropdown is opened', async () => {
      const { root, waitForChanges, instance } = await render(<cat-select label="Label" />);

      await instance.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await waitForChanges();

      // Open dropdown by clicking on the trigger element
      const trigger = root?.shadowRoot?.querySelector('.select-wrapper');
      const dropdown = root?.shadowRoot?.querySelector('.select-dropdown');
      trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await waitForChanges();

      expect(mockAutoUpdate).toHaveBeenCalledTimes(1);
      const callArgs = mockAutoUpdate.mock.calls[0] as unknown[];
      expect(callArgs[0]).toBe(trigger); // First arg should be trigger element
      expect(callArgs[1]).toBe(dropdown); // Second arg should be dropdown element
    });

    it('should call cleanup function when dropdown is closed', async () => {
      const { root, waitForChanges, instance } = await render(<cat-select label="Label" />);

      await instance.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await waitForChanges();

      // Open dropdown by clicking
      const trigger = root?.shadowRoot?.querySelector('.select-wrapper');
      trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await waitForChanges();

      expect(mockAutoUpdate).toHaveBeenCalledTimes(1);

      // Close dropdown by clicking again
      trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await waitForChanges();

      // Verify cleanup function was called
      expect(mockAutoUpdateCleanup).toHaveBeenCalledTimes(1);
    });

    it('should not set up autoUpdate if connector is not connected', async () => {
      const { root, waitForChanges } = await render(<cat-select label="Label" />);

      // Don't connect a connector

      // Try to open dropdown without a connector by clicking
      const trigger = root.shadowRoot?.querySelector('.select-wrapper');
      trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await waitForChanges();

      expect(mockAutoUpdate).not.toHaveBeenCalled();
    });

    it('should close and cleanup autoUpdate on blur', async () => {
      const { root, waitForChanges, instance } = await render(<cat-select label="Label" />);

      await instance.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await waitForChanges();

      // Open dropdown by clicking
      const trigger = root?.shadowRoot?.querySelector('.select-wrapper');
      trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await waitForChanges();
      expect(mockAutoUpdate).toHaveBeenCalledTimes(1);

      // Simulate blur event to close dropdown
      const blurEvent = new FocusEvent('blur');
      root?.dispatchEvent(blurEvent);
      await waitForChanges();

      // Should clean up autoUpdate
      expect(mockAutoUpdateCleanup).toHaveBeenCalledTimes(1);
    });
  });

  describe('renderOptions$', () => {
    it('should re-render options when renderOptions$ emits with updated external data', async () => {
      const { root, waitForChanges, instance } = await render(<cat-select label="Label" />);

      const renderSubject = new Subject<void>();

      let renderCallCount = 0;
      let useUpdatedDescription = false;
      const items = [
        { id: '1', label: 'Option 1', description: 'Description 1' },
        { id: '2', label: 'Option 2', description: 'Description 2' }
      ];

      const connector = {
        resolve: (ids: string[]) => of(items.filter(item => ids.includes(item.id))),
        retrieve: (term: string) =>
            of({
              content: items.filter(item => item.label.toLowerCase().includes(term.toLowerCase())),
              last: true,
              totalElements: items.length
            }),
        render: (item: { label: string }) => {
          renderCallCount++;
          return {
            label: item.label,
            description: useUpdatedDescription ? 'Updated description' : 'Original description'
          };
        },
        renderOptions$: renderSubject.asObservable()
      };

      await instance.connect(connector);

      // Trigger input event to populate options
      const input = root?.shadowRoot?.querySelector('input');
      input?.dispatchEvent(new Event('input', { bubbles: true }));
      await waitForChanges();

      const initialOptions = instance['state'].options;
      expect(initialOptions[0].render.description).toBe('Original description');

      const initialRenderCount = renderCallCount;

      useUpdatedDescription = true;

      renderSubject.next();
      await waitForChanges();

      expect(renderCallCount).toBeGreaterThan(initialRenderCount);
      const updatedOptions = instance['state'].options;
      expect(updatedOptions[0].render.description).toBe('Updated description');
    });
  });
});
