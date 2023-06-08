import { autoUpdate, computePosition, offset, Placement } from '@floating-ui/dom';
import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import autosizeInput from 'autosize-input';
import log from 'loglevel';
import {
  catchError,
  debounce,
  distinctUntilChanged,
  filter,
  first,
  Observable,
  of,
  scan,
  startWith,
  Subject,
  Subscription,
  switchMap,
  takeWhile,
  tap,
  timer
} from 'rxjs';
import { coerceBoolean, coerceNumber } from '../../utils/coerce';
import { CatFormHint, ErrorMap } from '../cat-form-hint/cat-form-hint';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

export interface Item {
  id: string;
}

export interface Page<T> {
  content: T[];
  last: boolean;
  totalElements?: number;
}

export interface RenderInfo {
  label: string;
  description?: string;
  avatar?: {
    src?: string;
    round?: boolean;
    initials?: string;
    icon?: string;
  };
}

/**
 * @property customId - Change the ID of item for the given one.
 * @property resolve - Resolves the value of the select.
 * @property retrieve - Retrieves the options of the select.
 * @property render - Renders the items of the select.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CatSelectConnector<T extends Item = any> {
  customId?: (item: T) => string;
  resolve: (ids: string[]) => Observable<T[]>;
  retrieve: (term: string, page: number) => Observable<Page<T>>;
  render: (item: T) => RenderInfo;
}

export interface CatSelectState {
  term: string;
  isOpen: boolean;
  isLoading: boolean;
  isResolving: boolean;
  options: { item: Item; render: RenderInfo }[];
  tempSelection: { item: Item; render: RenderInfo }[];
  selection: { item: Item; render: RenderInfo }[];
  activeOptionIndex: number;
  activeSelectionIndex: number;
  totalElements?: number;
}

export interface CatSelectMultipleTaggingValue {
  ids: string[];
  tags: string[];
}

export interface CatSelectTaggingValue {
  id: string;
  tag: string;
}

const INIT_STATE: CatSelectState = {
  term: '',
  isOpen: false,
  isLoading: false,
  isResolving: false,
  options: [],
  selection: [],
  tempSelection: [],
  activeOptionIndex: -1,
  activeSelectionIndex: -1
};

let nextUniqueId = 0;

/**
 * Select lets user choose one option from an options' menu. Consider using
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
  private static readonly SKELETON_COUNT = 4;
  private static readonly DROPDOWN_OFFSET = 4;
  private readonly _id = `cat-input-${nextUniqueId++}`;
  private get id() {
    return this.identifier || this._id;
  }

  private dropdown?: HTMLElement;
  private trigger?: HTMLElement;
  private input?: HTMLInputElement;
  private errorMapSrc?: ErrorMap;

  private subscription?: Subscription;
  private term$: Subject<string> = new Subject();
  private more$: Subject<void> = new Subject();
  private valueChangedBySelection = false;

  @Element() hostElement!: HTMLElement;

  @State() connector?: CatSelectConnector;

  @State() state: CatSelectState = INIT_STATE;

  @State() hasSlottedLabel = false;

  @State() hasSlottedHint = false;

  @State() errorMap?: ErrorMap;

  /**
   * Whether the label need a marker to shown if the select is required or optional.
   */
  @Prop() requiredMarker: 'none' | 'required' | 'optional' | 'none!' | 'optional!' | 'required!' = 'optional';

  /**
   * Whether the label is on top or left.
   */
  @Prop() horizontal = false;

  /**
   * Enable multiple selection.
   */
  @Prop() multiple = false;

  /**
   * The debounce time for the search.
   */
  @Prop() debounce = 250;

  /**
   * The placement of the select.
   */
  @Prop() placement: Placement = 'bottom-start';

  /**
   * The value of the select. <br />
   * <br />
   * The value of the select depends on whether it is allowed to choose a single item or several items. <br />
   * When only one item can be selected, the value is the id of the item, in case several items can be selected, the value is an array of ids of the selected items. <br />
   * <br />
   * In case the user can add new items to the select (tags activated), the value in the single select is an object (CatSelectTaggingValue) with the id of the item or the name of the created item,
   * in the case of multiple select, it is an object (CatSelectMultipleTaggingValue) with the array of the ids of the items selected and the array of the names of the items created
   */
  @Prop({ mutable: true }) value?: string | string[] | CatSelectTaggingValue | CatSelectMultipleTaggingValue;

  /**
   * Whether the select is disabled.
   */
  @Prop() disabled = false;

  /**
   * The placeholder text to display within the select.
   */
  @Prop() placeholder?: string;

  /**
   * Optional hint text(s) to be displayed with the select.
   */
  @Prop() hint?: string | string[];

  /**
   * A unique identifier for the input.
   */
  @Prop() identifier?: string;

  /**
   * The label for the select.
   */
  @Prop() label = '';

  /**
   * The name of the form control. Submitted with the form as part of a name/value pair.
   */
  @Prop() name?: string;

  /**
   * Visually hide the label, but still show it to assistive technologies like screen readers.
   */
  @Prop() labelHidden = false;

  /**
   * A value is required or must be checked for the form to be submittable.
   */
  @Prop() required = false;

  /**
   * Whether the select should show a clear button.
   */
  @Prop() clearable = false;

  /**
   * Whether the select should add new items.
   */
  @Prop() tags = false;

  /**
   * Optional hint text to be displayed on the new item to be added.
   */
  @Prop() tagHint?: string;

  /**
   * The text to display in the dropdown if no results are found.
   */
  @Prop() noItems?: string;

  /**
   * The validation errors for this input. Will render a hint under the input
   * with the translated error message(s) `error.${key}`. If an object is
   * passed, the keys will be used as error keys and the values translation
   * parameters.
   * If the value is `true`, the input will be marked as invalid without any
   * hints under the input.
   */
  @Prop() errors?: boolean | string[] | ErrorMap;

  /**
   * Fine-grained control over when the errors are shown. Can be `false` to
   * never show errors, `true` to show errors on blur, or a number to show
   * errors on change with the given delay in milliseconds.
   */
  @Prop() errorUpdate: boolean | number = 0;

  /**
   * Attributes that will be added to the native HTML input element.
   */
  @Prop() nativeAttributes?: { [key: string]: string };

  @Watch('connector')
  onConnectorChange(connector: CatSelectConnector) {
    this.reset(connector);
    this.resolve();
  }

  @Watch('value')
  onValueChange() {
    !this.valueChangedBySelection ? this.resolve() : (this.valueChangedBySelection = false);
  }

  @Watch('errors')
  watchErrorsHandler(value?: boolean | string[] | ErrorMap) {
    if (!coerceBoolean(this.errorUpdate)) {
      this.errorMap = undefined;
    } else {
      this.errorMapSrc = Array.isArray(value)
        ? (value as string[]).reduce((acc, err) => ({ ...acc, [err]: undefined }), {})
        : value === true
        ? {}
        : value || undefined;
      this.showErrorsIfTimeout() || this.showErrorsIfNoFocus();
    }
  }

  @Watch('state')
  onStateChange(newState: CatSelectState, oldState: CatSelectState) {
    const changed = (key: keyof CatSelectState) => newState[key] !== oldState[key];
    if (changed('isOpen')) {
      this.update();
    }
    if (changed('activeOptionIndex') && this.state.activeOptionIndex >= 0) {
      this.dropdown
        ?.querySelector(`#select-${this.id}-option-${this.state.activeOptionIndex}`)
        ?.scrollIntoView({ block: 'nearest' });
    }

    if (changed('selection')) {
      let newValue;
      if (!this.multiple && this.state.selection.length) {
        this.hide();
      }
      const idsSelected = this.state.selection.map(item => item.item.id);
      if (!this.tags) {
        if (this.multiple) {
          newValue = idsSelected;
        } else {
          newValue = idsSelected.length ? idsSelected[0] : '';
        }
      } else {
        const ids = idsSelected.filter(id => !id.startsWith(`select-${this.id}-tag`));
        const tags = this.state.selection
          .filter(item => item.item.id.startsWith(`select-${this.id}-tag`))
          .map(item => item.render.label);
        if (this.multiple) {
          newValue = { ids, tags };
        } else {
          newValue = { id: ids.length ? ids[0] : '', tag: tags.length ? tags[0] : '' };
        }
      }

      if (!oldState.isResolving) {
        this.valueChangedBySelection = true;
        this.value = newValue;
      }
      this.catChange.emit();
      this.showErrorsIfTimeout();
    }
  }

  /**
   * Emitted when the select dropdown is opened.
   */
  @Event() catOpen!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the select dropdown is closed.
   */
  @Event() catClose!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the value is changed.
   */
  @Event() catChange!: EventEmitter<InputEvent>;

  /**
   * Emitted when the select loses the focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  componentDidLoad(): void {
    if (this.input) {
      autosizeInput(this.input);
    }
    if (this.trigger && this.dropdown) {
      autoUpdate(this.trigger, this.dropdown, () => this.update());
    }
  }

  componentWillRender(): void {
    this.watchErrorsHandler(this.errors);
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    if (!this.label && !this.hasSlottedLabel) {
      log.warn('[A11y] Missing ARIA label on select', this);
    }
  }

  @Listen('blur')
  onBlur(event: FocusEvent): void {
    if (!this.multiple && this.state.activeOptionIndex >= 0) {
      if (this.tags && this.state.options[this.state.activeOptionIndex].item.id === `select-${this.id}-option-tag`) {
        this.createTag(this.state.term);
      } else {
        this.select(this.state.options[this.state.activeOptionIndex]);
      }
    }
    this.hide();
    if (!this.multiple && this.state.tempSelection?.length) {
      this.patchState({
        activeSelectionIndex: -1,
        selection: this.state.tempSelection,
        tempSelection: [],
        options: [],
        term: this.state.tempSelection[0].render.label
      });
    } else {
      this.patchState({ activeSelectionIndex: -1 });
    }

    this.catBlur.emit(event);
    if (coerceBoolean(this.errorUpdate)) {
      this.showErrors();
    }
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    const isInputFocused = this.hostElement.shadowRoot?.activeElement === this.input;

    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      this.onArrowKeyDown(event);
    } else if (['Enter', ' '].includes(event.key) && isInputFocused) {
      if (
        this.tags &&
        this.state.activeOptionIndex === 0 &&
        this.state.options[0].item.id === `select-${this.id}-option-tag`
      ) {
        event.preventDefault();
        if (this.multiple) {
          this.toggleTag(this.state.options[0]);
        } else {
          this.createTag(this.state.options[0].render.label);
        }
      } else if (this.state.activeOptionIndex >= 0) {
        event.preventDefault();
        if (this.multiple) {
          this.toggle(this.state.options[this.state.activeOptionIndex]);
        } else {
          this.select(this.state.options[this.state.activeOptionIndex]);
        }
      } else if (this.tags && event.key === 'Enter' && this.state.activeOptionIndex < 0) {
        this.createTag(this.state.term);
      }
    } else if (event.key === 'Escape') {
      this.hide();
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
      this.input?.focus();
      if (!this.multiple || !this.state.term || (this.input?.selectionStart === 0 && event.key === 'Backspace')) {
        if (this.state.activeSelectionIndex >= 0) {
          this.deselect(this.state.selection[this.state.activeSelectionIndex].item.id);
        } else if (this.state.selection.length) {
          const selectionClone = [...this.state.selection];
          selectionClone.pop();
          this.patchState({
            selection: selectionClone,
            tempSelection: this.state.term ? [...this.state.selection] : []
          });
        }
      }
    } else if (event.key === 'Tab') {
      this.trigger?.setAttribute('tabindex', '-1');
      if (this.multiple) {
        this.patchState({ activeSelectionIndex: -1, activeOptionIndex: -1 });
      } else if (this.state.activeOptionIndex >= 0) {
        if (this.tags && this.state.options[this.state.activeOptionIndex].item.id === `select-${this.id}-option-tag`) {
          this.createTag(this.state.term);
        } else {
          this.select(this.state.options[this.state.activeOptionIndex]);
        }
      }
    } else if (event.key.length === 1) {
      this.input?.focus();
    }
  }

  @Listen('keyup')
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Tab' && !event.shiftKey) {
      this.hostElement.shadowRoot?.activeElement === this.trigger && this.input?.focus();
      if (this.hostElement.shadowRoot?.activeElement === this.input) {
        this.show();
      }
    } else if (event.key === 'Tab' && event.shiftKey) {
      const clearButton = this.trigger?.querySelector(`#select-clear-btn-${this.id}`);

      if (clearButton) {
        this.hostElement.shadowRoot?.activeElement === clearButton && this.show();
      } else {
        this.show();
      }
    }
  }

  /**
   * Connect the functions of the select
   *
   * @param connector - The {@link CatSelectConnector} of the select.
   */
  @Method()
  async connect(connector: CatSelectConnector): Promise<void> {
    this.connector = connector;
    let number$: Observable<number>;
    this.subscription?.unsubscribe();
    this.subscription = this.term$
      .asObservable()
      .pipe(
        debounce(term => (term ? timer(this.debounce) : of(0))),
        distinctUntilChanged(),
        tap(
          () =>
            (number$ = this.more$.pipe(
              filter(() => !this.state.isLoading),
              scan(n => n + 1, 0),
              startWith(0)
            ))
        ),
        tap(() => this.patchState({ options: [] })),
        switchMap(term =>
          number$.pipe(
            tap(() => this.patchState({ isLoading: true })),
            switchMap(number => connector.retrieve(term, number)),
            tap(page => this.patchState({ isLoading: false, totalElements: page.totalElements })),
            takeWhile(page => !page.last, true),
            scan((items, page) => [...items, ...page.content], [] as Item[])
          )
        )
      )
      .subscribe(items => {
        const options = this.toSelectItems(connector, items);

        if (
          this.tags &&
          this.state.term.trim().length &&
          !options.find(value1 => value1.render.label.toLowerCase() === this.state.term.toLowerCase())
        ) {
          let label;
          if (this.isTagSelected(this.state.term)) {
            label = this.state.selection.find(item => item.render.label.toLowerCase() === this.state.term.toLowerCase())
              ?.render.label;
          }
          options.unshift({
            item: { id: `select-${this.id}-option-tag` },
            render: { label: label ? label : this.state.term }
          });
        }
        this.patchState({
          options
        });
      });
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'select-field': true,
            'select-horizontal': this.horizontal
          }}
        >
          <div
            class={{
              hidden: this.labelHidden,
              'label-container': true
            }}
          >
            {(this.hasSlottedLabel || this.label) && (
              <label htmlFor={this.id}>
                <span class="label-wrapper" part="label">
                  {(this.hasSlottedLabel && <slot name="label"></slot>) || this.label}
                  <div class="label-metadata">
                    {!this.required && this.requiredMarker.startsWith('optional') && (
                      <span class="label-optional" aria-hidden="true">
                        ({i18n.t('input.optional')})
                      </span>
                    )}
                    {this.required && this.requiredMarker.startsWith('required') && (
                      <span class="label-optional" aria-hidden="true">
                        ({i18n.t('input.required')})
                      </span>
                    )}
                  </div>
                </span>
              </label>
            )}
          </div>

          <div class="select-container">
            <div
              class={{ 'select-wrapper': true, 'select-disabled': this.disabled, 'select-invalid': this.invalid }}
              ref={el => (this.trigger = el)}
              id={this.id}
              role="combobox"
              aria-expanded={this.state.isOpen || this.isPillboxActive()}
              aria-controls={this.isPillboxActive() ? `select-pillbox-${this.id}` : `select-listbox-${this.id}`}
              aria-required={this.required ? 'true' : false}
              aria-activedescendant={this.activeDescendant}
              onClick={e => this.onClick(e)}
            >
              <div class="select-wrapper-inner">
                {this.multiple && this.state.selection.length ? (
                  <div
                    id={`select-pillbox-${this.id}`}
                    role="listbox"
                    aria-orientation="horizontal"
                    class="select-pills"
                  >
                    {this.state.selection.map((item, i) => (
                      <span
                        class={{
                          pill: true,
                          'select-no-open': true,
                          'select-option-active': this.state.activeSelectionIndex === i
                        }}
                        role="option"
                        aria-selected="true"
                        id={`select-${this.id}-selection-${i}`}
                      >
                        {item.render.avatar ? (
                          <cat-avatar
                            label={item.render.label}
                            round={item.render.avatar.round}
                            src={item.render.avatar.src}
                            icon={item.render.avatar.icon}
                            initials={item.render.avatar.initials ?? ''}
                          ></cat-avatar>
                        ) : null}
                        <span>{item.render.label}</span>
                        {!this.disabled && (
                          <cat-button
                            size="xs"
                            variant="text"
                            icon="$cat:select-clear"
                            iconOnly
                            a11yLabel={i18n.t('select.deselect')}
                            onClick={() => this.deselect(item.item.id)}
                            tabIndex={-1}
                          ></cat-button>
                        )}
                      </span>
                    ))}
                  </div>
                ) : this.state.selection.length && this.state.selection[0].render.avatar ? (
                  <cat-avatar
                    label={this.state.selection[0].render.label}
                    round={this.state.selection[0].render.avatar.round}
                    src={this.state.selection[0].render.avatar.src}
                    icon={this.state.selection[0].render.avatar.icon}
                    initials={this.state.selection[0].render.avatar.initials ?? ''}
                  ></cat-avatar>
                ) : null}
                <input
                  {...this.nativeAttributes}
                  class="select-input"
                  ref={el => (this.input = el)}
                  aria-controls={this.isPillboxActive() ? `select-pillbox-${this.id}` : `select-listbox-${this.id}`}
                  aria-activedescendant={this.activeDescendant}
                  aria-invalid={this.invalid ? 'true' : undefined}
                  aria-describedby={this.hint?.length ? this.id + '-hint' : undefined}
                  onInput={this.onInput.bind(this)}
                  value={!this.multiple ? this.state.term : undefined}
                  placeholder={this.placeholder}
                  disabled={this.disabled || this.state.isResolving}
                ></input>
              </div>
              {this.state.isResolving && <cat-spinner></cat-spinner>}
              {this.invalid && (
                <cat-icon icon="$cat:input-error" class="icon-suffix cat-text-danger" size="l"></cat-icon>
              )}
              {(this.state.selection.length || this.state.term.length) &&
              !this.disabled &&
              !this.state.isResolving &&
              this.clearable ? (
                <cat-button
                  id={`select-clear-btn-${this.id}`}
                  iconOnly
                  icon="$cat:input-close"
                  variant="text"
                  size="s"
                  a11yLabel={i18n.t('input.clear')}
                  onClick={() => this.clear()}
                ></cat-button>
              ) : null}
              {!this.state.isResolving && (
                <cat-button
                  iconOnly
                  icon="$cat:select-open"
                  class={{ 'select-btn': true, 'select-btn-open': this.state.isOpen }}
                  variant="text"
                  size="s"
                  a11yLabel={this.state.isOpen ? i18n.t('select.close') : i18n.t('select.open')}
                  aria-controls={`select-listbox-${this.id}`}
                  aria-expanded={this.state.isOpen}
                  tabIndex={-1}
                  disabled={this.disabled || this.state.isResolving}
                ></cat-button>
              )}
            </div>
            {(this.hint || this.hasSlottedHint || !!Object.keys(this.errorMap || {}).length) && (
              <CatFormHint
                id={this.id}
                hint={this.hint}
                slottedHint={this.hasSlottedHint && <slot name="hint"></slot>}
                errorMap={this.errorMap}
              />
            )}
          </div>
        </div>

        <div
          class="select-dropdown"
          ref={el => (this.dropdown = el)}
          style={{ display: this.state.isOpen ? 'block' : undefined }}
        >
          {this.state.isOpen && (
            <cat-scrollable
              class="select-options-wrapper"
              scrolledBuffer={56}
              noOverflowX
              noOverscroll
              noScrolledInit
              onScrolledBottom={() => this.more$.next()}
            >
              <ul
                class="select-options"
                role="listbox"
                aria-multiselectable={this.multiple}
                aria-setsize={this.state.totalElements}
                id={`select-listbox-${this.id}`}
              >
                {this.optionsList}
                {this.state.isLoading
                  ? Array.from(Array(CatSelect.SKELETON_COUNT)).map(() => (
                      <li class="select-option-loading">
                        <cat-skeleton variant="body" lines={1}></cat-skeleton>
                        <cat-skeleton variant="body" lines={1}></cat-skeleton>
                      </li>
                    ))
                  : !this.state.options.length &&
                    !this.tags && (
                      <li class="select-option-empty">{this.noItems ? this.noItems : i18n.t('select.empty')}</li>
                    )}
              </ul>
            </cat-scrollable>
          )}
        </div>
      </Host>
    );
  }

  private get invalid() {
    return !!this.errorMap;
  }

  private get optionsList() {
    return this.state.options.map((item, i) => {
      const isTagOption = this.tags && item.item.id === `select-${this.id}-option-tag`;

      const isOptionSelected = this.isSelected(item.item.id) || (this.tags && this.isTagSelected(item.render.label));

      const getLabel = () => {
        if (isTagOption) {
          return item.render.label + this.tagTextHelp;
        }
        return item.render.label;
      };

      return (
        <li
          role="option"
          class="select-option"
          id={`select-${this.id}-option-${i}`}
          aria-selected={isOptionSelected ? 'true' : 'false'}
        >
          {this.multiple ? (
            <cat-checkbox
              class={{ 'select-option-active': this.state.activeOptionIndex === i }}
              checked={isOptionSelected}
              tabIndex={-1}
              labelLeft
              onFocus={() => this.input?.focus()}
              onCatChange={e => {
                !isTagOption ? this.toggle(item) : this.toggleTag(item);
                e.stopPropagation();
              }}
            >
              <span slot="label" class="select-option-inner">
                {item.render.avatar ? (
                  <cat-avatar
                    label={item.render.label}
                    round={item.render.avatar.round}
                    src={item.render.avatar.src}
                    icon={item.render.avatar.icon}
                    initials={item.render.avatar.initials ?? ''}
                  ></cat-avatar>
                ) : null}
                <span class="select-option-text">
                  <span class="select-option-label">{getLabel()}</span>
                  <span class="select-option-description">{item.render.description}</span>
                </span>
              </span>
            </cat-checkbox>
          ) : (
            <div
              class={{
                'select-option-inner': true,
                'select-option-single': true,
                'select-option-active': this.state.activeOptionIndex === i
              }}
              onFocus={() => this.input?.focus()}
              onClick={() => (isTagOption ? this.createTag(item.render.label) : this.select(item))}
              tabIndex={-1}
            >
              {item.render.avatar ? (
                <cat-avatar
                  label={item.render.label}
                  round={item.render.avatar.round}
                  src={item.render.avatar.src}
                  icon={item.render.avatar.icon}
                  initials={item.render.avatar.initials ?? ''}
                ></cat-avatar>
              ) : null}
              <span class="select-option-text">
                <span class="select-option-label">{getLabel()}</span>
                <span class="select-option-description">{item.render.description}</span>
              </span>
            </div>
          )}
        </li>
      );
    });
  }

  private resolve() {
    const connector = this.connector;
    if (!connector) {
      return;
    }
    this.patchState({ isResolving: true });

    const ids = this.initIds();
    let tags: string[];

    if (this.tags) {
      tags = this.initTags();
    }

    const data$ = ids.length ? connector.resolve(ids).pipe(first()) : of([]);
    data$.pipe(catchError(() => of([]))).subscribe(items => {
      const selection = this.toSelectItems(connector, items);
      if (this.tags) {
        tags
          .filter(tag => !this.isTagSelected(tag, selection))
          .forEach((tag, index) => {
            const item = { id: `select-${this.id}-tag-${index}`, name: tag };
            selection.push({ item, render: { label: item.name } });
          });
      }
      this.patchState({
        isResolving: false,
        selection,
        term: !this.multiple && selection.length ? selection[0].render.label : ''
      });
    });
  }

  private toSelectItems(connector: CatSelectConnector, items: Item[]) {
    return items.map(item => ({
      item: { ...item, id: connector.customId ? connector.customId(item) : item.id },
      render: connector.render(item)
    }));
  }

  private show() {
    if (!this.state.isOpen) {
      this.patchState({ isOpen: true });
      this.catOpen.emit();
      this.term$.next('');
      this.input?.classList.remove('select-input-transparent-caret');
    }
  }

  private hide() {
    if (this.state.isOpen) {
      this.patchState({ isOpen: false, activeOptionIndex: -1 });
      this.catClose.emit();
    }
  }

  private search(term: string) {
    this.patchState({ term, activeOptionIndex: -1, activeSelectionIndex: -1 });
    this.term$.next(term);
  }

  private isSelected(id: string) {
    return this.state.selection.findIndex(s => s.item.id === id) >= 0;
  }

  private select(item: { item: Item; render: RenderInfo }) {
    if (!this.isSelected(item.item.id)) {
      let newSelection;
      if (this.multiple) {
        newSelection = [...this.state.selection, item];
      } else {
        newSelection = [item];
        this.search(item.render.label);
      }
      this.patchState({ selection: newSelection });

      if (this.multiple && this.state.term.trim() && this.input) {
        this.patchState({ term: '', activeOptionIndex: -1 });
        this.term$.next('');
        this.input.value = '';
      }
    }
    this.setTransparentCaret();
  }

  private deselect(id: string) {
    if (this.isSelected(id)) {
      this.patchState({
        selection: this.state.selection.filter(item => item.item.id !== id),
        activeSelectionIndex: -1
      });
    }
  }

  private toggle(item: { item: Item; render: RenderInfo }) {
    this.isSelected(item.item.id)
      ? this.deselect(item.item.id)
      : this.tags && this.isTagSelected(item.render.label)
      ? this.removeTag(item.render.label)
      : this.select(item);
  }

  private clear() {
    if (this.input && this.state.term) {
      this.patchState({ selection: [], options: [], term: '', activeOptionIndex: -1, tempSelection: [] });
      this.term$.next('');
      this.input.value = '';
    } else {
      this.patchState({ selection: [], tempSelection: [] });
    }
  }

  private reset(connector?: CatSelectConnector) {
    this.connector = connector ?? this.connector;
    this.subscription?.unsubscribe();
    this.subscription = undefined;
    this.state = INIT_STATE;
  }

  private onClick(event: MouseEvent) {
    if (this.disabled) {
      return;
    }
    const elem = event.target as Element;
    this.trigger?.setAttribute('tabindex', '0');
    this.input?.focus();
    if (
      elem === this.trigger ||
      elem === this.input ||
      elem.classList.contains('select-btn') ||
      elem.nodeName === 'SPAN'
    ) {
      this.state.isOpen ? this.hide() : this.show();
    }
  }

  private onInput() {
    this.search(this.input?.value.trim() || '');
    if (!this.multiple) {
      if (this.state.selection.length) {
        const selectionClone = [...this.state.selection];
        selectionClone.pop();
        this.patchState({ selection: selectionClone, tempSelection: [...this.state.selection] });
      }

      if (!this.input?.value.trim()) {
        this.patchState({ tempSelection: [] });
      }
    }
    this.show();
  }

  private update() {
    if (this.trigger && this.dropdown) {
      computePosition(this.trigger, this.dropdown, {
        placement: this.placement,
        middleware: [offset(CatSelect.DROPDOWN_OFFSET)]
      }).then(({ x, y }) => {
        if (this.dropdown) {
          Object.assign(this.dropdown.style, {
            left: `${x}px`,
            top: `${y}px`
          });
        }
      });
    }
  }

  private patchState(update: Partial<CatSelectState>) {
    this.state = { ...this.state, ...update };
  }

  private isPillboxActive() {
    return this.state.activeSelectionIndex >= 0;
  }

  private get activeDescendant() {
    let activeDescendant = undefined;
    if (this.state.activeOptionIndex >= 0) {
      activeDescendant = `select-${this.id}-option-${this.state.activeOptionIndex}`;
    } else if (this.state.activeSelectionIndex >= 0) {
      activeDescendant = `select-${this.id}-selection-${this.state.activeSelectionIndex}`;
    }
    return activeDescendant;
  }

  private onArrowKeyDown(event: KeyboardEvent) {
    let preventDefault = false;
    this.input?.focus();

    switch (event.key) {
      case 'ArrowDown':
        preventDefault = true;
        this.state.isOpen
          ? this.patchState({
              activeOptionIndex: Math.min(this.state.activeOptionIndex + 1, this.state.options.length - 1),
              activeSelectionIndex: -1
            })
          : this.show();
        break;
      case 'ArrowUp':
        preventDefault = true;
        this.state.activeOptionIndex >= 0
          ? this.patchState({
              activeOptionIndex: Math.max(this.state.activeOptionIndex - 1, -1),
              activeSelectionIndex: -1
            })
          : this.hide();
        break;
      case 'ArrowLeft':
        if (this.input?.selectionStart === 0) {
          preventDefault = true;
          let index;
          this.state.activeSelectionIndex > 0
            ? (index = Math.max(this.state.activeSelectionIndex - 1, -1))
            : (index = this.state.selection.length - 1);
          this.patchState({ activeSelectionIndex: index, activeOptionIndex: -1 });
        }
        break;
      case 'ArrowRight':
        if (this.state.activeSelectionIndex >= 0) {
          preventDefault = true;
          let index = -1;
          if (this.state.activeSelectionIndex < this.state.selection.length - 1) {
            index = Math.min(this.state.activeSelectionIndex + 1, this.state.selection.length - 1);
          } else if (!this.state.term) {
            index = 0;
          }
          this.patchState({ activeSelectionIndex: index, activeOptionIndex: -1 });
        }
    }

    if (preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private get tagTextHelp() {
    return this.tagHint && !this.isTagSelected(this.state.term) ? ' (' + this.tagHint + ')' : '';
  }

  private isTagSelected(term: string, selection: { item: Item; render: RenderInfo }[] = this.state.selection) {
    return selection.findIndex(item => item.render.label.toLowerCase() === term.toLowerCase()) >= 0;
  }

  private createTag(term: string) {
    if (term.trim().length && !this.isTagSelected(term)) {
      const value = this.value as CatSelectMultipleTaggingValue;
      const tags = value?.tags;
      const tag = { id: `select-${this.id}-tag-${tags ? tags.length : 0}`, name: term };
      this.select({ item: tag, render: { label: tag.name } });
    }
    this.setTransparentCaret();
  }

  private removeTag(label: string) {
    if (this.isTagSelected(label)) {
      const item = this.state.selection.find(item => item.render.label.toLowerCase() === label.toLowerCase());
      item && this.deselect(item.item.id);
    }
  }

  private toggleTag(item: { item: Item; render: RenderInfo }) {
    this.isTagSelected(item.render.label) ? this.removeTag(item.render.label) : this.createTag(item.render.label);
  }

  private initIds() {
    let ids: string[] = [];
    if (this.value) {
      if (!this.tags) {
        if (this.multiple) {
          ids = this.value as string[];
        } else {
          ids = [this.value as string];
        }
      } else {
        if (this.multiple) {
          const value = this.value as CatSelectMultipleTaggingValue;
          ids = value.ids ? value.ids : [];
        } else {
          const value = this.value as CatSelectTaggingValue;
          ids = value.id ? [value.id] : [];
        }
      }
    }
    return ids;
  }

  private initTags() {
    let tags: string[] = [];
    if (this.value) {
      if (this.multiple) {
        const value = this.value as CatSelectMultipleTaggingValue;
        tags = value.tags ? value.tags : [];
      } else {
        const value = this.value as CatSelectTaggingValue;
        tags = value.tag ? [value.tag] : [];
      }
    }
    return tags;
  }

  private setTransparentCaret() {
    if (!this.multiple) {
      this.hide();
      this.input?.classList.add('select-input-transparent-caret');
    }
  }

  private showErrors() {
    this.errorMap = this.errorMapSrc;
  }

  private errorUpdateTimeoutId?: number;
  private showErrorsIfTimeout() {
    const errorUpdate = coerceNumber(this.errorUpdate, null);
    if (errorUpdate !== null) {
      typeof this.errorUpdateTimeoutId === 'number' && window.clearTimeout(this.errorUpdateTimeoutId);
      this.errorUpdateTimeoutId = window.setTimeout(() => this.showErrors(), errorUpdate);
      return true;
    }
    return false;
  }

  private showErrorsIfNoFocus() {
    const hasFocus = document.activeElement === this.hostElement || document.activeElement === this.input;
    if (!hasFocus) {
      this.showErrors();
    }
  }
}
