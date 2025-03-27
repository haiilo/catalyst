import { p as proxyCustomElement, H, d as createEvent, h, c as Host } from './p-DJz_AlH8.js';
import { c as catI18nRegistry } from './p-DYxciDq0.js';
import { d as defineCustomElement$6 } from './p-BAS0o037.js';
import { d as defineCustomElement$5 } from './p-UETcMnly.js';
import { d as defineCustomElement$4 } from './p-tMJhdM6b.js';
import { d as defineCustomElement$3 } from './p-bQjey6hs.js';
import { d as defineCustomElement$2 } from './p-BWMxUNx3.js';

function getHour12(language) {
    const dateStr = new Intl.DateTimeFormat(language, { hour: '2-digit', minute: '2-digit' })
        .format(new Date())
        .toLowerCase();
    return dateStr.includes('am') || dateStr.includes('pm');
}
function getLocale(language) {
    return {
        change: catI18nRegistry.t('timepicker.change'),
        choose: catI18nRegistry.t('timepicker.choose'),
        timeFormat: getHour12(language) ? '12' : '24'
    };
}
function formatIso(date) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function clampTime(min, date, max) {
    const [, hhMin, mmMin] = min?.match(/(\d{2}):(\d{2})/)?.map(Number) ?? [];
    const [, hhMax, mmMax] = max?.match(/(\d{2}):(\d{2})/)?.map(Number) ?? [];
    let minTime = -Infinity;
    let maxTime = Infinity;
    if (hhMin !== undefined && mmMin !== undefined) {
        minTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hhMin, mmMin).getTime();
    }
    if (hhMax !== undefined && mmMax !== undefined) {
        maxTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hhMax, mmMax).getTime();
    }
    return new Date(Math.min(Math.max(date.getTime(), minTime), maxTime));
}
function isBefore(date, time) {
    const [, hh, mm] = time?.match(/(\d{2}):(\d{2})/)?.map(Number) ?? [];
    if (hh === undefined || mm === undefined) {
        return false;
    }
    return date.getHours() < hh || (date.getHours() === hh && date.getMinutes() < mm);
}
function isAfter(date, time) {
    const [, hh, mm] = time?.match(/(\d{2}):(\d{2})/)?.map(Number) ?? [];
    if (hh === undefined || mm === undefined) {
        return false;
    }
    return date.getHours() > hh || (date.getHours() === hh && date.getMinutes() > mm);
}

const catTimeCss = ":host{display:block}:host([hidden]){display:none}.label-aria{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.cat-time-addon{margin-left:-1px;display:flex}nav{max-height:16rem}nav ul{list-style:none;margin:0;padding:0}.time-disabled{opacity:0.25}";

const CatTime$1 = /*@__PURE__*/ proxyCustomElement(class CatTime extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catChange = createEvent(this, "catChange");
        this.catFocus = createEvent(this, "catFocus");
        this.catBlur = createEvent(this, "catBlur");
        this.language = catI18nRegistry.getLocale();
        this.locale = getLocale(this.language);
        this.hasSlottedLabel = false;
        this.hasSlottedHint = false;
        this.selectionTime = null;
        this.isAm = true;
        this.valueChangedBySelection = false;
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
        /**
         * The step size for times in minutes.
         */
        this.step = 30;
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
    onValueChanged(value, oldValue) {
        if (this.valueChangedBySelection) {
            this.valueChangedBySelection = false;
        }
        else if (value !== oldValue) {
            this.set12hFormat();
            this.syncValue(value ?? '');
        }
    }
    componentWillLoad() {
        this.set12hFormat();
        this.syncValue(this.value ?? '');
    }
    componentWillRender() {
        this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
        this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    }
    componentDidLoad() {
        this.input?.mask({
            time: true,
            timeFormat: this.locale.timeFormat,
            timePattern: ['h', 'm']
        });
    }
    onOpen() {
        const query = (selector) => this.hostElement.shadowRoot?.querySelector(selector);
        const time = clampTime(this.min ?? null, this.selectionTime ?? new Date(2000, 5, 1, 8), this.max ?? null);
        const elem1 = query(`[data-time="${formatIso(time)}"]`);
        time.setMinutes(Math.floor(time.getMinutes() / this.step) * this.step);
        const elem2 = query(`[data-time="${formatIso(time)}"]`);
        setTimeout(() => {
            (elem2 ?? elem1)?.doFocus();
            (elem2 ?? elem1)?.scrollIntoView(this.selectionTime ? { block: 'center' } : undefined);
        }); // not entirely sure why this is necessary
    }
    /**
     * Select a time in the picker.
     *
     * @param date The time to select.
     */
    async select(date) {
        const oldValue = this.value;
        let newValue = this.value;
        if (!date) {
            this.selectionTime = null;
            newValue = undefined;
        }
        else {
            const time = clampTime(this.min ?? null, date, this.max ?? null);
            this.isAm = this.format(time).toLowerCase().includes('am');
            this.selectionTime = time;
            newValue = formatIso(time);
        }
        // we need to set the input explicitly to sync the input even without a
        // rerender (if the value is not changed)
        if (this.input) {
            this.input.value = this.format(this.selectionTime, false);
        }
        if (oldValue !== newValue) {
            this.valueChangedBySelection = true;
            this.value = newValue;
            this.catChange.emit(this.value);
        }
        else {
            this.valueChangedBySelection = false;
        }
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
        return (h(Host, { key: '55ddaea80f34a762b7f3b97145f3fc23678764df' }, h("cat-input", { key: 'b9c72fafc50c6f123478f426d771ae25fa77d7d9', class: "cat-time-input", ref: el => (this.input = el), requiredMarker: this.requiredMarker, horizontal: this.horizontal, autoComplete: this.autoComplete, clearable: this.clearable, disabled: this.disabled, hint: this.hint, icon: this.icon, iconRight: this.iconRight, identifier: this.identifier, label: this.label, labelHidden: this.labelHidden, name: this.name, placeholder: this.placeholder, textPrefix: this.textPrefix, textSuffix: this.textSuffix, readonly: this.readonly, required: this.required, value: this.format(this.selectionTime, false), errors: this.errors, errorUpdate: this.errorUpdate, nativeAttributes: this.nativeAttributes, onCatFocus: e => this.catFocus.emit(e.detail), onCatBlur: e => this.onInputBlur(e.detail) }, h("span", { key: 'fff1bf4b55421e1d3d0a59c6526e2a1489531c73', slot: "label" }, this.hasSlottedLabel && h("slot", { key: '3bf7db213bf73ed33f47b78df88445654feef6f1', name: "label" }), !this.hasSlottedLabel && this.label, h("span", { key: 'cd3bc1b7be142e85106f03ab84f664279f129c02', class: "label-aria" }, " (HH:mm)")), h("div", { key: 'c56add3522077567621147d80a327c7acfa93110', slot: "addon", class: "cat-time-addon" }, this.locale.timeFormat === '12' && (h("cat-button", { key: 'e895941581bd1d6a67eb3f384d6cdf4cd6663ca2', class: "cat-time-format", disabled: this.disabled || this.readonly, onCatClick: () => this.toggleAm() }, this.isAm ? 'AM' : 'PM')), h("cat-dropdown", { key: 'b44d49f1d06c3a78342f60b873ad57d613fe38c5', slot: "addon", placement: this.placement }, h("cat-button", { key: '95789ba8b632e442a41059c60a8394efa61a6e54', slot: "trigger", class: "cat-time-toggle", disabled: this.disabled || this.readonly, icon: "$cat:timepicker-clock", iconOnly: true, a11yLabel: this.selectionTime ? `${this.locale.change}, ${this.format(this.selectionTime)}` : this.locale.choose }), h("nav", { key: 'fd16e5301bdde5fa3f3ac929380d9f8ca7cef75b', slot: "content", class: "cat-nav" }, h("ul", { key: '9107c10a9533ef4cef0c0718cba17e097a7d54bd' }, this.timeArray().map(time => {
            const isoTime = formatIso(time);
            const disabled = isBefore(time, this.min ?? null) || isAfter(time, this.max ?? null);
            return (h("li", null, h("cat-button", { class: {
                    'cat-nav-item': true,
                    'time-disabled': disabled
                }, disabled: disabled, active: isoTime === this.value, color: isoTime === this.value ? 'primary' : 'secondary', variant: isoTime === this.value ? 'filled' : 'outlined', onCatClick: () => this.select(time), "data-time": isoTime }, this.format(time))));
        }))))), this.hasSlottedHint && (h("span", { key: '55b0ac7a0d4aa7f743d23a3f0f8461b4f1e44781', slot: "hint" }, h("slot", { key: '8f05bb69ab686061bebad8cc6a1364e0bea5267a', name: "hint" }))))));
    }
    timeArray() {
        const result = [];
        const start = new Date(2000, 5, 1, 0, 0, 0);
        let time = new Date(start.getTime());
        while (time.getDate() === start.getDate()) {
            result.push(time);
            time = new Date(time.getTime() + this.step * 60000);
        }
        return result;
    }
    syncValue(value) {
        const [, hh, mm] = value.match(/(\d{2}):(\d{2})/)?.map(Number) ?? [];
        if (hh === undefined || mm === undefined) {
            this.select(null);
            return;
        }
        this.select(this.locale.timeFormat === '24'
            ? new Date(2000, 5, 1, hh, mm, 0)
            : new Date(2000, 5, 1, (hh % 12) + (this.isAm ? 0 : 12), mm, 0));
    }
    set12hFormat() {
        const [, hh] = this.value?.match(/(\d{2}):(\d{2})/)?.map(Number) ?? [];
        if (this.locale.timeFormat === '12') {
            this.isAm = hh === 0 || hh < 12;
        }
    }
    toggleAm() {
        if (this.selectionTime) {
            this.select(new Date(this.selectionTime.getTime() + (this.isAm ? 12 : -12) * 3600000));
        }
        else {
            this.isAm = !this.isAm;
        }
    }
    onInputBlur(e) {
        this.syncValue(this.input?.value ?? '');
        this.catBlur.emit(e);
    }
    format(date, includeAmPm = true) {
        const str = date
            ? new Intl.DateTimeFormat(this.language, {
                hour: '2-digit',
                minute: '2-digit'
            }).format(date)
            : '';
        return includeAmPm ? str : str.replace(/\s?(am|pm)/i, '');
    }
    reclamp(mode, limit) {
        if (!this.value)
            return;
        const min = (mode === 'min' ? limit : this.min) ?? null;
        const max = (mode === 'max' ? limit : this.max) ?? null;
        const [match, hh, mm] = this.value.match(/(\d{2}):(\d{2})/) ?? [];
        const newValue = match ? formatIso(clampTime(min, new Date(2000, 5, 1, Number(hh), Number(mm)), max)) : undefined;
        if (this.value !== newValue) {
            this.syncValue(newValue ?? '');
            this.catChange.emit(newValue);
        }
    }
    static get delegatesFocus() { return true; }
    get hostElement() { return this; }
    static get watchers() { return {
        "min": ["onMinChanged"],
        "max": ["onMaxChanged"],
        "value": ["onValueChanged"]
    }; }
    static get style() { return catTimeCss; }
}, [17, "cat-time", {
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
        "step": [2],
        "hasSlottedLabel": [32],
        "hasSlottedHint": [32],
        "selectionTime": [32],
        "isAm": [32],
        "valueChangedBySelection": [32],
        "select": [64],
        "doFocus": [64],
        "doBlur": [64],
        "clear": [64]
    }, [[0, "catOpen", "onOpen"]], {
        "min": ["onMinChanged"],
        "max": ["onMaxChanged"],
        "value": ["onValueChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-time", "cat-button", "cat-dropdown", "cat-icon", "cat-input", "cat-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-time":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatTime$1);
            }
            break;
        case "cat-button":
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

const CatTime = CatTime$1;
const defineCustomElement = defineCustomElement$1;

export { CatTime, defineCustomElement };
//# sourceMappingURL=cat-time.js.map

//# sourceMappingURL=cat-time.js.map