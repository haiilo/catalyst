import {Component, h, Host, Prop} from '@stencil/core';
import {autoUpdate, computePosition, flip, offset, Placement} from "@floating-ui/dom";

@Component({
  tag: 'cat-tooltip',
  styleUrl: 'cat-tooltip.scss',
  shadow: true,
})
export class CatTooltip {
  private tooltip?: HTMLElement;
  private trigger?: Element;
  private showTimeout: NodeJS.Timeout;
  private hideTimeout: NodeJS.Timeout;

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
  @Prop() showDelay = 500;

  /**
   * The delay time for hiding tooltip in ms
   */
  @Prop() hideDelay = 500;

  componentDidLoad(): void {
    if (this.trigger && this.tooltip) {
      autoUpdate(this.trigger, this.tooltip, () => this.update());
    }
    this.trigger?.addEventListener('mouseenter', this.showListener.bind(this));

    this.trigger?.addEventListener('mouseleave', this.hideListener.bind(this));
  }

  disconnectedCallback() {
    this.trigger?.removeEventListener('mouseenter', this.showListener.bind(this));
    this.trigger?.removeEventListener('mouseleave', this.hideListener.bind(this));
  }

  render() {
    return (
      <Host>
        <div class="tooltip-content" ref={el => (this.trigger = el)}>
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
        middleware: [offset(4), flip()]
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
    clearTimeout(this.hideTimeout);
    this.showTimeout = setTimeout(() => {
      this.tooltip?.classList.add('tooltip-show');
    }, this.showDelay);
  }

  private hideListener() {
    clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(() => {
      this.tooltip?.classList.remove('tooltip-show');
    }, this.hideDelay);
  }
}
