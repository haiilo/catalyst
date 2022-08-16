import { autoUpdate, computePosition, offset, Placement } from '@floating-ui/dom';
import { Component, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import {
  debounce,
  distinctUntilChanged,
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
import * as focusTrap from 'focus-trap';
import autosizeInput from 'autosize-input';

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

export interface CatSelectRemoteConnector<T extends Item = any> {
  resolve: (id: string[]) => Observable<T[]>;
  retrieve: (term: string, page: number) => Observable<Page<T>>;
  render: (item: T) => RenderInfo;
}

export interface CatSelectRemoteState {
  term: string;
  isOpen: boolean;
  isLoading: boolean;
  options: { item: Item; render: RenderInfo }[];
  selection: { item: Item; render: RenderInfo }[];
  activeIndex: number;
}

const INIT_STATE: CatSelectRemoteState = {
  term: '',
  isOpen: false,
  isLoading: false,
  options: [],
  selection: [],
  activeIndex: -1
};

@Component({
  tag: 'cat-select-remote',
  styleUrl: 'cat-select-remote.scss',
  shadow: true
})
export class CatSelectRemote {
  private readonly i18n = CatI18nRegistry.getInstance();
  private static readonly OFFSET = 4;

  private dropdown?: HTMLElement;
  private trigger?: HTMLElement;
  private input?: HTMLInputElement;
  private trap?: focusTrap.FocusTrap;

  private subscription?: Subscription;
  private term$: Subject<string> = new Subject();
  private more$: Subject<void> = new Subject();

  @Prop() debounce = 250;

  @Prop() placement: Placement = 'bottom-start';

  @Prop() value?: string[];

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

    if (changed('term')) {
      if (!newState.term && this.input) {
        this.input.value = '';
      }
    }

    if (changed('isOpen')) {
      newState.isOpen ? this.catOpen.emit() : this.catClose.emit();
    }

    if (changed('options')) {
      this.state.activeIndex = -1;
      /*
      if (this.dropdown) {
        this.trap = this.trap
          ? this.trap.updateContainerElements(this.dropdown)
          : focusTrap.createFocusTrap(this.dropdown, {
              //initialFocus: this.input,
              //fallbackFocus: this.input,
              tabbableOptions: {
                getShadowRoot: true
              },
              allowOutsideClick: true,
              clickOutsideDeactivates: event => true,
                //(!this.dropdown || !event.composedPath().includes(this.dropdown)) &&
                //(!this.trigger || !event.composedPath().includes(this.trigger)),
              onPostDeactivate: () => this.hide()
            });
        this.trap.activate();
      }
      */
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
              scan(n => n + 1, 0),
              startWith(0)
            ))
        ),
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
      autosizeInput(this.input)
    }
    if (this.trigger && this.dropdown) {
      autoUpdate(this.trigger, this.dropdown, () => this.update());
    }
  }

  onKeydown(event: KeyboardEvent): void {
    console.log(event);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      event.stopPropagation();
      if (this.state.isOpen) {
        this.patchState({ activeIndex: Math.min(this.state.activeIndex + 1, this.state.options.length - 1) });
      } else {
        this.show();
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      event.stopPropagation();
      this.patchState({ activeIndex: Math.max(this.state.activeIndex - 1, -1) });
    } else if (['Enter', ' '].includes(event.key)) {
      console.log(event);
      if (this.state.activeIndex >= 0) {
        event.preventDefault();
        event.stopPropagation();
        this.toggle(this.state.options[this.state.activeIndex]);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
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
        <div class="select-wrapper" ref={el => (this.trigger = el)}>
          <div class="select-wrapper-inner">
            {this.state.selection.map(item => (
              <span class="pill">
                <span>{item.render.label}</span>
                <cat-button
                  size="xs"
                  variant="text"
                  icon="cross-outlined"
                  iconOnly
                  round
                  a11yLabel={this.i18n.t('select.deselect')}
                  onClick={e => this.deselect(item.item.id)}
                ></cat-button>
              </span>
            ))}
            <input class="select-input"
            ref={el => (this.input = el)}
            onInput={() => this.search(this.input?.value || '')}
            onFocus={() => this.show()}
            onKeyDown={(e) => this.onKeydown(e)}
            aria-activedescendant={this.state.activeIndex >= 0 ? `select-option-${this.state.activeIndex}` : undefined}
            >
            </input>
          </div>

          {this.state.selection.length || this.state.term.length ? (
            <cat-button
              iconOnly
              icon="cross-circle-outlined"
              variant="text"
              size="s"
              round
              a11yLabel={this.i18n.t('select.clear')}
              onClick={e => this.clear()}
            ></cat-button>
          ) : null}
          <cat-button
            iconOnly
            icon="chevron-down-outlined"
            class={{ 'select-btn': true, 'select-btn-open': this.state.isOpen }}
            variant="text"
            size="s"
            round
            a11yLabel={this.state.isOpen ? this.i18n.t('select.close') : this.i18n.t('select.open')}
            onClick={e => (this.state.isOpen ? this.hide(e) : this.show(e))}
          ></cat-button>
        </div>
        <div
          class="select-dropdown"
          ref={el => (this.dropdown = el)}
          style={{ display: this.state.isOpen ? 'block' : undefined }}
        >
          <cat-scrollable
            class="select-options-wrapper"
            noOverflowX
            noOverscroll
            noScrolledInit
            onScrolledBottom={() => this.more$.next()}
          >
            {this.state.options.length ? (
              <ul class="select-options">
                {this.state.options.map((item, i) => (
                  <li>
                    <cat-checkbox tabindex="-1"
                      labelLeft
                      checked={this.isSelected(item.item.id)}
                      onCatChange={() => this.toggle(item)}
                      id={`select-option-${i}`}
                      class={{'select-option-active': this.state.activeIndex === i}}
                    >
                      <span slot="label" class="select-option">
                        <span class="select-option-label">{item.render.label}</span>
                        <span class="select-option-description">{item.render.description}</span>
                      </span>
                    </cat-checkbox>
                  </li>
                ))}
              </ul>
            ) : (
              <p class="select-empty">NO RESULTS</p>
            )}
          </cat-scrollable>
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
    const data$ = this.value?.length ? this.connectorSafe.resolve(this.value).pipe(first()) : of([]);
    data$.subscribe(items =>
      this.patchState({ selection: items?.map(item => ({ item, render: this.connectorSafe.render(item) })) })
    );
  }

  private show(event?: Event) {
    event?.stopPropagation();
    if (!this.state.isOpen) {
      this.patchState({ isOpen: true });
      this.term$.next(this.state.term);
    }
  }

  private hide(event?: Event) {
    event?.stopPropagation();
    if (this.state.isOpen) {
      this.patchState({ isOpen: false });
    }
  }

  private search(term: string) {
    this.patchState({ term });
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
    this.patchState({ selection: this.state.selection.filter(item => item.item.id !== id) });
  }

  private toggle(item: { item: Item; render: RenderInfo }) {
    this.isSelected(item.item.id) ? this.deselect(item.item.id) : this.select(item);
  }

  private clear() {
    if (this.state.term) {
      this.patchState({ selection: [], options: [], term: '' });
      this.term$.next('');
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
        middleware: [offset(CatSelectRemote.OFFSET)] //, flip()]
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
}
