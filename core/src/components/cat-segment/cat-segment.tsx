import { Component, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';

export type SegmentSize = 'xs' | 's' | 'm' | 'l' | 'xl';

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

  @Element() hostElement!: HTMLElement;

  /** @internal Set by cat-segmented-control. Whether this segment is the active selection. */
  @Prop({ mutable: true }) active = false;

  /** Whether this segment is disabled. */
  @Prop({ mutable: true }) disabled = false;

  /** Icon name to display (same registry as cat-button). */
  @Prop() icon?: string;

  /** When true, hides the label and shows the icon only. Requires icon and a11y-label. */
  @Prop() iconOnly = false;

  /**
   * Adds accessible label for the button that is only shown for screen
   * readers. Typically, this label text replaces the visible text on the
   * button for users who use assistive technology.
   */
  @Prop({ attribute: 'a11y-label' }) a11yLabel?: string;

  /**
   * Refers to the element that is controlled (e.g. displayed or hidden) by this segment. Typically, this is the ID of
   * a tab panel that is shown when this segment is active.
   */
  @Prop({ attribute: 'a11y-controls' }) a11yControls?: string;

  /** @internal Set by cat-segmented-control. Size of the segment. */
  @Prop({ mutable: true }) size: SegmentSize = 'm';

  /** @internal Set by cat-segmented-control for radio roving tabindex. */
  @Prop({ mutable: true }) rovingTabIndex = 0;

  /** Renders as data-test on the button element. */
  @Prop() testId?: string;

  /** The unique value of this segment within the group. */
  @Prop() value!: string;

  /** Spread onto the native button element. */
  @Prop() nativeAttributes?: { [key: string]: string };

  /** @internal Emitted when clicked. Consumed by cat-segmented-control. */
  @Event() catSegmentClick!: EventEmitter<string>;

  /** @internal Emitted when segment receives focus. Consumed by cat-segmented-control. */
  @Event() catSegmentFocus!: EventEmitter<string>;

  /** @internal Emitted when segment loses focus. Consumed by cat-segmented-control. */
  @Event() catSegmentBlur!: EventEmitter<string>;

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
          {...this.nativeAttributes}
          part="button"
          type="button"
          role="radio"
          ref={el => (this.button = el)}
          class={{
            'cat-segment': true,
            [`cat-segment-${this.size}`]: true,
            'cat-segment-active': this.active,
            'cat-segment-icon-only': this.iconOnly && showIcon
          }}
          disabled={this.disabled}
          tabIndex={this.rovingTabIndex}
          aria-label={this.a11yLabel}
          aria-checked={String(this.active)}
          aria-controls={this.a11yControls}
          data-test={this.testId}
          onClick={this.handleClick.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
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

  private get iconSize(): SegmentSize {
    const sizes: Record<SegmentSize, SegmentSize> = { xs: 's', s: 's', m: 's', l: 'm', xl: 'l' };
    return sizes[this.size] ?? 's';
  }

  private handleClick() {
    if (!this.disabled && !this.active) {
      this.catSegmentClick.emit(this.value);
    }
  }

  private handleFocus() {
    if (!this.disabled) {
      this.catSegmentFocus.emit(this.value);
    }
  }

  private handleBlur() {
    if (!this.disabled) {
      this.catSegmentBlur.emit(this.value);
    }
  }
}
