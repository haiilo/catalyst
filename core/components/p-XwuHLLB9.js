import { p as proxyCustomElement, H, d as createEvent, h, c as Host } from './p-DJz_AlH8.js';
import { C as CatFormHint } from './p-C3lVj_zU.js';
import { c as catI18nRegistry } from './p-DYxciDq0.js';

const catCheckboxCss = ".hint-wrapper{flex:0 1 auto;display:flex;gap:0.5rem}.hint-section{flex:1 1 auto;display:flex;flex-direction:column;gap:0.25rem;color:rgb(var(--cat-font-color-muted, 81, 92, 108));font-size:0.875rem;line-height:1.125rem}.hint-section .input-hint,.hint-section ::slotted([slot=hint]){margin:0 !important}.label{overflow:hidden;word-wrap:break-word;word-break:break-word}.input-field:not(.input-horizontal) .label-container.hidden,.textarea-field:not(.textarea-horizontal) .label-container.hidden,.select-field:not(.select-horizontal) .label-container.hidden{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.label-container{flex-basis:var(--label-size, 33.33%)}.label-wrapper{display:flex;gap:0.25rem}.label-metadata{display:flex;flex-shrink:0;flex-grow:1;justify-content:space-between;gap:0.25rem;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}.label-optional,.label-character-count{display:inline-flex;align-items:center;max-height:1.25rem;font-size:0.75rem;line-height:1rem}.label-character-count{margin-left:auto}.input-horizontal .label-container.hidden label,.textarea-horizontal .label-container.hidden label,.select-horizontal .label-container.hidden label{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.input-horizontal .label-wrapper,.textarea-horizontal .label-wrapper,.select-horizontal .label-wrapper{flex-direction:column}.input-horizontal label,.textarea-horizontal label,.select-horizontal label{min-height:2.5rem;display:inline-flex;align-items:center}.input-horizontal .label-metadata,.textarea-horizontal .label-metadata,.select-horizontal .label-metadata{justify-content:flex-start}.input-horizontal .label-metadata .label-character-count,.textarea-horizontal .label-metadata .label-character-count,.select-horizontal .label-metadata .label-character-count{margin-left:0}:host{display:flex;flex-direction:column;gap:0.25rem}:host([hidden]){display:none}label{flex:0 1 auto;display:flex;gap:0.5rem;font-size:0.9375rem;line-height:1.25rem;font-weight:var(--cat-font-weight-body, 400);-webkit-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;position:relative}.label-left{flex-direction:row-reverse}.label-left input{right:1px;left:unset}input{position:absolute;width:1.25rem;height:1.25rem;margin:0;opacity:0;cursor:inherit;left:1px;top:0.5px}.box-placeholder{width:calc(1.25rem + 2px);flex-shrink:0}.box{flex:0 0 auto;display:flex;position:relative;height:1.25rem;width:1.25rem;background-color:white;border:1px solid rgb(var(--cat-border-color-dark, 215, 219, 224));border-radius:var(--cat-border-radius-s, 0.125rem);transition:background-color 125ms ease, border-color 125ms ease;pointer-events:none;box-sizing:border-box}.box svg{fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:16px;stroke-dashoffset:16px;transition:all 125ms ease;width:50%;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%) scale(0.99)}:checked+.box{background-color:rgb(var(--cat-primary-bg, 0, 129, 148));border-color:rgb(var(--cat-primary-bg, 0, 129, 148));stroke:rgb(var(--cat-primary-fill, 255, 255, 255))}:checked+.box .check{stroke-dashoffset:0}:indeterminate+.box{background-color:rgb(var(--cat-primary-bg, 0, 129, 148));border-color:rgb(var(--cat-primary-bg, 0, 129, 148));stroke:rgb(var(--cat-primary-fill, 255, 255, 255))}:indeterminate+.box .check{stroke-dashoffset:16px}:indeterminate+.box .dash{stroke-dashoffset:0}:focus-visible+.box{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.is-disabled .box{background-color:#f2f4f7;border-color:rgb(var(--cat-border-color-dark, 215, 219, 224));stroke:rgb(var(--cat-font-color-muted, 81, 92, 108))}:host(.cat-error) .box{border:1px solid rgb(var(--cat-danger-bg, 217, 52, 13))}:host(.cat-error) :checked+.box,:host(.cat-error) :indeterminate+.box{background-color:rgb(var(--cat-danger-bg, 217, 52, 13));border-color:rgb(var(--cat-danger-bg, 217, 52, 13));stroke:rgb(var(--cat-danger-fill, 255, 255, 255))}.label{flex:1 1 auto;min-width:0}.is-hidden .label{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.is-disabled{cursor:not-allowed;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}.align-center{align-items:center}.align-end{align-items:flex-end}";

let nextUniqueId = 0;
const CatCheckbox = /*@__PURE__*/ proxyCustomElement(class CatCheckbox extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catChange = createEvent(this, "catChange");
        this.catFocus = createEvent(this, "catFocus");
        this.catBlur = createEvent(this, "catBlur");
        this._id = `cat-checkbox-${nextUniqueId++}`;
        this.hasSlottedLabel = false;
        this.hasSlottedHint = false;
        /**
         * Checked state of the checkbox
         */
        this.checked = false;
        /**
         * Indeterminate state of the checkbox
         */
        this.indeterminate = false;
        /**
         * Disabled state of the checkbox
         */
        this.disabled = false;
        /**
         * Label of the checkbox which is presented in the UI
         */
        this.label = '';
        /**
         * Visually hide the label, but still show it to assistive technologies like screen readers.
         */
        this.labelHidden = false;
        /**
         * Required state of the checkbox.
         */
        this.required = false;
        /**
         * The resolved value of the checkbox, based on the checked state and value.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.resolvedValue = null;
        /**
         * Whether the label should appear to the left of the checkbox.
         */
        this.labelLeft = false;
        /**
         * The alignment of the checkbox.
         */
        this.alignment = 'top';
        /**
         * Whether the label need a marker to shown if the input is required or optional.
         */
        this.requiredMarker = 'none';
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
     * Programmatically move focus to the checkbox. Use this method instead of
     * `input.focus()`.
     *
     * @param options An optional object providing options to control aspects of
     * the focusing process.
     */
    async doFocus(options) {
        this.input.focus(options);
    }
    /**
     * Programmatically remove focus from the checkbox. Use this method instead of
     * `input.blur()`.
     */
    async doBlur() {
        this.input.blur();
    }
    render() {
        return (h(Host, { key: 'c6446d420b369604f4dd80549c1b14ec8a5534bf' }, h("label", { key: 'd56e412e5e1b13c88a6c38ae203b572139f363bd', htmlFor: this.id, class: {
                'is-hidden': this.labelHidden,
                'is-disabled': this.disabled,
                'label-left': this.labelLeft,
                'align-center': this.alignment === 'center',
                'align-end': this.alignment === 'bottom'
            } }, h("input", { key: '0b6a5475785d4dc765cd55b5718bdd234d62a6c9', "data-test": this.testId, ...this.nativeAttributes, part: "input", ref: el => (this.input = el), id: this.id, type: "checkbox", name: this.name, value: this.value, checked: this.checked, required: this.required, disabled: this.disabled, indeterminate: this.indeterminate, onInput: this.onInput.bind(this), onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), "aria-describedby": this.hasHint ? this.id + '-hint' : undefined }), h("span", { key: '1102aa4097d1fe8d6c301b134227a5a307a33242', class: "box", "aria-hidden": "true" }, h("svg", { key: '0a77cfbfd0a67e48d4f5cedbaca3bd449fe75219', class: "check", viewBox: "0 0 12 10" }, h("polyline", { key: '75ef61d7183e175b4de406ed3ac13664c4e51885', points: "1.5 6 4.5 9 10.5 1" })), h("svg", { key: '25bd595e54be48df3d5420fe38a3f80e00784550', class: "dash", viewBox: "0 0 12 10" }, h("polyline", { key: '8afc51523d4e39255c6c2434994311d31c48e4eb', points: "1.5 5 10.5 5" }))), h("span", { key: '3ce6b8c09b706068720084c85ad6cf5ed38761a2', class: { label: true, 'label-wrapper': !this.hasSlottedLabel }, part: "label" }, (this.hasSlottedLabel && h("slot", { key: '27b7301494cfafaed271b75732950441c0c34ce7', name: "label" })) || this.label, h("span", { key: 'dac83db2245ad29bd20b3904051d56cfd169aa5e', class: "label-metadata" }, !this.required && (this.requiredMarker ?? 'optional').startsWith('optional') && (h("span", { key: 'fc144468a305d1982362232021f9222a0c41ad37', class: "label-optional", "aria-hidden": "true" }, "(", catI18nRegistry.t('input.optional'), ")")), this.required && this.requiredMarker?.startsWith('required') && (h("span", { key: 'a08ed77111677146007d6c24571a8311aed72d10', class: "label-optional", "aria-hidden": "true" }, "(", catI18nRegistry.t('input.required'), ")"))))), this.hasHint && (h("div", { key: '9976b27a7d673daeb05dd45154c2ad341b7a521b', class: { 'hint-wrapper': true, 'label-left': this.labelLeft } }, h("div", { key: '8751a6a323b05995825a563b973cc76b5ca100f8', class: "box-placeholder" }), h(CatFormHint, { key: '2d057ca07be5f2b316fb5d83ed97f560d30b1af6', id: this.id, hint: this.hint, slottedHint: this.hasSlottedHint && h("slot", { name: "hint" }) })))));
    }
    get hasHint() {
        return !!this.hint || !!this.hasSlottedHint;
    }
    onInput() {
        this.checked = this.input.checked;
        this.indeterminate = this.input.indeterminate;
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
    get hostElement() { return this; }
    static get style() { return catCheckboxCss; }
}, [1, "cat-checkbox", {
        "checked": [1028],
        "indeterminate": [1028],
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
        "requiredMarker": [1, "required-marker"],
        "hasSlottedLabel": [32],
        "hasSlottedHint": [32],
        "doFocus": [64],
        "doBlur": [64]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-checkbox"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-checkbox":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatCheckbox);
            }
            break;
    } });
}

export { CatCheckbox as C, defineCustomElement as d };
//# sourceMappingURL=p-XwuHLLB9.js.map

//# sourceMappingURL=p-XwuHLLB9.js.map