import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { Breakpoint, Breakpoints, isBreakpoint } from '../../utils/breakpoints';
import { MediaMatcher } from '../../utils/media-matcher';

/**
 * Badges are used to inform users of the status of an object or of an action
 * that’s been taken.
 */
@Component({
  tag: 'cat-badge',
  styleUrl: 'cat-badge.scss',
  shadow: true
})
export class CatBadge {
  private mediaMatcher?: MediaMatcher;
  private mediaQueryList?: MediaQueryList;
  private mediaQueryListener?: (event: MediaQueryListEvent) => void;

  @Element() hostElement!: HTMLElement;

  @State() _iconOnly = true;

  /**
   * The rendering style of the badge.
   */
  @Prop({ reflect: true }) variant: 'filled' | 'outlined' = 'filled';

  /**
   * The color palette of the badge.
   */
  @Prop({ reflect: true }) color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger' = 'primary';

  /**
   * The size of the badge.
   */
  @Prop({ reflect: true }) size: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';

  /**
   * Use round badge edges.
   */
  @Prop({ reflect: true }) round = false;

  /**
   * Draw attention to the badge with a subtle animation.
   */
  @Prop({ reflect: true }) pulse = false;

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

  componentWillLoad(): void {
    this.onIconOnlyChanged(this.iconOnly);
  }

  private get isIconBadge() {
    return Boolean(this.icon) && this._iconOnly;
  }

  private get hasPrefixIcon() {
    return Boolean(this.icon) && !this._iconOnly && !this.iconRight;
  }

  private get hasSuffixIcon() {
    return Boolean(this.icon) && !this._iconOnly && this.iconRight;
  }

  private get iconSize(): 'xs' | 's' | 'm' | 'l' | 'xl' {
    switch (this.size) {
      case 'xs':
      case 's':
        return 'xs';
      case 'l':
      case 'xl':
        return 'l';
      default:
        return 'm';
    }
  }

  render() {
    return (
      <Host data-icon-badge={this.isIconBadge ? this.size : null}>
        {this.hasPrefixIcon ? <cat-icon icon={this.icon} size={this.iconSize} part="prefix"></cat-icon> : null}
        {this.isIconBadge ? (
          <cat-icon icon={this.icon} size={this.iconSize} class="icon-only"></cat-icon>
        ) : (
          <slot></slot>
        )}
        {this.hasSuffixIcon ? <cat-icon icon={this.icon} size={this.iconSize} part="prefix"></cat-icon> : null}
      </Host>
    );
  }
}
