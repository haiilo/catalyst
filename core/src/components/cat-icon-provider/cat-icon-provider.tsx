import { Component, Element, h, Prop, Watch } from '@stencil/core';
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
 * <cat-icon-provider [registry]="registry">
 *   <!-- All cat-icon elements inside here use `registry` -->
 * </cat-icon-provider>
 * ```
 *
 * ## Resolution order for child `cat-icon` elements
 *
 * 1. The `registry` prop of the nearest `cat-icon-provider` ancestor
 * 2. The global `catIconRegistry` singleton (framework default icons and any
 *    icons added via the legacy `catIconRegistry.addIcons()` API)
 * 3. If neither has the icon, `cat-icon` renders nothing
 *
 * ## Imperative alternative (no wrapper element)
 *
 * If adding an extra wrapper element is undesirable (e.g. in a bootstrap
 * component that already owns the MFE root), use `attachTo` directly:
 *
 * ```ts
 * @Component({ ... })
 * export class MfeRootComponent implements OnInit, OnDestroy {
 *   readonly registry = CatIconRegistry.createInstance();
 *   private cleanup?: () => void;
 *
 *   constructor(private el: ElementRef) {
 *     this.registry.addIcons(myIcons);
 *   }
 *
 *   ngOnInit() { this.cleanup = this.registry.attachTo(this.el.nativeElement); }
 *   ngOnDestroy() { this.cleanup?.(); }
 * }
 * ```
 */
@Component({
  tag: 'cat-icon-provider',
  shadow: false
})
export class CatIconProvider {
  @Element() el!: HTMLElement;

  /**
   * The isolated registry instance for this subtree.
   * Create one with `CatIconRegistry.createInstance()`.
   * If omitted, the global `catIconRegistry` is used (same as no provider).
   */
  @Prop() registry?: CatIconRegistry;

  private detach?: () => void;

  connectedCallback() {
    this.reattach();
  }

  @Watch('registry')
  reattach() {
    this.detach?.();
    this.detach = (this.registry ?? catIconRegistry).attachTo(this.el);
  }

  disconnectedCallback() {
    this.detach?.();
    this.detach = undefined;
  }

  render() {
    return <slot></slot>;
  }
}
