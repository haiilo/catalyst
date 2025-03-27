import { p as proxyCustomElement, H, d as createEvent, h, c as Host } from './p-DJz_AlH8.js';
import { c as coerceBoolean, a as coerceNumber } from './p-DU2Y5oRj.js';
import { C as CatFormHint } from './p-C3lVj_zU.js';
import { c as catI18nRegistry } from './p-DYxciDq0.js';
import { d as defineCustomElement$2 } from './p-tMJhdM6b.js';

var e=new Map;function t(t){var o=e.get(t);o&&o.destroy();}function o(t){var o=e.get(t);o&&o.update();}var r=null;"undefined"==typeof window?((r=function(e){return e}).destroy=function(e){return e},r.update=function(e){return e}):((r=function(t,o){return t&&Array.prototype.forEach.call(t.length?t:[t],function(t){return function(t){if(t&&t.nodeName&&"TEXTAREA"===t.nodeName&&!e.has(t)){var o,r=null,n=window.getComputedStyle(t),i=(o=t.value,function(){a({testForHeightReduction:""===o||!t.value.startsWith(o),restoreTextAlign:null}),o=t.value;}),l=function(o){t.removeEventListener("autosize:destroy",l),t.removeEventListener("autosize:update",s),t.removeEventListener("input",i),window.removeEventListener("resize",s),Object.keys(o).forEach(function(e){return t.style[e]=o[e]}),e.delete(t);}.bind(t,{height:t.style.height,resize:t.style.resize,textAlign:t.style.textAlign,overflowY:t.style.overflowY,overflowX:t.style.overflowX,wordWrap:t.style.wordWrap});t.addEventListener("autosize:destroy",l),t.addEventListener("autosize:update",s),t.addEventListener("input",i),window.addEventListener("resize",s),t.style.overflowX="hidden",t.style.wordWrap="break-word",e.set(t,{destroy:l,update:s}),s();}function a(e){var o,i,l=e.restoreTextAlign,s=void 0===l?null:l,d=e.testForHeightReduction,u=void 0===d||d,c=n.overflowY;if(0!==t.scrollHeight&&("vertical"===n.resize?t.style.resize="none":"both"===n.resize&&(t.style.resize="horizontal"),u&&(o=function(e){for(var t=[];e&&e.parentNode&&e.parentNode instanceof Element;)e.parentNode.scrollTop&&t.push([e.parentNode,e.parentNode.scrollTop]),e=e.parentNode;return function(){return t.forEach(function(e){var t=e[0],o=e[1];t.style.scrollBehavior="auto",t.scrollTop=o,t.style.scrollBehavior=null;})}}(t),t.style.height=""),i="content-box"===n.boxSizing?t.scrollHeight-(parseFloat(n.paddingTop)+parseFloat(n.paddingBottom)):t.scrollHeight+parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth),"none"!==n.maxHeight&&i>parseFloat(n.maxHeight)?("hidden"===n.overflowY&&(t.style.overflow="scroll"),i=parseFloat(n.maxHeight)):"hidden"!==n.overflowY&&(t.style.overflow="hidden"),t.style.height=i+"px",s&&(t.style.textAlign=s),o&&o(),r!==i&&(t.dispatchEvent(new Event("autosize:resized",{bubbles:true})),r=i),c!==n.overflow&&!s)){var v=n.textAlign;"hidden"===n.overflow&&(t.style.textAlign="start"===v?"end":"start"),a({restoreTextAlign:v,testForHeightReduction:true});}}function s(){a({testForHeightReduction:true,restoreTextAlign:null});}}(t)}),t}).destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],t),e},r.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],o),e});var n=r;

const catTextareaCss = ".hint-wrapper{flex:0 1 auto;display:flex;gap:0.5rem}.hint-section{flex:1 1 auto;display:flex;flex-direction:column;gap:0.25rem;color:rgb(var(--cat-font-color-muted, 81, 92, 108));font-size:0.875rem;line-height:1.125rem}.hint-section .input-hint,.hint-section ::slotted([slot=hint]){margin:0 !important}.cat-bg-primary{background-color:rgb(var(--cat-primary-bg, 0, 129, 148)) !important;color:rgb(var(--cat-primary-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-primary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-primary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-primary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-primary-hover{transition:background-color 125ms, color 125ms}.cat-bg-primary-hover:hover{background-color:rgb(var(--cat-primary-bg-hover, 1, 115, 132)) !important;color:rgb(var(--cat-primary-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-primary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-primary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-primary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-primary,.cat-link-primary{color:rgb(var(--cat-primary-text, 0, 129, 148)) !important}button.cat-text-primary,button.cat-link-primary{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-primary:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-primary:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-primary,.cat-text-primary-hover{transition:color 125ms}.cat-link-primary:hover,.cat-text-primary-hover:hover{color:rgb(var(--cat-primary-text-hover, 1, 115, 132)) !important}.cat-link-primary:active,.cat-text-primary-hover:active{color:rgb(var(--cat-primary-text-active, 2, 99, 113)) !important}.cat-bg-primaryInverted{background-color:#93b4f2 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-bg-primaryInverted-hover{transition:background-color 125ms, color 125ms}.cat-bg-primaryInverted-hover:hover{background-color:#93b4f2 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-text-primaryInverted,.cat-link-primaryInverted{color:#93b4f2 !important}button.cat-text-primaryInverted,button.cat-link-primaryInverted{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-primaryInverted:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-primaryInverted:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-primaryInverted,.cat-text-primaryInverted-hover{transition:color 125ms}.cat-link-primaryInverted:hover,.cat-text-primaryInverted-hover:hover{color:#93b4f2 !important}.cat-link-primaryInverted:active,.cat-text-primaryInverted-hover:active{color:#93b4f2 !important}.cat-bg-secondary{background-color:rgb(var(--cat-secondary-bg, 105, 118, 135)) !important;color:rgb(var(--cat-secondary-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-secondary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-secondary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-secondary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-secondary-hover{transition:background-color 125ms, color 125ms}.cat-bg-secondary-hover:hover{background-color:rgb(var(--cat-secondary-bg-hover, 105, 118, 135)) !important;color:rgb(var(--cat-secondary-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-secondary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-secondary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-secondary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-secondary,.cat-link-secondary{color:rgb(var(--cat-secondary-text, 0, 0, 0)) !important}button.cat-text-secondary,button.cat-link-secondary{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-secondary:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-secondary:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-secondary,.cat-text-secondary-hover{transition:color 125ms}.cat-link-secondary:hover,.cat-text-secondary-hover:hover{color:rgb(var(--cat-secondary-text-hover, 0, 0, 0)) !important}.cat-link-secondary:active,.cat-text-secondary-hover:active{color:rgb(var(--cat-secondary-text-active, 0, 0, 0)) !important}.cat-bg-secondaryInverted{background-color:#697687 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-bg-secondaryInverted-hover{transition:background-color 125ms, color 125ms}.cat-bg-secondaryInverted-hover:hover{background-color:#697687 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-text-secondaryInverted,.cat-link-secondaryInverted{color:white !important}button.cat-text-secondaryInverted,button.cat-link-secondaryInverted{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-secondaryInverted:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-secondaryInverted:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-secondaryInverted,.cat-text-secondaryInverted-hover{transition:color 125ms}.cat-link-secondaryInverted:hover,.cat-text-secondaryInverted-hover:hover{color:white !important}.cat-link-secondaryInverted:active,.cat-text-secondaryInverted-hover:active{color:white !important}.cat-bg-info{background-color:rgb(var(--cat-info-bg, 0, 115, 230)) !important;color:rgb(var(--cat-info-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-info-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-info-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-info-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-info-hover{transition:background-color 125ms, color 125ms}.cat-bg-info-hover:hover{background-color:rgb(var(--cat-info-bg-hover, 0, 107, 227)) !important;color:rgb(var(--cat-info-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-info-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-info-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-info-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-info,.cat-link-info{color:rgb(var(--cat-info-text, 0, 115, 230)) !important}button.cat-text-info,button.cat-link-info{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-info:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-info:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-info,.cat-text-info-hover{transition:color 125ms}.cat-link-info:hover,.cat-text-info-hover:hover{color:rgb(var(--cat-info-text-hover, 0, 107, 227)) !important}.cat-link-info:active,.cat-text-info-hover:active{color:rgb(var(--cat-info-text-active, 0, 96, 223)) !important}.cat-bg-success{background-color:rgb(var(--cat-success-bg, 0, 132, 88)) !important;color:rgb(var(--cat-success-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-success-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-success-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-success-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-success-hover{transition:background-color 125ms, color 125ms}.cat-bg-success-hover:hover{background-color:rgb(var(--cat-success-bg-hover, 0, 117, 78)) !important;color:rgb(var(--cat-success-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-success-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-success-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-success-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-success,.cat-link-success{color:rgb(var(--cat-success-text, 0, 132, 88)) !important}button.cat-text-success,button.cat-link-success{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-success:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-success:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-success,.cat-text-success-hover{transition:color 125ms}.cat-link-success:hover,.cat-text-success-hover:hover{color:rgb(var(--cat-success-text-hover, 0, 117, 78)) !important}.cat-link-success:active,.cat-text-success-hover:active{color:rgb(var(--cat-success-text-active, 0, 105, 70)) !important}.cat-bg-warning{background-color:rgb(var(--cat-warning-bg, 255, 206, 128)) !important;color:rgb(var(--cat-warning-fill, 0, 0, 0)) !important;--cat-primary-text:var(--cat-warning-fill, 0, 0, 0);--cat-primary-text-hover:var(--cat-warning-fill-hover, 0, 0, 0);--cat-primary-text-active:var(--cat-warning-fill-active, 0, 0, 0);--cat-link-decoration:underline}.cat-bg-warning-hover{transition:background-color 125ms, color 125ms}.cat-bg-warning-hover:hover{background-color:rgb(var(--cat-warning-bg-hover, 255, 214, 148)) !important;color:rgb(var(--cat-warning-fill-hover, 0, 0, 0)) !important;--cat-primary-text:var(--cat-warning-fill, 0, 0, 0);--cat-primary-text-hover:var(--cat-warning-fill-hover, 0, 0, 0);--cat-primary-text-active:var(--cat-warning-fill-active, 0, 0, 0);--cat-link-decoration:underline}.cat-text-warning,.cat-link-warning{color:rgb(var(--cat-warning-text, 159, 97, 0)) !important}button.cat-text-warning,button.cat-link-warning{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-warning:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-warning:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-warning,.cat-text-warning-hover{transition:color 125ms}.cat-link-warning:hover,.cat-text-warning-hover:hover{color:rgb(var(--cat-warning-text-hover, 159, 97, 0)) !important}.cat-link-warning:active,.cat-text-warning-hover:active{color:rgb(var(--cat-warning-text-active, 159, 97, 0)) !important}.cat-bg-danger{background-color:rgb(var(--cat-danger-bg, 217, 52, 13)) !important;color:rgb(var(--cat-danger-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-danger-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-danger-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-danger-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-danger-hover{transition:background-color 125ms, color 125ms}.cat-bg-danger-hover:hover{background-color:rgb(var(--cat-danger-bg-hover, 194, 46, 11)) !important;color:rgb(var(--cat-danger-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-danger-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-danger-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-danger-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-danger,.cat-link-danger{color:rgb(var(--cat-danger-text, 217, 52, 13)) !important}button.cat-text-danger,button.cat-link-danger{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-danger:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-danger:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-danger,.cat-text-danger-hover{transition:color 125ms}.cat-link-danger:hover,.cat-text-danger-hover:hover{color:rgb(var(--cat-danger-text-hover, 194, 46, 11)) !important}.cat-link-danger:active,.cat-text-danger-hover:active{color:rgb(var(--cat-danger-text-active, 174, 42, 10)) !important}.cat-active{color:rgb(var(--cat-primary-text, 0, 129, 148)) !important}.cat-text-active{color:rgb(var(--cat-primary-text, 0, 129, 148)) !important}.cat-muted{color:rgb(var(--cat-font-color-muted, 81, 92, 108)) !important}.cat-text-muted{color:rgb(var(--cat-font-color-muted, 81, 92, 108)) !important}.cat-bg-muted{background-color:#f2f4f7 !important}.cat-text-reset{color:inherit !important}.cat-link-reset{color:inherit !important;text-decoration:inherit !important}.label{overflow:hidden;word-wrap:break-word;word-break:break-word}.input-field:not(.input-horizontal) .label-container.hidden,.textarea-field:not(.textarea-horizontal) .label-container.hidden,.select-field:not(.select-horizontal) .label-container.hidden{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.label-container{flex-basis:var(--label-size, 33.33%)}.label-wrapper{display:flex;gap:0.25rem}.label-metadata{display:flex;flex-shrink:0;flex-grow:1;justify-content:space-between;gap:0.25rem;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}.label-optional,.label-character-count{display:inline-flex;align-items:center;max-height:1.25rem;font-size:0.75rem;line-height:1rem}.label-character-count{margin-left:auto}.input-horizontal .label-container.hidden label,.textarea-horizontal .label-container.hidden label,.select-horizontal .label-container.hidden label{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.input-horizontal .label-wrapper,.textarea-horizontal .label-wrapper,.select-horizontal .label-wrapper{flex-direction:column}.input-horizontal label,.textarea-horizontal label,.select-horizontal label{min-height:2.5rem;display:inline-flex;align-items:center}.input-horizontal .label-metadata,.textarea-horizontal .label-metadata,.select-horizontal .label-metadata{justify-content:flex-start}.input-horizontal .label-metadata .label-character-count,.textarea-horizontal .label-metadata .label-character-count,.select-horizontal .label-metadata .label-character-count{margin-left:0}:host{display:flex;flex-direction:column;gap:0.5rem;font-size:0.9375rem;line-height:1.25rem;font-weight:var(--cat-font-weight-body, 400)}:host([hidden]){display:none}.textarea-field,.textarea-container{display:flex;flex-direction:column;gap:0.5rem;flex:1 1 auto}.textarea-field.textarea-horizontal{flex-direction:row;gap:1rem}.textarea-readonly{pointer-events:none}.textarea-wrapper{position:relative;display:flex;flex-direction:column}.icon-suffix{position:absolute;top:calc(0.625rem - 2px);right:0.75rem;background:rgba(255, 255, 255, 0.75);border-radius:100rem}.textarea-disabled .icon-suffix{background:rgba(242, 244, 247, 0.75)}textarea{margin:0;padding:0.625rem 0.75rem;box-sizing:border-box;min-height:2.5rem;font:inherit;background:white;border-radius:var(--cat-border-radius-m, 0.25rem);border:none;box-shadow:inset 0 0 0 1px rgb(var(--border-color));transition:box-shadow 125ms linear;resize:vertical;--border-color:var(--cat-border-color-dark, 215, 219, 224);}textarea:disabled{background:#f2f4f7;cursor:not-allowed;color:rgb(var(--cat-font-color-muted, 81, 92, 108));resize:none}textarea:not(:disabled):hover{box-shadow:inset 0 0 0 1px rgb(var(--border-color)), 0 0 0 1px rgb(var(--border-color))}textarea:focus{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:-1px}.textarea-invalid textarea{--border-color:var(--cat-danger-bg, 217, 52, 13), 0.2}textarea::placeholder{color:rgb(var(--cat-font-color-muted, 81, 92, 108))}textarea:-webkit-autofill,textarea:-webkit-autofill:hover,textarea:-webkit-autofill:focus{-webkit-box-shadow:0 0 0 9999px #e8f0fe inset}";

let nextUniqueId = 0;
const CatTextarea$1 = /*@__PURE__*/ proxyCustomElement(class CatTextarea extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catChange = createEvent(this, "catChange");
        this.catFocus = createEvent(this, "catFocus");
        this.catBlur = createEvent(this, "catBlur");
        this._id = `cat-textarea-${nextUniqueId++}`;
        this.hasSlottedLabel = false;
        this.hasSlottedHint = false;
        this.hasSlottedCounter = false;
        /**
         * Whether the label need a marker to shown if the textarea is required or optional.
         */
        this.requiredMarker = 'optional';
        /**
         * Whether the label is on top or left.
         */
        this.horizontal = false;
        /**
         * Whether the textarea is disabled.
         */
        this.disabled = false;
        /**
         * The label for the textarea.
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
         * Specifies the initial number of lines in the textarea.
         */
        this.rows = 3;
        /**
         * Fine-grained control over when the errors are shown. Can be `false` to
         * never show errors, `true` to show errors on blur, or a number to show
         * errors change with the given delay in milliseconds or immediately on blur.
         */
        this.errorUpdate = 0;
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
        this.hasSlottedCounter = !!this.hostElement.querySelector('[slot="counter"]');
    }
    componentDidLoad() {
        n(this.textarea);
    }
    /**
     * Programmatically move focus to the textarea. Use this method instead of
     * `textarea.focus()`.
     *
     * @param options An optional object providing options to control aspects of
     * the focusing process.
     */
    async doFocus(options) {
        this.textarea.focus(options);
    }
    /**
     * Programmatically remove focus from the textarea. Use this method instead of
     * `textarea.blur()`.
     */
    async doBlur() {
        this.textarea.blur();
    }
    /**
     * Clear the textarea.
     */
    async clear() {
        this.value = '';
        this.catChange.emit(this.value);
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
        return (h(Host, { key: '776354bbb03c8cb024d707f005cc53b11a61bc08' }, h("div", { key: '8ba766cb2681246058e7bd1082bb8b06d09c3edf', class: {
                'textarea-field': true,
                'textarea-horizontal': this.horizontal
            } }, h("div", { key: '75345030c6d4c269f60da416c43ddaf0979f93fc', class: { 'label-container': true, hidden: this.labelHidden } }, (this.hasSlottedLabel || this.label) && (h("label", { key: 'b0332bc73a58d3559e31620687802cf5abf5d92f', htmlFor: this.id, part: "label" }, h("span", { key: '177f5cccd3b74c85fa86acc1a9f2b4a0bc05809e', class: "label-wrapper" }, (this.hasSlottedLabel && h("slot", { key: '775fd2269ed0d8333d1a1630cc6fd4928fe851a0', name: "label" })) || this.label, h("div", { key: 'a3db8aaaae6a72789e7b1039c5ce685335f081da', class: "label-metadata" }, !this.required && (this.requiredMarker ?? 'optional').startsWith('optional') && (h("span", { key: '7b80ecce688910d85b63b230085489bfdde5d833', class: "label-optional", "aria-hidden": "true" }, "(", catI18nRegistry.t('input.optional'), ")")), this.required && this.requiredMarker?.startsWith('required') && (h("span", { key: '0d047c9fc850c795df761d4b9d7a414861eb38be', class: "label-optional", "aria-hidden": "true" }, "(", catI18nRegistry.t('input.required'), ")")), (this.maxLength || this.hasSlottedCounter) && (h("div", { key: 'd1339f4e4df011c65c57f701d5fc861966ff918d', class: "label-character-count", "aria-hidden": "true" }, this.hasSlottedCounter ? (h("slot", { name: "counter" })) : (`${this.value?.length ?? 0}/${this.maxLength}`)))))))), h("div", { key: '31af38f5bd63cbf2b315b072421dbbded35ee5ae', class: "textarea-container" }, h("div", { key: '5da2c1a1cbcd790a931a1444097919648f73761e', class: {
                'textarea-wrapper': true,
                'textarea-readonly': this.readonly,
                'textarea-disabled': this.disabled,
                'textarea-invalid': this.invalid
            } }, h("textarea", { key: 'bc3f1210a9ed12884e916e050e4f0c93823d0600', "data-test": this.testId, ...this.nativeAttributes, part: "textarea", ref: el => (this.textarea = el), id: this.id, disabled: this.disabled, autocomplete: this.autoComplete, maxlength: this.maxLength, minlength: this.minLength, name: this.name, placeholder: this.placeholder, readonly: this.readonly, required: this.required, rows: this.rows, value: this.value, onInput: this.onInput.bind(this), onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), "aria-invalid": this.invalid ? 'true' : undefined, "aria-describedby": this.hasHint ? this.id + '-hint' : undefined }), this.invalid && (h("cat-icon", { key: '342839d1ebb8fd3fab02d6692ec26b680fb187c6', icon: "$cat:input-error", class: "icon-suffix cat-text-danger", size: "l", onClick: () => this.textarea.focus() }))), this.hasHint && (h(CatFormHint, { key: '132bfe8caf387912b7d1156e2b066aecec99ed54', id: this.id, hint: this.hint, slottedHint: this.hasSlottedHint && h("slot", { name: "hint" }), errorMap: this.errorMap }))))));
    }
    get hasHint() {
        return !!this.hint || !!this.hasSlottedHint || this.invalid;
    }
    get invalid() {
        return this.errorMap === true || !!Object.keys(this.errorMap || {}).length;
    }
    onInput() {
        this.value = this.textarea.value;
        this.catChange.emit(this.value);
        this.showErrorsIfTimeout();
    }
    onFocus(event) {
        this.catFocus.emit(event);
    }
    onBlur(event) {
        this.catBlur.emit(event);
        if (coerceBoolean(this.errorUpdate)) {
            this.showErrors();
        }
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
        const hasFocus = document.activeElement === this.hostElement || document.activeElement === this.textarea;
        if (!hasFocus) {
            this.showErrors();
        }
    }
    static get delegatesFocus() { return true; }
    get hostElement() { return this; }
    static get watchers() { return {
        "errors": ["onErrorsChanged"]
    }; }
    static get style() { return catTextareaCss; }
}, [17, "cat-textarea", {
        "requiredMarker": [1, "required-marker"],
        "horizontal": [4],
        "autoComplete": [1, "auto-complete"],
        "disabled": [4],
        "hint": [1],
        "identifier": [1],
        "label": [1],
        "labelHidden": [4, "label-hidden"],
        "maxLength": [2, "max-length"],
        "minLength": [2, "min-length"],
        "name": [1],
        "placeholder": [1],
        "readonly": [4],
        "required": [4],
        "rows": [2],
        "value": [1025],
        "errors": [4],
        "errorUpdate": [8, "error-update"],
        "nativeAttributes": [16],
        "testId": [1, "test-id"],
        "hasSlottedLabel": [32],
        "hasSlottedHint": [32],
        "hasSlottedCounter": [32],
        "errorMap": [32],
        "doFocus": [64],
        "doBlur": [64],
        "clear": [64]
    }, undefined, {
        "errors": ["onErrorsChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-textarea", "cat-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-textarea":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatTextarea$1);
            }
            break;
        case "cat-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const CatTextarea = CatTextarea$1;
const defineCustomElement = defineCustomElement$1;

export { CatTextarea, defineCustomElement };
//# sourceMappingURL=cat-textarea.js.map

//# sourceMappingURL=cat-textarea.js.map