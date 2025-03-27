import { p as proxyCustomElement, H, d as createEvent, h, c as Host } from './p-DJz_AlH8.js';

const catTabCss = ":host{display:block}:host([hidden]){display:none}";

let nextUniqueId = 0;
const CatTab$1 = /*@__PURE__*/ proxyCustomElement(class CatTab extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catClick = createEvent(this, "catClick");
        /**
         * The label of the tab.
         */
        this.label = '';
        /**
         * Hide the actual button content and only display the tab.
         */
        this.iconOnly = false;
        /**
         * Display the icon on the right.
         */
        this.iconRight = false;
        /**
         * Specifies that the tab should be deactivated.
         */
        this.deactivated = false;
        /**
         * Specifies that the tab does not have an active state and thus cannot be
         * activated. This does not mean, that the tab is deactivated. The tab can
         * still be clicked and emit the `catClick` event. This is helpful if a tab
         * should only trigger a click action (such as opening a modal).
         */
        this.noActive = false;
        /**
         * Specifies that the tab content pane contains an error. This will color
         * the tab in an error state and also switch to an error icon if an icon
         * is specified.
         */
        this.error = false;
    }
    connectedCallback() {
        if (!this.hostElement.id) {
            this.hostElement.id = `cat-tab-${nextUniqueId++}`;
        }
    }
    onClick(event) {
        this.catClick.emit(event);
    }
    render() {
        return h(Host, { key: '0db9a9f8449cb69691552450d653d86251a17954' });
    }
    get hostElement() { return this; }
    static get style() { return catTabCss; }
}, [1, "cat-tab", {
        "label": [513],
        "icon": [513],
        "iconOnly": [520, "icon-only"],
        "iconRight": [516, "icon-right"],
        "url": [513],
        "urlTarget": [513, "url-target"],
        "deactivated": [516],
        "noActive": [516, "no-active"],
        "error": [516],
        "nativeAttributes": [16]
    }, [[0, "click", "onClick"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-tab"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-tab":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatTab$1);
            }
            break;
    } });
}

const CatTab = CatTab$1;
const defineCustomElement = defineCustomElement$1;

export { CatTab, defineCustomElement };
//# sourceMappingURL=cat-tab.js.map

//# sourceMappingURL=cat-tab.js.map