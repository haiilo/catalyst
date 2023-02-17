import { Component, h, Host, Prop } from '@stencil/core';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

/**
 * Labels are used to provide a short description of an input or form element.
 *
 * @deprecated Use label attribute of form elements instead.
 */
@Component({
  tag: 'cat-label',
  styleUrl: 'cat-label.scss',
  shadow: true
})
export class CatLabel {
  private static readonly SHADOW_TARGETS = [
    'CAT-INPUT',
    'CAT-TEXTAREA',
    'CAT-CHECKBOX',
    'CAT-TOGGLE',
    'CAT-RADIO',
    'CAT-SELECT'
  ];

  /**
   * Whether the label need a marker to shown if the input is required or optional.
   */
  @Prop() requiredMarker: 'none' | 'required' | 'optional' | 'none!' | 'optional!' | 'required!' = 'optional';

  /**
   * The unique identifier for a referenced input.
   */
  @Prop() for?: string;

  /**
   * A value is required or must be check for the form to be submittable.
   */
  @Prop() required = false;

  onClick() {
    if (this.for) {
      // focus target that is possibly hidden inside a shadow root
      (document.getElementById(this.for) || this.findShadowTarget(this.for))?.focus();
    }
  }

  render() {
    return (
      <Host>
        <label htmlFor={this.for} onClick={this.onClick.bind(this)}>
          <slot></slot>
          {!this.required && this.requiredMarker.startsWith('optional') && (
            <span class="input-optional" aria-hidden="true">
              ({i18n.t('input.optional')})
            </span>
          )}
          {this.required && this.requiredMarker.startsWith('required') && (
            <span class="input-optional" aria-hidden="true">
              ({i18n.t('input.required')})
            </span>
          )}
        </label>
      </Host>
    );
  }

  private findShadowTarget(id: string): HTMLElement | null {
    for (let i = 0; i < CatLabel.SHADOW_TARGETS.length; i++) {
      const elems = document.getElementsByTagName(CatLabel.SHADOW_TARGETS[i]);
      for (let i = 0; i < elems.length; i++) {
        const target = elems[i].shadowRoot?.getElementById(id);
        if (target) {
          return target;
        }
      }
    }
    return null;
  }
}
