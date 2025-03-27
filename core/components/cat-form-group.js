import { p as proxyCustomElement, H, h, c as Host } from './p-DJz_AlH8.js';

const catFormGroupCss = ":host{display:block}";

const CatFormGroup$1 = /*@__PURE__*/ proxyCustomElement(class CatFormGroup extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.formElements = [];
        /**
         * Whether the labels need a marker to shown if the forms fields are required or optional.<br /><br />
         * By default, it is set to auto, it will display the mark depending on the number of required and optional fields: <br />
         * - If there are more required, the optional will be marked.<br />
         * - If there are less required, it will mark the required.<br /><br />
         * If a form field had "!", the requiredMarked of the field would not change.
         */
        this.requiredMarker = 'auto';
        /**
         * Whether the label is on top or left.
         */
        this.horizontal = false;
    }
    onRequiredMarkerChanged(newRequiredMarker) {
        const updateMarker = newRequiredMarker === 'auto' ? this.calculate(this.formElements) : newRequiredMarker;
        this.formElements.forEach(element => !element.requiredMarker?.endsWith('!') && (element.requiredMarker = updateMarker));
    }
    onHorizontalChanged(newHorizontal) {
        this.formElements.forEach(element => {
            element.horizontal = newHorizontal;
        });
    }
    render() {
        return (h(Host, { key: 'c9fe233663c9967b3e78334e6994ceb62653c19c', style: { '--label-size': this.labelSize } }, h("slot", { key: '49274e5e31644d6f7d042033e975d8b91d6aaea6', onSlotchange: this.onSlotChange.bind(this) })));
    }
    onSlotChange() {
        this.formElements = Array.from(this.hostElement.querySelectorAll('cat-input, cat-textarea, cat-select, cat-datepicker'));
        this.onRequiredMarkerChanged(this.requiredMarker);
        this.onHorizontalChanged(this.horizontal);
    }
    calculate(elements) {
        const optionalFields = elements.filter(value => !value.required).length;
        const requiredFields = elements.length - optionalFields;
        return requiredFields >= optionalFields ? 'optional' : 'required';
    }
    get hostElement() { return this; }
    static get watchers() { return {
        "requiredMarker": ["onRequiredMarkerChanged"],
        "horizontal": ["onHorizontalChanged"]
    }; }
    static get style() { return catFormGroupCss; }
}, [1, "cat-form-group", {
        "requiredMarker": [1, "required-marker"],
        "horizontal": [4],
        "labelSize": [1, "label-size"]
    }, undefined, {
        "requiredMarker": ["onRequiredMarkerChanged"],
        "horizontal": ["onHorizontalChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-form-group"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-form-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatFormGroup$1);
            }
            break;
    } });
}

const CatFormGroup = CatFormGroup$1;
const defineCustomElement = defineCustomElement$1;

export { CatFormGroup, defineCustomElement };
//# sourceMappingURL=cat-form-group.js.map

//# sourceMappingURL=cat-form-group.js.map