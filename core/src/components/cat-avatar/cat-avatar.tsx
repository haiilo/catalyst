import { Component, h, Prop, State, Watch } from '@stencil/core';
import log from 'loglevel';
import loadImg from '../../utils/load-img';

/**
 * Avatars are used to represent a person or object.
 */
@Component({
  tag: 'cat-avatar',
  styleUrl: 'cat-avatar.scss',
  shadow: true
})
export class CatAvatar {
  @State() backgroundImage?: string;

  /**
   * The size of the avatar.
   */
  @Prop() size: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';

  /**
   * Use round avatar edges.
   */
  @Prop() round = false;

  /**
   * The label of the avatar.
   */
  @Prop() label = '';

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
   * A destination to link to, rendered in the href attribute of a link.
   */
  @Prop() url?: string;

  /**
   * Specifies where to open the linked document.
   */
  @Prop() urlTarget?: '_blank' | '_self';

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
    if (this.url) {
      return (
        <a href={this.url} target={this.urlTarget} style={this.cssStyle} class={this.cssClass} aria-label={this.label}>
          {this.content}
        </a>
      );
    } else {
      return (
        <span style={this.cssStyle} class={this.cssClass} aria-label={this.label}>
          {this.content}
        </span>
      );
    }
  }

  private get content() {
    return !this.backgroundImage
      ? [this.icon ? <cat-icon icon={this.icon} size={this.size}></cat-icon> : this.getInitials()]
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
      this.label
        .split(' ')
        .map(n => n[0])
        .join('')
    );
  }
}
