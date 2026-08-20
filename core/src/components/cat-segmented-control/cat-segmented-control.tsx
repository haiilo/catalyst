import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, Watch } from '@stencil/core';

/**
 * A segmented control for selecting one option from a mutually-exclusive set.
 *
 * @part group - The grouping wrapper element.
 */
@Component({
  tag: 'cat-segmented-control',
  styleUrl: 'cat-segmented-control.scss',
  shadow: true
})
export class CatSegmentedControl {
  private segments: HTMLCatSegmentElement[] = [];
  private readonly disabledByGroup = new WeakSet<HTMLCatSegmentElement>();
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
    this.updateTabIndex();
  }

  @Watch('size')
  onSizeChange(newSize: CatSegmentedControl['size']) {
    this.segments.forEach(s => (s.size = newSize));
  }

  @Watch('disabled')
  onDisabledChange(disabled: boolean) {
    if (disabled) {
      this.segments.forEach(segment => {
        if (!segment.disabled) {
          this.disabledByGroup.add(segment);
          segment.disabled = true;
        }
      });
      return;
    }

    this.segments.forEach(segment => {
      if (this.disabledByGroup.has(segment)) {
        this.disabledByGroup.delete(segment);
        segment.disabled = false;
      }
    });
  }

  componentDidLoad() {
    this.sync();
    this.mutationObserver = new MutationObserver(mutations => {
      if (mutations.some(mutation => this.isSegmentMutation(mutation))) {
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
    this.selectSegment(event.detail);
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
    const activeSegment = this.segments.find(segment => event.composedPath().includes(segment));
    const idx = enabled.indexOf(activeSegment!);
    if (enabled.length === 0 || idx === -1) return;

    const offset = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
    const target = enabled[(idx + offset + enabled.length) % enabled.length];
    this.selectSegment(target.value);
    target.doFocus();
    event.preventDefault();
  }

  render() {
    return (
      <Host>
        <div
          part="group"
          {...this.nativeAttributes}
          role="radiogroup"
          aria-label={this.a11yLabel}
          class={{ 'cat-segmented-control': true }}
          data-test={this.testId}
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

  private isSegmentMutation(mutation: MutationRecord): boolean {
    if (mutation.type === 'attributes') {
      return mutation.target.nodeName === 'CAT-SEGMENT';
    }

    return [...mutation.addedNodes, ...mutation.removedNodes].some(node => {
      if (node.nodeType !== Node.ELEMENT_NODE) return false;

      const element = node as Element;
      return element.matches('cat-segment') || element.querySelector('cat-segment') !== null;
    });
  }

  private updateTabIndex() {
    const enabled = this.segments.filter(s => !s.disabled);
    const active = enabled.find(s => s.active) ?? enabled[0];

    this.segments.forEach(segment => (segment.rovingTabIndex = segment === active ? 0 : -1));
  }

  private selectSegment(value: string) {
    if (this.value === value) return;

    this.value = value;
    this.segments.forEach(segment => (segment.active = segment.value === value));
    this.updateTabIndex();
    this.catChange.emit(value);
  }
}
