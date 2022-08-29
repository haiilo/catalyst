import { autoUpdate, computePosition, offset, Placement } from '@floating-ui/dom';
import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import autosizeInput from 'autosize-input';
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
import { CatI18nRegistry } from '../cat-i18n/cat-i18n-registry';
import log from 'loglevel';
import { CatFormHint } from '../cat-form-hint/cat-form-hint';

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
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CatSelectRemoteConnector<T extends Item = any> {
  resolve: (id: string[]) => Observable<T[]>;
  retrieve: (term: string, page: number) => Observable<Page<T>>;
  render: (item: T) => RenderInfo;
}

export interface CatSelectRemoteState {
  term: string;
  isOpen: boolean;
  isLoading: boolean;
  isResolving: boolean;
  options: { item: Item; render: RenderInfo }[];
  selection: { item: Item; render: RenderInfo }[];
  activeOptionIndex: number;
  activeSelectionIndex: number;
  totalElements?: number;
}

const INIT_STATE: CatSelectRemoteState = {
  term: '',
  isOpen: false,
  isLoading: false,
  isResolving: false,
  options: [],
  selection: [],
  activeOptionIndex: -1,
  activeSelectionIndex: -1
};

let nextUniqueId = 0;

@Component({
  tag: 'cat-select-remote',
  styleUrl: 'cat-select-remote.scss',
  shadow: true
})
export class CatSelectRemote {
  private static readonly SKELETON_COUNT = 4;
  private static readonly DROPDOWN_OFFSET = 4;
  private readonly i18n = CatI18nRegistry.getInstance();
  private readonly id = `cat-input-${nextUniqueId++}`;

  private dropdown?: HTMLElement;
  private trigger?: HTMLElement;
  private input?: HTMLInputElement;

  private subscription?: Subscription;
  private term$: Subject<string> = new Subject();
  private more$: Subject<void> = new Subject();

  @Element() hostElement!: HTMLElement;

  @State() connector?: CatSelectRemoteConnector;

  @State() state: CatSelectRemoteState = INIT_STATE;

  @State() hasSlottedLabel = false;

  @Prop() debounce = 250;

  @Prop() placement: Placement = 'bottom-start';

  @Prop() value?: string[];

  /**
   * Whether the select is disabled.
   */
  @Prop() disabled = false;

  /**
   * The placeholder text to display within the select.
   */
  @Prop() placeholder?: string;

  /**
   * Optional hint text(s) to be displayed with the input.
   */
  @Prop() hint?: string | string[];

  /**
   * The label for the input.
   */
  @Prop() label = '';

  /**
   * The name of the form control. Submitted with the form as part of a name/value pair.
   */
  @Prop() name = '';

  /**
   * Visually hide the label, but still show it to assistive technologies like screen readers.
   */
  @Prop() labelHidden = false;

  /**
   * A value is required or must be check for the form to be submittable.
   */
  @Prop() required = false;

  /**
   * Whether the input should show a clear button.
   */
  @Prop() clearable = true; // TODO: false by default

  @Watch('connector')
  onConnectorChange(connector: CatSelectRemoteConnector) {
    this.reset(connector);
    this.resolve();
  }

  @Watch('state')
  onStateChange(newState: CatSelectRemoteState, oldState: CatSelectRemoteState) {
    const changed = (key: keyof CatSelectRemoteState) => newState[key] !== oldState[key];
    if (changed('activeOptionIndex')) {
      if (this.state.activeOptionIndex >= 0) {
        const option = this.dropdown?.querySelector(`#select-${this.id}-option-${this.state.activeOptionIndex}`);
        option?.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  @Event() catOpen!: EventEmitter<FocusEvent>;

  @Event() catClose!: EventEmitter<FocusEvent>;

  componentDidLoad(): void {
    if (this.input) {
      autosizeInput(this.input);
    }
    if (this.trigger && this.dropdown) {
      autoUpdate(this.trigger, this.dropdown, () => this.update());
    }
  }

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    if (!this.label && !this.hasSlottedLabel) {
      log.error('[A11y] Missing ARIA label on input', this);
    }
  }

  @Listen('blur')
  onBlur(): void {
    this.hide();
    this.patchState({ activeSelectionIndex: -1 });
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    const isInputFocused = this.hostElement.shadowRoot?.activeElement === this.input;

    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      this.onArrowKeyDown(event);
    } else if (['Enter', ' '].includes(event.key)) {
      if (isInputFocused && this.state.activeOptionIndex >= 0) {
        event.preventDefault();
        this.toggle(this.state.options[this.state.activeOptionIndex]);
      }
    } else if (event.key === 'Escape') {
      this.hide();
    } else if (event.key === 'Backspace') {
      this.input?.focus();
      if (!this.state.term || this.input?.selectionStart === 0) {
        if (this.state.activeSelectionIndex >= 0) {
          this.deselect(this.state.selection[this.state.activeSelectionIndex].item.id);
        } else {
          this.state.selection.pop();
          this.patchState({});
        }
      }
    } else if (event.key === 'Tab') {
      this.patchState({ activeSelectionIndex: -1, activeOptionIndex: -1 });
    } else if (event.key.length === 1) {
      this.input?.focus();
    }
  }

  @Listen('keyup')
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      this.trigger?.setAttribute('tabindex', '-1');
      this.show();
      this.hostElement.shadowRoot?.activeElement === this.trigger && this.input?.focus();
    }
  }

  @Method()
  async connect(connector: CatSelectRemoteConnector) {
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
            switchMap(number => this.connectorSafe.retrieve(term, number)),
            tap(page => this.patchState({ isLoading: false, totalElements: page.totalElements })),
            takeWhile(page => !page.last, true),
            scan((items, page) => [...items, ...page.content], [] as Item[])
          )
        )
      )
      .subscribe(items =>
        this.patchState({
          options: items?.map(item => ({
            item,
            render: this.connectorSafe.render(item)
          }))
        })
      );
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
        <div
          class={{ 'select-wrapper': true, 'select-disabled': this.disabled }}
          ref={el => (this.trigger = el)}
          role="combobox"
          aria-expanded={this.state.isOpen || this.isPillboxActive()}
          aria-controls={this.isPillboxActive() ? `select-pillbox-${this.id}` : `select-listbox-${this.id}`}
          aria-required={this.required}
          aria-activedescendant={this.activeDescendant}
          onClick={e => this.onClick(e)}
        >
          <div class="select-wrapper-inner">
            {this.state.selection.length ? (
              <div id={`select-pillbox-${this.id}`} role="listbox" aria-orientation="horizontal" class="select-pills">
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
                    <span>{item.render.label}</span>
                    {!this.disabled && (
                      <cat-button
                        size="xs"
                        variant="text"
                        icon="16-cross"
                        iconOnly
                        a11yLabel={this.i18n.t('select.deselect')}
                        onClick={() => this.deselect(item.item.id)}
                        tabIndex={-1}
                      ></cat-button>
                    )}
                  </span>
                ))}
              </div>
            ) : null}
            <input
              class="select-input"
              ref={el => (this.input = el)}
              aria-controls={this.isPillboxActive() ? `select-pillbox-${this.id}` : `select-listbox-${this.id}`}
              aria-activedescendant={this.activeDescendant}
              onInput={() => this.onInput()}
              placeholder={this.placeholder}
              disabled={this.disabled || this.state.isResolving}
            ></input>
          </div>
          {this.state.isResolving && <cat-spinner></cat-spinner>}
          {(this.state.selection.length || this.state.term.length) &&
          !this.disabled &&
          !this.state.isResolving &&
          this.clearable ? (
            <cat-button
              iconOnly
              icon="cross-circle-outlined"
              variant="text"
              size="s"
              a11yLabel={this.i18n.t('select.clear')}
              onClick={() => this.clear()}
            ></cat-button>
          ) : null}
          {!this.state.isResolving && (
            <cat-button
              iconOnly
              icon="chevron-down-outlined"
              class={{ 'select-btn': true, 'select-btn-open': this.state.isOpen }}
              variant="text"
              size="s"
              a11yLabel={this.state.isOpen ? this.i18n.t('select.close') : this.i18n.t('select.open')}
              tabIndex={-1}
              disabled={this.disabled || this.state.isResolving}
            ></cat-button>
          )}
        </div>
        {this.hintSection}
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
                aria-multiselectable={true}
                aria-setsize={this.state.totalElements}
                id={`select-listbox-${this.id}`}
              >
                {this.state.options.map((item, i) => (
                  <li
                    role="option"
                    class="select-option"
                    id={`select-${this.id}-option-${i}`}
                    aria-selected={this.isSelected(item.item.id) ? 'true' : 'false'}
                  >
                    <cat-checkbox
                      class={{ 'select-option-active': this.state.activeOptionIndex === i }}
                      checked={this.isSelected(item.item.id)}
                      tabIndex={-1}
                      labelLeft
                      onFocus={() => this.input?.focus()}
                      onCatChange={() => this.toggle(item)}
                    >
                      <span slot="label" class="select-option">
                        <span class="select-option-label">{item.render.label}</span>
                        <span class="select-option-description">{item.render.description}</span>
                      </span>
                    </cat-checkbox>
                  </li>
                ))}
                {this.state.isLoading
                  ? Array.from(Array(CatSelectRemote.SKELETON_COUNT)).map(() => (
                      <li class="select-option-loading">
                        <cat-skeleton variant="body" lines={1}></cat-skeleton>
                        <cat-skeleton variant="body" lines={1}></cat-skeleton>
                      </li>
                    ))
                  : !this.state.options.length && <li class="select-option-empty">{this.i18n.t('select.empty')}</li>}
              </ul>
            </cat-scrollable>
          )}
        </div>
      </Host>
    );
  }

  private get hintSection() {
    const hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    return (
      (this.hint || hasSlottedHint) && (
        <CatFormHint hint={this.hint} slottedHint={hasSlottedHint && <slot name="hint"></slot>} />
      )
    );
  }

  private get connectorSafe(): CatSelectRemoteConnector {
    if (this.connector) {
      return this.connector;
    }
    throw new Error('CatSelectRemoteConnector not set');
  }

  private resolve() {
    this.patchState({ isResolving: true });
    const data$ = this.value?.length ? this.connectorSafe.resolve(this.value).pipe(first()) : of([]);
    data$.pipe(catchError(() => of([]))).subscribe(items =>
      this.patchState({
        isResolving: false,
        selection: items?.map(item => ({ item, render: this.connectorSafe.render(item) }))
      })
    );
  }

  private show() {
    if (!this.state.isOpen) {
      this.patchState({ isOpen: true });
      this.catOpen.emit();
      this.term$.next(this.state.term);
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
      this.patchState({ selection: [...this.state.selection, item] });
    }
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
    this.isSelected(item.item.id) ? this.deselect(item.item.id) : this.select(item);
  }

  private clear() {
    if (this.input && this.state.term) {
      this.patchState({ selection: [], options: [], term: '', activeOptionIndex: -1 });
      this.term$.next('');
      this.input.value = '';
    } else {
      this.patchState({ selection: [] });
    }
  }

  private reset(connector?: CatSelectRemoteConnector) {
    this.connector = connector ?? this.connector;
    this.subscription?.unsubscribe();
    this.subscription = undefined;
    this.state = INIT_STATE;
  }

  private onClick(event: MouseEvent) {
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
    this.search(this.input?.value || '');
    this.show();
  }

  private update() {
    if (this.trigger && this.dropdown) {
      computePosition(this.trigger, this.dropdown, {
        placement: this.placement,
        middleware: [offset(CatSelectRemote.DROPDOWN_OFFSET)]
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

  private patchState(update: Partial<CatSelectRemoteState>) {
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

    if (event.key === 'ArrowDown') {
      preventDefault = true;
      this.state.isOpen
        ? this.patchState({
            activeOptionIndex: Math.min(this.state.activeOptionIndex + 1, this.state.options.length - 1),
            activeSelectionIndex: -1
          })
        : this.show();
    } else if (event.key === 'ArrowUp') {
      preventDefault = true;
      this.state.activeOptionIndex >= 0
        ? this.patchState({
            activeOptionIndex: Math.max(this.state.activeOptionIndex - 1, -1),
            activeSelectionIndex: -1
          })
        : this.hide();
    } else if (event.key === 'ArrowLeft') {
      if (this.input?.selectionStart === 0) {
        preventDefault = true;
        let index;
        this.state.activeSelectionIndex > 0
          ? (index = Math.max(this.state.activeSelectionIndex - 1, -1))
          : (index = this.state.selection.length - 1);
        this.patchState({ activeSelectionIndex: index, activeOptionIndex: -1 });
      }
    } else if (event.key === 'ArrowRight') {
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
}
