import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { Breakpoint, Breakpoints, isBreakpoint } from '../../utils/breakpoints';
import { MediaMatcher } from '../../utils/media-matcher';
import { findClosest } from '../../utils/find-closest';

/**
 * Buttons are used for interface actions. Primary style should be used only
 * once per view for main call-to-action.
 *
 * @part button - The native anchor or button element.
 * @part content - The textual content of the button.
 * @part prefix - The prefix icon.
 * @part suffix - The suffix icon.
 */
@Component({
  tag: 'cat-button',
  styleUrl: 'cat-button.scss',
  shadow: {
    delegatesFocus: true
  }
})
export class CatButton {
  private button!: HTMLButtonElement | HTMLAnchorElement;
  private mediaMatcher?: MediaMatcher;
  private mediaQueryList?: MediaQueryList;
  private mediaQueryListener?: (event: MediaQueryListEvent) => void;

  @Element() hostElement!: HTMLElement;

  @State() _iconOnly = true;

  @State() hasSlottedContent = false;

  /**
   * The rendering style of the button.
   */
  @Prop() variant: 'filled' | 'outlined' | 'text' | 'link' = 'outlined';

  /**
   * The color palette of the button.
   */
  @Prop() color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger' = 'secondary';

  /**
   * Set the button into an active state.
   */
  @Prop() active = false;

  /**
   * The size of the button.
   */
  @Prop() size: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';

  /**
   * The name of the button, which gets paired with the button's value when
   * submitted as part of a form. Corresponds with the native HTML name
   * attribute.
   */
  @Prop() name?: string;

  /**
   * The value of the button, which gets paired with the button's name when
   * submitted as part of a form. Corresponds with the native HTML value
   * attribute.
   */
  @Prop() value?: string;

  /**
   * Specifies that the button should be disabled. A disabled button is unusable
   * and un-clickable. Corresponds with the native HTML disabled attribute.
   */
  @Prop() disabled = false;

  /**
   * Displays the button in a loading state with a spinner. Just like a disabled
   * button, an inactive button is unusable and un-clickable. However, it
   * retains the current focus state.
   */
  @Prop() loading = false;

  /**
   * Allows the button to submit a form.
   */
  @Prop() submit = false;

  /**
   * Disables ellipse overflowing button content.
   */
  @Prop() noEllipsis = false;

  /**
   * Use round button edges.
   */
  @Prop() round = false;

  /**
   * A destination to link to, rendered in the href attribute of a link.
   */
  @Prop() url?: string;

  /**
   * Specifies where to open the linked document.
   */
  @Prop() urlTarget?: '_blank' | '_self';

  /**
   * The name of an icon to be displayed in the button.
   */
  @Prop() icon?: string;

  /**
   * Hide the actual button content and only display the icon.
   */
  @Prop() iconOnly: boolean | Breakpoint = false;

  /**
   * Display the icon on the right.
   */
  @Prop() iconRight = false;

  /**
   * Adds a unique identifier for the button. Please note that with this
   * particular component this ID is added inside the web component. If you need
   * an ID on the HTML element, use the regular `id` attribute instead.
   */
  @Prop() buttonId?: string;

  /**
   * Adds accessible label for the button that is only shown for screen
   * readers. Typically, this label text replaces the visible text on the
   * button for users who use assistive technology.
   */
  @Prop({ attribute: 'a11y-label' }) a11yLabel?: string;

  /**
   * Sets the `aria-current` attribute on the button.
   */
  @Prop({ attribute: 'a11y-current' }) a11yCurrent?: string;

  /**
   * Attributes that will be added to the native HTML button element
   */
  @Prop() nativeAttributes?: { [key: string]: string };

  /**
   * Attributes that will be added to the native HTML button content element
   */
  @Prop() nativeContentAttributes?: { [key: string]: string };

  /**
   * A unique identifier for the underlying native element that is used for
   * testing purposes. The attribute is added as `data-test` attribute and acts
   * as a shorthand for `nativeAttributes={ 'data-test': 'test-Id' }`.
   */
  @Prop() testId?: string;

  /**
   * The index of a button that is used inside a cat-button-group component
   */
  @Prop() buttonGroupPosition?: 'first' | 'last' | 'middle';

  @Watch('iconOnly')
  onIconOnlyChanged(value: boolean | Breakpoint): void {
    // teardown
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.mediaQueryList?.removeEventListener('change', this.mediaQueryListener!);
    this.mediaQueryList = undefined;
    this.mediaQueryListener = undefined;
    // setup
    if (isBreakpoint(value)) {
      this.mediaMatcher ??= new MediaMatcher();
      this.mediaQueryList = this.mediaMatcher.matchMedia(Breakpoints[value]);
      this.mediaQueryListener = (event: MediaQueryListEvent) => (this._iconOnly = event.matches);
      this.mediaQueryList.addEventListener('change', this.mediaQueryListener);
      this._iconOnly = this.mediaQueryList.matches;
    } else {
      this._iconOnly = value;
    }
  }

  /**
   * Emitted when the button is clicked.
   */
  @Event() catClick!: EventEmitter<MouseEvent>;

  /**
   * Emitted when the button received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the button loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  componentWillLoad(): void {
    this.onIconOnlyChanged(this.iconOnly);
  }

  componentWillRender(): void {
    this.hasSlottedContent = this.hostElement.hasChildNodes();
  }

  @Listen('click')
  haltDisabledEvents(event: Event): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
    } else if (this.submit) {
      const form = findClosest('form', this.hostElement);
      if (form && form instanceof HTMLFormElement) {
        // we can't provide a submitter as it is hidden in the shadow DOM
        form.requestSubmit();
      }
    }
  }

  /**
   * Programmatically move focus to the button. Use this method instead of
   * `button.focus()`.
   *
   * @param options An optional object providing options to control aspects of
   * the focusing process.
   */
  @Method()
  async doFocus(options?: FocusOptions): Promise<void> {
    this.button.focus(options);
  }

  /**
   * Programmatically remove focus from the button. Use this method instead of
   * `button.blur()`.
   */
  @Method()
  async doBlur(): Promise<void> {
    this.button.blur();
  }

  /**
   * Programmatically simulate a click on the button.
   */
  @Method()
  async doClick(): Promise<void> {
    this.button.click();
  }

  render() {
    this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
    if (this.url) {
      return (
        <Host data-button-group={this.buttonGroupPosition}>
          <a
            data-test={this.testId}
            {...this.nativeAttributes}
            ref={el => (this.button = el as HTMLAnchorElement)}
            href={this.disabled ? undefined : this.url}
            target={this.urlTarget}
            aria-disabled={this.disabled ? 'true' : null}
            aria-label={this.a11yLabel}
            aria-current={this.a11yCurrent}
            id={this.buttonId}
            part="button"
            class={{
              'cat-button': true,
              'cat-button-empty': !this.hasSlottedContent,
              'cat-button-active': this.active,
              'cat-button-icon': this.isIconButton,
              'cat-button-round': this.round,
              'cat-button-loading': this.loading,
              'cat-button-disabled': this.disabled,
              'cat-button-ellipsed': !this.noEllipsis && !this.isIconButton,
              [`cat-button-${this.variant}`]: Boolean(this.variant),
              [`cat-button-${this.color}`]: Boolean(this.color),
              [`cat-button-${this.size}`]: Boolean(this.size),
              [`cat-button-group-${this.buttonGroupPosition}`]: Boolean(this.buttonGroupPosition)
            }}
            onClick={this.onClick.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
          >
            {this.content}
          </a>
        </Host>
      );
    } else {
      return (
        <Host data-button-group={this.buttonGroupPosition}>
          <button
            data-test={this.testId}
            {...this.nativeAttributes}
            ref={el => (this.button = el as HTMLButtonElement)}
            type={this.submit ? 'submit' : 'button'}
            name={this.name}
            value={this.value}
            disabled={this.disabled}
            aria-disabled={this.disabled ? 'true' : null}
            aria-label={this.a11yLabel}
            aria-current={this.a11yCurrent}
            id={this.buttonId}
            part="button"
            class={{
              'cat-button': true,
              'cat-button-empty': !this.hasSlottedContent,
              'cat-button-active': this.active,
              'cat-button-icon': this.isIconButton,
              'cat-button-round': this.round ?? this.isIconButton,
              'cat-button-loading': this.loading,
              'cat-button-disabled': this.disabled,
              'cat-button-ellipsed': !this.noEllipsis && !this.isIconButton,
              [`cat-button-${this.variant}`]: Boolean(this.variant),
              [`cat-button-${this.color}`]: Boolean(this.color),
              [`cat-button-${this.size}`]: Boolean(this.size),
              [`cat-button-group-${this.buttonGroupPosition}`]: Boolean(this.buttonGroupPosition)
            }}
            onClick={this.onClick.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
          >
            {this.content}
          </button>
        </Host>
      );
    }
  }

  private get iconSize(): 'xs' | 's' | 'm' | 'l' | 'xl' {
    switch (this.size) {
      case 'xs':
        return 's';
      default:
        return 'l';
    }
  }

  private get spinnerSize(): 'xs' | 's' | 'm' | 'l' | 'xl' {
    switch (this.size) {
      case 'xs':
        return 'xs';
      default:
        return 'm';
    }
  }

  private get isIconButton() {
    return Boolean(this.icon) && this._iconOnly;
  }

  private get hasPrefixIcon() {
    return Boolean(this.icon) && !this._iconOnly && !this.iconRight;
  }

  private get hasSuffixIcon() {
    return Boolean(this.icon) && !this._iconOnly && this.iconRight;
  }

  private get content() {
    return [
      this.hasPrefixIcon ? <cat-icon icon={this.icon} size={this.iconSize} part="prefix"></cat-icon> : null,
      this.isIconButton ? (
        <cat-icon icon={this.icon} size={this.iconSize}></cat-icon>
      ) : (
        <span class="cat-button-content" part="content" {...this.nativeContentAttributes}>
          <span class="cat-button-content-inner">
            <slot></slot>
          </span>
        </span>
      ),
      this.hasSuffixIcon ? <cat-icon icon={this.icon} size={this.iconSize} part="suffix"></cat-icon> : null,
      this.loading ? <cat-spinner size={this.spinnerSize}></cat-spinner> : null
    ];
  }

  private onClick(event: MouseEvent) {
    this.catClick.emit(event);
  }

  private onFocus(event: FocusEvent) {
    this.catFocus.emit(event);
  }

  private onBlur(event: FocusEvent) {
    this.catBlur.emit(event);
  }
}
