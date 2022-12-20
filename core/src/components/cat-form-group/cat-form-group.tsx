import { Component, h, Host, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'cat-form-group',
  styleUrl: 'cat-form-group.css',
  shadow: true
})
export class CatFormGroup {
  private slotElement!: HTMLSlotElement;
  private formElements?: HTMLCatInputElement[];

  /**
   * requiredMarker
   */
  @Prop() requiredMarker: 'none' | 'required' | 'optional' | 'auto' = 'auto';

  @Watch('requiredMarker')
  onRequiredMarker(newRequiredMarker: 'none' | 'required' | 'optional' | 'auto') {
    let updateMarker;
    if (this.formElements) {
      updateMarker = newRequiredMarker === 'auto' ? this.calculated(this.formElements) : newRequiredMarker;
      for (const element of this.formElements) {
        if (!element.requiredMarker) {
          element.requiredMarker = updateMarker;
        }
      }
    }
  }

  componentDidLoad(): void {
    this.formElements = this.slotElement.assignedElements() as HTMLCatInputElement[];
    this.onRequiredMarker(this.requiredMarker);
  }

  render() {
    return (
      <Host>
        <slot
          ref={el => {
            this.slotElement = el as HTMLSlotElement;
          }}
        ></slot>
      </Host>
    );
  }

  private calculated(elements: HTMLCatInputElement[]): 'optional' | 'required' {
    const optionalFields = elements.filter(value => !value.required).length;
    const requiredFields = elements.length - optionalFields;
    if (requiredFields >= optionalFields) {
      return 'optional';
    } else {
      return 'required';
    }
  }
}
