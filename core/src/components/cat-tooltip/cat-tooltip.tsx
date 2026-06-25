import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import type { Placement } from '@floating-ui/dom';
import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core';
import isTouchScreen from '../../utils/is-touch-screen';

let nextUniqueId = 0;

export type TooltipPlacement = Placement;

/**
 * Tooltips display additional information when the user hovers over or
 * interacts with a trigger element. The tooltip can be customized with
 * different placements, sizes, and styles.
 */
@Component({
  tag: 'cat-tooltip',
  styleUrl: 'cat-tooltip.scss',
  shadow: true
})
export class CatTooltip {
  private static readonly OFFSET = 4;
  private static readonly SHIFT_PADDING = 4;
  private readonly id = `cat-tooltip-${nextUniqueId++}`;
  private tooltip?: HTMLElement;
  private triggerEl?: Element;
  private showTimeout?: number;
  private hideTimeout?: number;
  private touchTimeout?: number;
  private inactive = false;
  private cleanupFloatingUi?: () => void;

  private readonly boundShowListener: () => void;
  private readonly boundHideListener: () => void;
  private readonly boundWindowTouchStartListener: () => void;
  private readonly boundTouchStartListener: (event: Event) => void;
  private readonly boundTouchEndListener: () => void;

  constructor() {
    this.boundShowListener = this.showListener.bind(this);
    this.boundHideListener = this.hideListener.bind(this);
    this.boundWindowTouchStartListener = this.windowTouchStartListener.bind(this);
    this.boundTouchStartListener = this.touchStartListener.bind(this);
    this.boundTouchEndListener = this.touchEndListener.bind(this);
  }

  @Element() hostElement!: HTMLElement;

  @State() open = false;

  /**
   * The content of the tooltip.
   */
  @Prop() content = '';

  /**
   * Specifies that the tooltip should be disabled. A disabled tooltip is unusable,
   * and invisible. Corresponds with the native HTML disabled attribute.
   */
  @Prop() disabled = false;

  /**
   * The placement of the tooltip.
   */
  @Prop() placement: TooltipPlacement = 'top';

  /**
   * Use round tooltip edges.
   */
  @Prop() round = false;

  /**
   * The size of the tooltip.
   */
  @Prop() size: 's' | 'm' | 'l' = 'm';

  /**
   * The delay time for showing tooltip in ms.
   */
  @Prop() showDelay = 250;

  /**
   * The delay time for hiding tooltip in ms.
   */
  @Prop() hideDelay = 0;

  /**
   * The duration of tap to show the tooltip.
   */
  @Prop() longTouchDuration = 1000;

  /**
   * The trigger event(s) that show and hide the tooltip.
   * - 'hover-focus': show on both mouse hover and keyboard focus (default)
   * - 'hover': show on mouse hover only
   * - 'focus': show on keyboard focus only
   */
  @Prop() trigger: 'hover' | 'focus' | 'hover-focus' = 'hover-focus';

  @Listen('keydown', { target: 'window' })
  handleKeyDown({ key }: KeyboardEvent) {
    key === 'Escape' && this.hideTooltip();
  }

  componentDidLoad(): void {
    const slot = this.hostElement.shadowRoot?.querySelector('slot');
    this.triggerEl = slot?.assignedElements?.()?.[0];
    if (this.triggerEl && !this.triggerEl.hasAttribute('aria-describedby')) {
      this.triggerEl.setAttribute('aria-describedby', this.id);
    }

    this.addListeners();
  }

  connectedCallback(): void {
    this.addListeners();
  }

  componentWillRender(): void {
    this.inactive = this.disabled || (!this.content && !this.hostElement.querySelector('[slot="content"]'));
  }

  disconnectedCallback(): void {
    this.removeListeners();
    this.hideTooltip();
  }

  render() {
    return (
      <Host>
        <slot />
        <div
          ref={el => (this.tooltip = el)}
          id={this.id}
          role="tooltip"
          aria-hidden={!this.open}
          aria-live={this.open ? 'polite' : 'off'}
          class={{
            tooltip: true,
            'tooltip-hidden': this.inactive,
            'tooltip-round': this.round,
            [`tooltip-${this.size}`]: Boolean(this.size)
          }}
        >
          <slot name="content">
            {/* The paragraph is needed here to make aria-live work properly. */}
            <p>{this.content}</p>
          </slot>
        </div>
      </Host>
    );
  }

  private addListeners() {
    if (this.trigger !== 'hover') {
      this.triggerEl?.addEventListener('focusin', this.boundShowListener);
      this.triggerEl?.addEventListener('focusout', this.boundHideListener);
    }
    if (this.trigger !== 'focus') {
      this.triggerEl?.addEventListener('mouseenter', this.boundShowListener);
      this.triggerEl?.addEventListener('mouseleave', this.boundHideListener);
    }

    if (isTouchScreen) {
      window.addEventListener('touchstart', this.boundWindowTouchStartListener);
      this.triggerEl?.addEventListener('touchstart', this.boundTouchStartListener);
      this.triggerEl?.addEventListener('touchend', this.boundTouchEndListener);
    }
  }

  private removeListeners() {
    this.triggerEl?.removeEventListener('focusin', this.boundShowListener);
    this.triggerEl?.removeEventListener('focusout', this.boundHideListener);
    this.triggerEl?.removeEventListener('mouseenter', this.boundShowListener);
    this.triggerEl?.removeEventListener('mouseleave', this.boundHideListener);

    if (isTouchScreen) {
      window.removeEventListener('touchstart', this.boundWindowTouchStartListener);
      this.triggerEl?.removeEventListener('touchstart', this.boundTouchStartListener);
      this.triggerEl?.removeEventListener('touchend', this.boundTouchEndListener);
    }
  }

  private async update() {
    if (this.triggerEl && this.tooltip) {
      await computePosition(this.triggerEl, this.tooltip, {
        strategy: 'fixed',
        placement: this.placement,
        middleware: [
          offset(CatTooltip.OFFSET),
          flip({ fallbackAxisSideDirection: 'start' }),
          shift({ padding: CatTooltip.SHIFT_PADDING })
        ]
      }).then(({ x, y }) => {
        if (this.tooltip) {
          Object.assign(this.tooltip.style, {
            left: `${Math.max(0, x)}px`,
            top: `${y}px`
          });
        }
      });
    }
  }

  private showListener() {
    window.clearTimeout(this.hideTimeout);
    this.hideTimeout = undefined;
    if (!this.showTimeout) {
      this.showTimeout = window.setTimeout(() => {
        this.showTimeout = undefined;
        this.showTooltip();
      }, this.showDelay);
    }
  }

  private hideListener() {
    window.clearTimeout(this.showTimeout);
    this.showTimeout = undefined;
    if (!this.hideTimeout) {
      this.hideTimeout = window.setTimeout(() => {
        this.hideTimeout = undefined;
        this.hideTooltip();
      }, this.hideDelay);
    }
  }

  private touchStartListener(event: Event) {
    event.stopPropagation();
    if (!this.touchTimeout) {
      this.touchTimeout = window.setTimeout(() => {
        this.touchTimeout = undefined;
        this.showTooltip();
      }, this.longTouchDuration);
    }
  }

  private touchEndListener() {
    window.clearTimeout(this.touchTimeout);
    this.touchTimeout = undefined;
    this.hideTooltip();
  }

  private windowTouchStartListener() {
    this.hideTooltip();
  }

  private showTooltip() {
    if (!this.inactive) {
      if (this.triggerEl && this.tooltip) {
        this.cleanupFloatingUi = autoUpdate(this.triggerEl, this.tooltip, () => this.update());
      }
      this.open = true;
      this.tooltip?.classList.add('tooltip-show');
    }
  }

  private hideTooltip() {
    this.open = false;
    this.tooltip?.classList.remove('tooltip-show');
    this.cleanupFloatingUi?.();
    this.cleanupFloatingUi = undefined;
  }
}
