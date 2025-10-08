import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';

type HTMLCatFormFieldElement =
  | HTMLCatInputElement
  | HTMLCatTextareaElement
  | HTMLCatSelectElement
  | HTMLCatDatepickerElement
  | HTMLCatDateElement
  | HTMLCatTimeElement;

/**
 * A form group component to group form fields and labels.
 */
@Component({
  tag: 'cat-form-group',
  styleUrl: 'cat-form-group.scss',
  shadow: true
})
export class CatFormGroup {
  private formElements: HTMLCatFormFieldElement[] = [];

  @Element() hostElement!: HTMLElement;

  /**
   * Whether the labels need a marker to shown if the forms fields are required or optional.<br /><br />
   * By default, it is set to auto, it will display the mark depending on the number of required and optional fields: <br />
   * - If there are more required, the optional will be marked.<br />
   * - If there are less required, it will mark the required.<br /><br />
   * If a form field had "!", the requiredMarked of the field would not change.
   */
  @Prop() requiredMarker: 'none' | 'required' | 'optional' | 'auto' = 'auto';

  /**
   * Whether the label is on top or left.
   */
  @Prop() horizontal = false;

  /**
   * The space allocated to the input label
   */
  @Prop() labelSize?: string;

  @Watch('requiredMarker')
  onRequiredMarkerChanged(newRequiredMarker: 'none' | 'required' | 'optional' | 'auto') {
    const updateMarker = newRequiredMarker === 'auto' ? this.calculate(this.formElements) : newRequiredMarker;
    this.formElements.forEach(
      element => !element.requiredMarker?.endsWith('!') && (element.requiredMarker = updateMarker)
    );
  }

  @Watch('horizontal')
  onHorizontalChanged(newHorizontal: boolean) {
    this.formElements.forEach(element => {
      element.fallbackHorizontal = newHorizontal;
    });
  }

  render() {
    return (
      <Host style={{ '--label-size': this.labelSize }}>
        <slot onSlotchange={this.onSlotChange.bind(this)}></slot>
      </Host>
    );
  }

  private onSlotChange(): void {
    this.formElements = Array.from(
      this.hostElement.querySelectorAll('cat-input, cat-textarea, cat-select, cat-datepicker, cat-date, cat-time')
    ) as HTMLCatFormFieldElement[];
    this.onRequiredMarkerChanged(this.requiredMarker);
    this.onHorizontalChanged(this.horizontal);
  }

  private calculate(elements: HTMLCatFormFieldElement[]): 'optional' | 'required' {
    const optionalFields = elements.filter(value => !value.required).length;
    const requiredFields = elements.length - optionalFields;
    return requiredFields >= optionalFields ? 'optional' : 'required';
  }
}
