import { Component, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import Choices, { Item } from 'choices.js';
import { CatI18nRegistry } from '../cat-i18n/cat-i18n-registry';
import { ClassNames, ItemFilterFn, ValueCompareFunction } from './interfaces';
import { filterObject, isDefined } from './utils';
import { Choice } from 'choices.js/src/scripts/interfaces/choice';
import { Group } from 'choices.js/public/types/src/scripts/interfaces/group';

export interface Option {
  value: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  choices?: Option[];
}

@Component({
  tag: 'cat-select',
  styleUrl: 'cat-select.scss',
  shadow: true
})
export class CatSelect {
  private readonly i18n = CatI18nRegistry.getInstance();
  private readonly searchResultLimit = 24;

  private choice?: Choices | null = null;
  private selectElement?: HTMLSelectElement;
  private removeItemsButton?: HTMLCatButtonElement;
  private choicesInner?: Element | null = null;

  @Element() hostElement!: HTMLElement;

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
  @Prop() items?: Array<string> | Array<Choice>;
  @Prop() maxItemCount = false;
  @Prop() removeItemButton = true;
  @Prop() delimiter = '';
  @Prop() searchChoices = true;
  @Prop() searchFields?: Array<string> | string;
  @Prop() resetScrollPosition = false;
  @Prop() addItemFilter?: string | RegExp | ItemFilterFn;
  @Prop() valueComparer?: ValueCompareFunction;

  @Event() catChange!: EventEmitter;

  constructor() {
    this.showDropdownHandler = this.showDropdownHandler.bind(this);
  }

  componentDidLoad(): void {
    this.init();
    this.choicesInner = this.getChoiceInnerElement();
    this.choicesInner?.addEventListener('click', () => this.showDropdownHandler());
    this.selectElement?.addEventListener('addItem', this.onChange.bind(this));
    this.selectElement?.addEventListener('removeItem', this.onChange.bind(this));
    if (this.multiple) {
      this.selectElement?.addEventListener('choice', this.onChoice.bind(this));
      this.createRemoveItemsButton();
    }
  }

  disconnectedCallback(): void {
    this.choice?.destroy();
    this.choice = null;
    this.choicesInner?.removeEventListener('click', this.showDropdownHandler);
    this.selectElement?.removeEventListener('addItem', this.onChange.bind(this));
    this.selectElement?.removeEventListener('removeItem', this.onChange.bind(this));
    if (this.multiple) {
      this.selectElement?.removeEventListener('choice', this.onChoice.bind(this));
      this.removeItemsButton?.removeEventListener('click', this.onRemoveItemsClick.bind(this));
    }
  }

  @Method()
  async setValue(args: Array<string> | Array<Item>) {
    this.choice?.setValue(args);

    return this;
  }

  @Method()
  async setChoiceByValue(value: string) {
    this.choice?.setChoiceByValue(value);

    return this;
  }

  @Method()
  async setChoices(choices: Array<Choice> | Array<Group>, value: string, label: string, replaceChoices?: boolean) {
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

  render() {
    return (
      <Host>
        <select ref={el => (this.selectElement = el)} multiple={this.multiple} disabled={this.disabled}></select>
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
                choice: function ({ classNames }: { classNames: ClassNames }, data: Item) {
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
                  ${data.groupId && data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}
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
    if (this.choices?.length) {
      this.choice.setChoices(this.choices);
    }
  }

  private getChoiceInnerElement() {
    return this.hostElement.attachInternals?.().shadowRoot?.querySelector('.choices__inner');
  }

  private onChange() {
    this.catChange.emit(this.choice?.getValue());
    if (this.multiple) this.updateRemoveItemsVisibility();
  }

  private onChoice(event: Event) {
    const customEvent = event as CustomEvent;
    const items = Array.from(this.choice?.getValue() as Item[]);
    const item = items.find(value => value.choiceId === customEvent.detail.choice.id);
    if (item) {
      this.choice?._removeItem(item);
    }
  }

  private updateRemoveItemsVisibility() {
    const items = Array.from(this.choice?.getValue() as Item[]);
    if (items.length) {
      this.removeItemsButton?.removeAttribute('hidden');
    } else if (!items.length) {
      this.removeItemsButton?.setAttribute('hidden', 'true');
    }
  }

  private createRemoveItemsButton() {
    this.removeItemsButton = document.createElement('cat-button') as HTMLCatButtonElement;
    this.removeItemsButton.icon = 'cross-circle-outlined';
    this.removeItemsButton.iconOnly = true;
    this.removeItemsButton.a11yLabel = 'Remove items';
    this.updateRemoveItemsVisibility();
    this.removeItemsButton.addEventListener('click', this.onRemoveItemsClick.bind(this));
    this.choicesInner?.appendChild(this.removeItemsButton);
  }

  private onRemoveItemsClick(event: Event) {
    event.stopPropagation();
    this.choice?.removeActiveItems(-1);
  }
}
