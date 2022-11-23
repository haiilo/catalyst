import { Component, h, Host, Prop } from '@stencil/core';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

@Component({
  tag: 'cat-label',
  styleUrl: 'cat-label.scss',
  shadow: true
})
export class CatLabel {
  /**
   *
   */
  @Prop() fort?: string;

  /**
   *
   */
  @Prop() required = false;

  render() {
    return (
      <Host>
        <label htmlFor={this.fort}>
          <slot></slot>
          {!this.required && (
            <span class="input-optional" aria-hidden="true">
              ({i18n.t('input.optional')})
            </span>
          )}
        </label>
      </Host>
    );
  }
}
