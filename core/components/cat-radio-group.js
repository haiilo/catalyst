import { p as proxyCustomElement, H, d as createEvent, h } from './p-DJz_AlH8.js';

const catRadioGroupCss = ":host{display:block}:host([hidden]){display:none}";

const CatRadioGroup$1 = /*@__PURE__*/ proxyCustomElement(class CatRadioGroup extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catChange = createEvent(this, "catChange");
        this.catFocus = createEvent(this, "catFocus");
        this.catBlur = createEvent(this, "catBlur");
        this.catRadioGroup = [];
        /**
         * Whether this radio group is disabled.
         */
        this.disabled = false;
        /**
         * Whether the label of the radios should appear to the left of them.
         */
        this.labelLeft = false;
    }
    onNameChanged(newName) {
        this.catRadioGroup.forEach(catRadio => (catRadio.name = newName));
    }
    onValueChanged(newValue) {
        this.catRadioGroup.forEach(catRadio => (catRadio.checked = catRadio.value === newValue));
        this.updateTabIndex();
    }
    onDisabledChanged(disabled) {
        this.catRadioGroup.forEach(catRadio => (catRadio.disabled = catRadio.disabled || disabled));
    }
    onLabelLeftChanged(labelLeft) {
        this.catRadioGroup.forEach(catRadio => (catRadio.labelLeft = catRadio.labelLeft || labelLeft));
    }
    componentDidLoad() {
        this.init();
        this.mutationObserver = new MutationObserver(mutations => mutations.some(value => value.target.nodeName === 'CAT-RADIO') && this.init());
        this.mutationObserver?.observe(this.hostElement, {
            childList: true,
            attributes: true,
            subtree: true
        });
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
    }
    onKeydown(event) {
        if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key) && this.catRadioGroup.length) {
            const targetElements = this.catRadioGroup.filter(catRadio => !catRadio.disabled);
            const activeElement = document.activeElement;
            const activeIdx = this.catRadioGroup.findIndex(catRadio => catRadio === activeElement);
            const activeOff = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
            const targetIdx = activeIdx < 0 ? 0 : (activeIdx + activeOff + targetElements.length) % targetElements.length;
            targetElements[targetIdx].doFocus();
            targetElements[targetIdx].shadowRoot?.querySelector('input')?.click();
            this.updateTabIndex();
            event.preventDefault();
        }
    }
    onInput(event) {
        const radio = this.catRadioGroup.find(radio => radio === event.target);
        if (radio?.localName === 'cat-radio') {
            this.value = radio?.checked ? radio?.value : undefined;
            this.catChange.emit(this.value);
        }
    }
    onFocus(event) {
        if (!event.relatedTarget) {
            this.catBlur.emit(event);
        }
    }
    onBlur(event) {
        if (!event.relatedTarget) {
            this.catBlur.emit(event);
        }
    }
    render() {
        return (h("div", { key: 'af9aff52c285bb32986d27c4f062f7ca8dbe394e', role: "radiogroup", "aria-label": this.a11yLabel }, h("slot", { key: 'e4542e17427cdd2d31e38276afe5d240f5b9e6cf' })));
    }
    init() {
        this.catRadioGroup = Array.from(this.hostElement.querySelectorAll(`cat-radio`));
        this.onNameChanged(this.name);
        this.onValueChanged(this.value);
        this.onDisabledChanged(this.disabled);
        this.onLabelLeftChanged(this.labelLeft);
    }
    updateTabIndex() {
        if (this.catRadioGroup.length) {
            this.catRadioGroup.forEach(value => value.shadowRoot?.querySelector('input')?.setAttribute('tabindex', '-1'));
            const checkedRadioIndex = this.catRadioGroup.findIndex(value => value.checked);
            this.catRadioGroup[checkedRadioIndex >= 0 ? checkedRadioIndex : 0].shadowRoot
                ?.querySelector('input')
                ?.setAttribute('tabindex', '0');
        }
    }
    get hostElement() { return this; }
    static get watchers() { return {
        "name": ["onNameChanged"],
        "value": ["onValueChanged"],
        "disabled": ["onDisabledChanged"],
        "labelLeft": ["onLabelLeftChanged"]
    }; }
    static get style() { return catRadioGroupCss; }
}, [1, "cat-radio-group", {
        "name": [1],
        "value": [1032],
        "disabled": [4],
        "a11yLabel": [1, "a11y-label"],
        "labelLeft": [4, "label-left"]
    }, [[0, "keydown", "onKeydown"], [0, "input", "onInput"], [2, "focus", "onFocus"], [2, "blur", "onBlur"]], {
        "name": ["onNameChanged"],
        "value": ["onValueChanged"],
        "disabled": ["onDisabledChanged"],
        "labelLeft": ["onLabelLeftChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-radio-group"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-radio-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatRadioGroup$1);
            }
            break;
    } });
}

const CatRadioGroup = CatRadioGroup$1;
const defineCustomElement = defineCustomElement$1;

export { CatRadioGroup, defineCustomElement };
//# sourceMappingURL=cat-radio-group.js.map

//# sourceMappingURL=cat-radio-group.js.map