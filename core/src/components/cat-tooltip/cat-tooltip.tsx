import { Component, h, Host, Listen, Prop } from '@stencil/core';
import { autoUpdate, computePosition, flip, offset, Placement } from '@floating-ui/dom';
import isTouchScreen from '../../utils/is-touch-screen';
import firstTabbable from '../../utils/first-tabbable';
import { FocusableElement } from 'tabbable';

let nextUniqueId = 0;

@Component({
  tag: 'cat-tooltip',
  styleUrl: 'cat-tooltip.scss',
  shadow: true
})
export class CatTooltip {
  private static readonly OFFSET = 4;
  private readonly id = `cat-tooltip-${nextUniqueId++}`;
  private tooltip?: HTMLElement;
  private triggerElement?: HTMLElement;
  private trigger?: FocusableElement;
  private showTimeout?: number;
  private hideTimeout?: number;
  private touchTimeout?: number;

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

  @Listen('keydown')
  handleKeyDown({ key }: KeyboardEvent) {
    key === 'Escape' && this.hideListener();
  }

  componentDidLoad(): void {
    this.trigger = firstTabbable(this.triggerElement) || this.triggerElement;
    if (!this.isTabbable) {
      this.trigger?.setAttribute('tabindex', '0');
    }
    if (this.trigger && this.tooltip) {
      autoUpdate(this.trigger, this.tooltip, () => this.update());
    }

    if (isTouchScreen) {
      window.addEventListener('touchstart', this.windowTouchStartListener.bind(this));
      this.trigger?.addEventListener('touchstart', this.touchStartListener.bind(this));
      this.trigger?.addEventListener('touchend', this.touchEndListener.bind(this));
    } else {
      this.trigger?.addEventListener('focusin', this.showListener.bind(this));
      this.trigger?.addEventListener('focusout', this.hideListener.bind(this));
      this.trigger?.addEventListener('mouseenter', this.showListener.bind(this));
      this.trigger?.addEventListener('mouseleave', this.hideListener.bind(this));
    }
  }

  disconnectedCallback(): void {
    if (isTouchScreen) {
      window.removeEventListener('touchstart', this.windowTouchStartListener.bind(this));
      this.trigger?.removeEventListener('touchstart', this.touchStartListener.bind(this));
      this.trigger?.removeEventListener('touchend', this.touchEndListener.bind(this));
    } else {
      this.trigger?.removeEventListener('mouseenter', this.showListener.bind(this));
      this.trigger?.removeEventListener('mouseleave', this.hideListener.bind(this));
      this.trigger?.removeEventListener('focusin', this.showListener.bind(this));
      this.trigger?.removeEventListener('focusout', this.hideListener.bind(this));
    }
  }

  render() {
    return (
      <Host>
        <div ref={el => (this.triggerElement = el)} aria-describedby={this.id} class="tooltip-trigger">
          <slot />
        </div>
        {this.content && !this.disabled && (
          <div
            ref={el => (this.tooltip = el)}
            id={this.id}
            class={{
              tooltip: true,
              'tooltip-round': this.round
            }}
          >
            {this.content}
          </div>
        )}
      </Host>
    );
  }

  private get isTabbable() {
    return firstTabbable(this.trigger);
  }

  private update() {
    if (this.trigger && this.tooltip) {
      computePosition(this.trigger, this.tooltip, {
        placement: this.placement,
        middleware: [offset(CatTooltip.OFFSET), flip()]
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
    this.showTimeout = window.setTimeout(() => {
      this.tooltip?.classList.add('tooltip-show');
    }, this.showDelay);
  }

  private hideListener() {
    window.clearTimeout(this.showTimeout);
    this.hideTimeout = window.setTimeout(() => {
      this.tooltip?.classList.remove('tooltip-show');
    }, this.hideDelay);
  }

  private touchStartListener(event: Event) {
    event.stopPropagation();
    this.touchTimeout = window.setTimeout(() => {
      this.tooltip?.classList.add('tooltip-show');
    }, this.longTouchDuration);
  }

  private touchEndListener() {
    if (this.touchTimeout) {
      window.clearTimeout(this.touchTimeout);
    }
  }

  private windowTouchStartListener() {
    this.tooltip?.classList.remove('tooltip-show');
  }
}
