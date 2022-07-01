import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, Watch, State } from '@stencil/core';
import Choices, { Choice, ClassNames, Group, Item, Options } from 'choices.js';
import { CatI18nRegistry } from '../cat-i18n/cat-i18n-registry';
import log from 'loglevel';
import { CatFormHint } from '../cat-form-hint/cat-form-hint';

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

  private choice?: Choices;
  private choiceInner?: Element;
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
  @Prop() choices: Choice[] = [];

  /**
   * The pre-selected items for the input.
   */
  @Prop({ mutable: true }) value?: string | string[] | Choice | Choice[];

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
  @Prop() noSearch = false;

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

  @Watch('choices')
  setChoicesHandler(choices: Choice[]) {
    if (!choices?.length) return;

    this.setChoices(choices, 'value', 'label', true);
  }

  @Watch('value')
  setValueHandler(value?: string[] | Choice[]) {
    if (this.multiple) return;

    this.setValue(value || []);
  }

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    if (!this.label && !this.hasSlottedLabel) {
      log.error('[A11y] Missing ARIA label on select', this);
    }
  }

  componentDidLoad(): void {
    this.init();
    this.choiceInner = this.hostElement.attachInternals?.().shadowRoot?.querySelector('.choices__inner') || undefined;
    this.choiceInner?.addEventListener('click', this.showDropdownHandler.bind(this));
    this.selectElement?.addEventListener('addItem', this.onChange.bind(this));
    this.selectElement?.addEventListener('removeItem', this.onChange.bind(this));
    this.selectElement?.addEventListener('search', this.onSearch.bind(this));
    if (this.multiple) {
      this.selectElement?.addEventListener('choice', this.onChoice.bind(this));
      this.createRemoveItemButton();
    }
  }

  disconnectedCallback(): void {
    this.choice?.destroy();
    this.choice = undefined;
    this.choiceInner?.removeEventListener('click', this.showDropdownHandler.bind(this));
    this.selectElement?.removeEventListener('addItem', this.onChange.bind(this));
    this.selectElement?.removeEventListener('removeItem', this.onChange.bind(this));
    this.selectElement?.removeEventListener('search', this.onSearch.bind(this));
    if (this.multiple) {
      this.selectElement?.removeEventListener('choice', this.onChoice.bind(this));
      this.removeElement?.removeEventListener('click', this.onRemoveItemButtonClick.bind(this));
    }
  }

  /**
   * Set value of input based on an array of objects or strings. This behaves
   * exactly the same as passing items via the items option but can be called
   * after initialisation.
   */
  @Method()
  async setValue(args: Array<string> | Array<Item>) {
    this.choice?.setValue(args);

    return this;
  }

  /**
   * Set choices of select input via an array of objects (or function that
   * returns array of object or promise of it), a value field name and a label
   * field name.
   */
  @Method()
  async setChoices(choices: Array<Choice> | Array<Group>, value?: string, label?: string, replaceChoices?: boolean) {
    this.choice?.setChoices(choices, value, label, replaceChoices);

    return this;
  }

  /**
   * Clear all choices from select.
   */
  @Method()
  async clearChoices() {
    this.choice?.clearChoices();

    return this;
  }

  /**
   * Clear input of any user inputted text.
   */
  @Method()
  async clearInput() {
    this.choice?.clearInput();

    return this;
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
    const value = this.value || [];
    const removeItemText = (value: string) => this.i18n.t('select.removeItem', { value });
    const config = {
      allowHTML: true,
      items: Array.isArray(value) ? value : ([value] as string[] | Choice[]),
      removeItemButton: true,
      duplicateItemsAllowed: false,
      delimiter: '',
      paste: false,
      searchEnabled: !this.noSearch,
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
      customAddItemText: this.i18n.t('select.customAddItem')
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
    this.choice.setChoices(this.choices);
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
    this.value = this.choice?.getValue();
    this.catChange.emit(this.choice?.getValue());
    if (this.multiple) {
      this.updateRemoveItemButtonVisibility();
    }
  }

  private onSearch(event: Event) {
    const customEvent = event as CustomEvent<{ value: string }>;
    this.catSearch.emit(customEvent.detail.value);
  }

  private onChoice(event: Event) {
    const customEvent = event as CustomEvent<{ choice: Choice }>;
    const items = Array.from(this.choice?.getValue() as Item[]);
    const item = items.find(value => value.choiceId === customEvent.detail.choice.id);
    if (item) {
      this.choice?._removeItem(item);
    }
  }

  private showDropdownHandler() {
    if (!this.disabled) {
      this.choice?.showDropdown();
    }
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
    } else if (!items.length) {
      this.removeElement?.setAttribute('hidden', 'true');
    }
  }

  private onRemoveItemButtonClick(event: Event) {
    event.stopPropagation();
    this.choice?.removeActiveItems(-1);
  }
}
