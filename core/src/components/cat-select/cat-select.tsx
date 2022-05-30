import { Component, Host, h, Prop, Event, EventEmitter, Method } from '@stencil/core';
import Choices, { Item } from 'choices.js';
import {
  AddItemTextFn,
  ClassNames,
  CustomAddItemText,
  FuseOptions,
  ItemFilterFn,
  MaxItemTextFn,
  NoChoicesTextFn,
  NoResultsTextFn,
  OnCreateTemplates,
  OnInit,
  SortFn,
  UniqueItemText,
  ValueCompareFunction
} from './interfaces';
import { filterObject, isDefined } from './utils';

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

  @Prop() multiple = false;
  @Prop() choices?: Option[];
  @Prop() searchEnabled = true;
  @Prop() searchPlaceholderValue = 'Search...';
  @Prop() placeholder?: string | boolean;
  @Prop() placeholderValue = '';
  @Prop() silent = false;
  @Prop() items?: Array<any>;
  @Prop() renderChoiceLimit?: number;
  @Prop() maxItemCount = false;
  @Prop() addItems = true;
  @Prop() removeItems = true;
  @Prop() removeItemButton = true;
  @Prop() editItems = false;
  @Prop() duplicateItemsAllowed = false;
  @Prop() delimiter = '';
  @Prop() paste = false;
  @Prop() searchChoices = true;
  @Prop() searchFields?: Array<string> | string;
  @Prop() searchFloor?: number;
  @Prop() searchResultLimit?: number;
  @Prop() position?: 'auto' | 'top' | 'bottom';
  @Prop() resetScrollPosition = false;
  @Prop() shouldSort = false;
  @Prop() shouldSortItems = false;
  @Prop() sorter?: SortFn;
  @Prop() prependValue = '';
  @Prop() appendValue = '';
  @Prop() renderSelectedChoices?: 'always' | 'auto';
  @Prop() loadingText = '';
  @Prop() noResultsText?: string | NoResultsTextFn;
  @Prop() noChoicesText?: string | NoChoicesTextFn;
  @Prop() itemSelectText = '';
  @Prop() addItemText?: string | AddItemTextFn;
  @Prop() maxItemText?: string | MaxItemTextFn;
  @Prop() uniqueItemText?: UniqueItemText;
  @Prop() classNames?: ClassNames;
  @Prop() fuseOptions?: FuseOptions;
  @Prop() addItemFilter?: string | RegExp | ItemFilterFn;
  @Prop() customAddItemText?: CustomAddItemText;
  @Prop() callbackOnInit?: OnInit;
  @Prop() callbackOnCreateTemplates?: OnCreateTemplates;
  @Prop() valueComparer?: ValueCompareFunction;

  @Event() catSelectChange!: EventEmitter;

  @Method()
  async highlightItem(item: Item, runEvent?: boolean) {
    this.choice?.highlightItem(item, runEvent);

    return this;
  }

  @Method()
  async unhighlightItem(item: Item) {
    this.choice?.unhighlightItem(item);

    return this;
  }

  @Method()
  async highlightAll() {
    this.choice?.highlightAll();

    return this;
  }

  @Method()
  async unhighlightAll() {
    this.choice?.unhighlightAll();

    return this;
  }

  @Method()
  async removeActiveItemsByValue(value: string) {
    this.choice?.removeActiveItemsByValue(value);

    return this;
  }

  @Method()
  async removeActiveItems(excludedId: number) {
    this.choice?.removeActiveItems(excludedId);

    return this;
  }

  @Method()
  async removeHighlightedItems(runEvent?: boolean) {
    this.choice?.removeHighlightedItems(runEvent);

    return this;
  }

  @Method()
  async hideDropdown(blurInput?: boolean) {
    this.choice?.hideDropdown(blurInput);

    return this;
  }

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

  @Method()
  async showDropdown() {
    this.choice?.showDropdown();

    return this;
  }

  constructor() {
    this.showDropdownHandler = this.showDropdownHandler.bind(this);
  }

  componentDidLoad(): void {
    if (this.hostElement) {
      this.init();
      this.choicesInner = this.getChoiceInnerElement();

      if (this.choicesInner) {
        this.choicesInner.addEventListener('click', this.showDropdownHandler);
      }
    }
  }

  disconnectedCallback(): void {
    this.destroy();
    this.choicesInner?.removeEventListener('click', this.showDropdownHandler);
  }

  render() {
    return (
      <Host ref={el => (this.hostElement = el)}>
        <select
          ref={el => (this.selectElement = el)}
          onChange={this.onCatSelectChange.bind(this)}
          multiple={this.multiple}
        >
          {!!this.choices?.length && <Options options={this.choices} />}
        </select>
      </Host>
    );
  }

  private showDropdownHandler() {
    this.choice?.showDropdown();
  }

  private init() {
    const props = {
      allowHTML: true,
      silent: this.silent,
      items: this.items,
      renderChoiceLimit: this.renderChoiceLimit,
      maxItemCount: this.maxItemCount,
      addItems: this.addItems,
      removeItems: this.removeItems,
      removeItemButton: this.removeItemButton,
      editItems: this.editItems,
      duplicateItemsAllowed: this.duplicateItemsAllowed,
      delimiter: this.delimiter,
      paste: this.paste,
      searchEnabled: this.searchEnabled,
      searchChoices: this.searchChoices,
      searchFields: this.searchFields,
      searchFloor: this.searchFloor,
      searchResultLimit: this.searchResultLimit,
      position: this.position,
      resetScrollPosition: this.resetScrollPosition,
      shouldSort: this.shouldSort,
      shouldSortItems: this.shouldSortItems,
      sorter: this.sorter,
      placeholder: true,
      placeholderValue: this.placeholderValue || (typeof this.placeholder === 'string' && this.placeholder) || '',
      searchPlaceholderValue: this.searchPlaceholderValue,
      prependValue: this.prependValue,
      appendValue: this.appendValue,
      renderSelectedChoices: this.renderSelectedChoices,
      loadingText: this.loadingText,
      noResultsText: this.noResultsText,
      noChoicesText: this.noChoicesText,
      itemSelectText: this.itemSelectText,
      addItemText: this.addItemText,
      maxItemText: this.maxItemText,
      uniqueItemText: this.uniqueItemText,
      classNames: this.classNames,
      fuseOptions: this.fuseOptions,
      callbackOnInit: this.callbackOnInit,
      callbackOnCreateTemplates: this.callbackOnCreateTemplates,
      valueComparer: this.valueComparer,
      addItemFilter: this.addItemFilter,
      customAddItemText: this.customAddItemText
    };
    const settings = filterObject(props, isDefined);

    this.choice = new Choices(this.selectElement, settings);
  }

  private destroy() {
    if (this.choice) {
      this.choice.destroy();
      this.choice = null;
    }
  }

  private getChoiceInnerElement() {
    return this.hostElement?.attachInternals?.().shadowRoot?.querySelector('.choices__inner');
  }

  private onCatSelectChange() {
    this.catSelectChange.emit(this.choice?.getValue());
  }
}
