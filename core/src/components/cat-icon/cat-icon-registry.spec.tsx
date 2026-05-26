import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CatIconRegistry, CAT_ICON_SET_ATTR, catIconRegistry } from './cat-icon-registry';

describe('CAT_ICON_SET_ATTR', () => {
  it('is the expected attribute name', () => {
    expect(CAT_ICON_SET_ATTR).toBe('data-cat-icon-set');
  });
});

describe('CatIconRegistry', () => {
  it('exported singleton exists', () => {
    expect(catIconRegistry).toBeTruthy();
    expect(catIconRegistry).toBeInstanceOf(CatIconRegistry);
  });

  it('getInstance always returns the same instance', () => {
    expect(CatIconRegistry.getInstance()).toBe(CatIconRegistry.getInstance());
  });

  describe('addIcons / hasIcon / getIcon', () => {
    afterEach(() => {
      const registry = CatIconRegistry.getInstance();
      registry.removeIcons(['test-icon', 'fluent-test']);
      registry.removeIcons(['scoped-icon'], 'mfe1');
      registry.removeIcons(['shared-name'], 'setA');
      registry.removeIcons(['shared-name'], 'setB');
    });

    it('returns icon after adding it', () => {
      const registry = CatIconRegistry.getInstance();
      registry.addIcons({ 'test-icon': '<svg/>' });
      expect(registry.hasIcon('test-icon')).toBe(true);
      expect(registry.getIcon('test-icon')).toBe('<svg/>');
    });

    it('hasIcon returns false for unknown icon', () => {
      const registry = CatIconRegistry.getInstance();
      expect(registry.hasIcon('nonexistent-icon-xyz')).toBe(false);
    });

    it('getIcon logs error and returns undefined for unknown icon', () => {
      const registry = CatIconRegistry.getInstance();
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = registry.getIcon('nonexistent-icon-xyz');
      expect(result).toBeUndefined();
      errorSpy.mockRestore();
    });

    it('scopes icons by setName', () => {
      const registry = CatIconRegistry.getInstance();
      registry.addIcons({ 'scoped-icon': '<svg id="scoped"/>' }, 'mfe1');
      expect(registry.hasIcon('scoped-icon', 'mfe1')).toBe(true);
      expect(registry.hasIcon('scoped-icon')).toBe(false);
      expect(registry.getIcon('scoped-icon', 'mfe1')).toBe('<svg id="scoped"/>');
    });

    it('different setNames are isolated from each other', () => {
      const registry = CatIconRegistry.getInstance();
      registry.addIcons({ 'shared-name': '<svg id="a"/>' }, 'setA');
      registry.addIcons({ 'shared-name': '<svg id="b"/>' }, 'setB');
      expect(registry.getIcon('shared-name', 'setA')).toBe('<svg id="a"/>');
      expect(registry.getIcon('shared-name', 'setB')).toBe('<svg id="b"/>');
    });

    it('is fluent (returns this)', () => {
      const registry = CatIconRegistry.getInstance();
      expect(registry.addIcons({ 'fluent-test': '<svg/>' })).toBe(registry);
    });
  });

  describe('removeIcons', () => {
    afterEach(() => {
      CatIconRegistry.getInstance().removeIcons(['dual-icon']);
    });

    it('removes icons by name', () => {
      const registry = CatIconRegistry.getInstance();
      registry.addIcons({ 'remove-me': '<svg/>' });
      registry.removeIcons(['remove-me']);
      expect(registry.hasIcon('remove-me')).toBe(false);
    });

    it('removes scoped icons without affecting global', () => {
      const registry = CatIconRegistry.getInstance();
      registry.addIcons({ 'dual-icon': '<svg id="global"/>' });
      registry.addIcons({ 'dual-icon': '<svg id="scoped"/>' }, 'mfe-remove');
      registry.removeIcons(['dual-icon'], 'mfe-remove');
      expect(registry.hasIcon('dual-icon', 'mfe-remove')).toBe(false);
      expect(registry.hasIcon('dual-icon')).toBe(true);
    });

    it('is fluent (returns this)', () => {
      const registry = CatIconRegistry.getInstance();
      expect(registry.removeIcons([])).toBe(registry);
    });
  });

  describe('attachSet / detachSet', () => {
    let element: HTMLDivElement;

    beforeEach(() => {
      element = document.createElement('div');
      document.body.appendChild(element);
    });

    afterEach(() => {
      element.remove();
    });

    it('attachSet sets the correct attribute on the element', () => {
      const registry = CatIconRegistry.getInstance();
      registry.attachSet(element, 'my-mfe');
      expect(element.getAttribute(CAT_ICON_SET_ATTR)).toBe('my-mfe');
    });

    it('detachSet removes the attribute from the element', () => {
      const registry = CatIconRegistry.getInstance();
      registry.attachSet(element, 'my-mfe');
      registry.detachSet(element);
      expect(element.hasAttribute(CAT_ICON_SET_ATTR)).toBe(false);
    });

    it('attachSet is fluent (returns this)', () => {
      const registry = CatIconRegistry.getInstance();
      expect(registry.attachSet(element, 'mfe')).toBe(registry);
    });

    it('detachSet is fluent (returns this)', () => {
      const registry = CatIconRegistry.getInstance();
      expect(registry.detachSet(element)).toBe(registry);
    });
  });

  describe('window event syncing', () => {
    afterEach(() => {
      CatIconRegistry.getInstance().removeIcons(['synced-icon', 'remove-via-event']);
    });

    it('syncs icons added in another registry instance via window event', () => {
      const registry = CatIconRegistry.getInstance();
      window.dispatchEvent(
        new CustomEvent('cat-icons-added', {
          detail: { id: 'foreign-registry', icons: { 'synced-icon': '<svg id="synced"/>' }, setName: undefined }
        })
      );
      expect(registry.hasIcon('synced-icon')).toBe(true);
      expect(registry.getIcon('synced-icon')).toBe('<svg id="synced"/>');
    });

    it('does not sync when syncIcons is false', () => {
      const registry = CatIconRegistry.getInstance();
      registry.syncIcons = false;
      window.dispatchEvent(
        new CustomEvent('cat-icons-added', {
          detail: { id: 'foreign-nosync', icons: { 'no-sync-icon': '<svg/>' }, setName: undefined }
        })
      );
      expect(registry.hasIcon('no-sync-icon')).toBe(false);
      registry.syncIcons = true;
    });

    it('syncs icon removal via window event', () => {
      const registry = CatIconRegistry.getInstance();
      registry.addIcons({ 'remove-via-event': '<svg/>' });
      window.dispatchEvent(
        new CustomEvent('cat-icons-removed', {
          detail: { id: 'foreign-registry', names: ['remove-via-event'], setName: undefined }
        })
      );
      expect(registry.hasIcon('remove-via-event')).toBe(false);
    });
  });
});
