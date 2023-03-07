import { Component, Host, h, Prop } from '@stencil/core';

/**
 * Skeletons are used to show where content will eventually be drawn.
 */
@Component({
  tag: 'cat-skeleton',
  styleUrl: 'cat-skeleton.scss',
  shadow: true
})
export class CatSkeleton {
  /**
   * The animation style of the skeleton.
   */
  @Prop() effect: 'plain' | 'sheen' | 'pulse' = 'sheen';

  /**
   * The rendering style of the skeleton.
   */
  @Prop({ reflect: true }) variant: 'rectangle' | 'square' | 'circle' | 'head' | 'body' = 'rectangle';

  /**
   * The size of the skeleton. If the variant is set to "head", the size values
   * "xs" to "xl" translate to the head levels `h1` to `h5`.
   */
  @Prop({ reflect: true }) size: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';

  /**
   * The number of text lines to be rendered for "head" and "body" variants.
   * Defaults to 1 for "head" and 3 for "body". Will be ignored for other
   * variants.
   */
  @Prop() lines?: number;

  render() {
    return (
      <Host>
        {Array.from(Array(this.count)).map(() => (
          <div
            style={this.style}
            class={{
              skeleton: true,
              [`skeleton-${this.effect}`]: Boolean(this.effect),
              [`skeleton-${this.variant}`]: Boolean(this.variant),
              [`skeleton-${this.size}`]: Boolean(this.size)
            }}
          ></div>
        ))}
      </Host>
    );
  }

  private get count() {
    switch (this.variant) {
      case 'head':
        return Math.max(1, this.lines || 1);
      case 'body':
        return Math.max(1, this.lines || 3);
      default:
        return 1;
    }
  }

  private get style() {
    return this.variant === 'head' || this.variant === 'body'
      ? {
          '--line-width': `${this.random(50, 100)}%`
        }
      : undefined;
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
