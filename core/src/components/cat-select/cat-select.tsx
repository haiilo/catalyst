import { Component, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import Choices from 'choices.js';
import { CatI18nRegistry } from '../cat-i18n/cat-i18n-registry';
import { FuseOptions, ItemFilterFn, ValueCompareFunction } from './interfaces';
import { filterObject, isDefined } from './utils';

export interface Option {
  value: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
}

const Options = ({ options }: { options: Option[] }) => {
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
  private readonly i18n = CatI18nRegistry.getInstance();

  private choice?: Choices | null = null;
  private hostElement: HTMLElement | null = null;
  private selectElement?: HTMLSelectElement;
  private choicesInner?: Element | null = null;

  @Prop() multiple = false;
  @Prop() position: 'auto' | 'top' | 'bottom' = 'auto';
  @Prop() searchable = true;

  // tags?
  @Prop() addItems = true;
  @Prop() editItems = false;
  @Prop() paste = false;

  @Prop() choices?: Option[];
  @Prop() placeholder?: string | boolean;
  @Prop() placeholderValue = '';
  @Prop() items?: Array<any>;
  @Prop() renderChoiceLimit?: number;
  @Prop() maxItemCount = false;
  @Prop() removeItemButton = true;
  @Prop() delimiter = '';
  @Prop() searchChoices = true;
  @Prop() searchFields?: Array<string> | string;
  @Prop() searchResultLimit?: number;
  @Prop() resetScrollPosition = false;
  @Prop() fuseOptions?: FuseOptions;
  @Prop() addItemFilter?: string | RegExp | ItemFilterFn;
  @Prop() valueComparer?: ValueCompareFunction;

  @Event() catChange!: EventEmitter;

  @Method()
  async setValue(args: Array<any>) {
    this.choice?.setValue(args);

    return this;
  }

  @Method()
  async setChoiceByValue(value: string) {
    this.choice?.setChoiceByValue(value);

    return this;
  }

  @Method()
  async setChoices(choices: Array<any>, value: string, label: string, replaceChoices?: boolean) {
    this.choice?.setChoices(choices, value, label, replaceChoices);

    return this;
  }

  @Method()
  async clearChoices() {
    this.choice?.clearChoices();

    return this;
  }

  @Method()
  async clearStore() {
    this.choice?.clearStore();

    return this;
  }

  @Method()
  async clearInput() {
    this.choice?.clearInput();

    return this;
  }

  @Method()
  async enable() {
    this.choice?.enable();

    return this;
  }

  @Method()
  async disable() {
    this.choice?.disable();

    return this;
  }

  constructor() {
    this.showDropdownHandler = this.showDropdownHandler.bind(this);
  }

  componentDidLoad(): void {
    if (this.hostElement) {
      this.init();
      this.choicesInner = this.getChoiceInnerElement();
      this.choicesInner?.addEventListener('click', () => this.showDropdownHandler);
    }
  }

  disconnectedCallback(): void {
    this.choice?.destroy();
    this.choice = null;
    this.choicesInner?.removeEventListener('click', this.showDropdownHandler);
  }

  render() {
    return (
      <Host ref={el => (this.hostElement = el)}>
        <select ref={el => (this.selectElement = el)} onChange={this.onChange.bind(this)} multiple={this.multiple}>
          {!!this.choices?.length && <Options options={this.choices} />}
        </select>
      </Host>
    );
  }

  private showDropdownHandler() {
    this.choice?.showDropdown();
  }

  private init() {
    const settings = filterObject({
      allowHTML: true,
      items: this.items,
      renderChoiceLimit: this.renderChoiceLimit,
      maxItemCount: this.maxItemCount,
      addItems: this.addItems,
      removeItems: true,
      removeItemButton: this.removeItemButton,
      editItems: this.editItems,
      duplicateItemsAllowed: false,
      delimiter: this.delimiter,
      paste: this.paste,
      searchEnabled: this.searchable,
      searchChoices: this.searchChoices,
      searchFields: this.searchFields,
      searchResultLimit: this.searchResultLimit,
      position: this.position,
      resetScrollPosition: this.resetScrollPosition,
      placeholder: true,
      placeholderValue: this.placeholderValue || (typeof this.placeholder === 'string' && this.placeholder) || '',
      searchPlaceholderValue: this.i18n.t('select.searchPlaceholder'),
      renderSelectedChoices: 'always',
      loadingText: this.i18n.t('select.loading'),
      noResultsText: this.i18n.t('select.noResults'),
      noChoicesText: this.i18n.t('select.noChoices'),
      itemSelectText: this.i18n.t('select.selectItem'),
      addItemText: (value: string) => this.i18n.t('select.addItem', { value }),
      maxItemText: (maxItemCount: number) => this.i18n.t('select.maxItem', { maxItemCount }),
      uniqueItemText: this.i18n.t('select.uniqueItem'),
      fuseOptions: this.fuseOptions,
      valueComparer: this.valueComparer,
      addItemFilter: this.addItemFilter,
      customAddItemText: this.i18n.t('select.customAddItem')
    }, isDefined);

    this.choice = new Choices(this.selectElement, settings);
  }

  private getChoiceInnerElement() {
    return this.hostElement?.attachInternals?.().shadowRoot?.querySelector('.choices__inner');
  }

  private onChange() {
    this.catChange.emit(this.choice?.getValue());
  }
}
