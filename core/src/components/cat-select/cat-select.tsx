import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import Choices from 'choices.js';

export interface Option {
  label: string;
  value: string;
  selected?: boolean;
  disabled?: boolean;
}

interface OptionsProps {
  options: Option[];
}

const Options = ({ options }: OptionsProps) => {
  return options.map((option: Option) => (
    <option value={option.value} selected={option.selected} disabled={option.disabled}>
      {option.label}
    </option>
  ));
};

@Component({
  tag: 'cat-select',
  styleUrl: 'cat-select.scss',
  shadow: true
})
export class CatSelect {
  private choice?: Choices | null = null;
  private hostElement: HTMLElement | null = null;
  private selectElement?: HTMLSelectElement;
  private choicesInner?: Element | null = null;

  @Prop() value = '';
  @Prop() multiple = false;
  @Prop() options?: Option[] = [];

  @Event() catSelectChange!: EventEmitter;

  constructor() {
    this.showDropdown = this.showDropdown.bind(this);
  }

  componentDidLoad(): void {
    if (this.hostElement) {
      this.choice = new Choices(this.selectElement, { allowHTML: true });
      this.choicesInner = this.getChoiceInnerElement();

      if (this.choicesInner) {
        this.choicesInner.addEventListener('click', this.showDropdown);
      }
    }
  }

  disconnectedCallback(): void {
    this.destroy();
    this.choicesInner?.removeEventListener('click', this.showDropdown);
  }

  render() {
    return (
      <Host ref={el => (this.hostElement = el)}>
        <select
          ref={el => (this.selectElement = el)}
          onChange={this.onCatSelectChange.bind(this)}
          multiple={this.multiple}
        >
          {!!this.options?.length && <Options options={this.options} />}
        </select>
      </Host>
    );
  }

  private showDropdown() {
    this.choice?.showDropdown();
  }

  private destroy() {
    if (this.choice) {
      this.choice.destroy();
      this.choice = null;
    }
  }

  private getChoiceInnerElement() {
    return this.hostElement?.attachInternals().shadowRoot?.querySelector('.choices__inner');
  }

  private onCatSelectChange() {
    this.catSelectChange.emit(this.choice?.getValue());
  }
}
