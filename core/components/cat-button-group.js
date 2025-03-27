import { p as proxyCustomElement, H, h, c as Host } from './p-DJz_AlH8.js';

const catButtonGroupCss = ":host{position:relative;display:inline-flex;vertical-align:middle}";

const CatButtonGroup$1 = /*@__PURE__*/ proxyCustomElement(class CatButtonGroup extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.buttonElements = [];
    }
    render() {
        return (h(Host, { key: '2b9aeb09c4290a27751f568e596a3de21f8deeb3', role: "group", "aria-label": this.a11yLabel }, h("slot", { key: '5a6afa70513843b8c201a649ed0edb30fea9b7fc', onSlotchange: this.onSlotChange.bind(this) })));
    }
    onSlotChange() {
        this.buttonElements = Array.from(this.hostElement.querySelectorAll(':scope > cat-button, :scope > cat-tooltip > cat-button, :scope > cat-dropdown cat-button[slot="trigger"]'));
        this.buttonElements.forEach((element, index) => {
            element.buttonGroupPosition =
                index === 0 ? 'first' : index === this.buttonElements.length - 1 ? 'last' : 'middle';
        });
    }
    get hostElement() { return this; }
    static get style() { return catButtonGroupCss; }
}, [1, "cat-button-group", {
        "a11yLabel": [1, "a11y-label"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-button-group"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-button-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatButtonGroup$1);
            }
            break;
    } });
}

const CatButtonGroup = CatButtonGroup$1;
const defineCustomElement = defineCustomElement$1;

export { CatButtonGroup, defineCustomElement };
//# sourceMappingURL=cat-button-group.js.map

//# sourceMappingURL=cat-button-group.js.map