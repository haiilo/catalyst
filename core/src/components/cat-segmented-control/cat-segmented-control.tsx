import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, Watch } from '@stencil/core';

/**
 * A segmented control for selecting one option from a mutually-exclusive set.
 *
 * @part control - The tray wrapper element.
 */
@Component({
  tag: 'cat-segmented-control',
  styleUrl: 'cat-segmented-control.scss',
  shadow: true
})
export class CatSegmentedControl {
  private segments: HTMLCatSegmentElement[] = [];
  private mutationObserver?: MutationObserver;

  @Element() hostElement!: HTMLElement;

  /**
   * The value of the currently selected segment.
   */
  @Prop({ mutable: true }) value?: string;

  /**
   * The size of the control, propagated to all child segments.
   */
  @Prop() size: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';

  /**
   * Whether the entire control is disabled.
   */
  @Prop() disabled = false;

  /**
   * Accessible label for the group (screen readers only).
   */
  @Prop({ attribute: 'a11y-label' }) a11yLabel?: string;

  /**
   * Renders as data-test on the root element.
   */
  @Prop() testId?: string;

  /**
   * Spread onto the root element.
   */
  @Prop() nativeAttributes?: { [key: string]: string };

  /**
   * Emitted when the selected segment changes. Payload is the new segment value.
   */
  @Event() catChange!: EventEmitter<string>;

  /**
   * Emitted when a segment gains focus. Payload is the segment value.
   */
  @Event() catFocus!: EventEmitter<string>;

  /**
   * Emitted when a segment loses focus. Payload is the segment value.
   */
  @Event() catBlur!: EventEmitter<string>;

  @Watch('value')
  onValueChange(newValue?: string) {
    this.segments.forEach(s => (s.active = s.value === newValue));
  }

  @Watch('size')
  onSizeChange(newSize: CatSegmentedControl['size']) {
    this.segments.forEach(s => (s.size = newSize));
  }

  @Watch('disabled')
  onDisabledChange(disabled: boolean) {
    this.segments.forEach(s => (s.disabled = s.disabled || disabled));
  }

  componentDidLoad() {
    this.sync();
    this.mutationObserver = new MutationObserver(mutations => {
      if (mutations.some(m => m.target.nodeName === 'CAT-SEGMENT')) {
        this.sync();
      }
    });
    this.mutationObserver.observe(this.hostElement, { childList: true, attributes: true, subtree: true });
  }

  disconnectedCallback() {
    this.mutationObserver?.disconnect();
  }

  @Listen('catSegmentClick')
  onSegmentClick(event: CustomEvent<string>) {
    this.value = event.detail;
    this.catChange.emit(this.value);
  }

  @Listen('catSegmentFocus')
  onSegmentFocus(event: CustomEvent<string>) {
    this.catFocus.emit(event.detail);
  }

  @Listen('catSegmentBlur')
  onSegmentBlur(event: CustomEvent<string>) {
    this.catBlur.emit(event.detail);
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent) {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
    if (!keys.includes(event.key)) return;

    const enabled = this.segments.filter(s => !s.disabled);
    const idx = enabled.indexOf(document.activeElement as HTMLCatSegmentElement);
    const offset = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
    const target = enabled[(idx + offset + enabled.length) % enabled.length];
    target?.doFocus();
    event.preventDefault();
  }

  render() {
    return (
      <Host>
        <div
          part="control"
          role="group"
          aria-label={this.a11yLabel}
          class={{ 'cat-segmented-control': true }}
          data-test={this.testId}
          {...this.nativeAttributes}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }

  private sync() {
    this.segments = Array.from(this.hostElement.querySelectorAll('cat-segment'));
    this.onValueChange(this.value);
    this.onSizeChange(this.size);
    this.onDisabledChange(this.disabled);
  }
}
