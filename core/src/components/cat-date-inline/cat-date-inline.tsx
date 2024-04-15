import { Component, Element, Event, EventEmitter, Host, Listen, Method, Prop, State, h } from '@stencil/core';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';
import { getLocale } from './cat-date-locale';
import { addDays, addMonth, clampDate, isSameDay, isSameMonth, isSameYear } from './cat-date-math';

/**
 * An inline date picker component to select a date.
 */
@Component({
  tag: 'cat-date-inline',
  styleUrl: 'cat-date-inline.scss',
  shadow: true
})
export class CatDateInline {
  private readonly language = i18n.getLocale();
  private readonly locale = getLocale(this.language);
  // additonally store the focus date to ensure correct focus after potential re-render
  private focusDate: Date | null = null;

  @Element() hostElement!: HTMLElement;

  @State() viewDate: Date = this.locale.now();

  /**
   * Hides the clear button.
   */
  @Prop() noClear = false;

  /**
   * Hides the arrow navigation hint.
   */
  @Prop() noHint = false;

  /**
   * Hides the today button.
   */
  @Prop() noToday = false;

  /**
   * Hides the week numbers.
   */
  @Prop() noWeeks = false;

  /**
   * The size of the date picker.
   */
  @Prop() size: 's' | 'm' = 'm';

  /**
   * A minimum value for the date, given in local ISO 8601 date format YYYY-MM-DD.
   */
  @Prop() min?: string;

  /**
   * A maximum value for the date, given in local ISO 8601 date format YYYY-MM-DD.
   */
  @Prop() max?: string;

  /**
   * Allow the selection of a range of dates, i.e. start and end date.
   */
  @Prop() range = false;

  /**
   * The value of the control, given in local ISO 8601 date format YYYY-MM-DD.
   */
  @Prop({ mutable: true }) value?: string;

  /**
   * Emitted when the value is changed.
   */
  @Event() catChange!: EventEmitter<string>;

  private get focusedDate() {
    const [all, year, month, day] =
      this.hostElement.shadowRoot
        ?.querySelector<HTMLCatButtonElement>(`[data-date]:focus`)
        ?.dataset.date?.match(/^(\d{4})-(\d{2})-(\d{2})/) ?? [];
    return all ? new Date(Number(year), Number(month) - 1, Number(day)) : null;
  }

  componentWillLoad() {
    // select the initial value
    const [startDate, endDate] = this.getValue();
    this.select(startDate);
    if (this.range && endDate) {
      this.select(endDate);
    }
  }

  componentDidRender() {
    if (this.focusDate) {
      // re-focus the previously focused date after re-render
      this.hostElement.shadowRoot
        ?.querySelector<HTMLCatButtonElement>(`[data-date="${this.locale.toLocalStr(this.focusDate)}"]`)
        ?.doFocus();
      this.focusDate = null;
    }
  }

  @Listen('keydown')
  onKeyDown(e: KeyboardEvent) {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      return;
    }
    const focusedDate = this.focusedDate;
    if (!focusedDate) {
      e.preventDefault();
      const [startDate] = this.getValue();
      this.focus(startDate || this.locale.now());
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.focus(e.shiftKey ? addMonth(focusedDate, -1) : addDays(focusedDate, -1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.focus(e.shiftKey ? addMonth(focusedDate, 1) : addDays(focusedDate, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.focus(addDays(focusedDate, -7));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.focus(addDays(focusedDate, 7));
    }
  }

  /**
   * Select a date in the picker.
   *
   * @param date The date to select.
   */
  @Method()
  async select(date: Date | null): Promise<void> {
    if (!date) {
      return this.clear();
    }
    const oldValue = this.value;
    const [minDate, maxDate] = this.getMinMaxDate();
    const newDate = clampDate(minDate, new Date(date.getFullYear(), date.getMonth(), date.getDate()), maxDate);
    this.focus(newDate);

    if (this.range) {
      const [startDate, endDate] = this.getValue();
      if (!startDate || endDate || newDate < startDate) {
        this.value = this.toRangeValue(newDate, null);
      } else {
        this.value = this.toRangeValue(startDate, newDate);
      }
    } else {
      this.value = this.locale.toLocalISO(newDate);
    }

    if (oldValue !== this.value) {
      this.catChange.emit(this.value);
    }
  }

  /**
   * Clear the picker.
   */
  @Method()
  async clear(): Promise<void> {
    const oldValue = this.value;
    this.value = undefined;
    if (oldValue !== this.value) {
      this.catChange.emit(this.value);
    }
  }

  /**
   * Resets the view of the picker.
   */
  @Method()
  async resetView(): Promise<void> {
    const [minDate, maxDate] = this.getMinMaxDate();
    const [dateStart] = this.getValue();
    this.viewDate = dateStart ?? clampDate(minDate, this.locale.now(), maxDate);
  }

  render() {
    const [minDate, maxDate] = this.getMinMaxDate();
    const dateGrid = this.dateGrid(this.viewDate.getFullYear(), this.viewDate.getMonth());
    const [dateStart, dateEnd] = this.getValue();
    return (
      <Host>
        <div class={{ picker: true, 'picker-small': this.size === 's', 'picker-weeks': !this.noWeeks }}>
          <div class="picker-head">
            <cat-button
              icon="$cat:datepicker-year-prev"
              iconOnly
              size="xs"
              variant="text"
              a11y-label={this.locale.prevYear}
              disabled={isSameYear(this.viewDate, minDate)}
              onClick={() => this.navigate('prev', 'year')}
              data-dropdown-no-close
            ></cat-button>
            <cat-button
              icon="$cat:datepicker-month-prev"
              iconOnly
              size="xs"
              variant="text"
              a11y-label={this.locale.prevMonth}
              disabled={isSameMonth(this.viewDate, minDate)}
              onClick={() => this.navigate('prev', 'month')}
              data-dropdown-no-close
            ></cat-button>
            <h3>{this.getHeadline()}</h3>
            <cat-button
              icon="$cat:datepicker-month-next"
              iconOnly
              size="xs"
              variant="text"
              a11y-label={this.locale.nextMonth}
              disabled={isSameMonth(this.viewDate, maxDate)}
              onClick={() => this.navigate('next', 'month')}
              data-dropdown-no-close
            ></cat-button>
            <cat-button
              icon="$cat:datepicker-year-next"
              iconOnly
              size="xs"
              variant="text"
              a11y-label={this.locale.nextYear}
              disabled={isSameYear(this.viewDate, maxDate)}
              onClick={() => this.navigate('next', 'year')}
              data-dropdown-no-close
            ></cat-button>
          </div>
          <div class="picker-grid" onFocusin={() => this.setAriaLive(this.locale.arrowKeys)}>
            <div class="picker-grid-head">
              {Array.from(Array(7), (_, i) => (
                <abbr title={this.locale.days.long[i]}>{this.locale.days.short[i]}</abbr>
              ))}
            </div>
            {!this.noWeeks && (
              <div class="picker-grid-weeks">
                {dateGrid
                  .filter((_, i) => i % 7 === 0)
                  .map(day => (
                    <div>{this.getWeekNumber(day)}</div>
                  ))}
              </div>
            )}
            <div class="picker-grid-days">
              {dateGrid.map(day => {
                const isStartDate = isSameDay(dateStart, day);
                const isEndDate = isSameDay(dateEnd, day);
                const isRange = !!dateStart && !!dateEnd && day > dateStart && day < dateEnd;
                const isToday = isSameDay(this.locale.now(), day);
                return (
                  <cat-button
                    class={{
                      'cat-date-item': true,
                      'date-other': !isSameMonth(this.viewDate, day),
                      'date-today': isToday,
                      'date-start': this.range && isStartDate,
                      'date-range': this.range && isRange,
                      'date-end': this.range && isEndDate,
                      'date-focusable': this.canFocus(day),
                      'date-disabled': !this.canClick(day)
                    }}
                    size={this.size}
                    nativeAttributes={!this.canFocus(day) ? { tabindex: '-1' } : {}}
                    variant={isStartDate || isEndDate ? 'filled' : isToday ? 'outlined' : 'text'}
                    a11yLabel={this.locale.toLocalStr(day)}
                    active={isStartDate || isEndDate || isRange}
                    color={isStartDate || isEndDate || isToday ? 'primary' : 'secondary'}
                    disabled={!this.canClick(day)}
                    onClick={() => this.select(day)}
                    data-date={this.locale.toLocalISO(day)}
                  >
                    {day.getDate()}
                  </cat-button>
                );
              })}
            </div>
          </div>
          <div class="picker-foot">
            {!this.noToday && this.canClick(this.locale.now()) && (
              <cat-button size="s" data-dropdown-no-close onClick={() => this.select(this.locale.now())}>
                {this.locale.today}
              </cat-button>
            )}
            {!this.noHint && <p class="cursor-help">{this.locale.arrowKeys}</p>}
            {!this.noClear && (
              <cat-button size="s" disabled={!this.value} data-dropdown-no-close onClick={() => this.clear()}>
                {this.locale.clear}
              </cat-button>
            )}
          </div>
        </div>
        <p class="cursor-aria" aria-live="polite"></p>
      </Host>
    );
  }

  private focus(date: Date) {
    const [minDate, maxDate] = this.getMinMaxDate();
    this.focusDate = clampDate(minDate, date, maxDate);
    this.viewDate = new Date(this.focusDate.getFullYear(), this.focusDate.getMonth());
    this.hostElement.shadowRoot
      ?.querySelector<HTMLCatButtonElement>(`[data-date="${this.locale.toLocalISO(this.focusDate)}"]`)
      ?.doFocus();
  }

  private navigate(direction: 'prev' | 'next', period: 'year' | 'month') {
    this.viewDate = new Date(
      direction === 'prev'
        ? period === 'year'
          ? this.viewDate.setFullYear(this.viewDate.getFullYear() - 1)
          : this.viewDate.setMonth(this.viewDate.getMonth() - 1)
        : period === 'year'
          ? this.viewDate.setFullYear(this.viewDate.getFullYear() + 1)
          : this.viewDate.setMonth(this.viewDate.getMonth() + 1)
    );
    // announce the new month and year
    this.setAriaLive(this.getHeadline());
  }

  private setAriaLive(text: string) {
    const node = this.hostElement.shadowRoot?.querySelector('.cursor-aria');
    if (node) {
      node.innerHTML = text;
    }
  }

  private dateGrid(year: number, month: number) {
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [...Array(daysInMonth).keys()];
    const daysBefore = [...Array(firstDayOfWeek).keys()].map(day =>
      new Date(year, month, day - firstDayOfWeek).getDate()
    );
    const daysAfter = [...Array(42 - days.length - daysBefore.length).keys()];
    return [
      ...daysBefore.map(day => new Date(year, month - 1, day + 1)),
      ...days.map(day => new Date(year, month, day + 1)),
      ...daysAfter.map(day => new Date(year, month + 1, day + 1))
    ];
  }

  private getHeadline() {
    return `${this.locale.months.long[this.viewDate.getMonth()]} ${this.viewDate.getFullYear()}`;
  }

  private getWeekNumber(date: Date, iso8601 = true) {
    const currentDate = new Date(date.getTime());
    const dayNum = iso8601 ? currentDate.getDay() || 7 : currentDate.getDay();
    currentDate.setDate(currentDate.getDate() + 4 - dayNum);
    const yearStart = new Date(currentDate.getFullYear(), 0, 1);
    return Math.ceil(((+currentDate - +yearStart) / 86400000 + 1) / 7);
  }

  private canFocus(date: Date): boolean {
    const now = this.locale.now();
    const [minDate] = this.getMinMaxDate();
    const focusedDate = this.focusedDate;
    const [startDate] = this.getValue();
    if (focusedDate && isSameMonth(focusedDate, this.viewDate)) {
      return isSameMonth(focusedDate, date) && isSameDay(focusedDate, date);
    } else if (startDate && isSameMonth(startDate, this.viewDate)) {
      return isSameMonth(startDate, date) && isSameDay(startDate, date);
    } else if (isSameMonth(this.viewDate, now) && (!minDate || minDate <= now)) {
      return isSameMonth(this.viewDate, date) && isSameDay(now, date);
    }
    const minDay = isSameMonth(date, minDate) ? minDate?.getDate() ?? 1 : 1;
    return isSameMonth(this.viewDate, date) && date.getDate() === minDay;
  }

  private canClick(date: Date) {
    const [minDate, maxDate] = this.getMinMaxDate();
    return (!minDate || minDate <= date) && (!maxDate || maxDate >= date);
  }

  private getMinMaxDate() {
    const minDate = this.locale.fromLocalISO(this.min);
    const maxDate = this.locale.fromLocalISO(this.max);
    return [minDate, maxDate];
  }

  private getValue(): [Date | null, Date | null] {
    if (this.range) {
      const [startDate, endDate] = JSON.parse(this.value || '[]') as [string | null, string | null];
      return [this.locale.fromLocalISO(startDate), this.locale.fromLocalISO(endDate)];
    } else {
      return [this.locale.fromLocalISO(this.value), null];
    }
  }

  private toRangeValue(startDate: Date | null, endDate: Date | null): string {
    return JSON.stringify([startDate, endDate].map(date => (date ? this.locale.toLocalISO(date) : null)));
  }
}
