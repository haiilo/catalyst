import { Component, Host, h, Prop, Element, EventEmitter, Event } from '@stencil/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

@Component({
  tag: 'cat-scrollable',
  styleUrl: 'cat-scrollable.scss',
  shadow: true
})
export class CatScrollable {
  scrollElement?: HTMLElement;
  private init = new Subject<void>();
  private destroyed = new Subject<void>();
  private scrolled!: Observable<Event>;

  @Element() el!: HTMLElement;

  /** Flags to enable/disable scroll shadowX. */
  @Prop()
  shadowX = true;

  /** Flags to enable/disable scroll shadowY. */
  @Prop()
  shadowY = true;

  /** Flags to enable/disable overflowX. */
  @Prop()
  overflowX = true;

  /** Flags to enable/disable overflowY. */
  @Prop()
  overflowY = true;

  /** Flag to enable/disable overscroll behavior. */
  @Prop()
  overscroll = true;

  /**
   * Flag to fire an initial event after content initialization.
   */
  @Prop() scrolledInit = true;

  /**
   * Buffer to be used to calculate the scroll distance.
   */
  @Prop()
  scrolledBuffer = 0;

  @Event() scrolledBottom!: EventEmitter<void>;
  @Event() scrolledTop!: EventEmitter<void>;
  @Event() scrolledLeft!: EventEmitter<void>;
  @Event() scrolledRight!: EventEmitter<void>;

  componentDidRender() {
    if (this.scrollElement) {
      console.log(this.scrollElement);
      this.scrolled = fromEvent(this.el, 'scroll')
        .pipe(takeUntil(this.destroyed));
    }
    this.attachEmitter('left', this.scrolledLeft, this.scrolledBuffer);
    this.attachEmitter('right', this.scrolledLeft, this.scrolledBuffer);
    this.attachEmitter('bottom', this.scrolledLeft, this.scrolledBuffer);
    this.attachEmitter('top', this.scrolledLeft, this.scrolledBuffer);
    merge(this.init, this.scrolled)
      .pipe(map(() => ({
          top: this.getScrollOffset('top') > 0,
          left: this.getScrollOffset('left') > 0,
          right: this.getScrollOffset('right') > 0,
          bottom: this.getScrollOffset('bottom') > 0
        })),
        distinctUntilChanged(),
        takeUntil(this.destroyed)
      )
      .subscribe(({ top, left, right, bottom }) => {
        this.toggleClass('cat-scrollable-top', top);
        this.toggleClass('cat-scrollable-left', left);
        this.toggleClass('cat-scrollable-right', right);
        this.toggleClass('cat-scrollable-bottom', bottom);
      });
  }

  componentDidLoad() {
    this.checkInit(this.scrolledInit);
  }

  disconnectedCallback() {
    this.init.complete();
    this.destroyed.next();
    this.destroyed.complete();
  }

  render() {
    return (
      <Host class={{
        'scrollable-content': true,
        'scroll-x': this.overflowX,
        'scroll-y': this.overflowY,
        'no-overscroll': !this.overscroll
      }}>
        {this.shadowY && <div class='shadow-top'></div>}
        {this.shadowX && <div class='shadow-left'></div>}

          <slot></slot>

        {this.shadowX && <div class='shadow-right'></div>}
        {this.shadowY && <div class='shadow-bottom'></div>}
      </Host>
    );
  }

  protected attachEmitter(from: 'top' | 'left' | 'right' | 'bottom', emitter: EventEmitter<void>, buffer: number) {
    merge(this.init, this.scrolled)
      .pipe(map(() => this.getScrollOffset(from)))
      .pipe(map(offset => offset <= buffer))
      .pipe(distinctUntilChanged())
      .pipe(filter(isLower => isLower))
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => emitter.emit());
  }

  protected checkInit(init = true): void {
    if (init) {
      this.init.next();
    }
  }

  protected getScrollOffset(from: 'top' | 'left' | 'right' | 'bottom'): number {
    if (this.el) {
      switch (from) {
        case 'top':
          return this.el.scrollTop;
        case 'left':
          return this.el.scrollLeft;
        case 'right':
          return this.el.scrollWidth - this.el.clientWidth - this.el.scrollLeft;
        case 'bottom':
          return this.el.scrollHeight - this.el.clientHeight - this.el.scrollTop;
        default:
          return 0;
      }
    }
    return 0;
  }

  protected toggleClass(name: string, value: boolean): void {
    if (value) {
      this.el.classList.add(name);
    } else {
      this.el.classList.remove(name);
    }
  }
}
