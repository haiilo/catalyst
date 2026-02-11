jest.mock('../../utils/first-tabbable', () => (element: HTMLSlotElement) => element);

const mockAutoUpdateCleanup = jest.fn();
const mockAutoUpdate = jest.fn((_reference, _floating, update) => {
  update();
  return mockAutoUpdateCleanup;
});
const mockFlip = jest.fn(() => ({}));
const mockOffset = jest.fn(() => ({}));
const mockShift = jest.fn(() => ({}));
const mockSize = jest.fn(() => ({}));

jest.mock('@floating-ui/dom', () => ({
  autoUpdate: mockAutoUpdate,
  computePosition: jest.fn(() => Promise.resolve({ x: 0, y: 0, placement: 'bottom-start' })),
  flip: mockFlip,
  offset: mockOffset,
  shift: mockShift,
  size: mockSize
}));

const mockTrapDeactivate = jest.fn();
const mockTrapActivate = jest.fn();
const mockTrap = {
  activate: mockTrapActivate,
  deactivate: mockTrapDeactivate,
  updateContainerElements: jest.fn(function () {
    return this;
  })
};

jest.mock('focus-trap', () => ({
  createFocusTrap: jest.fn(() => mockTrap)
}));

import { newSpecPage } from '@stencil/core/testing';
import { CatDropdown } from './cat-dropdown';

describe('cat-dropdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatDropdown],
      html: `<cat-dropdown>
        <button slot="trigger"></button>
        <nav slot="content"></nav>
      </cat-dropdown>`
    });
    expect(page.root).toEqualLightHtml(`
     <cat-dropdown>
       <button slot="trigger"></button>
       <nav slot="content"></nav>
     </cat-dropdown>
    `);
  });

  describe('autoUpdate ', () => {
    it('should not set up autoUpdate on component load', async () => {
      await newSpecPage({
        components: [CatDropdown],
        html: `<cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>`
      });

      expect(mockAutoUpdate).not.toHaveBeenCalled();
    });

    it('should set up autoUpdate when dropdown is opened', async () => {
      const page = await newSpecPage({
        components: [CatDropdown],
        html: `<cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>`
      });

      const dropdown = page.rootInstance as CatDropdown;
      const triggerElement = page.root?.querySelector('[slot="trigger"]');
      const contentElement = page.root?.shadowRoot?.querySelector('.content');

      await dropdown.open();

      // autoUpdate is called immediately when dropdown opens
      expect(mockAutoUpdate).toHaveBeenCalledTimes(1);

      // Verify the correct elements are passed to autoUpdate
      const callArgs = mockAutoUpdate.mock.calls[0] as unknown[];
      expect(callArgs[0]).toBe(triggerElement); // First arg should be trigger element
      expect(callArgs[1]).toBe(contentElement); // Second arg should be content element
    });

    it('should set up autoUpdate with anchor element when anchor is provided', async () => {
      const page = await newSpecPage({
        components: [CatDropdown],
        html: `<cat-dropdown>
          <div slot="anchor" id="test-anchor"></div>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>`
      });

      const dropdown = page.rootInstance as CatDropdown;
      const anchorElement = page.root?.querySelector('[slot="anchor"]');
      const contentElement = page.root?.shadowRoot?.querySelector('.content');

      await dropdown.open();

      expect(mockAutoUpdate).toHaveBeenCalledTimes(1);

      // When anchor is present, autoUpdate should use anchor instead of trigger
      const callArgs = mockAutoUpdate.mock.calls[0] as unknown[];
      expect(callArgs[0]).toBe(anchorElement); // First arg should be anchor element, not trigger
      expect(callArgs[1]).toBe(contentElement); // Second arg should be content element
    });

    it('should clean up on component disconnect', async () => {
      const page = await newSpecPage({
        components: [CatDropdown],
        html: `<cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>`
      });

      const dropdown = page.rootInstance as CatDropdown;
      await dropdown.open();
      await page.waitForChanges();
      // Wait for focus trap setup in setTimeout
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(mockAutoUpdate).toHaveBeenCalledTimes(1);

      // Trigger disconnectedCallback manually
      dropdown.disconnectedCallback();
      await page.waitForChanges();

      // The focus trap should be deactivated
      expect(mockTrapDeactivate).toHaveBeenCalled();
      expect(mockAutoUpdateCleanup).toHaveBeenCalledTimes(1);
    });

    it('should call cleanupFloatingUi when dropdown is closed', async () => {
      const page = await newSpecPage({
        components: [CatDropdown],
        html: `<cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>`
      });

      const dropdown = page.rootInstance as CatDropdown;
      await dropdown.open();
      await page.waitForChanges();
      // Wait for open() setTimeout to complete (timeTransitionS = 125ms)
      await new Promise(resolve => setTimeout(resolve, 150));

      expect(mockAutoUpdate).toHaveBeenCalledTimes(1);
      expect(dropdown.isOpen).toBe(true);

      // Close the dropdown
      await dropdown.close();
      // Wait for the setTimeout in close() to execute (timeTransitionS = 125ms)
      await new Promise(resolve => setTimeout(resolve, 150));

      // Verify cleanup function was called
      expect(mockAutoUpdateCleanup).toHaveBeenCalledTimes(1);
      expect(dropdown.isOpen).toBe(false);
    });
  });

  describe('flip middleware', () => {
    it('should call flip middleware with correct arguments', async () => {
      const page = await newSpecPage({
        components: [CatDropdown],
        html: `<cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>`
      });

      const dropdown = page.rootInstance as CatDropdown;
      await dropdown.open();
      await page.waitForChanges();

      // The flip middleware should be called with specific configuration
      expect(mockFlip).toHaveBeenCalledWith({
        crossAxis: 'alignment',
        fallbackAxisSideDirection: 'end'
      });
    });
  });
});
