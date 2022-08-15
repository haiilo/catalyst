import { autoUpdate, computePosition, flip, offset, Placement } from '@floating-ui/dom';
import { Component, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import * as focusTrap from 'focus-trap';
import {
  debounce,
  distinctUntilChanged,
  Observable,
  of,
  scan,
  shareReplay,
  startWith,
  Subject,
  Subscription,
  switchMap,
  takeWhile,
  tap,
  timer
} from 'rxjs';

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
  resolve: (id: string[]) => Observable<Item[]>;
  retrieve: (term: string, page: number) => Observable<Page<T>>;
  render: (item: T) => RenderInfo;
}

/**
 * TODOS:
 * - optional search
 * - validate with local data (array)
 * - disabled
 * - a11y
 * - keyboard navigation
 */
@Component({
  tag: 'cat-select-remote',
  styleUrl: 'cat-select-remote.scss',
  shadow: true
})
export class CatSelectRemote {
  private static readonly OFFSET = 4;

  //private openValue = false;
  private searchValue = '';
  private dropdown?: HTMLElement;
  private trigger?: HTMLElement;
  private input?: HTMLElement;

  private data$?: Observable<Item[] | null>;
  private term$: Subject<string> = new Subject();
  private more$: Subject<void> = new Subject();

  private dataSub?: Subscription;
  private trap?: focusTrap.FocusTrap;

  @Prop() debounce = 250;

  @Prop() placement: Placement = 'bottom-start';

  @Prop() value?: string[];

  @State()
  connector?: CatSelectRemoteConnector;

  @Watch('connector')
  watchConnectorHandler(connector: CatSelectRemoteConnector) {
    this.reset(connector);
    this.resolve();
  }

  @State()
  selection: { item: Item; render: RenderInfo }[] = [];

  @State()
  options?: { item: Item; render: RenderInfo }[];

  //private dirty = false;

  //@Watch('options')
  //watchOptionsHandler(options?: { item: Item; render: RenderInfo }[]) {
  //  this.dirty = true;
  //}

  @State()
  isOpen = false;

  @State()
  isLoading = false;

  //@Watch('isOpen')
  //watchIsOpenHandler(isOpen: boolean) {
  //  isOpen ? this.catOpen.emit() : this.catClose.emit();
  //}

  @Event() catOpen!: EventEmitter<FocusEvent>;

  @Event() catClose!: EventEmitter<FocusEvent>;

  @Method()
  async connect(connector: CatSelectRemoteConnector) {
    this.connector = connector;
    let number$: Observable<number>;
    this.data$ = this.term$.asObservable().pipe(
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
          tap(() => (this.isLoading = true)),
          switchMap(number => this.connectorSafe.retrieve(term, number)),
          tap(() => (this.isLoading = false)),
          takeWhile(page => !page.last, true),
          scan((items, page) => [...items, ...page.content], [] as Item[])
        )
      ),
      shareReplay(1)
    );
  }

  // doFocus(options?: FocusOptions) {
  //   this.input?.focus(options);
  //   console.log(this.input, 'focus');
  // }

  componentDidLoad(): void {
    if (this.trigger && this.dropdown) {
      autoUpdate(this.trigger, this.dropdown, () => this.update());
    }
  }

  componentDidUpdate(): void {
    //if (this.dirty) {
    //this.dirty = false;
    if (this.dropdown) {
      console.log(this.options);
      this.trap = this.trap
        ? this.trap.updateContainerElements(this.dropdown)
        : focusTrap.createFocusTrap(this.dropdown, {
            initialFocus: this.input,
            fallbackFocus: this.input,
            tabbableOptions: {
              getShadowRoot: true
            },
            allowOutsideClick: true,
            clickOutsideDeactivates: event =>
              (!this.dropdown || !event.composedPath().includes(this.dropdown)) &&
              (!this.trigger || !event.composedPath().includes(this.trigger)),
            onPostDeactivate: () => this.hide()
          });
      this.trap.activate();
    //} else {
    //  this.trap?.deactivate();
    //  this.trap = undefined;
    }
    // }
  }

  private show(event?: Event) {
    event?.stopPropagation();
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    if (!this.dataSub) {
      this.dataSub = this.data$?.subscribe(
        items =>
          (this.options =
            items?.map(item => ({
              item,
              render: this.connectorSafe.render(item)
            })))
      );
    }
    if (!this.options) {
      this.search('');
    }
  }

  private hide(event?: Event) {
    event?.stopPropagation();
    this.isOpen = false;
    this.dataSub?.unsubscribe();
    this.dataSub = undefined;
  }

  render() {
    return (
      <Host>
        <div class="select-wrapper" ref={el => (this.trigger = el)} onClick={() => this.show()}>
          <div class="select-wrapper-inner">
            {this.selection.map(item => (
              <span class="pill">
                {item.render.label}
                <cat-button
                  size="xs"
                  variant="text"
                  icon="cross-outlined"
                  round
                  onClick={e => this.deselect(item.item.id, e)}
                ></cat-button>
              </span>
            ))}
            <span
              class="select-input"
              contenteditable
              ref={el => (this.input = el)}
              onInput={e => this.search((e.target as HTMLElement).textContent || '')}
            ></span>
          </div>

          {this.selection?.length ? (
            <cat-button
              iconOnly
              icon="cross-circle-outlined"
              variant="text"
              size="s"
              round
              onClick={e => this.clear(e)}
            ></cat-button>
          ) : null}

          <cat-button
            iconOnly
            icon={this.isOpen ? 'chevron-up-outlined' : 'chevron-down-outlined'}
            variant="text"
            size="s"
            round
            onClick={e => (this.isOpen ? this.hide(e) : this.show(e))}
          ></cat-button>
        </div>
        <div
          class="select-dropdown"
          ref={el => (this.dropdown = el)}
          style={{ display: this.isOpen ? 'block' : undefined }}
        >
          {this.isLoading ? (
            <p>LOADING</p>
          ) : this.options?.length ? (
            <cat-scrollable
              class="select-options-wrapper"
              noOverflowX
              noOverscroll
              onScrolledBottom={() => this.more()}
            >
              <ul class="select-options">
                {this.options.map(item => (
                  <li>
                    <cat-checkbox onCatChange={(e) => console.log(e)}>
                      <span slot="label" class="select-option">
                        <span class="select-option-label">{item.render.label}</span>
                        <span class="select-option-description">{item.render.description}</span>
                      </span>
                    </cat-checkbox>
                    <cat-button class="select-option" noEllipsis onClick={() => this.select(item)}>
                    </cat-button>
                  </li>
                ))}
              </ul>
            </cat-scrollable>
          ) : (
            <p>NO RESULTS</p>
          )}
        </div>
      </Host>
    );
  }

  private search(term: string) {
    this.term$.next(term);
  }

  private more() {
    this.more$.next();
  }

  private get connectorSafe(): CatSelectRemoteConnector {
    if (this.connector) {
      return this.connector;
    }
    throw new Error('CatSelectRemoteConnector not set');
  }

  private resolve() {
    if (this.value?.length) {
      this.connector?.resolve(this.value).subscribe(
        items =>
          (this.selection = items.map(item => ({
            item,
            render: this.connectorSafe.render(item)
          })))
      );
    } else {
      this.selection = [];
    }
  }

  private select(item: { item: Item; render: RenderInfo }, event?: Event) {
    event?.stopPropagation();
    if (!this.selection.find(s => s.item.id === item.item.id)) {
      this.selection = [...this.selection, item];
    }
    //TODO: reset focus to input?
  }

  private deselect(id: string, event?: Event) {
    event?.stopPropagation();
    this.selection = this.selection.filter(item => item.item.id !== id);
    //TODO: reset focus to input?
  }

  private clear(event?: Event) {
    event?.stopPropagation();
    this.selection = [];
    //TODO: reset focus to input?
  }

  private reset(connector?: CatSelectRemoteConnector) {
    this.connector = connector ?? this.connector;
    this.selection = [];
    this.options = undefined;
    this.isOpen = false;
  }

  private update() {
    if (this.trigger && this.dropdown) {
      computePosition(this.trigger, this.dropdown, {
        placement: this.placement,
        middleware: [offset(CatSelectRemote.OFFSET), flip()]
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
}
