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

const mockCreateFocusTrap = jest.fn(() => mockTrap);

jest.mock('focus-trap', () => ({
  createFocusTrap: mockCreateFocusTrap
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

  describe('keydownHandler', () => {
    it('should close dropdown when Escape is pressed and dropdown is open', async () => {
      // given
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
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await page.waitForChanges();

      expect(dropdown.isOpen).toBe(true);

      // when
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      page.root?.dispatchEvent(escapeEvent);
      await page.waitForChanges();
      await new Promise(resolve => setTimeout(resolve, 150));

      // then
      expect(dropdown.isOpen).toBe(false);
    });

    it('should not close dropdown when non-Escape key is pressed', async () => {
      // given
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
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await page.waitForChanges();

      expect(dropdown.isOpen).toBe(true);

      // when
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      page.root?.dispatchEvent(enterEvent);
      await page.waitForChanges();

      // then
      expect(dropdown.isOpen).toBe(true);
    });
  });

  describe('globalClickHandler', () => {
    it('should close dropdown when clicking outside and dropdown is open', async () => {
      // given
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
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await page.waitForChanges();

      expect(dropdown.isOpen).toBe(true);

      // when - click outside the content
      page.doc.body.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      await page.waitForChanges();
      await new Promise(resolve => setTimeout(resolve, 150));

      // then
      expect(dropdown.isOpen).toBe(false);
    });

    it('should not close dropdown when clicking inside content', async () => {
      // given
      const page = await newSpecPage({
        components: [CatDropdown],
        html: `<cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>`
      });

      const dropdown = page.rootInstance as CatDropdown;
      const content = page.root?.shadowRoot?.querySelector('.content') as HTMLElement;

      await dropdown.open();
      await page.waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await page.waitForChanges();

      expect(dropdown.isOpen).toBe(true);

      // when - click inside the content
      content.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      content.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      await page.waitForChanges();

      // then
      expect(dropdown.isOpen).toBe(true);
    });

    it('should not close dropdown when noAutoClose is true', async () => {
      // given
      const page = await newSpecPage({
        components: [CatDropdown],
        html: `<cat-dropdown no-auto-close>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>`
      });

      const dropdown = page.rootInstance as CatDropdown;
      await dropdown.open();
      await page.waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await page.waitForChanges();

      expect(dropdown.isOpen).toBe(true);

      // when - click outside
      page.doc.body.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      await page.waitForChanges();

      // then
      expect(dropdown.isOpen).toBe(true);
    });
  });

  describe('open method', () => {
    it('should emit catOpen event when focusTrap is false', async () => {
      // given
      const page = await newSpecPage({
        components: [CatDropdown],
        html: `<cat-dropdown focus-trap="false">
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>`
      });

      const dropdown = page.rootInstance as CatDropdown;
      const catOpenSpy = jest.fn();
      page.root?.addEventListener('catOpen', catOpenSpy);

      // when
      await dropdown.open();
      await page.waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await page.waitForChanges();

      // then
      expect(catOpenSpy).toHaveBeenCalled();
    });

    it('should not create focus trap when focusTrap is false', async () => {
      // given
      const page = await newSpecPage({
        components: [CatDropdown],
        html: `<cat-dropdown focus-trap="false">
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>`
      });

      const dropdown = page.rootInstance as CatDropdown;

      // Clear any previous mock calls
      jest.clearAllMocks();

      // when
      await dropdown.open();
      await page.waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await page.waitForChanges();

      // then
      expect(mockCreateFocusTrap).not.toHaveBeenCalled();
      expect(dropdown.isOpen).toBe(true);
    });

    it('should create focus trap and emit catOpen in onPostActivate when focusTrap is true', async () => {
      // given
      const page = await newSpecPage({
        components: [CatDropdown],
        html: `<cat-dropdown focus-trap="true">
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>`
      });

      const dropdown = page.rootInstance as CatDropdown;
      const catOpenSpy = jest.fn();
      page.root?.addEventListener('catOpen', catOpenSpy);

      jest.clearAllMocks();

      // when
      await dropdown.open();
      await page.waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await page.waitForChanges();

      // then
      expect(mockCreateFocusTrap).toHaveBeenCalled();
      expect(mockTrapActivate).toHaveBeenCalled();
    });
  });

  describe('close method', () => {
    it('should not return focus to trigger when called with false', async () => {
      // given
      const page = await newSpecPage({
        components: [CatDropdown],
        html: `<cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>`
      });

      const dropdown = page.rootInstance as CatDropdown;
      const trigger = page.root?.querySelector('[slot="trigger"]') as HTMLButtonElement;
      const focusSpy = jest.spyOn(trigger, 'focus');

      await dropdown.open();
      await page.waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await page.waitForChanges();

      expect(dropdown.isOpen).toBe(true);

      // when
      await dropdown.close(false);
      await page.waitForChanges();

      // then
      expect(focusSpy).not.toHaveBeenCalled();
    });

    it('should return focus to trigger when called with true', async () => {
      // given
      const page = await newSpecPage({
        components: [CatDropdown],
        html: `<cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>`
      });

      const dropdown = page.rootInstance as CatDropdown;
      const trigger = page.root?.querySelector('[slot="trigger"]') as HTMLButtonElement;
      const focusSpy = jest.spyOn(trigger, 'focus');

      await dropdown.open(true); // Open with isFocusVisible = true
      await page.waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await page.waitForChanges();

      expect(dropdown.isOpen).toBe(true);

      // when - close without argument (should default to isFocusVisible which is true)
      await dropdown.close();
      await page.waitForChanges();

      // then
      expect(focusSpy).toHaveBeenCalled();
    });
  });
});
