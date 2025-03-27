import { p as proxyCustomElement, H, d as createEvent, h, c as Host } from './p-DJz_AlH8.js';
import { C as CatFormHint } from './p-C3lVj_zU.js';

const catRadioCss = ".hint-wrapper{flex:0 1 auto;display:flex;gap:0.5rem}.hint-section{flex:1 1 auto;display:flex;flex-direction:column;gap:0.25rem;color:rgb(var(--cat-font-color-muted, 81, 92, 108));font-size:0.875rem;line-height:1.125rem}.hint-section .input-hint,.hint-section ::slotted([slot=hint]){margin:0 !important}:host{display:flex;flex-direction:column;gap:0.25rem}:host([hidden]){display:none}label{display:flex;gap:0.5rem;font-size:0.9375rem;line-height:1.25rem;font-weight:var(--cat-font-weight-body, 400);cursor:pointer}.label-left{flex-direction:row-reverse}.radio{display:flex;position:relative;align-self:flex-start}.circle-placeholder{width:calc(1.25rem + 1px);flex-shrink:0}.circle{position:absolute;width:0.75rem;height:0.75rem;background-color:rgb(var(--cat-primary-bg, 0, 129, 148));border-radius:10rem;top:calc(50% - 0.375rem);left:calc(50% - 0.375rem);visibility:hidden;pointer-events:none}input{margin:0;width:1.25rem;height:1.25rem;appearance:none;background-color:white;border:1px solid rgb(var(--cat-border-color-dark, 215, 219, 224));border-radius:10rem;cursor:inherit}input:checked{border-color:rgb(var(--cat-primary-bg, 0, 129, 148))}input:checked+.circle{visibility:visible}input:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}:host(.cat-error) input{border-color:rgb(var(--cat-danger-bg, 217, 52, 13))}:host(.cat-error) .circle{background-color:rgb(var(--cat-danger-bg, 217, 52, 13))}.label{flex:1 1 auto}.is-hidden .label{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.is-disabled{cursor:not-allowed;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}.is-disabled input{background-color:#f2f4f7}.is-disabled input:checked{border-color:rgb(var(--cat-border-color-dark, 215, 219, 224))}.is-disabled .circle{background-color:rgb(var(--cat-border-color-dark, 215, 219, 224))}.align-center .radio{align-self:center}.align-end .radio{align-self:flex-end}";

let nextUniqueId = 0;
const CatRadio$1 = /*@__PURE__*/ proxyCustomElement(class CatRadio extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catChange = createEvent(this, "catChange");
        this.catFocus = createEvent(this, "catFocus");
        this.catBlur = createEvent(this, "catBlur");
        this._id = `cat-radio-${++nextUniqueId}`;
        this.hasSlottedLabel = false;
        this.hasSlottedHint = false;
        /**
         * Whether this radio is checked.
         */
        this.checked = false;
        /**
         * Whether this radio is disabled.
         */
        this.disabled = false;
        /**
         * The label of the radio that is visible.
         */
        this.label = '';
        /**
         * Visually hide the label, but still show it to assistive technologies like screen readers.
         */
        this.labelHidden = false;
        /**
         * Whether the radio is required.
         */
        this.required = false;
        /**
         * The value of the radio component.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.value = '';
        /**
         * Whether the label should appear to the left of the radio component.
         */
        this.labelLeft = false;
        /**
         * The alignment of the checkbox.
         */
        this.alignment = 'top';
    }
    get id() {
        return this.identifier || this._id;
    }
    componentWillRender() {
        this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
        this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    }
    /**
     * Programmatically move focus to the radio button. Use this method instead of
     * `input.focus()`.
     *
     * @param options An optional object providing options to control aspects of
     * the focusing process.
     */
    async doFocus(options) {
        this.input.focus(options);
    }
    /**
     * Programmatically remove focus from the radio button. Use this method
     * instead of `input.blur()`.
     */
    async doBlur() {
        this.input.blur();
    }
    render() {
        this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
        return (h(Host, { key: 'ca329dab3b08cf59911216e6d1d89e931d4c6836' }, h("label", { key: '0fae08dcf9b6017f1052342f22989a9218437a82', htmlFor: this.id, class: {
                'is-hidden': this.labelHidden,
                'is-disabled': this.disabled,
                'label-left': this.labelLeft,
                'align-center': this.alignment === 'center',
                'align-end': this.alignment === 'bottom'
            }, role: "radio", "aria-checked": this.checked ? 'true' : 'false' }, h("span", { key: 'eed2cf5a6e64d64770466bbfcd5fd0f6e7e329d9', class: "radio" }, h("input", { key: '02a288466717c319419f94e2f9607ab63575e9d5', "data-test": this.testId, ...this.nativeAttributes, part: "input", ref: el => (this.input = el), id: this.identifier || this.id, type: "radio", name: this.name, value: this.value, checked: this.checked, required: this.required, disabled: this.disabled, onInput: this.onInput.bind(this), onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), "aria-describedby": this.hasHint ? this.id + '-hint' : undefined }), h("span", { key: 'f75aa8f50e723b8aa90b60001190638d3d56234a', class: "circle" })), h("span", { key: '52de52cc932bb531440862a04ede38cdf2b29a3a', class: "label", part: "label" }, (this.hasSlottedLabel && h("slot", { key: '3c66d88d6517721590a342001258b5375f274714', name: "label" })) || this.label)), this.hasHint && (h("div", { key: 'b86904829302d22f22ce51f42bd147504b6e387f', class: { 'hint-wrapper': true, 'label-left': this.labelLeft } }, h("div", { key: 'dcca2f05ea10d9cbf731c7b59f82e33916014327', class: "circle-placeholder" }), h(CatFormHint, { key: 'e7b29ec3c4675b1e077fc783fe90780b5794f78a', id: this.id, hint: this.hint, slottedHint: this.hasSlottedHint && h("slot", { name: "hint" }) })))));
    }
    get hasHint() {
        return !!this.hint || !!this.hasSlottedHint;
    }
    onInput() {
        this.checked = true;
        this.catChange.emit(this.value);
    }
    onFocus(event) {
        this.catFocus.emit(event);
    }
    onBlur(event) {
        this.catBlur.emit(event);
    }
    static get delegatesFocus() { return true; }
    get hostElement() { return this; }
    static get style() { return catRadioCss; }
}, [17, "cat-radio", {
        "checked": [1028],
        "disabled": [4],
        "identifier": [1],
        "label": [1],
        "labelHidden": [4, "label-hidden"],
        "name": [1],
        "required": [4],
        "value": [8],
        "hint": [1],
        "labelLeft": [4, "label-left"],
        "alignment": [1],
        "nativeAttributes": [16],
        "testId": [1, "test-id"],
        "hasSlottedLabel": [32],
        "hasSlottedHint": [32],
        "doFocus": [64],
        "doBlur": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-radio"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-radio":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatRadio$1);
            }
            break;
    } });
}

const CatRadio = CatRadio$1;
const defineCustomElement = defineCustomElement$1;

export { CatRadio, defineCustomElement };
//# sourceMappingURL=cat-radio.js.map

//# sourceMappingURL=cat-radio.js.map