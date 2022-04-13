import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

@Component({
  tag: 'cat-scrollable',
  styleUrl: 'cat-scrollable.scss',
  shadow: true
})
export class CatScrollable {
  scrollShadowElement?: HTMLElement;
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

  @Event() onScrolledBottom!: EventEmitter<void>;
  @Event() onScrolledTop!: EventEmitter<void>;
  @Event() onScrolledLeft!: EventEmitter<void>;
  @Event() onScrolledRight!: EventEmitter<void>;

  componentDidRender() {
    if (this.scrollElement) {
      this.scrolled = fromEvent(this.scrollElement, 'scroll')
        .pipe(takeUntil(this.destroyed));
    }
    this.attachEmitter('left', this.onScrolledLeft, this.scrolledBuffer);
    this.attachEmitter('right', this.onScrolledRight, this.scrolledBuffer);
    this.attachEmitter('bottom', this.onScrolledBottom, this.scrolledBuffer);
    this.attachEmitter('top', this.onScrolledTop, this.scrolledBuffer);
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
        'scroll-x': this.overflowX,
        'scroll-y': this.overflowY,
        'no-overscroll': !this.overscroll
      }}>
        <div class='shadow-wrapper'
             ref={el => (this.scrollShadowElement = el)}>
          {this.shadowY && <div class='shadow-top'></div>}
          {this.shadowX && <div class='shadow-left'></div>}
          {this.shadowX && <div class='shadow-right'></div>}
          {this.shadowY && <div class='shadow-bottom'></div>}
        </div>
        <div
          ref={el => (this.scrollElement = el)}
          class='scrollable-content'>
          <slot></slot>
        </div>
      </Host>
    );
  }

  private attachEmitter(from: 'top' | 'left' | 'right' | 'bottom', emitter: EventEmitter<void>, buffer: number) {
    merge(this.init, this.scrolled)
      .pipe(map(() => this.getScrollOffset(from)))
      .pipe(map(offset => offset <= buffer))
      .pipe(distinctUntilChanged())
      .pipe(filter(isLower => isLower))
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => emitter.emit());
  }

  private checkInit(init = true): void {
    if (init) {
      this.init.next();
    }
  }

  private getScrollOffset(from: 'top' | 'left' | 'right' | 'bottom'): number {
    if (this.scrollElement) {
      switch (from) {
        case 'top':
          return this.scrollElement.scrollTop;
        case 'left':
          return this.scrollElement.scrollLeft;
        case 'right':
          return this.scrollElement.scrollWidth - this.scrollElement.clientWidth - this.scrollElement.scrollLeft;
        case 'bottom':
          return this.scrollElement.scrollHeight - this.scrollElement.clientHeight - this.scrollElement.scrollTop;
        default:
          return 0;
      }
    }
    return 0;
  }

  private toggleClass(name: string, value: boolean): void {
    if (value) {
      this.scrollShadowElement?.classList.add(name);
    } else {
      this.scrollShadowElement?.classList.remove(name);
    }
  }
}
