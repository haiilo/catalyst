import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { CatMenu } from './cat-menu';
import { CatDropdown } from '../cat-dropdown/cat-dropdown';
import { CatButton } from '../cat-button/cat-button';

// Mock the floating-ui dependencies used by cat-dropdown
jest.mock('@floating-ui/dom', () => ({
  autoUpdate: jest.fn(() => jest.fn()),
  computePosition: jest.fn(() => ({})),
  flip: jest.fn(() => ({})),
  offset: jest.fn(() => ({})),
  shift: jest.fn(() => ({})),
  size: jest.fn(() => ({}))
}));

jest.mock('focus-trap', () => ({
  createFocusTrap: jest.fn(() => ({
    activate: jest.fn(),
    deactivate: jest.fn(),
    updateContainerElements: jest.fn(function () {
      return this;
    })
  }))
}));

jest.mock('../../utils/first-tabbable', () => (element: HTMLSlotElement) => element);

describe('cat-menu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatMenu, CatDropdown, CatButton],
      html: `<cat-menu></cat-menu>`
    });
    expect(page.root).toBeTruthy();
    expect(page.root?.shadowRoot?.querySelector('cat-dropdown')).toBeTruthy();
    expect(page.root?.shadowRoot?.querySelector('cat-button[slot="trigger"]')).toBeTruthy();
  });

  describe('trigger button', () => {
    it('should render trigger button with correct default attributes', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const trigger = page.root?.shadowRoot?.querySelector('cat-button[slot="trigger"]') as HTMLCatButtonElement;
      expect(trigger).toBeTruthy();
      expect(trigger.variant).toBe('text');
      expect(trigger.size).toBe('m');
      expect(trigger.icon).toBe('more-horizontal-filled');
      expect(trigger.iconOnly).toBe(true);
      expect(trigger.a11yLabel).toBe('Show menu');
      expect(trigger.disabled).toBe(false);
      expect(trigger.nativeAttributes?.['aria-haspopup']).toBe('menu');
    });

    it('should apply custom trigger props', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `
          <cat-menu
            disabled
            trigger-variant="filled"
            trigger-size="l"
            trigger-icon="gear"
            trigger-label="Options"
            trigger-class="custom-class"
            trigger-test-id="menu-trigger"
          ></cat-menu>
        `
      });

      const trigger = page.root?.shadowRoot?.querySelector('cat-button[slot="trigger"]') as HTMLCatButtonElement;
      expect(trigger.variant).toBe('filled');
      expect(trigger.size).toBe('l');
      expect(trigger.icon).toBe('gear');
      expect(trigger.a11yLabel).toBe('Options');
      expect(trigger.classList.contains('custom-class')).toBe(true);
      expect(trigger.testId).toBe('menu-trigger');
      expect(trigger.disabled).toBe(true);
    });

    it('should use triggerA11yLabel when provided', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        template: () => (
          <cat-menu triggerLabel="Options" triggerA11yLabel="Open options menu"></cat-menu>
        )
      });

      const trigger = page.root?.shadowRoot?.querySelector('cat-button[slot="trigger"]') as HTMLCatButtonElement;
      expect(trigger.a11yLabel).toBe('Open options menu');
    });

    it('should emit catTriggerClick when trigger is clicked', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const catTriggerClickSpy = jest.fn();
      page.root?.addEventListener('catTriggerClick', catTriggerClickSpy);

      const trigger = page.root?.shadowRoot?.querySelector('cat-button[slot="trigger"]') as HTMLCatButtonElement;
      const mouseEvent = new MouseEvent('click');
      trigger.dispatchEvent(new CustomEvent('catClick', { detail: mouseEvent }));
      await page.waitForChanges();

      expect(catTriggerClickSpy).toHaveBeenCalled();
    });
  });

  describe('dropdown integration', () => {
    it('should render dropdown with correct props', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `
          <cat-menu
            placement="top-end"
            justify
            no-auto-close
            no-resize
            overflow
            delayed-trigger-init
          ></cat-menu>
        `
      });

      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      expect(dropdown.placement).toBe('top-end');
      expect(dropdown.justify).toBe(true);
      expect(dropdown.noAutoClose).toBe(true);
      expect(dropdown.noResize).toBe(true);
      expect(dropdown.overflow).toBe(true);
      expect(dropdown.delayedTriggerInit).toBe(true);
      expect(dropdown.focusTrap).toBe(false);
    });

    it('should emit catOpen when dropdown opens', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const catOpenSpy = jest.fn();
      page.root?.addEventListener('catOpen', catOpenSpy);

      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('focus');
      dropdown.dispatchEvent(new CustomEvent('catOpen', { detail: focusEvent }));
      await page.waitForChanges();

      expect(catOpenSpy).toHaveBeenCalled();
    });

    it('should emit catClose when dropdown closes', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const catCloseSpy = jest.fn();
      page.root?.addEventListener('catClose', catCloseSpy);

      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('blur');
      dropdown.dispatchEvent(new CustomEvent('catClose', { detail: focusEvent }));
      await page.waitForChanges();

      expect(catCloseSpy).toHaveBeenCalled();
    });
  });

  describe('focus management', () => {
    it('should focus first enabled menu item when menu opens', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      const mockDoFocus = jest.fn();
      
      // Mock menu items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (menu as any).catMenuItems = [
        { disabled: false, doFocus: mockDoFocus },
        { disabled: false, doFocus: jest.fn() },
        { disabled: false, doFocus: jest.fn() }
      ];

      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('focus');
      
      // Trigger menu open
      dropdown.dispatchEvent(new CustomEvent('catOpen', { detail: focusEvent }));
      
      // Wait for requestAnimationFrame
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      expect(mockDoFocus).toHaveBeenCalled();
    });

    it('should skip disabled items and focus first enabled item', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      const mockDoFocusFirst = jest.fn();
      const mockDoFocusSecond = jest.fn();
      
      // Mock menu items with first one disabled
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (menu as any).catMenuItems = [
        { disabled: true, doFocus: jest.fn() },
        { disabled: false, doFocus: mockDoFocusFirst },
        { disabled: false, doFocus: mockDoFocusSecond }
      ];

      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('focus');
      
      dropdown.dispatchEvent(new CustomEvent('catOpen', { detail: focusEvent }));
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      // Should focus the second item (first enabled)
      expect(mockDoFocusFirst).toHaveBeenCalled();
      expect(mockDoFocusSecond).not.toHaveBeenCalled();
    });

    it('should not focus any item if a menu item is already focused', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      const mockMenuItem = { disabled: false, doFocus: jest.fn() };
      
      // Mock menu items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (menu as any).catMenuItems = [
        mockMenuItem,
        { disabled: false, doFocus: jest.fn() }
      ];

      // Mock that a menu item is already focused
      jest.spyOn(menu as any, 'isMenuItemInFocus').mockReturnValue(true);

      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('focus');
      
      dropdown.dispatchEvent(new CustomEvent('catOpen', { detail: focusEvent }));
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      // Should not call doFocus if an item is already focused
      expect(mockMenuItem.doFocus).not.toHaveBeenCalled();
    });

    it('should handle case when all menu items are disabled', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      
      // Mock menu items - all disabled
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (menu as any).catMenuItems = [
        { disabled: true, doFocus: jest.fn() },
        { disabled: true, doFocus: jest.fn() }
      ];

      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('focus');
      
      // Should not throw when no enabled items exist
      expect(() => {
        dropdown.dispatchEvent(new CustomEvent('catOpen', { detail: focusEvent }));
      }).not.toThrow();
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();
    });

    it('should handle empty menu items array', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      
      // Mock empty menu items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (menu as any).catMenuItems = [];

      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('focus');
      
      // Should not throw with empty items
      expect(() => {
        dropdown.dispatchEvent(new CustomEvent('catOpen', { detail: focusEvent }));
      }).not.toThrow();
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();
    });
  });

  describe('menu content', () => {
    it('should render nav with role="menu" and default vertical orientation', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const nav = page.root?.shadowRoot?.querySelector('nav[role="menu"]');
      expect(nav).toBeTruthy();
      expect(nav?.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('should render nav with horizontal orientation when arrowNavigation is horizontal', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu arrow-navigation="horizontal"></cat-menu>`
      });

      const nav = page.root?.shadowRoot?.querySelector('nav[role="menu"]');
      expect(nav).toBeTruthy();
      expect(nav?.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('should have correct slot for content', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const nav = page.root?.shadowRoot?.querySelector('nav[slot="content"]');
      expect(nav).toBeTruthy();
    });
  });

  describe('public methods', () => {
    it('should have open() method that delegates to dropdown', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;

      // Verify the method exists and doesn't throw
      await expect(menu.open()).resolves.toBeUndefined();
    });

    it('should have close() method that delegates to dropdown', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;

      // Verify the method exists and doesn't throw
      await expect(menu.close()).resolves.toBeUndefined();
    });

    it('should have toggle() method that delegates to dropdown', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;

      // Verify the method exists and doesn't throw
      await expect(menu.toggle()).resolves.toBeUndefined();
    });
  });

  describe('keyboard navigation', () => {
    it('should not handle keyboard events when dropdown is closed', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

      menu.onDocumentKeydown(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should handle ArrowDown and ArrowUp for vertical navigation', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu arrow-navigation="vertical"></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      
      // Mock dropdown as open and add mock menu items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (menu as any).dropdown = { isOpen: true };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (menu as any).catMenuItems = [
        { disabled: false, doFocus: jest.fn() },
        { disabled: false, doFocus: jest.fn() }
      ];

      const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const arrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      
      const preventDefaultSpyDown = jest.spyOn(arrowDownEvent, 'preventDefault');
      const preventDefaultSpyUp = jest.spyOn(arrowUpEvent, 'preventDefault');
      const preventDefaultSpyRight = jest.spyOn(arrowRightEvent, 'preventDefault');

      menu.onDocumentKeydown(arrowDownEvent);
      menu.onDocumentKeydown(arrowUpEvent);
      menu.onDocumentKeydown(arrowRightEvent);

      // ArrowDown and ArrowUp should be handled for vertical navigation
      expect(preventDefaultSpyDown).toHaveBeenCalled();
      expect(preventDefaultSpyUp).toHaveBeenCalled();
      // ArrowRight should not be handled for vertical navigation
      expect(preventDefaultSpyRight).not.toHaveBeenCalled();
    });

    it('should handle ArrowRight and ArrowLeft for horizontal navigation', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu arrow-navigation="horizontal"></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      
      // Mock dropdown as open and add mock menu items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (menu as any).dropdown = { isOpen: true };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (menu as any).catMenuItems = [
        { disabled: false, doFocus: jest.fn() },
        { disabled: false, doFocus: jest.fn() }
      ];

      const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      const arrowLeftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      
      const preventDefaultSpyRight = jest.spyOn(arrowRightEvent, 'preventDefault');
      const preventDefaultSpyLeft = jest.spyOn(arrowLeftEvent, 'preventDefault');
      const preventDefaultSpyDown = jest.spyOn(arrowDownEvent, 'preventDefault');

      menu.onDocumentKeydown(arrowRightEvent);
      menu.onDocumentKeydown(arrowLeftEvent);
      menu.onDocumentKeydown(arrowDownEvent);

      // ArrowRight and ArrowLeft should be handled for horizontal navigation
      expect(preventDefaultSpyRight).toHaveBeenCalled();
      expect(preventDefaultSpyLeft).toHaveBeenCalled();
      // ArrowDown should not be handled for horizontal navigation
      expect(preventDefaultSpyDown).not.toHaveBeenCalled();
    });

    it('should handle Home and End keys for both navigation modes', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      
      // Mock dropdown as open and add mock menu items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (menu as any).dropdown = { isOpen: true };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (menu as any).catMenuItems = [
        { disabled: false, doFocus: jest.fn() },
        { disabled: false, doFocus: jest.fn() },
        { disabled: false, doFocus: jest.fn() }
      ];

      const homeEvent = new KeyboardEvent('keydown', { key: 'Home' });
      const endEvent = new KeyboardEvent('keydown', { key: 'End' });
      
      const preventDefaultSpyHome = jest.spyOn(homeEvent, 'preventDefault');
      const preventDefaultSpyEnd = jest.spyOn(endEvent, 'preventDefault');

      menu.onDocumentKeydown(homeEvent);
      menu.onDocumentKeydown(endEvent);

      expect(preventDefaultSpyHome).toHaveBeenCalled();
      expect(preventDefaultSpyEnd).toHaveBeenCalled();
    });
  });

  describe('lifecycle', () => {
    it('should set up MutationObserver on componentDidLoad', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;

      // Access private property for testing purposes
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((menu as any).mutationObserver).toBeTruthy();
    });

    it('should disconnect MutationObserver on disconnectedCallback', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const observer = (menu as any).mutationObserver as MutationObserver;
      const disconnectSpy = jest.spyOn(observer, 'disconnect');

      menu.disconnectedCallback();

      expect(disconnectSpy).toHaveBeenCalled();
    });
  });

  describe('slots', () => {
    it('should render default slot for menu items', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `
          <cat-menu>
            <cat-menu-item>Item 1</cat-menu-item>
            <cat-menu-item>Item 2</cat-menu-item>
          </cat-menu>
        `
      });

      const slot = page.root?.shadowRoot?.querySelector('slot:not([name])');
      expect(slot).toBeTruthy();
    });

    it('should show trigger label when triggerIconOnly is false', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `
          <cat-menu trigger-icon-only="false" trigger-label="Menu">
          </cat-menu>
        `
      });

      const menu = page.rootInstance as CatMenu;
      expect(menu.triggerIconOnly).toBe('false');
    });

    it('should use default triggerIconOnly value', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      expect(menu.triggerIconOnly).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle missing dropdown reference gracefully', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (menu as any).dropdown = undefined;

      // These should not throw errors
      await expect(menu.open()).resolves.toBeUndefined();
      await expect(menu.close()).resolves.toBeUndefined();
      await expect(menu.toggle()).resolves.toBeUndefined();
    });

    it('should handle nativeAttributes correctly', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      menu.triggerNativeAttributes = { 'data-custom': 'value' };
      await page.waitForChanges();

      const trigger = page.root?.shadowRoot?.querySelector('cat-button[slot="trigger"]') as HTMLCatButtonElement;
      expect(trigger.nativeAttributes?.['data-custom']).toBe('value');
      expect(trigger.nativeAttributes?.['aria-haspopup']).toBe('menu');
    });
  });
});
