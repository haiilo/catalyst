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

  /**
   * The content of the tooltip
   */
  @Prop() content!: string;

  /**
   * Specifies that the tooltip should be disabled. A disabled tooltip is unusable,
   * and invisible. Corresponds with the native HTML disabled attribute.
   */
  @Prop() disabled = false;

  /**
   * The placement of the tooltip.
   */
  @Prop() placement: Placement = 'top';

  componentDidLoad(): void {
    if (this.trigger && this.tooltip) {
      autoUpdate(this.trigger, this.tooltip, () => this.update());
    }
  }

  render() {
    return (
      <Host>
        <div
          aria-valuetext={this.content}
          role="tooltip"
          class="tooltip-wrapper"
        >
          <div class="tooltip-content" ref={el => (this.trigger = el)}><slot/></div>
          {
            this.content && !this.disabled &&
            <div class="tooltip" ref={el => (this.tooltip = el)}>{this.content}</div>
          }
        </div>
      </Host>
    );
  }

  private update() {
    if (this.trigger && this.tooltip) {
      computePosition(this.trigger, this.tooltip, {
        placement: this.placement,
        middleware: [offset(4), flip()]
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
}
