import { p as proxyCustomElement, H, h } from './p-DJz_AlH8.js';
import { c as catIconRegistry } from './p-Cj7g8Tvk.js';

const catIconCss = ":host{display:inline-flex;vertical-align:middle;-webkit-user-select:none;-ms-user-select:none;user-select:none;}:host([hidden]){display:none}span{display:inline-flex}svg{fill:currentColor;stroke:none;transform-origin:center center;height:1em;width:calc(var(--cat-icon-ratio, 1) * 1em)}.icon-xs svg{font-size:0.75rem}.icon-s svg{font-size:1rem}.icon-m svg{font-size:1.25rem}.icon-l svg{font-size:1.5rem}.icon-xl svg{font-size:1.75rem}";

const CatIcon = /*@__PURE__*/ proxyCustomElement(class CatIcon extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /**
         * The size of the icon.
         */
        this.size = 'm';
    }
    render() {
        return (h("span", { key: '1e1698413feaee8ca810b50370fc44a5a9f229dc', innerHTML: this.iconSrc || (this.icon ? catIconRegistry.getIcon(this.icon) : ''), "aria-label": this.a11yLabel, "aria-hidden": this.a11yLabel ? null : 'true', part: "icon", class: {
                icon: true,
                [`icon-${this.size}`]: this.size !== 'inline'
            } }));
    }
    static get style() { return catIconCss; }
}, [1, "cat-icon", {
        "icon": [1],
        "iconSrc": [1, "icon-src"],
        "size": [1],
        "a11yLabel": [1, "a11y-label"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-icon":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatIcon);
            }
            break;
    } });
}

export { CatIcon as C, defineCustomElement as d };
//# sourceMappingURL=p-tMJhdM6b.js.map

//# sourceMappingURL=p-tMJhdM6b.js.map