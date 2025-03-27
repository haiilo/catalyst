import { p as proxyCustomElement, H, d as createEvent, h, c as Host } from './p-DJz_AlH8.js';
import { g as getLocale, c as clampDate, d as defineCustomElement$6 } from './p-D-cofwyQ.js';
import { c as catI18nRegistry } from './p-DYxciDq0.js';
import { d as defineCustomElement$7 } from './p-BAS0o037.js';
import { d as defineCustomElement$5 } from './p-UETcMnly.js';
import { d as defineCustomElement$4 } from './p-tMJhdM6b.js';
import { d as defineCustomElement$3 } from './p-bQjey6hs.js';
import { d as defineCustomElement$2 } from './p-BWMxUNx3.js';

const catDateCss = ":host{display:block}:host([hidden]){display:none}.label-aria{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}cat-date-inline{margin:1rem;width:20rem}";

const CatDate$1 = /*@__PURE__*/ proxyCustomElement(class CatDate extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catChange = createEvent(this, "catChange");
        this.catFocus = createEvent(this, "catFocus");
        this.catBlur = createEvent(this, "catBlur");
        this.language = catI18nRegistry.getLocale();
        this.locale = getLocale(this.language);
        this.inputFocused = false;
        /**
         * Whether the label need a marker to shown if the input is required or optional.
         */
        this.requiredMarker = 'optional';
        /**
         * Whether the label is on top or left.
         */
        this.horizontal = false;
        /**
         * Hint for form autofill feature.
         */
        this.autoComplete = 'off';
        /**
         * Whether the input should show a clear button.
         */
        this.clearable = false;
        /**
         * Whether the input is disabled.
         */
        this.disabled = false;
        /**
         * Display the icon on the right.
         */
        this.iconRight = false;
        /**
         * The label for the input.
         */
        this.label = '';
        /**
         * Visually hide the label, but still show it to assistive technologies like screen readers.
         */
        this.labelHidden = false;
        /**
         * The value is not editable.
         */
        this.readonly = false;
        /**
         * A value is required or must be check for the form to be submittable.
         */
        this.required = false;
        /**
         * Fine-grained control over when the errors are shown. Can be `false` to
         * never show errors, `true` to show errors on blur, or a number to show
         * errors change with the given delay in milliseconds or immediately on blur.
         */
        this.errorUpdate = 0;
        /**
         * The placement of the dropdown.
         */
        this.placement = 'bottom-end';
    }
    onMinChanged(min, oldMin) {
        if (min !== oldMin) {
            this.reclamp('min', min);
        }
    }
    onMaxChanged(max, oldMax) {
        if (max !== oldMax) {
            this.reclamp('max', max);
        }
    }
    get inputValue() {
        const [match, year, month, day] = this.value?.match(/^(\d{4})-(\d{2})-(\d{2})/) ?? [];
        if (match) {
            const date = new Date(Number(year), Number(month) - 1, Number(day));
            const format = new Intl.DateTimeFormat(this.language, { year: 'numeric', month: '2-digit', day: '2-digit' });
            return format.format(date);
        }
        return '';
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
    /**
     * Programmatically move focus to the input. Use this method instead of
     * `input.focus()`.
     *
     * @param options An optional object providing options to control aspects of
     * the focusing process.
     */
    async doFocus(options) {
        this.input?.doFocus(options);
    }
    /**
     * Programmatically remove focus from the input. Use this method instead of
     * `input.blur()`.
     */
    async doBlur() {
        this.input?.doBlur();
    }
    /**
     * Clear the input.
     */
    async clear() {
        this.input?.clear();
    }
    render() {
        this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
        return (h(Host, { key: '9635d72c77b9f68f5d650a5ef9e1883672e4865f' }, h("cat-input", { key: '469f2bab5fd76cb6f09ee7b484cb222a154e3718', class: "cat-date-input", ref: el => (this.input = el), requiredMarker: this.requiredMarker, horizontal: this.horizontal, autoComplete: this.autoComplete, clearable: this.clearable, disabled: this.disabled, hint: this.hint, icon: this.icon, iconRight: this.iconRight, identifier: this.identifier, labelHidden: this.labelHidden, name: this.name, placeholder: this.placeholder, textPrefix: this.textPrefix, textSuffix: this.textSuffix, readonly: this.readonly, required: this.required, errors: this.errors, errorUpdate: this.errorUpdate, nativeAttributes: this.nativeAttributes, value: this.inputValue, onCatFocus: e => {
                this.inputFocused = e.target === this.input;
                e.stopPropagation();
                this.catFocus.emit(e.detail);
            }, onCatBlur: e => {
                e.stopPropagation();
                this.onInputBlur(e.detail);
            } }, h("span", { key: '65e0c84bf675f0c76896f06452068acfb0326e2e', slot: "label" }, this.label, h("span", { key: '67f3e80eb70dd817b481ca7945edfc83d2451c78', class: "label-aria" }, " (", this.locale.formatStr, ")")), h("cat-dropdown", { key: 'a05ef8d20ade5dda5801e44142efdb3b532b76f7', slot: "addon", placement: this.placement, arrowNavigation: "none", noResize: true, onCatOpen: () => this.dateInline?.resetView() }, h("cat-button", { key: 'a4d464eead26162405655074e352e2024c04a201', slot: "trigger", icon: "$cat:datepicker-calendar", iconOnly: true, class: "cat-date-toggle", disabled: this.disabled, a11yLabel: this.getTriggerA11yLabel() }), h("div", { key: 'e9b8ac737e80392f98b933d4870309cb8843d166', slot: "content" }, h("cat-date-inline", { key: '541651169cd502dd166aa9443c6392118f3bd26a', ref: el => (this.dateInline = el), min: this.min, max: this.max, value: this.value, hint: true, weeks: true, noClear: true, onCatChange: this.onDateChange.bind(this) }))))));
    }
    getTriggerA11yLabel() {
        const date = this.locale.fromLocalISO(this.value);
        return date ? `${this.locale.change}, ${this.locale.toLocalStr(date)}` : this.locale.choose;
    }
    onInputBlur(e) {
        if (!this.input || !this.inputFocused) {
            return;
        }
        this.inputFocused = false;
        const oldValue = this.value;
        const dateParsed = this.parse(this.input.value ?? '');
        const dateMin = this.locale.fromLocalISO(this.min);
        const dateMax = this.locale.fromLocalISO(this.max);
        const date = dateParsed ? clampDate(dateMin, dateParsed, dateMax) : null;
        this.value = date ? this.locale.toLocalISO(date) : undefined;
        if (oldValue !== this.value) {
            if (date) {
                this.dateInline?.select(date);
            }
            else {
                this.dateInline?.clear();
            }
            this.catChange.emit(this.value);
        }
        this.input.value = this.inputValue;
        this.catBlur.emit(e);
    }
    onDateChange(e) {
        e.stopPropagation();
        const oldValue = this.value;
        const date = e.detail ? this.locale.fromLocalISO(e.detail) : null;
        this.value = date ? this.locale.toLocalISO(date) : undefined;
        if (oldValue !== this.value) {
            this.catChange.emit(this.value);
        }
    }
    parse(value) {
        const [, p1, d1, p2, p3] = /(\w+)([^\w]+)(\w+)[^\w]+(\w+)/.exec(this.locale.formatStr) || [];
        const formatParts = [p1, p2, p3];
        const parts = value.split(d1).map(s => Number(s || 'x'));
        let year = parts[formatParts.indexOf('YYYY') || formatParts.indexOf('YY')] || this.locale.now().getFullYear();
        const month = parts[formatParts.indexOf('MM')];
        const day = parts[formatParts.indexOf('DD')];
        if (!Number.isInteger(month) || !Number.isInteger(day)) {
            return null;
        }
        else if (year < 100) {
            year += year < 50 ? 2000 : 1900;
        }
        return new Date(year, month - 1, day);
    }
    reclamp(mode, limit) {
        const oldValue = this.value;
        const oldDate = this.locale.fromLocalISO(oldValue);
        const limitDate = this.locale.fromLocalISO(limit);
        if (!oldDate || !limitDate) {
            return;
        }
        const newDate = clampDate(mode === 'min' ? limitDate : null, oldDate, mode === 'max' ? limitDate : null);
        const newValue = this.locale.toLocalISO(newDate);
        if (oldValue !== newValue) {
            this.value = newValue;
            this.catChange.emit(newValue);
        }
    }
    static get delegatesFocus() { return true; }
    get hostElement() { return this; }
    static get watchers() { return {
        "min": ["onMinChanged"],
        "max": ["onMaxChanged"]
    }; }
    static get style() { return catDateCss; }
}, [17, "cat-date", {
        "requiredMarker": [1, "required-marker"],
        "horizontal": [4],
        "autoComplete": [1, "auto-complete"],
        "clearable": [4],
        "disabled": [4],
        "hint": [1],
        "icon": [1],
        "iconRight": [4, "icon-right"],
        "identifier": [1],
        "label": [1],
        "labelHidden": [4, "label-hidden"],
        "max": [1],
        "min": [1],
        "name": [1],
        "placeholder": [1],
        "textPrefix": [1, "text-prefix"],
        "textSuffix": [1, "text-suffix"],
        "readonly": [4],
        "required": [4],
        "value": [1025],
        "errors": [4],
        "errorUpdate": [8, "error-update"],
        "nativeAttributes": [16],
        "placement": [1],
        "doFocus": [64],
        "doBlur": [64],
        "clear": [64]
    }, undefined, {
        "min": ["onMinChanged"],
        "max": ["onMaxChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-date", "cat-button", "cat-date-inline", "cat-dropdown", "cat-icon", "cat-input", "cat-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-date":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatDate$1);
            }
            break;
        case "cat-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "cat-date-inline":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "cat-dropdown":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "cat-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "cat-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "cat-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const CatDate = CatDate$1;
const defineCustomElement = defineCustomElement$1;

export { CatDate, defineCustomElement };
//# sourceMappingURL=cat-date.js.map

//# sourceMappingURL=cat-date.js.map