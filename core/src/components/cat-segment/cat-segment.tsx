import { Component, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';

type Size = 'xs' | 's' | 'm' | 'l' | 'xl';

/**
 * A single segment within a cat-segmented-control.
 *
 * @part button - The native button element.
 */
@Component({
  tag: 'cat-segment',
  styleUrl: 'cat-segment.scss',
  shadow: { delegatesFocus: true }
})
export class CatSegment {
  private button?: HTMLButtonElement;

  @Element() el!: HTMLElement;

  /** @internal Set by cat-segmented-control. Whether this segment is the active selection. */
  @Prop({ mutable: true }) active = false;

  /** Whether this segment is disabled. */
  @Prop({ mutable: true }) disabled = false;

  /** Icon name to display (same registry as cat-button). */
  @Prop() icon?: string;

  /** When true, hides the label and shows the icon only. Requires icon. */
  @Prop() iconOnly = false;

  /** @internal Set by cat-segmented-control. Size of the segment. */
  @Prop({ mutable: true }) size: Size = 'm';

  /** Renders as data-test on the button element. */
  @Prop() testId?: string;

  /** The unique value of this segment within the group. */
  @Prop() value!: string;

  /** Spread onto the native button element. */
  @Prop() nativeAttributes?: { [key: string]: string };

  /** @internal Emitted when clicked. Consumed by cat-segmented-control. */
  @Event() catSegmentClick!: EventEmitter<string>;

  /** Sets focus on the segment button. */
  @Method()
  async doFocus(): Promise<void> {
    this.button?.focus();
  }

  /** Removes focus from the segment button. */
  @Method()
  async doBlur(): Promise<void> {
    this.button?.blur();
  }

  render() {
    const showIcon = !!this.icon;
    const showLabel = !this.iconOnly || !this.icon;

    return (
      <Host>
        <button
          part="button"
          ref={el => (this.button = el)}
          class={{
            'cat-segment': true,
            [`cat-segment-${this.size}`]: true,
            'cat-segment-active': this.active,
            'cat-segment-icon-only': this.iconOnly && showIcon
          }}
          disabled={this.disabled}
          aria-pressed={String(this.active)}
          data-test={this.testId}
          onClick={this.handleClick.bind(this)}
          {...this.nativeAttributes}
        >
          {showIcon && <cat-icon icon={this.icon} size={this.iconSize}></cat-icon>}
          {showLabel && (
            <span class="cat-segment-label">
              <slot></slot>
            </span>
          )}
        </button>
      </Host>
    );
  }

  private get iconSize(): Size {
    const sizes: Record<Size, Size> = { xs: 's', s: 's', m: 's', l: 'm', xl: 'l' };
    return sizes[this.size] ?? 's';
  }

  private handleClick() {
    if (!this.disabled && !this.active) {
      this.catSegmentClick.emit(this.value);
    }
  }
}
