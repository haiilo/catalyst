import { Component, h, Prop } from '@stencil/core';

/**
 * Spinners are used to indicate users that their action is being processed.
 */
@Component({
  tag: 'cat-spinner',
  styleUrl: 'cat-spinner.scss',
  shadow: true
})
export class CatSpinner {
  /**
   * The size of the spinner.
   */
  @Prop() size: 'xs' | 's' | 'm' | 'l' | 'xl' | 'inline' = 'm';

  /**
   * Adds accessible label for the spinner that is only shown for screen
   * readers. The `aria-hidden` attribute will be set if no label is present.
   */
  @Prop({ attribute: 'a11y-label' }) a11yLabel?: string;

  /**
   * Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow.
   */
  @Prop({ attribute: 'value' }) value: number = 0;

  render() {
    return (
      <span
        role="progressbar"
        tabindex="-1"
        aria-label={this.a11yLabel}
        aria-hidden={this.a11yLabel ? null : 'true'}
        aria-valuenow={this.value}
        aria-valuemin="0"
        aria-valuemax="100"
        class={{
          [`spinner-${this.size}`]: this.size !== 'inline'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="21.5"></circle>
        </svg>
      </span>
    );
  }
}
