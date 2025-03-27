import { p as proxyCustomElement, H, h, c as Host } from './p-DJz_AlH8.js';
import { i as isBreakpoint, M as MediaMatcher, B as Breakpoints } from './p-CGRE_AlP.js';
import { d as defineCustomElement$2 } from './p-tMJhdM6b.js';

const catBadgeCss = ":host([hidden]){display:none}:host{display:inline-flex;max-width:100%;vertical-align:baseline;align-items:center;justify-content:center;border-radius:var(--cat-border-radius-m, 0.25rem);text-decoration:none;line-height:1.5;flex-shrink:0}:host slot{display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}:host([round]){border-radius:10rem}:host([variant=filled]){background-color:rgb(var(--bg));color:rgb(var(--fill));font-weight:600;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:greyscale}:host([variant=outlined]){background-color:white;color:rgb(var(--text));box-shadow:inset 0 0 0 1px rgba(var(--text), 0.2)}:host([color=primary]){--bg:var(--cat-primary-bg, 0, 129, 148);--fill:var(--cat-primary-fill, 255, 255, 255);--text:var(--cat-primary-text, 0, 129, 148)}:host([color=secondary]){--bg:var(--cat-secondary-bg, 105, 118, 135);--fill:var(--cat-secondary-fill, 255, 255, 255);--text:var(--cat-secondary-text, 0, 0, 0)}:host([color=info]){--bg:var(--cat-info-bg, 0, 115, 230);--fill:var(--cat-info-fill, 255, 255, 255);--text:var(--cat-info-text, 0, 115, 230)}:host([color=success]){--bg:var(--cat-success-bg, 0, 132, 88);--fill:var(--cat-success-fill, 255, 255, 255);--text:var(--cat-success-text, 0, 132, 88)}:host([color=warning]){--bg:var(--cat-warning-bg, 255, 206, 128);--fill:var(--cat-warning-fill, 0, 0, 0);--text:var(--cat-warning-text, 159, 97, 0)}:host([color=danger]){--bg:var(--cat-danger-bg, 217, 52, 13);--fill:var(--cat-danger-fill, 255, 255, 255);--text:var(--cat-danger-text, 217, 52, 13)}:host([size=xs]){height:1rem;min-width:1rem;font-size:0.75rem;padding:0 0.25rem;gap:0.25rem}:host([data-icon-badge=xs]){width:1rem;height:1rem;padding:0}:host([size=s]){height:1.5rem;min-width:1.5rem;font-size:0.75rem;padding:0 0.5rem;gap:0.25rem}:host([data-icon-badge=s]){width:1.5rem;height:1.5rem;padding:0}:host([size=m]){height:2rem;min-width:2rem;font-size:0.875rem;padding:0 0.75rem;gap:0.25rem}:host([data-icon-badge=m]){width:2rem;height:2rem;padding:0}:host([size=l]){height:2.5rem;min-width:2.5rem;font-size:0.9375rem;padding:0 1rem;gap:0.25rem}:host([data-icon-badge=l]){width:2.5rem;height:2.5rem;padding:0}:host([size=xl]){height:3rem;min-width:3rem;font-size:1.125rem;padding:0 1rem;gap:0.25rem}:host([data-icon-badge=xl]){width:3rem;height:3rem;padding:0}:host([pulse][variant=filled]){animation:1.5s ease 0s infinite normal none running pulse}:host([pulse][variant=outlined]){animation:1.5s ease 0s infinite normal none running pulse-outlined}@keyframes pulse{0%{box-shadow:0 0 0 0 rgb(var(--bg))}70%{box-shadow:transparent 0 0 0 0.5rem}100%{box-shadow:transparent 0 0 0 0}}@keyframes pulse-outlined{0%{box-shadow:0 0 0 0 rgb(var(--bg)), inset 0 0 0 1px rgba(var(--text), 0.2)}70%{box-shadow:transparent 0 0 0 0.5rem, inset 0 0 0 1px rgba(var(--text), 0.2)}100%{box-shadow:transparent 0 0 0 0, inset 0 0 0 1px rgba(var(--text), 0.2)}}";

const CatBadge$1 = /*@__PURE__*/ proxyCustomElement(class CatBadge extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this._iconOnly = true;
        /**
         * The rendering style of the badge.
         */
        this.variant = 'filled';
        /**
         * The color palette of the badge.
         */
        this.color = 'primary';
        /**
         * The size of the badge.
         */
        this.size = 'm';
        /**
         * Use round badge edges.
         */
        this.round = false;
        /**
         * Draw attention to the badge with a subtle animation.
         */
        this.pulse = false;
        /**
         * Hide the actual button content and only display the icon.
         */
        this.iconOnly = false;
        /**
         * Display the icon on the right.
         */
        this.iconRight = false;
    }
    onIconOnlyChanged(value) {
        // teardown
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.mediaQueryList?.removeEventListener('change', this.mediaQueryListener);
        this.mediaQueryList = undefined;
        this.mediaQueryListener = undefined;
        // setup
        if (isBreakpoint(value)) {
            this.mediaMatcher ?? (this.mediaMatcher = new MediaMatcher());
            this.mediaQueryList = this.mediaMatcher.matchMedia(Breakpoints[value]);
            this.mediaQueryListener = (event) => (this._iconOnly = event.matches);
            this.mediaQueryList.addEventListener('change', this.mediaQueryListener);
            this._iconOnly = this.mediaQueryList.matches;
        }
        else {
            this._iconOnly = value;
        }
    }
    componentWillLoad() {
        this.onIconOnlyChanged(this.iconOnly);
    }
    get isIconBadge() {
        return Boolean(this.icon) && this._iconOnly;
    }
    get hasPrefixIcon() {
        return Boolean(this.icon) && !this._iconOnly && !this.iconRight;
    }
    get hasSuffixIcon() {
        return Boolean(this.icon) && !this._iconOnly && this.iconRight;
    }
    get iconSize() {
        switch (this.size) {
            case 'xs':
            case 's':
                return 'xs';
            case 'l':
            case 'xl':
                return 'l';
            default:
                return 'm';
        }
    }
    render() {
        return (h(Host, { key: '2c10a8da896b2fe6b7637ec871386da6ee9dc132', "data-icon-badge": this.isIconBadge ? this.size : null }, this.hasPrefixIcon ? h("cat-icon", { icon: this.icon, size: this.iconSize, part: "prefix" }) : null, this.isIconBadge ? (h("cat-icon", { icon: this.icon, size: this.iconSize, class: "icon-only" })) : (h("slot", null)), this.hasSuffixIcon ? h("cat-icon", { icon: this.icon, size: this.iconSize, part: "prefix" }) : null));
    }
    get hostElement() { return this; }
    static get watchers() { return {
        "iconOnly": ["onIconOnlyChanged"]
    }; }
    static get style() { return catBadgeCss; }
}, [1, "cat-badge", {
        "variant": [513],
        "color": [513],
        "size": [513],
        "round": [516],
        "pulse": [516],
        "icon": [1],
        "iconOnly": [8, "icon-only"],
        "iconRight": [4, "icon-right"],
        "_iconOnly": [32]
    }, undefined, {
        "iconOnly": ["onIconOnlyChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-badge", "cat-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-badge":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatBadge$1);
            }
            break;
        case "cat-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const CatBadge = CatBadge$1;
const defineCustomElement = defineCustomElement$1;

export { CatBadge, defineCustomElement };
//# sourceMappingURL=cat-badge.js.map

//# sourceMappingURL=cat-badge.js.map