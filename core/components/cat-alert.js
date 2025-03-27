import { p as proxyCustomElement, H, h, c as Host } from './p-DJz_AlH8.js';
import { d as defineCustomElement$2 } from './p-tMJhdM6b.js';

function setAttributeDefault(host, attr, value) {
    if (!host.hostElement.hasAttribute(attr) && value != null) {
        host.hostElement.setAttribute(attr, String(value));
    }
}

const catAlertCss = ":host{display:flex;gap:0.5rem;padding:1.25rem;border-radius:var(--cat-border-radius-l, 0.5rem)}:host([hidden]){display:none}:host(:focus-visible){outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.content{align-self:center;width:100%}::slotted(:last-child){margin-bottom:0 !important}:host([color=primary]){background-color:rgb(var(--cat-primary-bg, 0, 129, 148));color:rgb(var(--cat-primary-fill, 255, 255, 255));--cat-primary-text:var(--cat-primary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-primary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-primary-fill-active, 255, 255, 255);--cat-link-decoration:underline}:host([color=secondary]){background-color:rgb(var(--cat-secondary-bg, 105, 118, 135));color:rgb(var(--cat-secondary-fill, 255, 255, 255));--cat-primary-text:var(--cat-secondary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-secondary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-secondary-fill-active, 255, 255, 255);--cat-link-decoration:underline}:host([color=info]){background-color:rgb(var(--cat-info-bg, 0, 115, 230));color:rgb(var(--cat-info-fill, 255, 255, 255));--cat-primary-text:var(--cat-info-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-info-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-info-fill-active, 255, 255, 255);--cat-link-decoration:underline}:host([color=success]){background-color:rgb(var(--cat-success-bg, 0, 132, 88));color:rgb(var(--cat-success-fill, 255, 255, 255));--cat-primary-text:var(--cat-success-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-success-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-success-fill-active, 255, 255, 255);--cat-link-decoration:underline}:host([color=warning]){background-color:rgb(var(--cat-warning-bg, 255, 206, 128));color:rgb(var(--cat-warning-fill, 0, 0, 0));--cat-primary-text:var(--cat-warning-fill, 0, 0, 0);--cat-primary-text-hover:var(--cat-warning-fill-hover, 0, 0, 0);--cat-primary-text-active:var(--cat-warning-fill-active, 0, 0, 0);--cat-link-decoration:underline}:host([color=danger]){background-color:rgb(var(--cat-danger-bg, 217, 52, 13));color:rgb(var(--cat-danger-fill, 255, 255, 255));--cat-primary-text:var(--cat-danger-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-danger-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-danger-fill-active, 255, 255, 255);--cat-link-decoration:underline}";

const CatAlert$1 = /*@__PURE__*/ proxyCustomElement(class CatAlert extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.mapIcon = new Map([
            ['primary', '$cat:alert-primary'],
            ['secondary', '$cat:alert-secondary'],
            ['info', '$cat:alert-info'],
            ['success', '$cat:alert-success'],
            ['warning', '$cat:alert-warning'],
            ['danger', '$cat:alert-danger']
        ]);
        this.mapRole = new Map([
            ['primary', 'status'],
            ['secondary', 'status'],
            ['info', 'status'],
            ['success', 'status'],
            ['warning', 'alert'],
            ['danger', 'alert']
        ]);
        /**
         * The color palette of the alert.
         */
        this.color = 'primary';
        /**
         * Whether the icon of the alert is deactivated.
         */
        this.noIcon = false;
    }
    connectedCallback() {
        setAttributeDefault(this, 'tabindex', 0);
        setAttributeDefault(this, 'role', this.mapRole.get(this.color));
    }
    render() {
        return (h(Host, { key: 'c02988c259d20cfb381b69a43cd9800a075f9c97' }, !this.noIcon && h("cat-icon", { key: 'fee7a2b021437de0c7617187e48c3e436218b50f', size: "l", icon: this.icon || this.mapIcon.get(this.color) }), h("div", { key: '4bb19866ff246d7ec956c213e39f8d09080f02da', class: "content" }, h("slot", { key: 'a3356a8b51747570f01c33cd77106156aed5c404' }))));
    }
    get hostElement() { return this; }
    static get style() { return catAlertCss; }
}, [1, "cat-alert", {
        "color": [513],
        "icon": [1],
        "noIcon": [4, "no-icon"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-alert", "cat-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-alert":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatAlert$1);
            }
            break;
        case "cat-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const CatAlert = CatAlert$1;
const defineCustomElement = defineCustomElement$1;

export { CatAlert, defineCustomElement };
//# sourceMappingURL=cat-alert.js.map

//# sourceMappingURL=cat-alert.js.map