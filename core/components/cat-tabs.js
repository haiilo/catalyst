import { p as proxyCustomElement, H, d as createEvent, h, c as Host } from './p-DJz_AlH8.js';
import { d as defineCustomElement$4 } from './p-BAS0o037.js';
import { d as defineCustomElement$3 } from './p-tMJhdM6b.js';
import { d as defineCustomElement$2 } from './p-BWMxUNx3.js';

const catTabsCss = ":host{display:flex;flex-direction:row;box-shadow:inset 0 -1px 0 0 rgb(var(--cat-border-color, 235, 236, 240))}:host([hidden]){display:none}:host([tabs-align=center]){justify-content:center}:host([tabs-align=right]){justify-content:end}:host([tabs-align=justify]) cat-button{flex:1 0 auto}.cat-tab{display:inline-flex;flex-direction:column;align-items:center;justify-content:space-between;position:relative;transition:none}.cat-tab:first-of-type{margin-left:-0.75rem}.cat-tab:last-of-type{margin-right:-0.75rem}.cat-tab::after{opacity:0;content:\"\";position:absolute;background:currentColor;left:0.75rem;right:0.75rem;bottom:0;height:2px}.cat-tab:hover::after{opacity:0.25}.cat-tab.cat-tab-active{font-weight:700;color:rgb(var(--cat-primary-text-active, 2, 99, 113))}.cat-tab.cat-tab-error{color:rgb(var(--cat-danger-text-active, 174, 42, 10))}.cat-tab.cat-tab-active::after{opacity:1}";

const CatTabs$1 = /*@__PURE__*/ proxyCustomElement(class CatTabs extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catChange = createEvent(this, "catChange");
        this.tabs = [];
        /**
         * The ID of the active tab.
         */
        this.activeTab = '';
        /**
         * The alignment of the tabs.
         */
        this.tabsAlign = 'left';
    }
    componentWillLoad() {
        this.syncTabs();
    }
    componentDidLoad() {
        this.mutationObserver = new MutationObserver(mutations => mutations.some(value => value.target.nodeName === 'CAT-TAB') && this.syncTabs());
        this.mutationObserver?.observe(this.hostElement, {
            childList: true,
            attributes: true,
            subtree: true
        });
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
    }
    onActiveTabChange(id) {
        const index = this.tabs.findIndex(tab => tab.id === id);
        this.catChange.emit({ id, index });
    }
    onKeydown(event) {
        if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
            const elements = this.hostElement.shadowRoot?.querySelectorAll('cat-button[role="tab"]');
            const targetElements = Array.from(elements ?? []).filter(button => !button.disabled);
            const activeElement = this.hostElement.shadowRoot?.activeElement;
            const activeIdx = activeElement ? targetElements.indexOf(activeElement) : -1;
            const activeOff = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
            const targetIdx = activeIdx < 0 ? 0 : (activeIdx + activeOff + targetElements.length) % targetElements.length;
            targetElements[targetIdx].doFocus();
            event.preventDefault();
        }
    }
    /**
     * Activates the tab with the given id.
     *
     * @param id The tab id.
     */
    async setActive(id) {
        this.activate(this.tabs.find(tab => tab.id === id));
    }
    /**
     * Activates the tab with the given index.
     *
     * @param index The tab index.
     */
    async setActiveIndex(index) {
        this.activate(this.tabs[index]);
    }
    render() {
        this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
        return (h(Host, { key: '057726c753ef2e4d5557736488fbffb92774f26f' }, this.tabs.map((tab) => {
            return (h("cat-button", { buttonId: tab.id, role: "tab", part: "tab", class: {
                    'cat-tab': true,
                    'cat-tab-active': tab.id === this.activeTab,
                    'cat-tab-error': tab.error
                }, active: tab.id === this.activeTab, color: tab.error ? 'danger' : tab.id === this.activeTab ? 'primary' : 'secondary', variant: "text", icon: tab.icon ? (tab.error ? '$cat:input-error' : tab.icon) : undefined, iconOnly: tab.iconOnly, iconRight: tab.iconRight, url: tab.url, disabled: tab.deactivated, urlTarget: tab.urlTarget, onCatClick: () => this.click(tab), nativeAttributes: { ...tab.nativeAttributes }, nativeContentAttributes: { 'data-text': tab.label }, "data-dropdown-no-close": true }, tab.label));
        })));
    }
    syncTabs() {
        this.tabs = Array.from(this.hostElement.querySelectorAll('cat-tab'));
        this.activeTab = this.activeTab || this.tabs.filter(tab => this.canActivate(tab) && !tab.noActive)[0]?.id;
    }
    click(tab) {
        if (this.canActivate(tab)) {
            tab.click();
            if (!tab.noActive) {
                this.activate(tab);
            }
        }
    }
    activate(tab) {
        if (!tab) {
            this.activeTab = '';
        }
        else if (this.canActivate(tab)) {
            this.activeTab = tab.id;
        }
    }
    canActivate(tab) {
        return !tab.deactivated && !tab.url && tab.id !== this.activeTab;
    }
    static get delegatesFocus() { return true; }
    get hostElement() { return this; }
    static get watchers() { return {
        "activeTab": ["onActiveTabChange"]
    }; }
    static get style() { return catTabsCss; }
}, [17, "cat-tabs", {
        "activeTab": [1537, "active-tab"],
        "tabsAlign": [1, "tabs-align"],
        "tabs": [32],
        "setActive": [64],
        "setActiveIndex": [64]
    }, [[0, "keydown", "onKeydown"]], {
        "activeTab": ["onActiveTabChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-tabs", "cat-button", "cat-icon", "cat-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-tabs":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatTabs$1);
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

const CatTabs = CatTabs$1;
const defineCustomElement = defineCustomElement$1;

export { CatTabs, defineCustomElement };
//# sourceMappingURL=cat-tabs.js.map

//# sourceMappingURL=cat-tabs.js.map