import { autoUpdate, computePosition, offset, Placement } from '@floating-ui/dom';
import { Component, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
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

export interface Item {
  id: string;
}

export interface Page<T> {
  content: T[];
  last: boolean;
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
  activeIndex: number;
}

const INIT_STATE: CatSelectRemoteState = {
  term: '',
  isOpen: false,
  isLoading: false,
  isResolving: false,
  options: [],
  selection: [],
  activeIndex: -1
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

  @Prop() debounce = 250;

  @Prop() placement: Placement = 'bottom-start';

  @Prop() value?: string[];

  /**
   * Whether the input is disabled.
   */
  @Prop() disabled = false;

  /**
   * The placeholder text to display within the input.
   */
  @Prop() placeholder?: string;

  @State()
  connector?: CatSelectRemoteConnector;

  @Watch('connector')
  onConnectorChange(connector: CatSelectRemoteConnector) {
    this.reset(connector);
    this.resolve();
  }

  @State()
  state: CatSelectRemoteState = INIT_STATE;

  @Watch('state')
  onStateChange(newState: CatSelectRemoteState, oldState: CatSelectRemoteState) {
    const changed = (key: keyof CatSelectRemoteState) => newState[key] !== oldState[key];
    if (changed('activeIndex')) {
      if (this.state.activeIndex >= 0) {
        const option = this.dropdown?.querySelector(`#select-${this.id}-option-${this.state.activeIndex}`);
        option?.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  @Event() catOpen!: EventEmitter<FocusEvent>;

  @Event() catClose!: EventEmitter<FocusEvent>;

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
            tap(() => this.patchState({ isLoading: false })),
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

  componentDidLoad(): void {
    if (this.input) {
      autosizeInput(this.input);
    }
    if (this.trigger && this.dropdown) {
      autoUpdate(this.trigger, this.dropdown, () => this.update());
    }
  }

  @Listen('blur')
  onBlur(): void {
    this.hide();
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      this.state.isOpen
        ? this.patchState({ activeIndex: Math.min(this.state.activeIndex + 1, this.state.options.length - 1) })
        : this.show();
    } else if (event.key === 'ArrowUp') {
      this.state.activeIndex >= 0
        ? this.patchState({ activeIndex: Math.max(this.state.activeIndex - 1, -1) })
        : this.hide();
    } else if (['Enter', ' '].includes(event.key)) {
      if (this.state.activeIndex >= 0) {
        event.preventDefault();
        this.toggle(this.state.options[this.state.activeIndex]);
      }
    } else if (event.key === 'Escape') {
      this.hide();
    } else if (event.key === 'Backspace') {
      if (!this.state.term) {
        this.state.selection.pop();
        this.patchState({});
      }
    }
  }

  render() {
    return (
      <Host>
        <div
          class={{ 'select-wrapper': true, 'select-disabled': this.disabled }}
          ref={el => (this.trigger = el)}
          role="combobox"
          aria-expanded={this.state.isOpen}
          aria-controls={`select-listbox-${this.id}`}
          onClick={(e) => this.onWrapperClick(e)}
        >
          <div class="select-wrapper-inner">
            {this.state.selection.map(item => (
              <span class="pill">
                <span>{item.render.label}</span>
                {!this.disabled && (
                  <cat-button
                    size="xs"
                    variant="text"
                    icon="cross-outlined"
                    iconOnly
                    a11yLabel={this.i18n.t('select.deselect')}
                    onClick={() => this.deselect(item.item.id)}
                    tabIndex={-1}
                    //onFocus={() => this.input?.focus()}
                  ></cat-button>
                )}
              </span>
            ))}
            <input
              class="select-input"
              ref={el => (this.input = el)}
              onInput={() => this.search(this.input?.value || '')}
              aria-activedescendant={
                this.state.activeIndex >= 0 ? `select-option-${this.state.activeIndex}` : undefined
              }
              placeholder={this.placeholder}
              disabled={this.disabled || this.state.isResolving}
            ></input>
          </div>
          {this.state.isResolving && <cat-spinner></cat-spinner>}
          {(this.state.selection.length || this.state.term.length) && !this.disabled && !this.state.isResolving ? (
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
              round
              a11yLabel={this.state.isOpen ? this.i18n.t('select.close') : this.i18n.t('select.open')}
              onClick={() => this.state.isOpen ? this.hide() : this.show()}
              tabIndex={-1}
              disabled={this.disabled || this.state.isResolving}
            ></cat-button>
          )}
        </div>
        <div
          class="select-dropdown"
          role="listbox"
          id={`select-listbox-${this.id}`}
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
              <ul class="select-options">
                {this.state.options.map((item, i) => (
                  <li role="option" class="select-option" id={`select-${this.id}-option-${i}`} aria-selected={this.isSelected(item.item.id)}>
                    <cat-checkbox
                      class={{ 'select-option-active': this.state.activeIndex === i }}
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
      this.patchState({ isOpen: false, activeIndex: -1 });
      this.catClose.emit();
    }
  }

  private search(term: string) {
    this.patchState({ term, activeIndex: -1 });
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
      this.patchState({ selection: this.state.selection.filter(item => item.item.id !== id) });
    }
  }

  private toggle(item: { item: Item; render: RenderInfo }) {
    this.isSelected(item.item.id) ? this.deselect(item.item.id) : this.select(item);
  }

  private clear() {
    if (this.input && this.state.term) {
      this.patchState({ selection: [], options: [], term: '', activeIndex: -1 });
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

  private onWrapperClick(e: MouseEvent) {
    if (e.target === this.trigger || e.target === this.input) {
      this.input?.focus();
      this.show();
    }
  }
}
