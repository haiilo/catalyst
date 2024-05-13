import { autoUpdate, computePosition, flip, offset, Placement, shift } from '@floating-ui/dom';
import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core';
import isTouchScreen from '../../utils/is-touch-screen';

let nextUniqueId = 0;

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
  private trigger?: Element;
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
  @Prop() placement: Placement = 'top';

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

  @Listen('keydown', { target: 'window' })
  handleKeyDown({ key }: KeyboardEvent) {
    key === 'Escape' && this.hideTooltip();
  }

  componentDidLoad(): void {
    const slot = this.hostElement.shadowRoot?.querySelector('slot');
    this.trigger = slot?.assignedElements?.()?.[0];
    if (this.trigger && !this.trigger.hasAttribute('aria-describedby')) {
      this.trigger.setAttribute('aria-describedby', this.id);
    }

    if (isTouchScreen) {
      window.addEventListener('touchstart', this.boundWindowTouchStartListener);
      this.trigger?.addEventListener('touchstart', this.boundTouchStartListener);
      this.trigger?.addEventListener('touchend', this.boundTouchEndListener);
    } else {
      this.trigger?.addEventListener('focusin', this.boundShowListener);
      this.trigger?.addEventListener('focusout', this.boundHideListener);
      this.trigger?.addEventListener('mouseenter', this.boundShowListener);
      this.trigger?.addEventListener('mouseleave', this.boundHideListener);
    }
  }

  componentWillRender(): void {
    this.inactive = this.disabled || (!this.content && !this.hostElement.querySelector('[slot="content"]'));
  }

  disconnectedCallback(): void {
    if (isTouchScreen) {
      window.removeEventListener('touchstart', this.boundWindowTouchStartListener);
      this.trigger?.removeEventListener('touchstart', this.boundTouchStartListener);
      this.trigger?.removeEventListener('touchend', this.boundTouchEndListener);
    } else {
      this.trigger?.removeEventListener('mouseenter', this.boundShowListener);
      this.trigger?.removeEventListener('mouseleave', this.boundHideListener);
      this.trigger?.removeEventListener('focusin', this.boundShowListener);
      this.trigger?.removeEventListener('focusout', this.boundHideListener);
    }
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

  private async update() {
    if (this.trigger && this.tooltip) {
      await computePosition(this.trigger, this.tooltip, {
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
    if (this.trigger && this.tooltip) {
      this.cleanupFloatingUi = autoUpdate(this.trigger, this.tooltip, () => this.update());
    }
    if (!this.inactive) {
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
