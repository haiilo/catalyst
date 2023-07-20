import { Component, Host, h } from '@stencil/core';
import flatpickr from 'flatpickr';

@Component({
  tag: 'cat-datepicker-inline',
  styleUrl: 'cat-datepicker-inline.scss',
  shadow: true,
})
export class CatDatepickerInline {
  private pickr?: flatpickr.Instance;
  private input?: HTMLInputElement;

  componentDidLoad() {
    if (this.input) {
      this.pickr = this.initDatepicker(this.input);
      console.log(this.pickr);
    }
  }

  render() {
    return (
      <Host>
        <input ref={el => (this.input = el)}></input>
      </Host>
    );
  }

  private initDatepicker(input: HTMLInputElement): flatpickr.Instance {
    return flatpickr(input, {
      inline: true
    });
  }
}
