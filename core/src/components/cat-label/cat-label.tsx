import { Component, h, Host, Prop, State } from '@stencil/core';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

/**
 * Labels are used to provide a short description of an input or form element.
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

  private input!: HTMLInputElement;
  @State() private value!: string | number | undefined;
  @State() private maxLength!: number;

  /**
   * Whether the label is on top or left.
   */
  @Prop() horizontal = false;

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

  componentDidLoad() {
    const intervalId = setInterval(() => {
      if (this.for && !this.input) {
        this.input = (document.getElementById(this.for) || this.findShadowTarget(this.for)) as HTMLInputElement;
      } else {
        clearInterval(intervalId);
        this.maxLength = this.input.maxLength;
        this.input.addEventListener('input', (event) => {
          this.value = (event.target as HTMLInputElement).value;
        });
      }
    })
  }

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
          <span class={{'label-wrapper': true, 'label-horizontal': this.horizontal}} part="label">
            <slot></slot>    
            <div class="label-metadata">
              {!this.required && this.requiredMarker.startsWith('optional') && (
                <span class="label-optional" aria-hidden="true">
                  ({i18n.t('input.optional')})
                </span>
              )}
              {this.required && this.requiredMarker.startsWith('required') && (
                <span class="label-optional" aria-hidden="true">
                  ({i18n.t('input.required')})
                </span>
              )}
              {(this.maxLength && this.maxLength > 0) && (
                <div class="character-count">{this.value?.toString().length??0}/{this.maxLength}</div>
              )}
            </div>          
          </span>
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
