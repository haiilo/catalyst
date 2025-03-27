import { p as proxyCustomElement, H, d as createEvent, h, c as Host } from './p-DJz_AlH8.js';
import { C as CatFormHint } from './p-C3lVj_zU.js';

const catToggleCss = ".hint-wrapper{flex:0 1 auto;display:flex;gap:0.5rem}.hint-section{flex:1 1 auto;display:flex;flex-direction:column;gap:0.25rem;color:rgb(var(--cat-font-color-muted, 81, 92, 108));font-size:0.875rem;line-height:1.125rem}.hint-section .input-hint,.hint-section ::slotted([slot=hint]){margin:0 !important}:host{display:flex;flex-direction:column;gap:0.25rem}:host([hidden]){display:none}label{flex:0 1 auto;display:flex;gap:0.5rem;font-size:0.9375rem;line-height:1.25rem;font-weight:var(--cat-font-weight-body, 400);-webkit-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.label-left{flex-direction:row-reverse}input{position:absolute;margin:0;width:2rem;height:1.25rem;opacity:0;cursor:inherit}.toggle-placeholder{width:calc(2rem + 1px);flex-shrink:0}.toggle{flex:0 0 auto;display:flex;align-items:center;justify-content:center;position:relative;width:2rem;height:1.25rem;border-radius:10rem;background-color:rgb(var(--cat-border-color-dark, 215, 219, 224));transition:background-color 125ms ease;pointer-events:none}:checked+.toggle{background-color:rgb(var(--cat-primary-bg, 0, 129, 148))}:focus-visible+.toggle{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.toggle::after{content:\"\";position:absolute;width:1rem;height:1rem;background:#fff;border-radius:10rem;transform:translateX(calc(2px - 0.5rem));transition:transform 125ms linear;box-shadow:0 1px 2px rgba(27, 31, 38, 0.06), 0 1px 3px rgba(27, 31, 38, 0.1)}:checked+.toggle::after{transform:translateX(calc(-2px + 0.5rem));background:rgb(var(--cat-primary-fill, 255, 255, 255))}.is-disabled .toggle{background-color:rgb(var(--cat-border-color-dark, 215, 219, 224))}:host(.cat-error) .toggle{background-color:rgba(var(--cat-danger-bg, 217, 52, 13), 0.2)}:host(.cat-error) :checked+.toggle{background-color:rgb(var(--cat-danger-bg, 217, 52, 13))}:host(.cat-error) :checked+.toggle::after{background:rgb(var(--cat-danger-fill, 255, 255, 255))}.label{flex:1 1 auto}.is-hidden .label{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.is-disabled{cursor:not-allowed;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}.align-center{align-items:center}.align-end{align-items:flex-end}";

let nextUniqueId = 0;
const CatToggle$1 = /*@__PURE__*/ proxyCustomElement(class CatToggle extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catChange = createEvent(this, "catChange");
        this.catFocus = createEvent(this, "catFocus");
        this.catBlur = createEvent(this, "catBlur");
        this._id = `cat-toggle-${nextUniqueId++}`;
        this.hasSlottedLabel = false;
        this.hasSlottedHint = false;
        /**
         * Checked state of the toggle.
         */
        this.checked = false;
        /**
         * Disabled state of the toggle.
         */
        this.disabled = false;
        /**
         * The label of the toggle that is visible.
         */
        this.label = '';
        /**
         * Visually hide the label, but still show it to assistive technologies like screen readers.
         */
        this.labelHidden = false;
        /**
         * Required state of the toggle.
         */
        this.required = false;
        /**
         * The resolved value of the toggle, based on the checked state, value and noValue.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.resolvedValue = null;
        /**
         * Whether the label should appear to the left of the toggle.
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
    componentWillLoad() {
        this.updateResolved();
    }
    componentWillRender() {
        this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
        this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    }
    /**
     * Programmatically move focus to the toggle. Use this method instead of
     * `input.focus()`.
     *
     * @param options An optional object providing options to control aspects of
     * the focusing process.
     */
    async doFocus(options) {
        this.input.focus(options);
    }
    /**
     * Programmatically remove focus from the toggle. Use this method instead of
     * `input.blur()`.
     */
    async doBlur() {
        this.input.blur();
    }
    render() {
        this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
        return (h(Host, { key: '18e3e673ff5447b34457de423f601cc1af767c00' }, h("label", { key: '22df334a9f372ee040c3deb3165f82f8fdcef0b0', htmlFor: this.id, class: {
                'is-hidden': this.labelHidden,
                'is-disabled': this.disabled,
                'label-left': this.labelLeft,
                'align-center': this.alignment === 'center',
                'align-end': this.alignment === 'bottom'
            } }, h("input", { key: '4472899b180f286d43c5d34aa7821a29db3ffb18', "data-test": this.testId, ...this.nativeAttributes, part: "input", ref: el => (this.input = el), id: this.id, type: "checkbox", name: this.name, value: this.value, checked: this.checked, required: this.required, disabled: this.disabled, class: "form-check-input", role: "switch", onInput: this.onInput.bind(this), onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), "aria-describedby": this.hasHint ? this.id + '-hint' : undefined }), h("span", { key: '90e342a85fd5e80ccde346aa65aaccacaf2cb919', class: "toggle" }), h("span", { key: '138b08fbf20d83cd74d18b3a7c76ecb87d4b9eb2', class: "label", part: "label" }, (this.hasSlottedLabel && h("slot", { key: '6753f56609e0447ec0eb5b040c74bd511f6dd4de', name: "label" })) || this.label)), this.hasHint && (h("div", { key: '4d5bda25b5e53b0ba8725b41539d08fd9c3bf5f6', class: { 'hint-wrapper': true, 'label-left': this.labelLeft } }, h("div", { key: '9006cf3a82f66cf15c255bba4e2720f86b63e8c8', class: "toggle-placeholder" }), h(CatFormHint, { key: '17eebfed86f71a33629ee9ed943bcd9e0fe276c5', id: this.id, hint: this.hint, slottedHint: this.hasSlottedHint && h("slot", { name: "hint" }) })))));
    }
    get hasHint() {
        return !!this.hint || !!this.hasSlottedHint;
    }
    onInput() {
        this.checked = this.input.checked;
        this.updateResolved();
        this.catChange.emit(this.resolvedValue);
    }
    onFocus(event) {
        this.catFocus.emit(event);
    }
    onBlur(event) {
        this.catBlur.emit(event);
    }
    updateResolved() {
        this.resolvedValue = this.checked ? (this.value ?? true) : (this.noValue ?? false);
    }
    static get delegatesFocus() { return true; }
    get hostElement() { return this; }
    static get style() { return catToggleCss; }
}, [17, "cat-toggle", {
        "checked": [1028],
        "disabled": [4],
        "identifier": [1],
        "label": [1],
        "labelHidden": [4, "label-hidden"],
        "name": [1],
        "required": [4],
        "value": [8],
        "noValue": [8, "no-value"],
        "resolvedValue": [1032, "resolved-value"],
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
    const components = ["cat-toggle"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-toggle":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatToggle$1);
            }
            break;
    } });
}

const CatToggle = CatToggle$1;
const defineCustomElement = defineCustomElement$1;

export { CatToggle, defineCustomElement };
//# sourceMappingURL=cat-toggle.js.map

//# sourceMappingURL=cat-toggle.js.map