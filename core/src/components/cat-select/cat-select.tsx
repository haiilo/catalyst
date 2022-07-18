import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch, Listen } from '@stencil/core';
import Choices, { Choice, ClassNames, Item, Options } from 'choices.js';
import log from 'loglevel';
import { CatFormHint } from '../cat-form-hint/cat-form-hint';
import { CatI18nRegistry } from '../cat-i18n/cat-i18n-registry';

let nextUniqueId = 0;

const getOptionTemplate = (data: Item): string => {
  if (data.customProperties?.imageUrl) {
    return `
    <div class="d-flex align-items-center">
      <img class="choices-option-icon" src="${data.customProperties.imageUrl}" style="margin-right: 0.5rem" />
      ${data.label}
    </div>
    `;
  }
  return `<cat-checkbox label="${data.label}" checked="${data.selected}"></cat-checkbox>`;
};

/**
 * A single option in the select.
 */
export type CatSelectItem = Pick<Choice, 'label' | 'value' | 'customProperties'>;

/**
 * Select lets user choose one option from an options menu. Consider using
 * select when you have 6 or more options. Select component supports any content
 * type.
 *
 * @slot hint - Optional hint element to be displayed with the select.
 * @slot label - The slotted label. If both the label property and the label slot are present, only the label slot will be displayed.
 * @part label - The label content.
 */
@Component({
  tag: 'cat-select',
  styleUrl: 'cat-select.scss',
  shadow: true
})
export class CatSelect {
  private readonly i18n = CatI18nRegistry.getInstance();
  private readonly id = `cat-select-${nextUniqueId++}`;
  private resetItemsOnNextValueChange = true;

  private choice?: Choices;
  private choiceInner?: Element;
  private choiceDropdown?: Element;
  private selectElement?: HTMLSelectElement;
  private removeElement?: HTMLCatButtonElement;

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  /**
   * The label for the select.
   */
  @Prop() label = '';

  /**
   * Visually hide the label, but still show it to assistive technologies like screen readers.
   */
  @Prop() labelHidden = false;

  /**
   * A value is required or must be check for the form to be submittable.
   */
  @Prop() required = false;

  /**
   * The available options for the input.
   */
  @Prop() items: CatSelectItem[] = [];

  /**
   * The value of the select.
   */
  @Prop({ mutable: true }) value?: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * Disable the select.
   */
  @Prop() disabled = false;

  /**
   * Enable multiple selection.
   */
  @Prop() multiple = false;

  /**
   * The placeholder for the select.
   */
  @Prop() placeholder = '';

  /**
   * Whether the dropdown should appear above `(top)` or below `(bottom)` the
   * input. By default, if there is not enough space within the window the
   * dropdown will appear above the input, otherwise below it.
   */
  @Prop() position: 'auto' | 'top' | 'bottom' = 'auto';

  /**
   * Enable search for the select.
   */
  @Prop() search = false;

  /**
   * Optional hint text(s) to be displayed with the select.
   */
  @Prop() hint?: string | string[];

  /**
   * Emitted when the value is changed.
   */
  @Event() catChange!: EventEmitter;

  /**
   * Emitted when the search is triggered.
   */
  @Event() catSearch!: EventEmitter;

  /**
   * Emitted when scrolled to the bottom.
   */
  @Event() catScrolledBottom!: EventEmitter;

  /**
   * Emitted when the select loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  @Watch('items')
  setChoicesHandler(items: CatSelectItem[]) {
    const isSelected = (item: CatSelectItem) => this.value?.includes(item.value);
    const choices = items.map(item => ({ ...item, selected: isSelected(item) }));
    this.choice?.setChoices(choices, 'value', 'label', true);

    const vItems = this.choice?.getValue() || [];
    const vItemsArray = (Array.isArray(vItems) ? vItems : [vItems]) as Item[];
    const vItemValues = [...this.value];

    // remove duplicate items
    this.choice?.unhighlightAll();
    vItemsArray.forEach(vItem => {
      const index = vItemValues.indexOf(vItem.value);
      if (index > -1) {
        vItemValues.splice(index, 1);
      } else {
        vItem.choiceId = -1; // disconnect item from choice
        this.choice?.highlightItem(vItem, false);
      }
    });
    this.choice?.removeHighlightedItems(false);
  }

  @Watch('value')
  setValueHandler(value?: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (this.resetItemsOnNextValueChange) {
      this.choice?.removeActiveItems(-1);
    }
    this.resetItemsOnNextValueChange = true;
    this.choice?.setChoiceByValue(value);
    this.multiple && this.updateRemoveItemButtonVisibility();
  }

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    if (!this.label && !this.hasSlottedLabel) {
      log.error('[A11y] Missing ARIA label on select', this);
    }
  }

  componentDidLoad(): void {
    this.init();
    const attachedInternals: ElementInternals | undefined = this.hostElement.attachInternals?.();
    if (attachedInternals) {
      const root = attachedInternals.shadowRoot;
      this.choiceInner = root?.querySelector('.choices__inner') || undefined;
      this.choiceDropdown = root?.querySelector('.choices__list--dropdown')?.firstElementChild || undefined;
    }
    this.choiceInner?.addEventListener('click', this.showDropdownHandler.bind(this));
    this.selectElement?.addEventListener('change', this.onChange.bind(this));
    this.selectElement?.addEventListener('search', this.onSearch.bind(this));
    this.choiceDropdown?.addEventListener('scroll', this.onScrolledBottom.bind(this));
    if (this.multiple) {
      this.selectElement?.addEventListener('choice', this.onChoice.bind(this));
      this.createRemoveItemButton();
    }
  }

  disconnectedCallback(): void {
    this.choice?.destroy();
    this.choice = undefined;
    this.choiceInner?.removeEventListener('click', this.showDropdownHandler.bind(this));
    this.selectElement?.removeEventListener('change', this.onChange.bind(this));
    this.selectElement?.removeEventListener('search', this.onSearch.bind(this));
    this.choiceDropdown?.removeEventListener('scroll', this.onScrolledBottom.bind(this));
    if (this.multiple) {
      this.removeElement?.removeEventListener('choice', this.onChoice.bind(this));
    }
  }

  @Listen('blur', { capture: true })
  onBlur(event: FocusEvent): void {
    this.catBlur.emit(event);
  }


  render() {
    return (
      <Host>
        {(this.hasSlottedLabel || this.label) && (
          <label htmlFor={this.id} class={{ hidden: this.labelHidden }}>
            <span part="label">
              {(this.hasSlottedLabel && <slot name="label"></slot>) || this.label}
              {!this.required && (
                <span class="input-optional" aria-hidden="true">
                  ({this.i18n.t('input.optional')})
                </span>
              )}
            </span>
          </label>
        )}
        <select
          id={this.id}
          ref={el => (this.selectElement = el)}
          multiple={this.multiple}
          disabled={this.disabled}
        ></select>
        {this.hintSection}
      </Host>
    );
  }

  private init() {
    const component = this; // eslint-disable-line @typescript-eslint/no-this-alias
    const removeItemText = (value: string) => this.i18n.t('select.removeItem', { value });
    const config = {
      allowHTML: true,
      removeItemButton: true,
      duplicateItemsAllowed: false,
      delimiter: '',
      paste: false,
      searchEnabled: this.search,
      searchChoices: false,
      position: this.position,
      resetScrollPosition: false,
      placeholder: !!this.placeholder,
      placeholderValue: this.placeholder || '',
      searchPlaceholderValue: this.i18n.t('select.searchPlaceholder'),
      renderSelectedChoices: 'always' as 'auto' | 'always',
      loadingText: this.i18n.t('select.loading'),
      noResultsText: this.i18n.t('select.noResults'),
      noChoicesText: this.i18n.t('select.noChoices'),
      itemSelectText: this.i18n.t('select.selectItem'),
      addItemText: (value: string) => this.i18n.t('select.addItem', { value }),
      maxItemText: (maxItemCount: number) => this.i18n.t('select.maxItem', { maxItemCount }),
      uniqueItemText: this.i18n.t('select.uniqueItem'),
      customAddItemText: this.i18n.t('select.customAddItem'),
      callbackOnInit: function () {
        const choice = this as unknown as Choices;
        choice.setChoices(component.items, 'value', 'label', true);
        choice.setChoiceByValue(component.value);
      }
    };

    const configSingle = {
      callbackOnCreateTemplates: (strToEl: (str: string) => HTMLElement) => {
        return {
          item: ({ classNames }: { classNames: ClassNames }, data: Item) => {
            const template = data.customProperties?.imageUrl
              ? `<img class="choices-option-icon" src="${data.customProperties.imageUrl}" style="margin-right: 0.5rem" />`
              : '';
            return strToEl(
              `
              <div class="${classNames.item} ${
                data.highlighted ? classNames.highlightedState : classNames.itemSelectable
              } ${data.placeholder ? classNames.placeholder : ''}" data-item data-id="${data.id}" data-value="${
                data.value
              }" ${data.active ? 'aria-selected="true"' : ''} ${data.disabled ? 'aria-disabled="true"' : ''}>
                  <span>${template}</span> ${data.label}
                  <button type="button"
                    class="${classNames.button}"
                    aria-label="${removeItemText(data.label)}"
                    data-button>${removeItemText(data.label)}</button>
              </div>
              `
            );
          }
        };
      }
    };

    const configMultiple = {
      callbackOnCreateTemplates: (strToEl: (str: string) => HTMLElement) => {
        const itemSelectText = config.itemSelectText;
        return {
          item: ({ classNames }: { classNames: ClassNames }, data: Item) => {
            const template = data.customProperties?.imageUrl
              ? `<img class="choices-option-icon" src="${data.customProperties.imageUrl}" style="margin-right: 0.5rem;" />`
              : '';
            return strToEl(
              `<div class="
                ${classNames.item}
                ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}
                ${data.placeholder ? classNames.placeholder : ''}"
                data-item data-id="${data.id}" data-value="${data.value}"
                ${data.active ? 'aria-selected="true"' : ''}
                ${data.disabled ? 'aria-disabled="true"' : ''}>
                  ${template}
                  ${data.label}
                  <button type="button"
                    class="${classNames.button}"
                    aria-label="${removeItemText(data.label)}"
                    data-button>${removeItemText(data.label)}</button>
              </div>`
            );
          },
          choice: function ({ classNames }: { classNames: ClassNames }, data: Item) {
            const template = getOptionTemplate(data);
            const className = `${String(classNames.item)} ${String(classNames.itemChoice)}
                  ${String(data.disabled ? classNames.itemDisabled : classNames.itemSelectable)}
                  ${data.selected ? 'choices__item--selected' : ''}`;
            return strToEl(
              `<div class="${className}"
                data-select-text="${itemSelectText}"
                data-choice data-id="${String(data.id)}" data-value="${String(data.value)}"
                ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'}
                ${data.groupId && data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
                  ${template}
              </div>`
            );
          }
        };
      }
    };

    const settings: Partial<Options> = this.multiple
      ? { ...config, ...configMultiple }
      : { ...config, ...configSingle };
    this.choice = new Choices(this.selectElement, settings);
  }

  private get hintSection() {
    const hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    return (
      (this.hint || hasSlottedHint) && (
        <CatFormHint hint={this.hint} slottedHint={hasSlottedHint && <slot name="hint"></slot>} />
      )
    );
  }

  private onChange() {
    this.resetItemsOnNextValueChange = false;
    this.value = this.choice?.getValue(true);
    this.catChange.emit(this.value);
  }

  private onChoice(event: Event) {
    const customEvent = event as CustomEvent<{ choice: Choice }>;
    const coice = customEvent.detail.choice;
    if (coice.selected) {
      this.choice?.removeActiveItemsByValue(coice.value);
      this.onChange();
    }
  }

  private onSearch(event: Event) {
    const customEvent = event as CustomEvent<{ value: string }>;
    this.catSearch.emit(customEvent.detail.value);
  }

  private onScrolledBottom() {
    const scrolledBottom =
      this.choiceDropdown?.scrollHeight ===
      (this.choiceDropdown?.scrollTop || 0) + (this.choiceDropdown?.clientHeight || 0);
    if (scrolledBottom) {
      this.catScrolledBottom.emit();
    }
  }

  private showDropdownHandler() {
    !this.disabled && this.choice?.showDropdown();
  }

  private createRemoveItemButton() {
    this.removeElement = document.createElement('cat-button') as HTMLCatButtonElement;
    this.removeElement.icon = 'cross-circle-outlined';
    this.removeElement.iconOnly = true;
    this.removeElement.a11yLabel = this.i18n.t('select.removeItem');
    this.updateRemoveItemButtonVisibility();
    this.removeElement.addEventListener('click', this.onRemoveItemButtonClick.bind(this));
    this.choiceInner?.appendChild(this.removeElement);
  }

  private updateRemoveItemButtonVisibility() {
    const items = Array.from(this.choice?.getValue() as Item[]);
    if (items.length) {
      this.removeElement?.removeAttribute('hidden');
    } else {
      this.removeElement?.setAttribute('hidden', 'true');
    }
  }

  private onRemoveItemButtonClick(event: Event) {
    event.stopPropagation();
    this.choice?.removeActiveItems(-1);
    this.updateRemoveItemButtonVisibility();
  }
}
