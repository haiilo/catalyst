import { Placement } from '@floating-ui/dom';
import { Component, Element, Event, EventEmitter, Host, Listen, Method, Prop, State, h } from '@stencil/core';
import { ErrorMap } from '../cat-form-hint/cat-form-hint';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';
import { getLocale } from './cat-date-locale';
import { addDays, addMonth, clampDate, isSameDay, isSameMonth, isSameYear } from './cat-date-math';

@Component({
  tag: 'cat-date',
  styleUrl: 'cat-date.scss',
  shadow: true
})
export class CatDate {
  private readonly language = i18n.getLocale();
  private readonly locale = getLocale(this.language);
  private input?: HTMLCatInputElement;
  private isOpen = false;
  // additonally store the focus date to ensure correct focus after potential re-render
  private focusDate: Date | null = null;

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  @State() hasSlottedHint = false;

  @State() viewDate: Date = this.now;

  @State() selectionDate: Date | null = null;

  /**
   * Whether the label need a marker to shown if the input is required or optional.
   */
  @Prop() requiredMarker?: 'none' | 'required' | 'optional' | 'none!' | 'optional!' | 'required!' = 'optional';

  /**
   * Whether the label is on top or left.
   */
  @Prop() horizontal = false;

  /**
   * Hint for form autofill feature.
   */
  @Prop() autoComplete?: string;

  /**
   * Whether the input should show a clear button.
   */
  @Prop() clearable = false;

  /**
   * Whether the input is disabled.
   */
  @Prop() disabled = false;

  /**
   * Optional hint text(s) to be displayed with the input.
   */
  @Prop() hint?: string | string[];

  /**
   * The name of an icon to be displayed in the input.
   */
  @Prop() icon?: string;

  /**
   * Display the icon on the right.
   */
  @Prop() iconRight = false;

  /**
   * A unique identifier for the input.
   */
  @Prop() identifier?: string;

  /**
   * The label for the input.
   */
  @Prop() label = '';

  /**
   * Visually hide the label, but still show it to assistive technologies like screen readers.
   */
  @Prop() labelHidden = false;

  /**
   * A maximum value for the date, given in local ISO 8601 date format YYYY-MM-DD.
   */
  @Prop() max?: string;

  get maxDate() {
    const [y, m, d] = this.max?.split('-').map(Number) || [];
    return this.max ? new Date(y, m - 1, d) : null;
  }

  /**
   * A minimum value for the date, given in local ISO 8601 date format YYYY-MM-DD.
   */
  @Prop() min?: string;

  get minDate() {
    const [y, m, d] = this.min?.split('-').map(Number) || [];
    return this.min ? new Date(y, m - 1, d) : null;
  }

  /**
   * The name of the form control. Submitted with the form as part of a name/value pair.
   */
  @Prop() name?: string;

  /**
   * The placeholder text to display within the input.
   */
  @Prop() placeholder?: string;

  /**
   * A textual prefix to be displayed in the input.
   */
  @Prop() textPrefix?: string;

  /**
   * A textual suffix to be displayed in the input.
   */
  @Prop() textSuffix?: string;

  /**
   * The value is not editable.
   */
  @Prop() readonly = false;

  /**
   * A value is required or must be check for the form to be submittable.
   */
  @Prop() required = false;

  /**
   * The value of the control, given in local ISO 8601 date format YYYY-MM-DD.
   */
  @Prop({ mutable: true }) value?: string;

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

  /**
   * The placement of the dropdown.
   */
  @Prop() placement: Placement = 'bottom-end';

  /**
   * Emitted when the value is changed.
   */
  @Event() catChange!: EventEmitter<string>;

  /**
   * Emitted when the input received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  private get now() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private get focusedDate() {
    const [all, year, month, day] =
      this.hostElement.shadowRoot
        ?.querySelector<HTMLCatButtonElement>(`[data-date]:focus`)
        ?.dataset.date?.match(/^(\d{4})-(\d{2})-(\d{2})/) ?? [];
    return all ? new Date(Number(year), Number(month) - 1, Number(day)) : null;
  }

  componentWillLoad() {
    const [match, year, month, day] = this.value?.match(/^(\d{4})-(\d{2})-(\d{2})/) ?? [];
    if (match) {
      this.select(new Date(Number(year), Number(month) - 1, Number(day)));
    }
  }

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
  }

  componentDidLoad() {
    const format = this.locale.formatStr.replace('YYYY', 'Y').replace('YY', 'y').replace('MM', 'm').replace('DD', 'd');
    const [, p1, d1, p2, p3] = /(\w+)([^\w]+)(\w+)[^\w]+(\w+)/.exec(format) || [];
    this.input?.mask({
      date: true,
      dateMin: this.min,
      dateMax: this.max,
      delimiter: d1,
      datePattern: [p1, p2, p3]
    });
  }

  componentDidRender() {
    if (this.focusDate) {
      this.hostElement.shadowRoot
        ?.querySelector<HTMLCatButtonElement>(`[data-date="${this.toLocalISO(this.focusDate)}"]`)
        ?.doFocus();
      this.focusDate = null;
    }
  }

  @Listen('catOpen')
  onOpen() {
    this.isOpen = true;
    this.setAriaLive('');
    const viewDate = this.selectionDate
      ? new Date(this.selectionDate.getFullYear(), this.selectionDate.getMonth(), 1)
      : this.now;
    this.viewDate = clampDate(this.minDate, viewDate, this.maxDate);
  }

  @Listen('catClose')
  onClose() {
    this.isOpen = false;
  }

  @Listen('keydown')
  onKeyDown(e: KeyboardEvent) {
    if (!this.isOpen || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      return;
    }
    const focused = this.focusedDate;
    if (!focused) {
      e.preventDefault();
      this.focus(this.selectionDate || this.now);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.focus(e.shiftKey ? addMonth(focused, -1) : addDays(focused, -1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.focus(e.shiftKey ? addMonth(focused, 1) : addDays(focused, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.focus(addDays(focused, -7));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.focus(addDays(focused, 7));
    }
  }

  /**
   * Select a date in the picker.
   *
   * @param date The date to select.
   */
  @Method()
  async select(date: Date): Promise<void> {
    const oldValue = this.value;
    const newDate = clampDate(
      this.minDate,
      new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      this.maxDate
    );
    this.focus(newDate);
    this.selectionDate = newDate;
    this.value = newDate.toISOString();
    if (oldValue !== this.value) {
      this.catChange.emit(this.value);
    }
  }

  /**
   * Programmatically move focus to the input. Use this method instead of
   * `input.focus()`.
   *
   * @param options An optional object providing options to control aspects of
   * the focusing process.
   */
  @Method()
  async doFocus(options?: FocusOptions): Promise<void> {
    this.input?.doFocus(options);
  }

  /**
   * Programmatically remove focus from the input. Use this method instead of
   * `input.blur()`.
   */
  @Method()
  async doBlur(): Promise<void> {
    this.input?.doBlur();
  }

  /**
   * Clear the input.
   */
  @Method()
  async clear(): Promise<void> {
    this.input?.clear();
  }

  render() {
    const dateGrid = this.dateGrid(this.viewDate.getFullYear(), this.viewDate.getMonth());
    return (
      <Host>
        <cat-input
          class="cat-date-input"
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
          labelHidden={this.labelHidden}
          name={this.name}
          placeholder={this.placeholder}
          textPrefix={this.textPrefix}
          textSuffix={this.textSuffix}
          readonly={this.readonly}
          required={this.required}
          errors={this.errors}
          errorUpdate={this.errorUpdate}
          nativeAttributes={this.nativeAttributes}
          value={this.getInputValue()}
          onCatFocus={e => this.catFocus.emit(e.detail)}
          onCatBlur={e => this.onInputBlur(e.detail)}
        >
          <span slot="label">
            {this.label}
            <span class="label-aria"> ({this.locale.formatStr})</span>
          </span>
          <cat-dropdown slot="addon" placement={this.placement} arrowNavigation='none' noResize>
            <cat-button
              slot="trigger"
              icon="$cat:datepicker-calendar"
              iconOnly
              class="cat-date-toggle"
              disabled={this.disabled}
              a11yLabel={
                this.selectionDate
                  ? `${this.locale.change}, ${this.getA11yLabelDay(this.selectionDate)}`
                  : this.locale.choose
              }
            ></cat-button>
            <div class="picker" slot="content">
              <div class="picker-head">
                <cat-button
                  icon="$cat:datepicker-year-prev"
                  iconOnly
                  size="xs"
                  variant="text"
                  a11y-label={this.locale.prevYear}
                  disabled={isSameYear(this.viewDate, this.minDate)}
                  onClick={() => this.navigate('prev', 'year')}
                  data-dropdown-no-close
                ></cat-button>
                <cat-button
                  icon="$cat:datepicker-month-prev"
                  iconOnly
                  size="xs"
                  variant="text"
                  a11y-label={this.locale.prevMonth}
                  disabled={isSameMonth(this.viewDate, this.minDate)}
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
                  disabled={isSameMonth(this.viewDate, this.maxDate)}
                  onClick={() => this.navigate('next', 'month')}
                  data-dropdown-no-close
                ></cat-button>
                <cat-button
                  icon="$cat:datepicker-year-next"
                  iconOnly
                  size="xs"
                  variant="text"
                  a11y-label={this.locale.nextYear}
                  disabled={isSameYear(this.viewDate, this.maxDate)}
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
                        'cat-date-item': true,
                        'date-other': !isSameMonth(this.viewDate, day),
                        'date-today': isSameDay(this.now, day),
                        'date-selected': isSameDay(this.selectionDate, day),
                        'date-focusable': this.canFocus(day),
                        'date-disabled': !this.canClick(day)
                      }}
                      nativeAttributes={!this.canFocus(day) ? { tabindex: '-1' } : {}}
                      variant={
                        isSameDay(this.selectionDate, day) ? 'filled' : isSameDay(this.now, day) ? 'outlined' : 'text'
                      }
                      a11yLabel={this.getA11yLabelDay(day)}
                      active={isSameDay(this.selectionDate, day)}
                      color={isSameDay(this.selectionDate, day) || isSameDay(this.now, day) ? 'primary' : 'secondary'}
                      disabled={!this.canClick(day)}
                      onClick={() => this.select(day)}
                      data-date={this.toLocalISO(day)}
                    >
                      {day.getDate()}
                    </cat-button>
                  ))}
                </div>
              </div>
              <div class="picker-foot">
                {this.canClick(this.now) && (
                  <cat-button size="s" data-dropdown-no-close onClick={() => this.select(this.now)}>
                    {this.locale.today}
                  </cat-button>
                )}
                <p
                  class={{
                    'cursor-help': true,
                    'cursor-right': this.canClick(this.now)
                  }}
                >
                  {this.locale.arrowKeys}
                </p>
                <p class="cursor-aria" aria-live="polite"></p>
              </div>
            </div>
          </cat-dropdown>
        </cat-input>
      </Host>
    );
  }

  private parse(value: string) {
    const [, p1, d1, p2, p3] = /(\w+)([^\w]+)(\w+)[^\w]+(\w+)/.exec(this.locale.formatStr) || [];
    const formatParts = [p1, p2, p3];
    const parts = value.split(d1).map(s => Number(s || 'x'));
    let year = parts[formatParts.indexOf('YYYY') || formatParts.indexOf('YY')] || this.now.getFullYear();
    const month = parts[formatParts.indexOf('MM')];
    const day = parts[formatParts.indexOf('DD')];
    if (!Number.isInteger(month) || !Number.isInteger(day)) {
      return null;
    } else if (year < 100) {
      year += year < 50 ? 2000 : 1900;
    }
    return new Date(year, month - 1, day);
  }

  private focus(date: Date) {
    this.focusDate = clampDate(this.minDate, date, this.maxDate);
    this.viewDate = new Date(this.focusDate.getFullYear(), this.focusDate.getMonth());
    this.hostElement.shadowRoot
      ?.querySelector<HTMLCatButtonElement>(`[data-date="${this.toLocalISO(this.focusDate)}"]`)
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

  private onInputBlur(e: FocusEvent) {
    if (!this.input) {
      return;
    }
    const oldValue = this.value;
    const value = this.parse(this.input.value ?? '');
    this.selectionDate = value ? clampDate(this.minDate, value, this.maxDate) : value;
    this.value = this.selectionDate?.toISOString();
    if (oldValue !== this.value) {
      this.catChange.emit(this.value);
    }
    this.input.value = this.getInputValue();
    this.catBlur.emit(e);
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

  private canFocus(date: Date): boolean {
    const now = this.now;
    const focused = this.focusedDate;
    if (focused && isSameMonth(focused, this.viewDate)) {
      return isSameMonth(focused, date) && isSameDay(focused, date);
    } else if (this.selectionDate && isSameMonth(this.selectionDate, this.viewDate)) {
      return isSameMonth(this.selectionDate, date) && isSameDay(this.selectionDate, date);
    } else if (isSameMonth(this.viewDate, now) && (!this.minDate || this.minDate <= now)) {
      return isSameMonth(this.viewDate, date) && isSameDay(now, date);
    }
    const minDay = isSameMonth(date, this.minDate) ? this.minDate?.getDate() ?? 1 : 1;
    return isSameMonth(this.viewDate, date) && date.getDate() === minDay;
  }

  private canClick(date: Date) {
    const min = this.minDate;
    const max = this.maxDate;
    return (!min || min <= date) && (!max || max >= date);
  }

  private toLocalISO(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
