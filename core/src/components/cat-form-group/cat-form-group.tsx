import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';

type HTMLCatFormFieldElement =
  | HTMLCatInputElement
  | HTMLCatTextareaElement
  | HTMLCatSelectElement
  | HTMLCatLabelElement;
@Component({
  tag: 'cat-form-group',
  styleUrl: 'cat-form-group.scss',
  shadow: true
})
export class CatFormGroup {
  private formElements?: HTMLCatFormFieldElement[];

  @Element() hostElement!: HTMLElement;

  /**
   * Whether the labels need a marker to shown if the forms fields are required or optional.<br />
   *
   * By default, it is set to auto, it will display the mark depending on the number of required and optional fields: <br />
   *
   * If there are more required, the optional will be marked.
   * If there are less required, it will mark the required.
   */
  @Prop() requiredMarker: 'none' | 'required' | 'optional' | 'auto' = 'auto';

  @Watch('requiredMarker')
  onRequiredMarker(newRequiredMarker: 'none' | 'required' | 'optional' | 'auto') {
    let updateMarker;
    if (this.formElements) {
      updateMarker = newRequiredMarker === 'auto' ? this.calculate(this.formElements) : newRequiredMarker;
      for (const element of this.formElements) {
        if (!element.requiredMarker) {
          element.requiredMarker = updateMarker;
        }
      }
    }
  }

  componentDidLoad(): void {
    this.formElements = Array.from(
      this.hostElement.querySelectorAll('cat-textarea, cat-input, cat-select, cat-label')
    ) as HTMLCatFormFieldElement[];
    this.onRequiredMarker(this.requiredMarker);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  private calculate(elements: HTMLCatFormFieldElement[]): 'optional' | 'required' {
    const formFields = elements.filter(value => value.tagName !== 'CAT-LABEL');
    const optionalFields = formFields.filter(value => !value.required).length;
    const requiredFields = formFields.length - optionalFields;
    return requiredFields >= optionalFields ? 'optional' : 'required';
  }
}
