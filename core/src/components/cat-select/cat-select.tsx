import { Component, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import Choices, { Item } from 'choices.js';
import { CatI18nRegistry } from '../cat-i18n/cat-i18n-registry';
import { ItemFilterFn, ValueCompareFunction } from './interfaces';
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
  private readonly searchResultLimit = 24;

  private choice?: Choices | null = null;
  private hostElement: HTMLElement | null = null;
  private selectElement?: HTMLSelectElement;
  private choicesInner?: Element | null = null;

  @Prop() multiple = false;
  @Prop() position: 'auto' | 'top' | 'bottom' = 'auto';
  @Prop() searchable = true;
  @Prop() disabled = false;

  // tags?
  @Prop() addItems = true;
  @Prop() editItems = false;
  @Prop() paste = false;

  @Prop() choices?: Option[];
  @Prop() placeholder = '';
  @Prop() items?: Array<any>;
  @Prop() maxItemCount = false;
  @Prop() removeItemButton = true;
  @Prop() delimiter = '';
  @Prop() searchChoices = true;
  @Prop() searchFields?: Array<string> | string;
  @Prop() resetScrollPosition = false;
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

  constructor() {
    this.showDropdownHandler = this.showDropdownHandler.bind(this);
  }

  componentDidLoad(): void {
    if (this.hostElement) {
      this.init();
      this.choicesInner = this.getChoiceInnerElement();
      this.choicesInner?.addEventListener('click', () => this.showDropdownHandler());
      this.selectElement?.addEventListener('choice', this.onChoice.bind(this));
      this.selectElement?.addEventListener('addItem', this.onChange.bind(this));
      this.selectElement?.addEventListener('removeItem', this.onChange.bind(this));
    }
  }

  disconnectedCallback(): void {
    this.choice?.destroy();
    this.choice = null;
    this.choicesInner?.removeEventListener('click', this.showDropdownHandler);
    this.selectElement?.removeEventListener('choice', this.onChoice.bind(this));
    this.selectElement?.removeEventListener('addItem', this.onChange.bind(this));
    this.selectElement?.removeEventListener('removeItem', this.onChange.bind(this));
  }

  render() {
    return (
      <Host ref={el => (this.hostElement = el)}>
        <select ref={el => (this.selectElement = el)} multiple={this.multiple} disabled={this.disabled}>
          {!!this.choices?.length && <Options options={this.choices} />}
        </select>
      </Host>
    );
  }

  private showDropdownHandler() {
    if (!this.disabled) {
      this.choice?.showDropdown();
    }
  }

  private init() {
    const config = {
      allowHTML: true,
      items: this.items,
      maxItemCount: this.maxItemCount,
      addItems: this.addItems,
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
      placeholder: this.placeholder?.length,
      placeholderValue: this.placeholder,
      searchPlaceholderValue: this.i18n.t('select.searchPlaceholder'),
      renderSelectedChoices: 'always',
      loadingText: this.i18n.t('select.loading'),
      noResultsText: this.i18n.t('select.noResults'),
      noChoicesText: this.i18n.t('select.noChoices'),
      itemSelectText: this.i18n.t('select.selectItem'),
      addItemText: (value: string) => this.i18n.t('select.addItem', { value }),
      maxItemText: (maxItemCount: number) => this.i18n.t('select.maxItem', { maxItemCount }),
      uniqueItemText: this.i18n.t('select.uniqueItem'),
      valueComparer: this.valueComparer,
      addItemFilter: this.addItemFilter,
      fuseOptions: {
        findAllMatches: true,
        includeScore: true,
        includeMatches: true,
        threshold: 0
      },
      customAddItemText: this.i18n.t('select.customAddItem')
    };

    const settings = filterObject(
      this.multiple
        ? {
            ...config,
            callbackOnCreateTemplates: (strToEl: (str: string) => HTMLElement) => {
              const itemSelectText = config.itemSelectText;
              return {
                choice: function ({ classNames }: { classNames: any }, data: any) {
                  return strToEl(
                    `
                <div
                  class="${String(classNames.item)} ${String(classNames.itemChoice)}
                    ${String(data.disabled ? classNames.itemDisabled : classNames.itemSelectable)}"
                  data-select-text="${itemSelectText}"
                  data-choice
                  ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'}
                  data-id="${String(data.id)}"
                  data-value="${String(data.value)}"
                  ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}
                >
                    <cat-checkbox label="${data.label}" checked="${data.selected}"></cat-checkbox>
                </div>
                `
                  );
                }
              };
            }
          }
        : config,
      isDefined
    );

    this.choice = new Choices(this.selectElement, settings);
  }

  private getChoiceInnerElement() {
    return this.hostElement?.attachInternals?.().shadowRoot?.querySelector('.choices__inner');
  }

  private onChange() {
    this.catChange.emit(this.choice?.getValue());
    if (this.multiple) this.modifyChoicesInnerElement();
  }

  private onChoice(event: Event) {
    const customEvent = event as CustomEvent;
    const items = Array.from(this.choice?.getValue() as Item[]);
    const item = items.find(value => value.choiceId === customEvent.detail.choice.id);
    if (item) {
      this.choice?._removeItem(item);
    }
  }

  private modifyChoicesInnerElement() {
    const catButton = this.choicesInner?.querySelector('cat-button');
    const items = Array.from(this.choice?.getValue() as Item[]);
    if (items.length && !catButton) {
      this.createRemoveItemsButton();
    } else if (!items.length) {
      catButton?.removeEventListener('click', this.onRemoveItemsClick.bind(this));
      catButton?.remove();
    }
  }

  private createRemoveItemsButton() {
    const button = document.createElement('cat-button') as HTMLCatButtonElement;
    button.icon = 'cross-circle-outlined';
    button.iconOnly = true;
    button.a11yLabel = 'Remove items';
    button.addEventListener('click', this.onRemoveItemsClick.bind(this));
    this.choicesInner?.appendChild(button);
  }

  private onRemoveItemsClick(event: Event) {
    event.stopPropagation();
    this.choice?.removeActiveItems(-1);
  }
}
