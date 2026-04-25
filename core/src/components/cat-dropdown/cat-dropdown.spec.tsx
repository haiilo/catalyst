import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('../../utils/first-tabbable', () => ({
  default: (element: HTMLSlotElement) => element
}));

const mockAutoUpdateCleanup = vi.fn();
const mockAutoUpdate = vi.hoisted(() => vi.fn((_reference, _floating, update) => {
  update();
  return mockAutoUpdateCleanup;
}));
const mockFlip = vi.hoisted(() => vi.fn(() => ({})));
const mockOffset = vi.hoisted(() => vi.fn(() => ({})));
const mockShift = vi.hoisted(() => vi.fn(() => ({})));
const mockSize = vi.hoisted(() => vi.fn(() => ({})));

vi.mock('@floating-ui/dom', () => ({
  autoUpdate: mockAutoUpdate,
  computePosition: vi.fn(() => Promise.resolve({ x: 0, y: 0, placement: 'bottom-start' })),
  flip: mockFlip,
  offset: mockOffset,
  shift: mockShift,
  size: mockSize
}));

const mockTrapDeactivate = vi.fn();
const mockTrapActivate = vi.fn();
const mockTrap = {
  activate: mockTrapActivate,
  deactivate: mockTrapDeactivate,
  updateContainerElements: vi.fn(() =>  {
    return this;
  })
};

const mockCreateFocusTrap = vi.hoisted(() => vi.fn(() => mockTrap));

vi.mock('focus-trap', () => ({
  createFocusTrap: mockCreateFocusTrap
}));

import './cat-dropdown';

describe('cat-dropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders', async () => {
    const { root } = await render(
      <cat-dropdown>
        <button slot="trigger"></button>
        <nav slot="content"></nav>
      </cat-dropdown>
    );
    await expect(root).toEqualLightHtml(`
     <cat-dropdown id="0" class="hydrated">
       <button slot="trigger"></button>
       <nav slot="content"></nav>
     </cat-dropdown>
    `);
  });

  describe('autoUpdate ', () => {
    it('should not set up autoUpdate on component load', async () => {
      await render(
        <cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>
      );
      expect(mockAutoUpdate).not.toHaveBeenCalled();
    });

    it('should set up autoUpdate when dropdown is opened', async () => {
      const { root, instance } = await render(
          <cat-dropdown>
            <button slot="trigger" data-trigger></button>
            <nav slot="content"></nav>
          </cat-dropdown>
      );

      const triggerElement = root?.querySelector('[slot="trigger"]');
      const contentElement = root?.shadowRoot?.querySelector('.content');

      await instance.open();

      // autoUpdate is called immediately when dropdown opens
      expect(mockAutoUpdate).toHaveBeenCalledTimes(1);

      // Verify the correct elements are passed to autoUpdate
      const callArgs = mockAutoUpdate.mock.calls[0] as unknown[];
      expect(callArgs[0]).toBe(triggerElement); // First arg should be trigger element
      expect(callArgs[1]).toBe(contentElement); // Second arg should be content element
    });

    it('should set up autoUpdate with anchor element when anchor is provided', async () => {
      const { root, instance } = await render(
          <cat-dropdown>
            <div slot="anchor" id="test-anchor"></div>
            <button slot="trigger" data-trigger></button>
            <nav slot="content"></nav>
          </cat-dropdown>
      );

      const anchorElement = root?.querySelector('[slot="anchor"]');
      const contentElement = root?.shadowRoot?.querySelector('.content');

      await instance.open();

      expect(mockAutoUpdate).toHaveBeenCalledTimes(1);

      // When anchor is present, autoUpdate should use anchor instead of trigger
      const callArgs = mockAutoUpdate.mock.calls[0] as unknown[];
      expect(callArgs[0]).toBe(anchorElement); // First arg should be anchor element, not trigger
      expect(callArgs[1]).toBe(contentElement); // Second arg should be content element
    });

    it('should clean up on component disconnect', async () => {
      const { instance, waitForChanges } = await render(
          <cat-dropdown>
            <button slot="trigger" data-trigger></button>
            <nav slot="content"></nav>
          </cat-dropdown>
      );

      await instance.open();
      await waitForChanges();
      // Wait for focus trap setup in setTimeout
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(mockAutoUpdate).toHaveBeenCalledTimes(1);

      // Trigger disconnectedCallback manually
      instance.disconnectedCallback();
      await waitForChanges();

      // The focus trap should be deactivated
      expect(mockTrapDeactivate).toHaveBeenCalled();
      expect(mockAutoUpdateCleanup).toHaveBeenCalled();
    });

    it('should call cleanupFloatingUi when dropdown is closed', async () => {
      const { root, waitForChanges } = await render(
        <cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>
      );

      const dropdown = root as HTMLCatDropdownElement;
      await dropdown.open();
      await waitForChanges();
      // Wait for open() setTimeout to complete (timeTransitionS = 125ms)
      await new Promise(resolve => setTimeout(resolve, 150));

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
      const { waitForChanges, instance } = await render(
          <cat-dropdown>
            <button slot="trigger" data-trigger></button>
            <nav slot="content"></nav>
          </cat-dropdown>
      );

      await instance.open();
      await waitForChanges();

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
      const { root, waitForChanges } = await render(
        <cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>
      );

      const dropdown = root as HTMLCatDropdownElement;
      await dropdown.open();
      await waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await waitForChanges();

      expect(dropdown.isOpen).toBe(true);

      // when
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      root.dispatchEvent(escapeEvent);
      await waitForChanges();
      await new Promise(resolve => setTimeout(resolve, 150));

      // then
      expect(dropdown.isOpen).toBe(false);
    });

    it('should not close dropdown when non-Escape key is pressed', async () => {
      // given
      const { root, waitForChanges } = await render(
        <cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>
      );

      const dropdown = root as HTMLCatDropdownElement;
      await dropdown.open();
      await waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await waitForChanges();

      expect(dropdown.isOpen).toBe(true);

      // when
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      root.dispatchEvent(enterEvent);
      await waitForChanges();

      // then
      expect(dropdown.isOpen).toBe(true);
    });
  });

  describe('globalClickHandler', () => {
    it('should close dropdown when clicking outside and dropdown is open', async () => {
      // given
      const { root, waitForChanges } = await render(
        <cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>
      );

      const dropdown = root as HTMLCatDropdownElement;
      dropdown.focusTrap = false;
      await dropdown.open();
      await waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await waitForChanges();

      expect(dropdown.isOpen).toBe(true);

      // when - click outside the content
      window.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      await waitForChanges();
      await new Promise(resolve => setTimeout(resolve, 150));

      // then
      expect(dropdown.isOpen).toBe(false);
    });

    it('should not close dropdown when clicking inside content', async () => {
      // given
      const { root, waitForChanges } = await render(
        <cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>
      );

      const dropdown = root as HTMLCatDropdownElement;
      const content = root.shadowRoot?.querySelector('.content') as HTMLElement;

      await dropdown.open();
      await waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await waitForChanges();

      expect(dropdown.isOpen).toBe(true);

      // when - click inside the content
      content.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      content.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      await waitForChanges();

      // then
      expect(dropdown.isOpen).toBe(true);
    });

    it('should not close dropdown when noAutoClose is true', async () => {
      // given
      const { root, waitForChanges } = await render(
        <cat-dropdown no-auto-close>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>
      );

      const dropdown = root as HTMLCatDropdownElement;
      await dropdown.open();
      await waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await waitForChanges();

      expect(dropdown.isOpen).toBe(true);

      // when - click outside
      window.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      await waitForChanges();

      // then
      expect(dropdown.isOpen).toBe(true);
    });
  });

  describe('open method', () => {
    it('should emit catOpen event when focusTrap is false', async () => {
      // given
      const { root, waitForChanges } = await render(
        <cat-dropdown focus-trap="false">
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>
      );

      const dropdown = root as HTMLCatDropdownElement;
      const catOpenSpy = vi.fn();
      root.addEventListener('catOpen', catOpenSpy);

      // when
      await dropdown.open();
      await waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await waitForChanges();

      // then
      expect(catOpenSpy).toHaveBeenCalled();
    });

    it('should not create focus trap when focusTrap is false', async () => {
      // given
      const { root, waitForChanges } = await render(
        <cat-dropdown focus-trap="false">
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>
      );

      const dropdown = root as HTMLCatDropdownElement;

      // Clear any previous mock calls
      vi.clearAllMocks();

      // when
      await dropdown.open();
      await waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await waitForChanges();

      // then
      expect(mockCreateFocusTrap).not.toHaveBeenCalled();
      expect(dropdown.isOpen).toBe(true);
    });

    it('should create focus trap and emit catOpen in onPostActivate when focusTrap is true', async () => {
      // given
      const { root, instance, waitForChanges } = await render(
          <cat-dropdown focus-trap="true">
            <button slot="trigger" data-trigger></button>
            <nav slot="content"></nav>
          </cat-dropdown>
      );

      const catOpenSpy = vi.fn();
      root?.addEventListener('catOpen', catOpenSpy);

      vi.clearAllMocks();

      // when
      await instance.open();
      await waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await waitForChanges();

      // then
      expect(mockCreateFocusTrap).toHaveBeenCalled();
      expect(mockTrapActivate).toHaveBeenCalled();
    });
  });

  describe('close method', () => {
    it('should not return focus to trigger when called with false', async () => {
      // given
      const { root, waitForChanges } = await render(
        <cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>
      );

      const dropdown = root as HTMLCatDropdownElement;
      const trigger = root.querySelector('[slot="trigger"]') as HTMLButtonElement;
      const focusSpy = vi.spyOn(trigger, 'focus');

      await dropdown.open();
      await waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await waitForChanges();

      expect(dropdown.isOpen).toBe(true);

      // when
      await dropdown.close(false);
      await waitForChanges();

      // then
      expect(focusSpy).not.toHaveBeenCalled();
    });

    it('should return focus to trigger when called with true', async () => {
      // given
      const { root, waitForChanges } = await render(
        <cat-dropdown>
          <button slot="trigger" data-trigger></button>
          <nav slot="content"></nav>
        </cat-dropdown>
      );

      const dropdown = root as HTMLCatDropdownElement;
      const trigger = root.querySelector('[slot="trigger"]') as HTMLButtonElement;
      const focusSpy = vi.spyOn(trigger, 'focus');

      await dropdown.open(true); // Open with isFocusVisible = true
      await waitForChanges();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await waitForChanges();

      expect(dropdown.isOpen).toBe(true);

      // when - close without argument (should default to isFocusVisible which is true)
      await dropdown.close();
      await waitForChanges();

      // then
      expect(focusSpy).toHaveBeenCalled();
    });
  });
});
