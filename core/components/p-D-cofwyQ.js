import { p as proxyCustomElement, H, d as createEvent, h, c as Host } from './p-DJz_AlH8.js';
import { c as catI18nRegistry } from './p-DYxciDq0.js';
import { f as firstTabbable } from './p-DJZzfz9c.js';
import { d as defineCustomElement$3 } from './p-BAS0o037.js';
import { d as defineCustomElement$2 } from './p-tMJhdM6b.js';
import { d as defineCustomElement$1 } from './p-BWMxUNx3.js';

function getDays(language, weekday = 'long') {
    const format = new Intl.DateTimeFormat(language, { weekday }).format;
    return [...Array(7).keys()].map(day => format(new Date(2000, 4, 14 + day)));
}
function getMonths(language, month = 'long') {
    const format = new Intl.DateTimeFormat(language, { month }).format;
    return [...Array(12).keys()].map(month => format(new Date(2000, month, 15)));
}
function getWeekInfo(language) {
    const locale = new Intl.Locale(language);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const weekInfo = locale.getWeekInfo?.() ?? locale.weekInfo;
    return {
        firstDay: weekInfo?.firstDay ?? 1,
        minDays: weekInfo?.minDays ?? 4,
        weekend: weekInfo?.weekend ?? [6, 7]
    };
}
function getFormat(language) {
    const format = new Intl.DateTimeFormat(language, { year: 'numeric', month: '2-digit', day: '2-digit' })
        .format(new Date(3456, 10, 22))
        .replace('3456', 'YYYY')
        .replace('56', 'YY')
        .replace('11', 'MM')
        .replace('22', 'DD');
    return /^(YYYY|YY|MM|DD)\W(YYYY|YY|MM|DD)\W(YYYY|YY|MM|DD)$/.test(format) ? format : 'DD-MM-YYYY';
}
function getLocale(language) {
    return {
        prevYear: catI18nRegistry.t('datepicker.prevYear'),
        nextYear: catI18nRegistry.t('datepicker.nextYear'),
        prevMonth: catI18nRegistry.t('datepicker.prevMonth'),
        nextMonth: catI18nRegistry.t('datepicker.nextMonth'),
        arrowKeys: catI18nRegistry.t('datepicker.arrowKeys'),
        today: catI18nRegistry.t('datepicker.today'),
        change: catI18nRegistry.t('datepicker.change'),
        choose: catI18nRegistry.t('datepicker.choose'),
        clear: catI18nRegistry.t('datepicker.clear'),
        formatStr: getFormat(language),
        weekInfo: getWeekInfo(language),
        days: {
            short: getDays(language, 'short'),
            long: getDays(language, 'long')
        },
        months: {
            short: getMonths(language, 'short'),
            long: getMonths(language, 'long')
        },
        now: () => {
            const date = new Date();
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
        },
        fromLocalISO: (date) => {
            const [match, year, month, day] = date?.match(/^(\d{4})-(\d{2})-(\d{2})/) ?? [];
            return match ? new Date(Number(year), Number(month) - 1, Number(day)) : null;
        },
        toLocalISO: (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        toLocalStr: (date) => new Intl.DateTimeFormat(language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        }).format(date)
    };
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
function addDays(date, n) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
}
function addMonth(date, n) {
    const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
    const maxDays = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const newDate = new Date(date);
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() + n);
    newDate.setDate(Math.min(day, maxDays[(month + (n % 12) + 12) % 12]));
    return newDate;
}
function isSameYear(date1, date2) {
    return !!date1 && !!date2 && date1.getFullYear() === date2.getFullYear();
}
function isSameMonth(date1, date2) {
    return !!date1 && !!date2 && date1.getMonth() === date2.getMonth() && isSameYear(date1, date2);
}
function isSameDay(date1, date2) {
    return !!date1 && !!date2 && date1.getDate() === date2.getDate() && isSameMonth(date1, date2);
}
function clampDate(min, date, max) {
    return new Date(Math.min(Math.max(date.getTime(), min?.getTime() ?? -Infinity), max?.getTime() ?? Infinity));
}

const catDateInlineCss = "/**\n * Auto-generated file. Do not edit directly.\n */\n/* stylelint-disable value-keyword-case */\n/* stylelint-enable value-keyword-case */\n.label {\n  overflow: hidden;\n  word-wrap: break-word;\n  word-break: break-word;\n}\n\n.input-field:not(.input-horizontal) .label-container.hidden,\n.textarea-field:not(.textarea-horizontal) .label-container.hidden,\n.select-field:not(.select-horizontal) .label-container.hidden {\n  position: absolute !important;\n  width: 1px !important;\n  height: 1px !important;\n  padding: 0 !important;\n  margin: -1px !important;\n  overflow: hidden !important;\n  clip: rect(0, 0, 0, 0) !important;\n  white-space: nowrap !important;\n  border: 0 !important;\n}\n\n.label-container {\n  flex-basis: var(--label-size, 33.33%);\n}\n\n.label-wrapper {\n  display: flex;\n  gap: 0.25rem;\n}\n\n.label-metadata {\n  display: flex;\n  flex-shrink: 0;\n  flex-grow: 1;\n  justify-content: space-between;\n  gap: 0.25rem;\n  color: rgb(var(--cat-font-color-muted, 81, 92, 108));\n}\n\n.label-optional,\n.label-character-count {\n  display: inline-flex;\n  align-items: center;\n  max-height: 1.25rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n\n.label-character-count {\n  margin-left: auto;\n}\n\n.input-horizontal .label-container.hidden label,\n.textarea-horizontal .label-container.hidden label,\n.select-horizontal .label-container.hidden label {\n  position: absolute !important;\n  width: 1px !important;\n  height: 1px !important;\n  padding: 0 !important;\n  margin: -1px !important;\n  overflow: hidden !important;\n  clip: rect(0, 0, 0, 0) !important;\n  white-space: nowrap !important;\n  border: 0 !important;\n}\n.input-horizontal .label-wrapper,\n.textarea-horizontal .label-wrapper,\n.select-horizontal .label-wrapper {\n  flex-direction: column;\n}\n.input-horizontal label,\n.textarea-horizontal label,\n.select-horizontal label {\n  min-height: 2.5rem;\n  display: inline-flex;\n  align-items: center;\n}\n.input-horizontal .label-metadata,\n.textarea-horizontal .label-metadata,\n.select-horizontal .label-metadata {\n  justify-content: flex-start;\n}\n.input-horizontal .label-metadata .label-character-count,\n.textarea-horizontal .label-metadata .label-character-count,\n.select-horizontal .label-metadata .label-character-count {\n  margin-left: 0;\n}\n\n:host {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n:host([hidden]) {\n  display: none;\n}\n\n.label-hidden,\n.label-container:empty {\n  display: none;\n}\n\n.picker {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.picker-head {\n  display: flex;\n  align-items: center;\n  container-type: inline-size;\n}\n.picker-head > :not(:last-child) {\n  margin-right: 0.25rem;\n}\n.picker-head h3 {\n  font-size: 0.9375rem;\n  line-height: 1.25rem;\n  font-weight: var(--cat-font-weight-head, 600);\n  font-feature-settings: \"pnum\";\n  flex: 1;\n  text-align: center;\n  margin-block: 0;\n}\n@container (min-width: 20rem) {\n  .picker-head h3 {\n    font-size: 1.125rem;\n    line-height: 1.5rem;\n    font-weight: var(--cat-font-weight-head, 600);\n    font-feature-settings: \"pnum\";\n  }\n  .picker-head > :not(:last-child) {\n    margin-right: 0.5rem;\n  }\n}\n\n.picker-grid {\n  display: grid;\n  /* stylelint-disable declaration-block-no-redundant-longhand-properties */\n  grid-template-rows: 2rem repeat(6, 1fr);\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-areas: \"h h h h h h h\" \"d d d d d d d\" \"d d d d d d d\" \"d d d d d d d\" \"d d d d d d d\" \"d d d d d d d\" \"d d d d d d d\";\n  /* stylelint-enable declaration-block-no-redundant-longhand-properties */\n}\n.picker-weeks .picker-grid {\n  /* stylelint-disable declaration-block-no-redundant-longhand-properties */\n  grid-template-columns: 2rem repeat(7, 1fr);\n  grid-template-areas: \". h h h h h h h\" \"w d d d d d d d\" \"w d d d d d d d\" \"w d d d d d d d\" \"w d d d d d d d\" \"w d d d d d d d\" \"w d d d d d d d\";\n  /* stylelint-enable declaration-block-no-redundant-longhand-properties */\n}\n\n.picker-grid-head {\n  grid-area: h;\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  place-items: end center;\n  padding-bottom: 0.5rem;\n}\n\n.picker-grid-weeks {\n  grid-area: w;\n  display: grid;\n  grid-template-rows: repeat(6, 1fr);\n  place-items: center right;\n  padding-right: 0.5rem;\n}\n\n.picker-grid-days {\n  grid-area: d;\n  display: grid;\n  grid-template-rows: repeat(6, 1fr);\n  grid-template-columns: repeat(7, 1fr);\n}\n\n.picker-grid-head > *,\n.picker-grid-weeks > * {\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 600;\n  color: rgb(var(--cat-font-color-muted, 81, 92, 108)) !important;\n  text-decoration: none;\n}\n\n.date-other {\n  opacity: 0.5;\n}\n\n.date-disabled {\n  opacity: 0.25;\n}\n\n.picker-foot {\n  display: flex;\n  align-items: center;\n  width: min-content;\n  min-width: 100%;\n  justify-content: space-between;\n  container-type: inline-size;\n}\n.picker-foot > :not(:last-child) {\n  margin-right: 0.25rem;\n}\n@container (min-width: 20rem) {\n  .picker-foot > :not(:last-child) {\n    margin-right: 0.5rem;\n  }\n  .picker-foot .cursor-help {\n    font-size: 0.875rem;\n    line-height: 1.125rem;\n    font-weight: var(--cat-font-weight-body, 400);\n  }\n}\n\n.cursor-help {\n  margin-block: 0;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: var(--cat-font-weight-body, 400);\n  color: rgb(var(--cat-font-color-muted, 81, 92, 108)) !important;\n  text-align: center;\n  flex: 1;\n}\n.cursor-help:first-child {\n  text-align: left;\n}\n.cursor-help:last-child {\n  text-align: right;\n}\n.cursor-help:only-child {\n  text-align: center;\n}\n\n.cursor-aria {\n  position: absolute !important;\n  width: 1px !important;\n  height: 1px !important;\n  padding: 0 !important;\n  margin: -1px !important;\n  overflow: hidden !important;\n  clip: rect(0, 0, 0, 0) !important;\n  white-space: nowrap !important;\n  border: 0 !important;\n}\n\n.date-range {\n  --cat-border-radius-m: 0;\n}";

let nextUniqueId = 0;
const CatDateInline = /*@__PURE__*/ proxyCustomElement(class CatDateInline extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catChange = createEvent(this, "catChange");
        this._id = `cat-date-inline-${nextUniqueId++}`;
        this.language = catI18nRegistry.getLocale();
        this.locale = getLocale(this.language);
        // additonally store the focus date to ensure correct focus after potential re-render
        this.focusDate = null;
        this.hasSlottedLabel = false;
        this.hasSlottedHint = false;
        this.viewDate = this.locale.now();
        /**
         * Hides the clear button.
         */
        this.noClear = false;
        /**
         * Shows an arrow keys navigation hint.
         */
        this.hint = false;
        /**
         * Hides the today button.
         */
        this.noToday = false;
        /**
         * Show week numbers.
         */
        this.weeks = false;
        /**
         * The label for the input.
         */
        this.label = '';
        /**
         * Visually hide the label, but still show it to assistive technologies like screen readers.
         */
        this.labelHidden = false;
        /**
         * Allow the selection of a range of dates, i.e. start and end date.
         */
        this.range = false;
        /**
         * A value is required or must be check for the form to be submittable.
         */
        this.required = false;
        /**
         * Whether the label need a marker to shown if the input is required or optional.
         */
        this.requiredMarker = 'optional';
    }
    get id() {
        return this.identifier || this._id;
    }
    get focusedDate() {
        const [all, year, month, day] = this.hostElement.shadowRoot
            ?.querySelector(`[data-date]:focus`)
            ?.dataset.date?.match(/^(\d{4})-(\d{2})-(\d{2})/) ?? [];
        return all ? new Date(Number(year), Number(month) - 1, Number(day)) : null;
    }
    componentWillLoad() {
        const [startDate, endDate] = this.getValue();
        if (endDate) {
            this.focus(endDate, false);
        }
        else if (startDate) {
            this.focus(startDate, false);
        }
        this.hostElement.addEventListener('focusin', () => this.setAriaLive(this.a11yLabel));
    }
    componentWillRender() {
        this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
        this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    }
    componentDidRender() {
        if (this.focusDate) {
            // re-focus the previously focused date after re-render
            this.hostElement.shadowRoot
                ?.querySelector(`[data-date="${this.locale.toLocalISO(this.focusDate)}"]`)
                ?.doFocus();
            this.focusDate = null;
        }
    }
    onKeyDown(e) {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
            return;
        }
        const focusedDate = this.focusedDate;
        if (!focusedDate) {
            e.preventDefault();
            const [startDate] = this.getValue();
            this.focus(startDate || this.locale.now());
        }
        else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.focus(e.shiftKey ? addMonth(focusedDate, -1) : addDays(focusedDate, -1));
        }
        else if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.focus(e.shiftKey ? addMonth(focusedDate, 1) : addDays(focusedDate, 1));
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.focus(addDays(focusedDate, -7));
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.focus(addDays(focusedDate, 7));
        }
    }
    /**
     * Select a date in the picker.
     *
     * @param date The date to select.
     */
    async select(date) {
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
            }
            else {
                this.value = this.toRangeValue(startDate, newDate);
            }
        }
        else {
            this.value = this.locale.toLocalISO(newDate);
        }
        if (oldValue !== this.value) {
            this.catChange.emit(this.value);
        }
    }
    /**
     * Clear the picker.
     */
    async clear() {
        const oldValue = this.value;
        this.value = undefined;
        if (oldValue !== this.value) {
            this.catChange.emit(this.value);
        }
    }
    /**
     * Resets the view of the picker.
     */
    async resetView() {
        const [minDate, maxDate] = this.getMinMaxDate();
        const [dateStart] = this.getValue();
        this.viewDate = dateStart ?? clampDate(minDate, this.locale.now(), maxDate);
    }
    /**
     * Programmatically move focus to the inline datepicker, i,e, the first
     * focusable date.
     *
     * @param options An optional object providing options to control aspects of
     * the focusing process.
     */
    async doFocus(options) {
        firstTabbable(this.hostElement.shadowRoot?.querySelector('.picker-grid-days'))?.focus(options);
    }
    render() {
        this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
        const [minDate, maxDate] = this.getMinMaxDate();
        const dateGrid = this.dateGrid(this.viewDate.getFullYear(), this.viewDate.getMonth());
        const [dateStart, dateEnd] = this.getValue();
        return (h(Host, { key: '8b11e245fdd1d392e545692b68ea449dd19f13c8', "aria-label": this.label || undefined }, h("div", { key: 'bf1bd1923e220e9f209ae115eb8e6fb23b3c4b46', class: { 'label-container': true, 'label-hidden': this.labelHidden } }, (this.hasSlottedLabel || this.label) && (h("label", { key: 'e3bfbf624e94f894c38fa97a35a0d5ad7c01915c', id: `${this.id}-label`, htmlFor: this.id, part: "label", onClick: () => this.doFocus() }, h("span", { key: 'd946093505f4a9092632b17bc035390a663d4e7f', class: "label-wrapper" }, (this.hasSlottedLabel && h("slot", { key: 'aa9da48764a90c7d5db185e0472700465627d7c1', name: "label" })) || this.label, h("div", { key: 'd5d8c5c50de0578f96ffb3c80853a06e9bab9821', class: "label-metadata" }, !this.required && (this.requiredMarker ?? 'optional').startsWith('optional') && (h("span", { key: '30b1b1149e7e07798e9786e2de260e07d2dad19a', class: "label-optional", "aria-hidden": "true" }, "(", catI18nRegistry.t('input.optional'), ")")), this.required && this.requiredMarker?.startsWith('required') && (h("span", { key: '6d02133a159884bc9951894390f7d7d98a5bc1c9', class: "label-optional", "aria-hidden": "true" }, "(", catI18nRegistry.t('input.required'), ")"))))))), h("div", { key: 'd114855977b1fcdaf0baa77e9cbef1250bfa03be', class: { picker: true, 'picker-weeks': this.weeks }, id: this.id, "aria-describedby": `${this.id}-label` }, h("div", { key: '49ec46a464d223340dc74d4152c0048db1087ac6', class: "picker-head" }, h("cat-button", { key: '270b297b4a0f577f1ce3c1b8444781f77b089cab', icon: "$cat:datepicker-year-prev", iconOnly: true, size: "xs", variant: "text", "a11y-label": this.locale.prevYear, disabled: isSameYear(this.viewDate, minDate), onClick: () => this.navigate('prev', 'year'), "data-dropdown-no-close": true }), h("cat-button", { key: 'b07427c2c6609b88f4cbbfc6ce14fdf029e22681', icon: "$cat:datepicker-month-prev", iconOnly: true, size: "xs", variant: "text", "a11y-label": this.locale.prevMonth, disabled: isSameMonth(this.viewDate, minDate), onClick: () => this.navigate('prev', 'month'), "data-dropdown-no-close": true }), h("h3", { key: '72c71e36794070a1e2916b6296e453b4314ddf45' }, this.getHeadline()), h("cat-button", { key: '764278977f0b7c5a8e06ac03d395d7f4fcf0cd88', icon: "$cat:datepicker-month-next", iconOnly: true, size: "xs", variant: "text", "a11y-label": this.locale.nextMonth, disabled: isSameMonth(this.viewDate, maxDate), onClick: () => this.navigate('next', 'month'), "data-dropdown-no-close": true }), h("cat-button", { key: 'd19e69146ba96cece2a8e14d6463e2974840d905', icon: "$cat:datepicker-year-next", iconOnly: true, size: "xs", variant: "text", "a11y-label": this.locale.nextYear, disabled: isSameYear(this.viewDate, maxDate), onClick: () => this.navigate('next', 'year'), "data-dropdown-no-close": true })), h("div", { key: '68f854f2e92f054517091e5667204bdf79b0f57c', class: "picker-grid", onFocusin: () => this.setAriaLive(this.locale.arrowKeys) }, h("div", { key: '238564020faf306eadbe5e0178d1e4b1d4590f5c', class: "picker-grid-head" }, Array.from(Array(7), (_, i) => {
            const day = (i + this.locale.weekInfo.firstDay) % 7;
            return h("abbr", { title: this.locale.days.long[day] }, this.locale.days.short[day]);
        })), this.weeks && (h("div", { key: 'c59e9879cd8eacb4197a327a1f3c5e6d109c21b3', class: "picker-grid-weeks" }, dateGrid
            .filter((_, i) => i % 7 === 0)
            .map(day => (h("div", null, this.getWeekNumber(day)))))), h("div", { key: '3751aa8b4744cb6686a5badf2f76bb5a27460dd7', class: "picker-grid-days" }, dateGrid.map(day => {
            const isStartDate = isSameDay(dateStart, day);
            const isEndDate = isSameDay(dateEnd, day);
            const isRange = !!dateStart && !!dateEnd && day > dateStart && day < dateEnd;
            const isToday = isSameDay(this.locale.now(), day);
            const isWeekend = this.locale.weekInfo.weekend.includes(day.getDay() || 7);
            return (h("cat-button", { class: {
                    'cat-date-item': true,
                    'date-other': !isSameMonth(this.viewDate, day),
                    'date-today': isToday,
                    'date-weekend': isWeekend,
                    'date-start': this.range && isStartDate,
                    'date-range': this.range && isRange,
                    'date-end': this.range && isEndDate,
                    'date-focusable': this.canFocus(day),
                    'date-disabled': !this.canClick(day)
                }, nativeAttributes: !this.canFocus(day) ? { tabindex: '-1' } : {}, variant: isStartDate || isEndDate ? 'filled' : isToday ? 'outlined' : 'text', a11yLabel: this.locale.toLocalStr(day), active: isStartDate || isEndDate || isRange, color: isStartDate || isEndDate || isToday ? 'primary' : 'secondary', disabled: !this.canClick(day), onClick: () => this.select(day), "data-date": this.locale.toLocalISO(day) }, day.getDate()));
        }))), h("div", { key: '7dabe502931e5a831423e368500a04577241253f', class: "picker-foot" }, !this.noToday && this.canClick(this.locale.now()) && (h("cat-button", { key: '6da0e2075e109a248a2bb2b6ab67d9ddf96206f1', size: "s", "data-dropdown-no-close": true, onClick: () => this.select(this.locale.now()) }, this.locale.today)), this.hint && h("p", { key: '8b3599454323e064ba22ebd3c16168f99600a64b', class: "cursor-help" }, this.locale.arrowKeys), !this.noClear && (h("cat-button", { key: '596d9b14c74f482098d5d5c3684fea633b43baa2', size: "s", disabled: !this.value, "data-dropdown-no-close": true, onClick: () => this.clear() }, this.locale.clear)))), h("p", { key: 'dd14d9dbec2061f1d55bf628fafadd3a4aa73460', class: "cursor-aria", "aria-live": "polite" })));
    }
    focus(date, focus = true) {
        const [minDate, maxDate] = this.getMinMaxDate();
        const focusDate = clampDate(minDate, date, maxDate);
        this.viewDate = new Date(focusDate.getFullYear(), focusDate.getMonth());
        if (focus) {
            this.focusDate = focusDate;
            this.hostElement.shadowRoot
                ?.querySelector(`[data-date="${this.locale.toLocalISO(focusDate)}"]`)
                ?.doFocus();
        }
    }
    navigate(direction, period) {
        const offset = direction === 'prev' ? -1 : 1;
        const targetYear = this.viewDate.getFullYear() + (period === 'year' ? offset : 0);
        const targetMonth = this.viewDate.getMonth() + (period === 'month' ? offset : 0);
        const date = new Date(this.viewDate);
        date.setFullYear(targetYear);
        date.setMonth(targetMonth);
        const minDate = new Date(targetYear, targetMonth, 1);
        const maxDay = new Date(targetYear, targetMonth + 1, 0).getDate();
        const maxDate = new Date(targetYear, targetMonth, maxDay);
        this.viewDate = clampDate(minDate, date, maxDate);
        this.setAriaLive(this.getHeadline());
    }
    setAriaLive(text) {
        const node = this.hostElement.shadowRoot?.querySelector('.cursor-aria');
        if (node && text) {
            node.innerHTML = text;
        }
    }
    dateGrid(year, month) {
        const daysOffset = (new Date(year, month, 1).getDay() - this.locale.weekInfo.firstDay + 7) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [...Array(daysInMonth).keys()];
        const daysBefore = this.getLastDaysOfMonth(year, month, daysOffset);
        const daysAfter = [...Array(42 - days.length - daysBefore.length).keys()];
        return [
            ...daysBefore.map(day => new Date(year, month - 1, day + 1)),
            ...days.map(day => new Date(year, month, day + 1)),
            ...daysAfter.map(day => new Date(year, month + 1, day + 1))
        ];
    }
    getLastDaysOfMonth(year, month, x) {
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        const daysOfMonth = Array.from({ length: lastDayOfMonth }, (_, index) => index);
        return x ? daysOfMonth.slice(-x) : [];
    }
    getHeadline() {
        return `${this.locale.months.long[this.viewDate.getMonth()]} ${this.viewDate.getFullYear()}`;
    }
    getWeekNumber(date, iso8601 = true) {
        const currentDate = new Date(date.getTime());
        const dayNum = iso8601 ? currentDate.getDay() || 7 : currentDate.getDay();
        currentDate.setDate(currentDate.getDate() + 4 - dayNum);
        const yearStart = new Date(currentDate.getFullYear(), 0, 1);
        return Math.ceil(((+currentDate - +yearStart) / 86400000 + 1) / 7);
    }
    canFocus(date) {
        const now = this.locale.now();
        const [minDate] = this.getMinMaxDate();
        const focusedDate = this.focusedDate;
        const [startDate] = this.getValue();
        if (focusedDate && isSameMonth(focusedDate, this.viewDate)) {
            return isSameMonth(focusedDate, date) && isSameDay(focusedDate, date);
        }
        else if (startDate && isSameMonth(startDate, this.viewDate)) {
            return isSameMonth(startDate, date) && isSameDay(startDate, date);
        }
        else if (isSameMonth(this.viewDate, now) && (!minDate || minDate <= now)) {
            return isSameMonth(this.viewDate, date) && isSameDay(now, date);
        }
        const minDay = isSameMonth(date, minDate) ? (minDate?.getDate() ?? 1) : 1;
        return isSameMonth(this.viewDate, date) && date.getDate() === minDay;
    }
    canClick(date) {
        const [minDate, maxDate] = this.getMinMaxDate();
        return (!minDate || minDate <= date) && (!maxDate || maxDate >= date);
    }
    getMinMaxDate() {
        const minDate = this.locale.fromLocalISO(this.min);
        const maxDate = this.locale.fromLocalISO(this.max);
        return [minDate, maxDate];
    }
    getValue() {
        if (this.range) {
            const [startDate, endDate] = JSON.parse(this.value || '[]');
            return [this.locale.fromLocalISO(startDate), this.locale.fromLocalISO(endDate)];
        }
        else {
            return [this.locale.fromLocalISO(this.value), null];
        }
    }
    toRangeValue(startDate, endDate) {
        return JSON.stringify([startDate, endDate].map(date => (date ? this.locale.toLocalISO(date) : null)));
    }
    static get delegatesFocus() { return true; }
    get hostElement() { return this; }
    static get style() { return catDateInlineCss; }
}, [17, "cat-date-inline", {
        "noClear": [4, "no-clear"],
        "identifier": [1],
        "hint": [4],
        "noToday": [4, "no-today"],
        "weeks": [4],
        "label": [1],
        "labelHidden": [4, "label-hidden"],
        "min": [1],
        "max": [1],
        "range": [4],
        "required": [4],
        "a11yLabel": [1, "a11y-label"],
        "requiredMarker": [1, "required-marker"],
        "value": [1025],
        "hasSlottedLabel": [32],
        "hasSlottedHint": [32],
        "viewDate": [32],
        "select": [64],
        "clear": [64],
        "resetView": [64],
        "doFocus": [64]
    }, [[0, "keydown", "onKeyDown"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-date-inline", "cat-button", "cat-icon", "cat-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-date-inline":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatDateInline);
            }
            break;
        case "cat-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "cat-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "cat-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { CatDateInline as C, clampDate as c, defineCustomElement as d, getLocale as g };
//# sourceMappingURL=p-D-cofwyQ.js.map

//# sourceMappingURL=p-D-cofwyQ.js.map