import {Component, h, Host, Prop} from '@stencil/core';
import {autoUpdate, computePosition, flip, offset, Placement} from "@floating-ui/dom";

@Component({
  tag: 'cat-tooltip',
  styleUrl: 'cat-tooltip.scss',
  shadow: true,
})
export class CatTooltip {
  private static readonly OFFSET = 4;
  private tooltip?: HTMLElement;
  private trigger?: HTMLElement;
  private showTimeout: number;
  private hideTimeout: number;

  /**
   * The content of the tooltip
   */
  @Prop() content: string;

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
   * The delay time for showing tooltip in ms
   */
  @Prop() showDelay = 1000;

  /**
   * The delay time for hiding tooltip in ms
   */
  @Prop() hideDelay = 0;

  componentDidLoad(): void {
    if (this.trigger && this.tooltip) {
      autoUpdate(this.trigger, this.tooltip, () => this.update());
    }
    this.trigger?.addEventListener('mouseenter', this.showListener.bind(this));
    this.trigger?.addEventListener('mouseleave', this.hideListener.bind(this));
  }

  disconnectedCallback(): void {
    this.trigger?.removeEventListener('mouseenter', this.showListener.bind(this));
    this.trigger?.removeEventListener('mouseleave', this.hideListener.bind(this));
  }

  render() {
    return (
      <Host>
        <div class="tooltip-trigger" ref={el => (this.trigger = el)}>
          <slot/>
        </div>
        {
          this.content && !this.disabled &&
          <div
            ref={el => (this.tooltip = el)}
            aria-describedby={this.content}
            class="tooltip"
          >
            {this.content}
          </div>
        }
      </Host>
    );
  }

  private update() {
    if (this.trigger && this.tooltip) {
      computePosition(this.trigger, this.tooltip, {
        placement: this.placement,
        middleware: [offset(CatTooltip.OFFSET), flip()]
      }).then(({x, y}) => {
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
}
