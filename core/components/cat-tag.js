import { p as proxyCustomElement, H, d as createEvent, h, c as Host } from './p-DJz_AlH8.js';
import { c as coerceBoolean, a as coerceNumber } from './p-DU2Y5oRj.js';
import { C as CatFormHint } from './p-C3lVj_zU.js';
import { c as catI18nRegistry } from './p-DYxciDq0.js';
import { d as defineCustomElement$4 } from './p-BAS0o037.js';
import { d as defineCustomElement$3 } from './p-tMJhdM6b.js';
import { d as defineCustomElement$2 } from './p-BWMxUNx3.js';

const catTagCss = ".label{overflow:hidden;word-wrap:break-word;word-break:break-word}.input-field:not(.input-horizontal) .label-container.hidden,.textarea-field:not(.textarea-horizontal) .label-container.hidden,.select-field:not(.select-horizontal) .label-container.hidden{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.label-container{flex-basis:var(--label-size, 33.33%)}.label-wrapper{display:flex;gap:0.25rem}.label-metadata{display:flex;flex-shrink:0;flex-grow:1;justify-content:space-between;gap:0.25rem;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}.label-optional,.label-character-count{display:inline-flex;align-items:center;max-height:1.25rem;font-size:0.75rem;line-height:1rem}.label-character-count{margin-left:auto}.input-horizontal .label-container.hidden label,.textarea-horizontal .label-container.hidden label,.select-horizontal .label-container.hidden label{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.input-horizontal .label-wrapper,.textarea-horizontal .label-wrapper,.select-horizontal .label-wrapper{flex-direction:column}.input-horizontal label,.textarea-horizontal label,.select-horizontal label{min-height:2.5rem;display:inline-flex;align-items:center}.input-horizontal .label-metadata,.textarea-horizontal .label-metadata,.select-horizontal .label-metadata{justify-content:flex-start}.input-horizontal .label-metadata .label-character-count,.textarea-horizontal .label-metadata .label-character-count,.select-horizontal .label-metadata .label-character-count{margin-left:0}.hint-wrapper{flex:0 1 auto;display:flex;gap:0.5rem}.hint-section{flex:1 1 auto;display:flex;flex-direction:column;gap:0.25rem;color:rgb(var(--cat-font-color-muted, 81, 92, 108));font-size:0.875rem;line-height:1.125rem}.hint-section .input-hint,.hint-section ::slotted([slot=hint]){margin:0 !important}.cat-bg-primary{background-color:rgb(var(--cat-primary-bg, 0, 129, 148)) !important;color:rgb(var(--cat-primary-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-primary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-primary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-primary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-primary-hover{transition:background-color 125ms, color 125ms}.cat-bg-primary-hover:hover{background-color:rgb(var(--cat-primary-bg-hover, 1, 115, 132)) !important;color:rgb(var(--cat-primary-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-primary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-primary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-primary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-primary,.cat-link-primary{color:rgb(var(--cat-primary-text, 0, 129, 148)) !important}button.cat-text-primary,button.cat-link-primary{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-primary:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-primary:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-primary,.cat-text-primary-hover{transition:color 125ms}.cat-link-primary:hover,.cat-text-primary-hover:hover{color:rgb(var(--cat-primary-text-hover, 1, 115, 132)) !important}.cat-link-primary:active,.cat-text-primary-hover:active{color:rgb(var(--cat-primary-text-active, 2, 99, 113)) !important}.cat-bg-primaryInverted{background-color:#93b4f2 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-bg-primaryInverted-hover{transition:background-color 125ms, color 125ms}.cat-bg-primaryInverted-hover:hover{background-color:#93b4f2 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-text-primaryInverted,.cat-link-primaryInverted{color:#93b4f2 !important}button.cat-text-primaryInverted,button.cat-link-primaryInverted{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-primaryInverted:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-primaryInverted:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-primaryInverted,.cat-text-primaryInverted-hover{transition:color 125ms}.cat-link-primaryInverted:hover,.cat-text-primaryInverted-hover:hover{color:#93b4f2 !important}.cat-link-primaryInverted:active,.cat-text-primaryInverted-hover:active{color:#93b4f2 !important}.cat-bg-secondary{background-color:rgb(var(--cat-secondary-bg, 105, 118, 135)) !important;color:rgb(var(--cat-secondary-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-secondary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-secondary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-secondary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-secondary-hover{transition:background-color 125ms, color 125ms}.cat-bg-secondary-hover:hover{background-color:rgb(var(--cat-secondary-bg-hover, 105, 118, 135)) !important;color:rgb(var(--cat-secondary-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-secondary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-secondary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-secondary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-secondary,.cat-link-secondary{color:rgb(var(--cat-secondary-text, 0, 0, 0)) !important}button.cat-text-secondary,button.cat-link-secondary{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-secondary:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-secondary:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-secondary,.cat-text-secondary-hover{transition:color 125ms}.cat-link-secondary:hover,.cat-text-secondary-hover:hover{color:rgb(var(--cat-secondary-text-hover, 0, 0, 0)) !important}.cat-link-secondary:active,.cat-text-secondary-hover:active{color:rgb(var(--cat-secondary-text-active, 0, 0, 0)) !important}.cat-bg-secondaryInverted{background-color:#697687 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-bg-secondaryInverted-hover{transition:background-color 125ms, color 125ms}.cat-bg-secondaryInverted-hover:hover{background-color:#697687 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-text-secondaryInverted,.cat-link-secondaryInverted{color:white !important}button.cat-text-secondaryInverted,button.cat-link-secondaryInverted{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-secondaryInverted:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-secondaryInverted:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-secondaryInverted,.cat-text-secondaryInverted-hover{transition:color 125ms}.cat-link-secondaryInverted:hover,.cat-text-secondaryInverted-hover:hover{color:white !important}.cat-link-secondaryInverted:active,.cat-text-secondaryInverted-hover:active{color:white !important}.cat-bg-info{background-color:rgb(var(--cat-info-bg, 0, 115, 230)) !important;color:rgb(var(--cat-info-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-info-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-info-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-info-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-info-hover{transition:background-color 125ms, color 125ms}.cat-bg-info-hover:hover{background-color:rgb(var(--cat-info-bg-hover, 0, 107, 227)) !important;color:rgb(var(--cat-info-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-info-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-info-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-info-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-info,.cat-link-info{color:rgb(var(--cat-info-text, 0, 115, 230)) !important}button.cat-text-info,button.cat-link-info{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-info:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-info:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-info,.cat-text-info-hover{transition:color 125ms}.cat-link-info:hover,.cat-text-info-hover:hover{color:rgb(var(--cat-info-text-hover, 0, 107, 227)) !important}.cat-link-info:active,.cat-text-info-hover:active{color:rgb(var(--cat-info-text-active, 0, 96, 223)) !important}.cat-bg-success{background-color:rgb(var(--cat-success-bg, 0, 132, 88)) !important;color:rgb(var(--cat-success-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-success-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-success-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-success-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-success-hover{transition:background-color 125ms, color 125ms}.cat-bg-success-hover:hover{background-color:rgb(var(--cat-success-bg-hover, 0, 117, 78)) !important;color:rgb(var(--cat-success-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-success-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-success-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-success-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-success,.cat-link-success{color:rgb(var(--cat-success-text, 0, 132, 88)) !important}button.cat-text-success,button.cat-link-success{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-success:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-success:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-success,.cat-text-success-hover{transition:color 125ms}.cat-link-success:hover,.cat-text-success-hover:hover{color:rgb(var(--cat-success-text-hover, 0, 117, 78)) !important}.cat-link-success:active,.cat-text-success-hover:active{color:rgb(var(--cat-success-text-active, 0, 105, 70)) !important}.cat-bg-warning{background-color:rgb(var(--cat-warning-bg, 255, 206, 128)) !important;color:rgb(var(--cat-warning-fill, 0, 0, 0)) !important;--cat-primary-text:var(--cat-warning-fill, 0, 0, 0);--cat-primary-text-hover:var(--cat-warning-fill-hover, 0, 0, 0);--cat-primary-text-active:var(--cat-warning-fill-active, 0, 0, 0);--cat-link-decoration:underline}.cat-bg-warning-hover{transition:background-color 125ms, color 125ms}.cat-bg-warning-hover:hover{background-color:rgb(var(--cat-warning-bg-hover, 255, 214, 148)) !important;color:rgb(var(--cat-warning-fill-hover, 0, 0, 0)) !important;--cat-primary-text:var(--cat-warning-fill, 0, 0, 0);--cat-primary-text-hover:var(--cat-warning-fill-hover, 0, 0, 0);--cat-primary-text-active:var(--cat-warning-fill-active, 0, 0, 0);--cat-link-decoration:underline}.cat-text-warning,.cat-link-warning{color:rgb(var(--cat-warning-text, 159, 97, 0)) !important}button.cat-text-warning,button.cat-link-warning{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-warning:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-warning:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-warning,.cat-text-warning-hover{transition:color 125ms}.cat-link-warning:hover,.cat-text-warning-hover:hover{color:rgb(var(--cat-warning-text-hover, 159, 97, 0)) !important}.cat-link-warning:active,.cat-text-warning-hover:active{color:rgb(var(--cat-warning-text-active, 159, 97, 0)) !important}.cat-bg-danger{background-color:rgb(var(--cat-danger-bg, 217, 52, 13)) !important;color:rgb(var(--cat-danger-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-danger-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-danger-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-danger-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-danger-hover{transition:background-color 125ms, color 125ms}.cat-bg-danger-hover:hover{background-color:rgb(var(--cat-danger-bg-hover, 194, 46, 11)) !important;color:rgb(var(--cat-danger-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-danger-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-danger-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-danger-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-danger,.cat-link-danger{color:rgb(var(--cat-danger-text, 217, 52, 13)) !important}button.cat-text-danger,button.cat-link-danger{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-danger:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-danger:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-danger,.cat-text-danger-hover{transition:color 125ms}.cat-link-danger:hover,.cat-text-danger-hover:hover{color:rgb(var(--cat-danger-text-hover, 194, 46, 11)) !important}.cat-link-danger:active,.cat-text-danger-hover:active{color:rgb(var(--cat-danger-text-active, 174, 42, 10)) !important}.cat-active{color:rgb(var(--cat-primary-text, 0, 129, 148)) !important}.cat-text-active{color:rgb(var(--cat-primary-text, 0, 129, 148)) !important}.cat-muted{color:rgb(var(--cat-font-color-muted, 81, 92, 108)) !important}.cat-text-muted{color:rgb(var(--cat-font-color-muted, 81, 92, 108)) !important}.cat-bg-muted{background-color:#f2f4f7 !important}.cat-text-reset{color:inherit !important}.cat-link-reset{color:inherit !important;text-decoration:inherit !important}:host{display:flex;flex-direction:column;gap:0.5rem}input{font:inherit;margin:0;min-width:20rem;padding:0.375rem 0;flex:1 1 auto;border:none;outline:none;background:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.input-disabled input{cursor:not-allowed;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}input::placeholder{color:rgb(var(--cat-font-color-muted, 81, 92, 108))}input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus{-webkit-box-shadow:0 0 0 9999px #e8f0fe inset}.input-wrapper{flex:1 1 auto;display:flex;align-items:stretch;gap:0.25rem;padding:0.25rem 0.75rem;min-height:2rem;background:white;border-radius:var(--cat-border-radius-m, 0.25rem);box-shadow:inset 0 0 0 1px rgb(var(--border-color));transition:box-shadow 125ms linear;--border-color:var(--cat-border-color-dark, 215, 219, 224);flex-wrap:wrap;}.input-wrapper.input-disabled{background:#f2f4f7;cursor:not-allowed;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}.input-wrapper:not(.input-disabled):hover{box-shadow:inset 0 0 0 1px rgb(var(--border-color)), 0 0 0 1px rgb(var(--border-color))}.input-wrapper:focus-within{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:-1px}.input-wrapper:focus-within:has(.clearable:focus){outline:none}.input-wrapper.input-invalid{--border-color:var(--cat-danger-bg, 217, 52, 13), 0.2}.input-wrapper:has(input:-webkit-autofill),.input-wrapper:has(input:-webkit-autofill):hover,.input-wrapper:has(input:-webkit-autofill):focus{background-color:#e8f0fe}.tag-pill{display:flex;align-items:center;gap:0.5rem;padding:0.25rem 0.5rem;background:#f2f4f7;border-radius:var(--cat-border-radius-s, 0.125rem);white-space:nowrap;min-width:0}.tag-pill>span{overflow:hidden;text-overflow:ellipsis;flex:1 1 0}.tag-pill>cat-button{margin-right:-0.25rem;margin-left:-0.25rem}.icon-suffix{align-self:center}.input-inner-wrapper{flex:1 1 auto;display:flex}";

let nextUniqueId = 0;
const CatTag$1 = /*@__PURE__*/ proxyCustomElement(class CatTag extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catChange = createEvent(this, "catChange");
        this.catFocus = createEvent(this, "catFocus");
        this.catBlur = createEvent(this, "catBlur");
        this._id = `cat-input-${nextUniqueId++}`;
        this.hasSlottedLabel = false;
        this.hasSlottedHint = false;
        this.tags = [];
        /**
         * Whether the label need a marker to shown if the select is required or optional.
         */
        this.requiredMarker = 'optional';
        /**
         * Whether the select is disabled.
         */
        this.disabled = false;
        /**
         * The label for the select.
         */
        this.label = '';
        /**
         * Visually hide the label, but still show it to assistive technologies like screen readers.
         */
        this.labelHidden = false;
        /**
         * A value is required or must be checked for the form to be submittable.
         */
        this.required = false;
        /**
         * Whether the input should show a clear button.
         */
        this.clearable = false;
        /**
         * Fine-grained control over when the errors are shown. Can be `false` to
         * never show errors, `true` to show errors on blur, or a number to show
         * errors change with the given delay in milliseconds or immediately on blur.
         */
        this.errorUpdate = 0;
        /**
         * List of characters that should create a new tag. This need to be comparable to `keydownEvent.key`.
         * Pasted values will also be split by those chars.
         * Defaults to `[' ']`.
         */
        this.tagCreationChars = [' '];
        /**
         * Whether new tag is added when the input is blurred.
         */
        this.addOnBlur = false;
    }
    get id() {
        return this.identifier || this._id;
    }
    componentWillLoad() {
        this.onErrorsChanged(this.errors, undefined, false);
    }
    componentWillRender() {
        this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
        this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    }
    onKeyDown(event) {
        const isInputFocused = this.hostElement.shadowRoot?.activeElement === this.input;
        if (['Enter', ...this.tagCreationChars].includes(event.key) && isInputFocused) {
            event.preventDefault();
            this.addInputValue();
        }
        else if (['Backspace'].includes(event.key) &&
            this.input?.selectionStart === 0 &&
            (this.value?.length ?? 0) > 0 &&
            isInputFocused) {
            this.value = this.value?.slice(0, -1) ?? [];
            this.catChange.emit(this.value);
        }
    }
    onErrorsChanged(newValue, _oldValue, update = true) {
        if (!coerceBoolean(this.errorUpdate)) {
            this.errorMap = undefined;
        }
        else {
            this.errorMapSrc = Array.isArray(newValue)
                ? newValue.reduce((acc, err) => ({ ...acc, [err]: undefined }), {})
                : newValue || undefined;
            if (update) {
                this.showErrorsIfTimeout() || this.showErrorsIfNoFocus();
            }
        }
    }
    render() {
        this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
        return (h(Host, { key: 'ea219f15738c0e0b11d7b4134e970141c337a991' }, h("div", { key: '54cbafd14a0a243b459b8cce5f5b9199cdef7f59', class: { 'label-container': true, hidden: this.labelHidden } }, (this.hasSlottedLabel || this.label) && (h("label", { key: '4a916c1ec4f99f3db7e2a31008d0277b1a93690e', htmlFor: `tags-${this.id}-input`, part: "label" }, h("span", { key: '999ad493f6ab3b97e9dbf4c62033ad358a77ab57', class: "label-wrapper" }, (this.hasSlottedLabel && h("slot", { key: 'ff636ee0ccd174878eafe0ab709e9c66d3ba4d3e', name: "label" })) || this.label, h("div", { key: 'b983335cc6f08005495c3784fb9c0de6a39f039f', class: "label-metadata" }, !this.required && (this.requiredMarker ?? 'optional').startsWith('optional') && (h("span", { key: '91fd49cfdf2e2a7af3d7d87b91c4f6bc6ed88f3f', class: "label-optional", "aria-hidden": "true" }, "(", catI18nRegistry.t('input.optional'), ")")), this.required && this.requiredMarker?.startsWith('required') && (h("span", { key: 'd59686d3ac8c02b2198fc8013ad34463d8e2afba', class: "label-optional", "aria-hidden": "true" }, "(", catI18nRegistry.t('input.required'), ")"))))))), h("div", { key: '37cc1963186b77dae6e853042db75919316f5a10', class: { 'input-wrapper': true, 'input-disabled': this.disabled, 'input-invalid': this.invalid } }, this.value?.map(value => (h("div", { class: "tag-pill" }, h("span", null, value), !this.disabled && (h("cat-button", { size: "xs", variant: "text", icon: "$cat:select-clear", iconOnly: true, a11yLabel: catI18nRegistry.t('select.deselect'), onClick: () => this.deselect(value), tabIndex: -1 }))))), h("div", { key: '37902cc20fcf55f9f8848daa167a765dc7f48ac2', class: "input-inner-wrapper" }, h("input", { key: '316e34e90944d96b1e829a49e5041ad865336d63', "data-test": this.testId, ...this.nativeAttributes, part: "input", id: `tags-${this.id}-input`, class: "tags-input", role: "combobox", ref: el => (this.input = el), "aria-invalid": this.invalid ? 'true' : undefined, "aria-describedby": this.hasHint ? this.id + '-hint' : undefined, onInput: this.onInput.bind(this), onBlur: this.onBlur.bind(this), placeholder: this.placeholder, disabled: this.disabled }), this.clearable && !this.disabled && (this.value?.length ?? 0) > 0 && (h("cat-button", { key: '17a6710dbf2aa77eefa25ad97252f78101e1dcee', class: "clearable", icon: "$cat:input-close", "icon-only": "true", size: "s", variant: "text", "a11y-label": catI18nRegistry.t('input.clear'), onClick: this.clear.bind(this), "data-dropdown-no-close": true })), this.invalid && h("cat-icon", { key: 'c439cfc9bf8e2579d053cb7efe827665456167ed', icon: "$cat:input-error", class: "icon-suffix cat-text-danger", size: "l" }))), this.hasHint && (h(CatFormHint, { key: '577f9da90fb534b99d43b7d35643237d46c6f6da', id: this.id, hint: this.hint, slottedHint: this.hasSlottedHint && h("slot", { name: "hint" }), errorMap: this.errorMap }))));
    }
    get hasHint() {
        return !!this.hint || !!this.hasSlottedHint || this.invalid;
    }
    get invalid() {
        return this.errorMap === true || !!Object.keys(this.errorMap || {}).length;
    }
    onInput() {
        const currentValue = [
            ...new Set(this.input?.value?.split(this.createSplitRegex(this.tagCreationChars)) ?? [])
        ].filter(value => !!value && !this.value?.includes(value));
        if (currentValue.length > 1) {
            this.value = [...(this.value ?? []), ...currentValue];
            this.catChange.emit(this.value);
            if (this.input) {
                this.input.value = '';
            }
        }
    }
    onBlur() {
        if (this.addOnBlur) {
            this.addInputValue();
        }
    }
    addInputValue() {
        const inputValue = this.input?.value.trim();
        if (inputValue && !this.value?.includes(inputValue)) {
            this.value = [...(this.value ?? []), inputValue];
            this.catChange.emit(this.value);
        }
        if (this.input) {
            this.input.value = '';
        }
    }
    clear() {
        this.value = [];
        this.catChange.emit(this.value);
        if (this.input) {
            this.input.value = '';
        }
    }
    deselect(value) {
        this.value = this.value?.filter(element => element !== value);
        this.catChange.emit(this.value);
    }
    showErrors() {
        this.errorMap = this.errorMapSrc;
    }
    showErrorsIfTimeout() {
        const errorUpdate = coerceNumber(this.errorUpdate, null);
        if (errorUpdate !== null) {
            typeof this.errorUpdateTimeoutId === 'number' && window.clearTimeout(this.errorUpdateTimeoutId);
            this.errorUpdateTimeoutId = window.setTimeout(() => this.showErrors(), errorUpdate);
            return true;
        }
        return false;
    }
    showErrorsIfNoFocus() {
        const hasFocus = document.activeElement === this.hostElement || document.activeElement === this.input;
        if (!hasFocus) {
            this.showErrors();
        }
    }
    createSplitRegex(delimiters) {
        // Escape special regex characters in the array
        const escapedDelimiters = delimiters.map(delimiter => delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        // Add newline characters to the list of delimiters
        escapedDelimiters.push('\\n', '\\r');
        // Join the escaped delimiters to create a character class
        const regexPattern = `[${escapedDelimiters.join('')}]`;
        return new RegExp(regexPattern, 'g');
    }
    static get delegatesFocus() { return true; }
    get hostElement() { return this; }
    static get watchers() { return {
        "errors": ["onErrorsChanged"]
    }; }
    static get style() { return catTagCss; }
}, [17, "cat-tag", {
        "requiredMarker": [1, "required-marker"],
        "disabled": [4],
        "placeholder": [1],
        "hint": [1],
        "identifier": [1],
        "label": [1],
        "name": [1],
        "labelHidden": [4, "label-hidden"],
        "required": [4],
        "nativeAttributes": [16],
        "testId": [1, "test-id"],
        "value": [1040],
        "clearable": [4],
        "errors": [4],
        "errorUpdate": [8, "error-update"],
        "tagCreationChars": [16],
        "addOnBlur": [4, "add-on-blur"],
        "hasSlottedLabel": [32],
        "hasSlottedHint": [32],
        "tags": [32],
        "errorMap": [32]
    }, [[0, "keydown", "onKeyDown"]], {
        "errors": ["onErrorsChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-tag", "cat-button", "cat-icon", "cat-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-tag":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatTag$1);
            }
            break;
        case "cat-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "cat-icon":
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

const CatTag = CatTag$1;
const defineCustomElement = defineCustomElement$1;

export { CatTag, defineCustomElement };
//# sourceMappingURL=cat-tag.js.map

//# sourceMappingURL=cat-tag.js.map