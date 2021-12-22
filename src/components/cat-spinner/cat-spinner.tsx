import { Component, h, Host, Prop } from '@stencil/core';

/**
 * Spinners are used to indicate users that their action is being processed.
 */
@Component({
  tag: 'cat-spinner',
  styleUrl: 'cat-spinner.scss'
})
export class CatSpinner {
  /**
   * The size of the button.
   */
  @Prop() size: 'xs' | 's' | 'm' | 'l' | 'xl' | 'inline' = 'm';

  /**
   * Adds accessible label for the spinner that is only shown for screen
   * readers. The `aria-hidden` attribute will be set if no label is present.
   */
  @Prop() a11yLabel?: string;

  render() {
    return (
      <Host
        aria-label={this.a11yLabel}
        aria-hidden={this.a11yLabel ? null : 'true'}
        class={{
          'cat-spinner': true,
          [`cat-spinner-${this.size}`]: this.size !== 'inline'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="21.5"></circle>
        </svg>
      </Host>
    );
  }
}
