import { p as proxyCustomElement, H, d as createEvent, h } from './p-DJz_AlH8.js';

const catCardCss = ":host{display:block;border-radius:var(--cat-border-radius-l, 0.5rem);background-color:white;padding:1.25rem;box-shadow:0 0 0 1px rgb(var(--cat-border-color-card, 0, 0, 0, 0))}:host([hidden]){display:none}::slotted(:last-child){margin-bottom:0 !important}::slotted(nav),::slotted(nav:last-child){margin:-1rem -1rem !important}::slotted(.cat-card-pull){margin:-1.25rem !important;width:calc(100% + 2.5rem) !important;height:calc(100% + 2.5rem) !important}::slotted(.cat-card-pull-h){margin-left:-1.25rem !important;margin-right:-1.25rem !important;width:calc(100% + 2.5rem) !important}::slotted(.cat-card-pull-v){margin-top:-1.25rem !important;margin-bottom:-1.25rem !important;height:calc(100% + 2.5rem) !important}::slotted(.cat-card-pull-t){margin-top:-1.25rem !important}::slotted(.cat-card-pull-l){margin-left:-1.25rem !important}::slotted(.cat-card-pull-r){margin-right:-1.25rem !important}::slotted(.cat-card-pull-b){margin-bottom:-1.25rem !important}";

const CatCard$1 = /*@__PURE__*/ proxyCustomElement(class CatCard extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catLoad = createEvent(this, "catLoad");
    }
    render() {
        return h("slot", { key: '4d88ab8e5cf1e13a3242b646314f034f5fa0fdfe' });
    }
    componentDidLoad() {
        this.catLoad.emit();
    }
    static get style() { return catCardCss; }
}, [1, "cat-card"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-card"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatCard$1);
            }
            break;
    } });
}

const CatCard = CatCard$1;
const defineCustomElement = defineCustomElement$1;

export { CatCard, defineCustomElement };
//# sourceMappingURL=cat-card.js.map

//# sourceMappingURL=cat-card.js.map