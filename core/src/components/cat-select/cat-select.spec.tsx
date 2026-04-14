jest.mock('../cat-i18n/cat-i18n-registry');

jest.mock('autosize-input', () => jest.fn());

const mockAutoUpdateCleanup = jest.fn();
const mockAutoUpdate = jest.fn(() => mockAutoUpdateCleanup);
const mockComputePosition = jest.fn(() =>
  Promise.resolve({
    x: 0,
    y: 0,
    placement: 'bottom-start'
  })
);

jest.mock('@floating-ui/dom', () => ({
  autoUpdate: mockAutoUpdate,
  computePosition: mockComputePosition,
  flip: jest.fn(() => ({})),
  offset: jest.fn(() => ({}))
}));

import { newSpecPage } from '@stencil/core/testing';
import { CatSelect } from './cat-select';
import { stringArrayConnector } from './connectors';
import { Subject, of } from 'rxjs';

describe('cat-select', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatSelect],
      html: `<cat-select label="Label"></cat-select>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-select label="Label" tabindex="0"></cat-select>
    `);
  });

  describe('catChange', () => {
    it('should not emit catChange event on initialization with value', async () => {
      const page = await newSpecPage({
        components: [CatSelect],
        html: `<cat-select label="Label" value="option1"></cat-select>`
      });

      const select = page.rootInstance as CatSelect;
      const catChangeSpy = jest.fn();

      page.root?.addEventListener('catChange', catChangeSpy);

      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await page.waitForChanges();

      expect(catChangeSpy).not.toHaveBeenCalled();
    });

    it('should emit catChange event when selection state changes from user interaction', async () => {
      const page = await newSpecPage({
        components: [CatSelect],
        html: `<cat-select label="Label"></cat-select>`
      });

      const select = page.rootInstance as CatSelect;
      let eventEmitted = false;

      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await page.waitForChanges();

      page.root?.addEventListener('catChange', () => {
        eventEmitted = true;
      });

      // Directly update selection state (simulating what happens after user interaction)
      // This mimics the internal flow when user clicks an option
      select['patchState']({
        selection: [{ item: { id: 'option1' }, render: { label: 'option1' } }],
        tempSelection: []
      });
      await page.waitForChanges();

      expect(eventEmitted).toBe(true);
    });

    it('should not emit catChange event when value is changed programmatically', async () => {
      const page = await newSpecPage({
        components: [CatSelect],
        html: `<cat-select label="Label"></cat-select>`
      });

      const select = page.rootInstance as CatSelect;
      const catChangeSpy = jest.fn();

      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await page.waitForChanges();

      page.root?.addEventListener('catChange', catChangeSpy);

      select.value = 'option2';
      await page.waitForChanges();

      expect(catChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('autoUpdate lifecycle', () => {
    it('should not set up autoUpdate on component load', async () => {
      const page = await newSpecPage({
        components: [CatSelect],
        html: `<cat-select label="Label"></cat-select>`
      });

      const select = page.rootInstance as CatSelect;
      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await page.waitForChanges();

      expect(mockAutoUpdate).not.toHaveBeenCalled();
    });

    it('should set up autoUpdate when dropdown is opened', async () => {
      const page = await newSpecPage({
        components: [CatSelect],
        html: `<cat-select label="Label"></cat-select>`
      });

      const select = page.rootInstance as CatSelect;
      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await page.waitForChanges();

      // Open dropdown by clicking on the trigger element
      const trigger = page.root?.shadowRoot?.querySelector('.select-wrapper');
      const dropdown = page.root?.shadowRoot?.querySelector('.select-dropdown');
      trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(mockAutoUpdate).toHaveBeenCalledTimes(1);
      const callArgs = mockAutoUpdate.mock.calls[0] as unknown[];
      expect(callArgs[0]).toBe(trigger); // First arg should be trigger element
      expect(callArgs[1]).toBe(dropdown); // Second arg should be dropdown element
    });

    it('should call cleanup function when dropdown is closed', async () => {
      const page = await newSpecPage({
        components: [CatSelect],
        html: `<cat-select label="Label"></cat-select>`
      });

      const select = page.rootInstance as CatSelect;
      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await page.waitForChanges();

      // Open dropdown by clicking
      const trigger = page.root?.shadowRoot?.querySelector('.select-wrapper');
      trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(mockAutoUpdate).toHaveBeenCalledTimes(1);

      // Close dropdown by clicking again
      trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      // Verify cleanup function was called
      expect(mockAutoUpdateCleanup).toHaveBeenCalledTimes(1);
    });

    it('should not set up autoUpdate if connector is not connected', async () => {
      const page = await newSpecPage({
        components: [CatSelect],
        html: `<cat-select label="Label"></cat-select>`
      });

      // Don't connect a connector

      // Try to open dropdown without a connector by clicking
      const trigger = page.root?.shadowRoot?.querySelector('.select-wrapper');
      trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(mockAutoUpdate).not.toHaveBeenCalled();
    });

    it('should close and cleanup autoUpdate on blur', async () => {
      const page = await newSpecPage({
        components: [CatSelect],
        html: `<cat-select label="Label"></cat-select>`
      });

      const select = page.rootInstance as CatSelect;
      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await page.waitForChanges();

      // Open dropdown by clicking
      const trigger = page.root?.shadowRoot?.querySelector('.select-wrapper');
      trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();
      expect(mockAutoUpdate).toHaveBeenCalledTimes(1);

      // Simulate blur event to close dropdown
      const blurEvent = new FocusEvent('blur');
      page.root?.dispatchEvent(blurEvent);
      await page.waitForChanges();

      // Should clean up autoUpdate
      expect(mockAutoUpdateCleanup).toHaveBeenCalledTimes(1);
    });
  });

  describe('renderOptions$', () => {
    it('should re-render options when renderOptions$ emits with updated external data', async () => {
      const page = await newSpecPage({
        components: [CatSelect],
        html: `<cat-select label="Label"></cat-select>`
      });

      const select = page.rootInstance as CatSelect;
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

      await select.connect(connector);

      // Trigger input event to populate options
      const input = page.root?.shadowRoot?.querySelector('input');
      input?.dispatchEvent(new Event('input', { bubbles: true }));
      await page.waitForChanges();

      const initialOptions = select['state'].options;
      expect(initialOptions[0].render.description).toBe('Original description');

      const initialRenderCount = renderCallCount;

      useUpdatedDescription = true;

      renderSubject.next();
      await page.waitForChanges();

      expect(renderCallCount).toBeGreaterThan(initialRenderCount);
      const updatedOptions = select['state'].options;
      expect(updatedOptions[0].render.description).toBe('Updated description');
    });
  });
});
