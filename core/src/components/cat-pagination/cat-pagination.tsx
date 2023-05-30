import { Component, h, Prop } from '@stencil/core';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

/**
 * A navigation component to switch between different pages of paged chunks of
 * data such as a table. Pagination is built with list HTML elements and a
 * wrapping `<nav>` element to identify it as a navigation section to screen
 * readers and other assistive technologies. Furthermore, the current page is
 * correctly highlighted using `aria-current`.
 */
@Component({
  tag: 'cat-pagination',
  styleUrl: 'cat-pagination.scss',
  shadow: true
})
export class CatPagination {
  /**
   * The current page.
   */
  @Prop({ mutable: true }) page = 0;

  /**
   * The total number of pages.
   */
  @Prop() pageCount = 1;

  /**
   * The number of pages to be shown around the current page.
   */
  @Prop() activePadding = 1;

  /**
   * The number of pages to be shown at the edges.
   */
  @Prop() sidePadding = 1;

  /**
   * The size of the buttons.
   */
  @Prop() size: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';

  /**
   * The rendering style of the buttons.
   */
  @Prop() variant: 'filled' | 'outlined' | 'text' = 'text';

  /**
   * Use round button edges.
   */
  @Prop() round = false;

  /**
   * Use compact pagination mode.
   */
  @Prop() compact = false;

  /**
   * The icon of the "previous" button.
   */
  @Prop() iconPrev = '$cat:pagination-left';

  /**
   * The icon of the "next" button.
   */
  @Prop() iconNext = '$cat:pagination-right';

  render() {
    return (
      <nav role="navigation">
        <ol
          class={{
            [`cat-pagination-${this.size}`]: Boolean(this.size)
          }}
        >
          <li>
            <cat-button
              variant={this.variant}
              size={this.size}
              round={this.round}
              disabled={this.isFirst}
              a11yLabel={i18n.t('pagination.prev')}
              icon={this.iconPrev}
              iconOnly
              onClick={() => (this.page = this.page - 1)}
            ></cat-button>
          </li>
          {this.content}
          <li>
            <cat-button
              variant={this.variant}
              size={this.size}
              round={this.round}
              disabled={this.isLast}
              a11yLabel={i18n.t('pagination.next')}
              icon={this.iconNext}
              iconOnly
              onClick={() => (this.page = this.page + 1)}
            ></cat-button>
          </li>
        </ol>
      </nav>
    );
  }

  get isFirst() {
    return this.page === 0;
  }

  get isLast() {
    return this.page === this.pageCount - 1;
  }

  get pages() {
    if (!this.sidePadding && !this.activePadding) {
      return [this.page];
    }

    const result = new Set<number>();
    const minPage = this.page <= this.sidePadding + this.activePadding + 1;
    const minActivepage = minPage ? this.sidePadding + 2 * this.activePadding + 2 : this.sidePadding;
    const maxPage = this.page >= this.pageCount - this.sidePadding - this.activePadding - 2;
    const maxActivepage = maxPage
      ? this.pageCount - this.sidePadding - 2 * this.activePadding - 2
      : this.pageCount - this.sidePadding;

    this.addSeq(result, 0, minActivepage);
    if (!minPage && !maxPage) {
      this.addSeq(result, this.page - this.activePadding, this.page + this.activePadding + 1);
    }
    this.addSeq(result, maxActivepage, this.pageCount);

    return [...result];
  }

  private addSeq(set: Set<number>, start: number, end: number) {
    const _start = this.clamp(start, 0, this.pageCount);
    const _end = this.clamp(end, 0, this.pageCount);
    Array(_end - _start)
      .fill(0)
      .forEach((_, i) => set.add(_start + i));
  }

  private clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
  }

  private get content() {
    if (this.compact) {
      return (
        <li class="text">
          {this.page + 1}/{this.pageCount}
        </li>
      );
    }

    return this.pages.map((page, i) => [
      i > 0 && this.pages[i - 1] !== page - 1 ? <li class="dots">…</li> : null,
      <li>
        <cat-button
          variant={this.variant}
          size={this.size}
          round={this.round}
          color={this.page === page ? 'primary' : undefined}
          active={this.page === page}
          a11yLabel={i18n.t('pagination.page', { page: page + 1 })}
          a11yCurrent={this.page === page ? 'step' : undefined}
          onClick={() => (this.page = page)}
        >
          {page + 1}
        </cat-button>
      </li>
    ]);
  }
}
