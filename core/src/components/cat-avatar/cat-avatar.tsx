import { Component, h, Prop, State, Watch } from '@stencil/core';
import log from 'loglevel';
import loadImg from '../../utils/load-img';

/**
 * Avatars are used to represent a person or object.
 */
@Component({
  tag: 'cat-avatar',
  styleUrl: 'cat-avatar.scss',
  shadow: { delegatesFocus: true }
})
export class CatAvatar {
  @State() backgroundImage?: string;

  /**
   * The size of the avatar.
   */
  @Prop({ reflect: true }) size: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';

  /**
   * Use round avatar edges.
   */
  @Prop() round = false;

  /**
   * The label of the avatar.
   */
  @Prop() label?: string;

  /**
   * Custom initials for the avatar.
   */
  @Prop() initials?: string;

  /**
   * An optional avatar image.
   */
  @Prop() src?: string;

  /**
   * An icon to be used instead of the initials.
   */
  @Prop() icon?: string;

  /**
   * The SVG source of an icon to be displayed instead of the initials. This
   * takes precenedence over the `icon` name.
   */
  @Prop() iconSrc?: string;

  /**
   * A destination to link to, rendered in the href attribute of a link.
   */
  @Prop() href?: string;

  /**
   * Specifies where to open the linked document.
   */
  @Prop() target?: '_blank' | '_self' | '_parent' | '_top' | string;

  /**
   * Attributes that will be added to the native HTML anchor or span element.
   */
  @Prop() nativeAttributes?: { [key: string]: string };

  @Watch('src')
  onSrcChanged(value?: string): void {
    if (value) {
      loadImg(value).then(
        () => (this.backgroundImage = `url(${value})`),
        () => (this.backgroundImage = undefined)
      );
    } else {
      this.backgroundImage = undefined;
    }
  }

  componentWillLoad(): void {
    this.onSrcChanged(this.src);
  }

  componentWillRender(): void {
    if (!this.label) {
      log.warn('[A11y] Missing ARIA label on avatar', this);
    }
  }

  render() {
    if (this.href) {
      return (
        <a
          {...this.nativeAttributes}
          href={this.href}
          target={this.target}
          style={this.cssStyle}
          class={this.cssClass}
          aria-label={this.label}
        >
          {this.content}
        </a>
      );
    } else {
      return (
        <span {...this.nativeAttributes} style={this.cssStyle} class={this.cssClass} aria-label={this.label}>
          {this.content}
        </span>
      );
    }
  }

  private get content() {
    return !this.backgroundImage
      ? [
          this.icon || this.iconSrc ? (
            <cat-icon icon={this.icon} iconSrc={this.iconSrc} size={this.size}></cat-icon>
          ) : (
            this.getInitials()
          )
        ]
      : [];
  }

  private get cssStyle() {
    return { 'background-image': this.backgroundImage };
  }

  private get cssClass() {
    return {
      avatar: true,
      'avatar-round': this.round,
      [`avatar-${this.size}`]: Boolean(this.size)
    };
  }

  private getInitials(): string {
    return (
      this.initials ??
      (this.label ?? '')
        .split(' ')
        .map(n => n[0])
        .join('')
    );
  }
}
