import { Component, h, Listen, Prop } from '@stencil/core';
import { CatIconRequestDetail } from '../cat-icon/cat-icon-request';
import { CatIconRegistry, catIconRegistry } from '../cat-icon/cat-icon-registry';

/**
 * Provides a scoped `CatIconRegistry` instance to all descendant `cat-icon`
 * components.
 *
 * Use this component to isolate icon sets in micro-frontend architectures where
 * multiple MFEs register icons with the same names but different SVG content.
 *
 * ## Basic usage
 *
 * ```ts
 * // In your MFE bootstrap code:
 * const registry = CatIconRegistry.createInstance();
 * registry.addIcons(myIcons);
 * ```
 *
 * ```html
 * <!-- Wrap your MFE root: -->
 * <cat-icon-provider>
 *   <!-- All cat-icon elements inside here use `registry` -->
 * </cat-icon-provider>
 * ```
 *
 * ## Resolution order for child `cat-icon` elements
 *
 * 1. The `registry` prop of the nearest `cat-icon-provider` ancestor
 * 2. The global `catIconRegistry` singleton (framework default icons and any
 *    icons added via the legacy `catIconRegistry.addIcons()` API)
 * 3. If neither has the icon, `cat-icon` logs an error and renders nothing
 *
 * ## Angular example
 *
 * ```ts
 * @Component({ template: `<cat-icon-provider [registry]="registry">...</cat-icon-provider>` })
 * export class MfeRootComponent {
 *   readonly registry = CatIconRegistry.createInstance();
 *   constructor() { this.registry.addIcons(myIcons); }
 * }
 * ```
 */
@Component({
  tag: 'cat-icon-provider',
  shadow: false
})
export class CatIconProvider {
  /**
   * The isolated registry instance for this subtree.
   * Create one with `CatIconRegistry.createInstance()`.
   * If omitted, the global `catIconRegistry` is used (same as no provider).
   */
  @Prop() registry?: CatIconRegistry;

  @Listen('cat-icon-request')
  handleIconRequest(event: CustomEvent<CatIconRequestDetail>) {
    // Take ownership of this request so cat-icon does not fall back to the
    // global registry (which may contain a different version of the icon from
    // another MFE that shares the same icon names).
    event.stopPropagation();
    event.preventDefault();

    const { name, resolve } = event.detail;

    // 1. Scoped registry (MFE-specific icons)
    if (this.registry?.hasIcon(name)) {
      resolve(this.registry.getIcon(name) as string);
      return;
    }

    // 2. Global registry (framework default icons such as $cat:input-error,
    //    and any icons registered by the host application)
    if (catIconRegistry.hasIcon(name)) {
      resolve(catIconRegistry.getIcon(name) as string);
    }

    // Icon not found — cat-icon will log an error when it detects the event
    // was cancelled but resolve was never called.
  }

  render() {
    return <slot></slot>;
  }
}
