import { Component, Element, Host, Listen, Method, Prop, State, h } from '@stencil/core';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';
import { addDays, addMonth, isSameDay, isSameMonth } from './cat-date-math';
import { getLocale } from './cat-date-util';

@Component({
  tag: 'cat-date',
  styleUrl: 'cat-date.scss',
  shadow: true
})
export class CatDate {
  private readonly language = i18n.getLocale();
  private readonly locale = getLocale(this.language);
  private input!: HTMLCatInputElement;

  @Element() hostElement!: HTMLElement;

  @State() viewDate: Date = new Date();

  @State() focusDate: Date | null = null;

  @State() selectionDate: Date | null = null;

  @Prop() requiredMarker?: 'none' | 'required' | 'optional' | 'none!' | 'optional!' | 'required!' = 'optional';
  @Prop() horizontal = false;
  @Prop() autoComplete?: string;
  @Prop() clearable = false;
  @Prop() disabled = false;
  @Prop() hint?: string | string[];
  @Prop() icon?: string;
  @Prop() iconRight = false;
  @Prop() identifier?: string;
  @Prop() label = '';
  @Prop() labelHidden = false;

  componentDidLoad() {
    const format = this.locale.format.replace('YYYY', 'Y').replace('YY', 'y').replace('MM', 'm').replace('DD', 'd');
    const [, p1, d1, p2, p3] = /(\w+)([^\w]+)(\w+)[^\w]+(\w+)/.exec(format) || [];
    this.input.mask({
      date: true,
      delimiter: d1,
      datePattern: [p1, p2, p3]
    });
  }

  componentDidRender() {
    if (this.focusDate) {
      // if the focus date has changed, focus the new date after the render
      // this is necessary because the focus date might shift due to the view date change
      this.hostElement.shadowRoot
        ?.querySelector<HTMLCatButtonElement>(`[data-date="${this.toLocalISO(this.focusDate)}"]`)
        ?.doFocus();
    }
  }

  @Listen('keydown')
  onKeyDown(e: KeyboardEvent) {
    if (!this.hostElement.shadowRoot?.querySelector(`[data-date]:focus`)) {
      return;
    }
    if (e.key === 'ArrowLeft' && this.focusDate) {
      e.preventDefault();
      this.focus(e.shiftKey ? addMonth(this.focusDate, -1) : addDays(this.focusDate, -1));
    } else if (e.key === 'ArrowRight' && this.focusDate) {
      e.preventDefault();
      this.focus(e.shiftKey ? addMonth(this.focusDate, 1) : addDays(this.focusDate, 1));
    } else if (e.key === 'ArrowUp' && this.focusDate) {
      e.preventDefault();
      this.focus(addDays(this.focusDate, -7));
    } else if (e.key === 'ArrowDown' && this.focusDate) {
      e.preventDefault();
      this.focus(addDays(this.focusDate, 7));
    }
  }

  @Listen('catOpen')
  onOpen() {
    this.focusDate = null;
    this.viewDate = this.selectionDate
      ? new Date(this.selectionDate.getFullYear(), this.selectionDate.getMonth(), 1)
      : new Date();
  }

  @Method()
  async select(date: Date): Promise<void> {
    this.focus(date);
    this.selectionDate = date;
  }

  render() {
    const dateGrid = this.dateGrid(this.viewDate.getFullYear(), this.viewDate.getMonth());
    return (
      <Host>
        {this.selectionDate?.toDateString()}
        <cat-input
          class="cat-picker-input"
          ref={el => (this.input = el as HTMLCatInputElement)}
          requiredMarker={this.requiredMarker}
          horizontal={this.horizontal}
          autoComplete={this.autoComplete}
          clearable={this.clearable}
          disabled={this.disabled}
          hint={this.hint}
          icon={this.icon}
          iconRight={this.iconRight}
          identifier={this.identifier}
          label={this.label}
          labelHidden={this.labelHidden}
          placeholder={this.locale.format}
          value={this.getInputValue()}
          onCatChange={this.onInputChange.bind(this)}
          data-dropdown-no-close
        >
          <cat-dropdown slot="addon" placement="bottom-end">
            <cat-button slot="trigger" icon="$cat:datepicker-calendar" iconOnly class="cat-picker-toggle"></cat-button>
            <div class="picker" slot="content">
              <div class="picker-head">
                <cat-button
                  icon="$cat:datepicker-year-prev"
                  iconOnly
                  size="xs"
                  round
                  variant="text"
                  a11y-label={this.locale.prevYear}
                  onClick={() => this.navigate('prev', 'year')}
                  data-dropdown-no-close
                ></cat-button>
                <cat-button
                  icon="$cat:datepicker-month-prev"
                  iconOnly
                  size="xs"
                  round
                  variant="text"
                  a11y-label={this.locale.prevMonth}
                  onClick={() => this.navigate('prev', 'month')}
                  data-dropdown-no-close
                ></cat-button>
                <h3 id="id-grid-label" aria-live="polite">
                  {this.locale.months.long[this.viewDate.getMonth()]} {this.viewDate.getFullYear()}
                </h3>
                <cat-button
                  icon="$cat:datepicker-month-next"
                  iconOnly
                  size="xs"
                  round
                  variant="text"
                  a11y-label={this.locale.nextMonth}
                  onClick={() => this.navigate('next', 'month')}
                  data-dropdown-no-close
                ></cat-button>
                <cat-button
                  icon="$cat:datepicker-year-next"
                  iconOnly
                  size="xs"
                  round
                  variant="text"
                  a11y-label={this.locale.nextYear}
                  onClick={() => this.navigate('next', 'year')}
                  data-dropdown-no-close
                ></cat-button>
              </div>
              <div class="picker-grid" onFocusin={this.onGridFocus.bind(this)}>
                <div class="picker-grid-head">
                  {Array.from(Array(7), (_, i) => (
                    <abbr title={this.locale.days.long[i]}>{this.locale.days.short[i]}</abbr>
                  ))}
                </div>
                <div class="picker-grid-weeks">
                  {dateGrid
                    .filter((_, i) => i % 7 === 0)
                    .map(day => (
                      <div>{this.getWeekNumber(day)}</div>
                    ))}
                </div>
                <div class="picker-grid-days">
                  {dateGrid.map(day => (
                    <cat-button
                      class={{
                        'cat-picker-item': true,
                        'date-other': !isSameMonth(this.viewDate, day),
                        'date-today': isSameDay(new Date(), day),
                        'date-selected': isSameDay(this.selectionDate, day)
                      }}
                      nativeAttributes={{ tabindex: this.canFocus(day) ? '0' : '-1' }}
                      variant={
                        isSameDay(this.selectionDate, day) ? 'filled' : isSameDay(new Date(), day) ? 'outlined' : 'text'
                      }
                      a11yLabel={this.getA11yLabelDay(day)}
                      active={isSameDay(this.selectionDate, day)}
                      color={isSameDay(this.selectionDate, day) || isSameDay(new Date(), day) ? 'primary' : 'secondary'}
                      onClick={() => this.select(day)}
                      onFocus={() => (this.focusDate = day)}
                      data-date={this.toLocalISO(day)}
                    >
                      {day.getDate()}
                    </cat-button>
                  ))}
                </div>
              </div>
              <div class="picker-foot">
                <cat-button data-dropdown-no-close onClick={() => this.select(new Date())}>
                  {this.locale.today}
                </cat-button>
                <p class="cursor-help">{this.locale.cursor}</p>
                <p class="cursor-aria" aria-live="polite"></p>
              </div>
            </div>
          </cat-dropdown>
        </cat-input>
      </Host>
    );
  }

  private focus(date: Date) {
    this.focusDate = date;
    this.viewDate = new Date(date.getFullYear(), date.getMonth());
  }

  private navigate(direction: 'prev' | 'next', period: 'year' | 'month') {
    this.focusDate = null;
    this.viewDate = new Date(
      direction === 'prev'
        ? period === 'year'
          ? this.viewDate.getFullYear() - 1
          : this.viewDate.setMonth(this.viewDate.getMonth() - 1)
        : period === 'year'
          ? this.viewDate.getFullYear() + 1
          : this.viewDate.setMonth(this.viewDate.getMonth() + 1)
    );
  }

  private onGridFocus() {
    const node = this.hostElement.shadowRoot?.querySelector('.cursor-aria');
    if (node) {
      node.innerHTML = this.locale.cursor;
    }
  }

  private onInputChange({ detail }: CustomEvent<string>) {
    if (!detail) {
      this.selectionDate = null;
      // this.dropdown.close();
      return;
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

  private getInputValue() {
    const format = new Intl.DateTimeFormat(this.language, { year: 'numeric', month: '2-digit', day: '2-digit' });
    return this.selectionDate ? format.format(this.selectionDate) : '';
  }

  private getA11yLabelDay(date: Date) {
    const format = new Intl.DateTimeFormat(this.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
    return format.format(date);
  }

  private getWeekNumber(date: Date, iso8601 = true) {
    const currentDate = new Date(date.getTime());
    const dayNum = iso8601 ? currentDate.getDay() || 7 : currentDate.getDay();
    currentDate.setDate(currentDate.getDate() + 4 - dayNum);
    const yearStart = new Date(currentDate.getFullYear(), 0, 1);
    return Math.ceil(((+currentDate - +yearStart) / 86400000 + 1) / 7);
  }

  private canFocus(date: Date) {
    const now = new Date();
    if (this.focusDate && isSameMonth(this.focusDate, this.viewDate)) {
      return isSameMonth(this.focusDate, date) && isSameDay(this.focusDate, date);
    } else if (this.selectionDate && isSameMonth(this.selectionDate, this.viewDate)) {
      return isSameMonth(this.selectionDate, date) && isSameDay(this.selectionDate, date);
    } else if (isSameMonth(this.viewDate, now)) {
      return isSameMonth(this.viewDate, date) && isSameDay(now, date);
    }
    return isSameMonth(this.viewDate, date) && date.getDate() === 1;
  }

  private toLocalISO(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
