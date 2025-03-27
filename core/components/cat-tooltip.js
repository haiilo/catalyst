import { p as proxyCustomElement, H, h, c as Host } from './p-DJz_AlH8.js';
import { c as computePosition, a as autoUpdate, o as offset, f as flip, b as shift } from './p-OtWHn5vK.js';

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const catTooltipCss = ":host{display:contents}:host([hidden]){display:none}.tooltip{--cat-font-color-head:var(--cat-font-color-tooltip, 255, 255, 255);--cat-font-color-body:var(--cat-font-color-tooltip, 255, 255, 255);position:fixed;width:max-content;top:0;left:0;box-sizing:border-box;background-color:rgb(var(--cat-bg-tooltip, 0, 0, 0));border-radius:var(--cat-border-radius-m, 0.25rem);color:rgb(var(--cat-font-color-tooltip, 255, 255, 255));transition:opacity 250ms linear, visibility 250ms linear;visibility:hidden;opacity:0;box-shadow:rgba(0, 0, 0, 0.08) 0 1px 8px 0;z-index:calc(var(--cat-z-index, 1000) + 200);max-width:min(100vw - 0.5rem, 20rem)}.tooltip-hidden{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.tooltip-show{opacity:1;visibility:visible}.tooltip p{margin:0}.tooltip-round{border-radius:10rem}.tooltip-s{padding:0.25rem 0.375rem;font-size:0.75rem;line-height:1rem;font-weight:500}.tooltip-s.tooltip-round{padding-left:0.5rem;padding-right:0.5rem}.tooltip-m{padding:0.375rem 0.5rem;font-size:0.875rem;line-height:1.125rem;font-weight:500}.tooltip-m.tooltip-round{padding-left:0.75rem;padding-right:0.75rem}.tooltip-l{padding:0.5rem 0.75rem;font-size:0.9375rem;line-height:1.25rem;font-weight:500}.tooltip-l.tooltip-round{padding-left:1rem;padding-right:1rem}";

let nextUniqueId = 0;
const CatTooltip$1 = /*@__PURE__*/ proxyCustomElement(class CatTooltip extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.id = `cat-tooltip-${nextUniqueId++}`;
        this.inactive = false;
        this.open = false;
        /**
         * The content of the tooltip.
         */
        this.content = '';
        /**
         * Specifies that the tooltip should be disabled. A disabled tooltip is unusable,
         * and invisible. Corresponds with the native HTML disabled attribute.
         */
        this.disabled = false;
        /**
         * The placement of the tooltip.
         */
        this.placement = 'top';
        /**
         * Use round tooltip edges.
         */
        this.round = false;
        /**
         * The size of the tooltip.
         */
        this.size = 'm';
        /**
         * The delay time for showing tooltip in ms.
         */
        this.showDelay = 250;
        /**
         * The delay time for hiding tooltip in ms.
         */
        this.hideDelay = 0;
        /**
         * The duration of tap to show the tooltip.
         */
        this.longTouchDuration = 1000;
        this.boundShowListener = this.showListener.bind(this);
        this.boundHideListener = this.hideListener.bind(this);
        this.boundWindowTouchStartListener = this.windowTouchStartListener.bind(this);
        this.boundTouchStartListener = this.touchStartListener.bind(this);
        this.boundTouchEndListener = this.touchEndListener.bind(this);
    }
    handleKeyDown({ key }) {
        key === 'Escape' && this.hideTooltip();
    }
    componentDidLoad() {
        const slot = this.hostElement.shadowRoot?.querySelector('slot');
        this.trigger = slot?.assignedElements?.()?.[0];
        if (this.trigger && !this.trigger.hasAttribute('aria-describedby')) {
            this.trigger.setAttribute('aria-describedby', this.id);
        }
        if (isTouchDevice) {
            window.addEventListener('touchstart', this.boundWindowTouchStartListener);
            this.trigger?.addEventListener('touchstart', this.boundTouchStartListener);
            this.trigger?.addEventListener('touchend', this.boundTouchEndListener);
        }
        else {
            this.trigger?.addEventListener('focusin', this.boundShowListener);
            this.trigger?.addEventListener('focusout', this.boundHideListener);
            this.trigger?.addEventListener('mouseenter', this.boundShowListener);
            this.trigger?.addEventListener('mouseleave', this.boundHideListener);
        }
    }
    componentWillRender() {
        this.inactive = this.disabled || (!this.content && !this.hostElement.querySelector('[slot="content"]'));
    }
    disconnectedCallback() {
        if (isTouchDevice) {
            window.removeEventListener('touchstart', this.boundWindowTouchStartListener);
            this.trigger?.removeEventListener('touchstart', this.boundTouchStartListener);
            this.trigger?.removeEventListener('touchend', this.boundTouchEndListener);
        }
        else {
            this.trigger?.removeEventListener('mouseenter', this.boundShowListener);
            this.trigger?.removeEventListener('mouseleave', this.boundHideListener);
            this.trigger?.removeEventListener('focusin', this.boundShowListener);
            this.trigger?.removeEventListener('focusout', this.boundHideListener);
        }
    }
    render() {
        return (h(Host, { key: '340e9ed5613717d88fc8dde858d16716d0d100e8' }, h("slot", { key: 'af044aaa5e320540463d1318ba8cf8ed1b02b7e4' }), h("div", { key: '117ed1ce275f03f879aa2f320d9c0b28bfc953bd', ref: el => (this.tooltip = el), id: this.id, role: "tooltip", "aria-hidden": !this.open, "aria-live": this.open ? 'polite' : 'off', class: {
                tooltip: true,
                'tooltip-hidden': this.inactive,
                'tooltip-round': this.round,
                [`tooltip-${this.size}`]: Boolean(this.size)
            } }, h("slot", { key: 'af0986e70f3d6ba0ad2f791cfa327ae9ebf768f5', name: "content" }, h("p", { key: 'bfcca7d936fa6e05719a88ace8bacf806b8f423b' }, this.content)))));
    }
    async update() {
        if (this.trigger && this.tooltip) {
            await computePosition(this.trigger, this.tooltip, {
                strategy: 'fixed',
                placement: this.placement,
                middleware: [
                    offset(CatTooltip.OFFSET),
                    flip({ fallbackAxisSideDirection: 'start' }),
                    shift({ padding: CatTooltip.SHIFT_PADDING })
                ]
            }).then(({ x, y }) => {
                if (this.tooltip) {
                    Object.assign(this.tooltip.style, {
                        left: `${Math.max(0, x)}px`,
                        top: `${y}px`
                    });
                }
            });
        }
    }
    showListener() {
        window.clearTimeout(this.hideTimeout);
        this.hideTimeout = undefined;
        if (!this.showTimeout) {
            this.showTimeout = window.setTimeout(() => {
                this.showTimeout = undefined;
                this.showTooltip();
            }, this.showDelay);
        }
    }
    hideListener() {
        window.clearTimeout(this.showTimeout);
        this.showTimeout = undefined;
        if (!this.hideTimeout) {
            this.hideTimeout = window.setTimeout(() => {
                this.hideTimeout = undefined;
                this.hideTooltip();
            }, this.hideDelay);
        }
    }
    touchStartListener(event) {
        event.stopPropagation();
        if (!this.touchTimeout) {
            this.touchTimeout = window.setTimeout(() => {
                this.touchTimeout = undefined;
                this.showTooltip();
            }, this.longTouchDuration);
        }
    }
    touchEndListener() {
        window.clearTimeout(this.touchTimeout);
        this.touchTimeout = undefined;
        this.hideTooltip();
    }
    windowTouchStartListener() {
        this.hideTooltip();
    }
    showTooltip() {
        if (this.trigger && this.tooltip) {
            this.cleanupFloatingUi = autoUpdate(this.trigger, this.tooltip, () => this.update());
        }
        if (!this.inactive) {
            this.open = true;
            this.tooltip?.classList.add('tooltip-show');
        }
    }
    hideTooltip() {
        this.open = false;
        this.tooltip?.classList.remove('tooltip-show');
        this.cleanupFloatingUi?.();
        this.cleanupFloatingUi = undefined;
    }
    get hostElement() { return this; }
    static get style() { return catTooltipCss; }
}, [1, "cat-tooltip", {
        "content": [1],
        "disabled": [4],
        "placement": [1],
        "round": [4],
        "size": [1],
        "showDelay": [2, "show-delay"],
        "hideDelay": [2, "hide-delay"],
        "longTouchDuration": [2, "long-touch-duration"],
        "open": [32]
    }, [[8, "keydown", "handleKeyDown"]]]);
CatTooltip$1.OFFSET = 4;
CatTooltip$1.SHIFT_PADDING = 4;
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-tooltip":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatTooltip$1);
            }
            break;
    } });
}

const CatTooltip = CatTooltip$1;
const defineCustomElement = defineCustomElement$1;

export { CatTooltip, defineCustomElement };
//# sourceMappingURL=cat-tooltip.js.map

//# sourceMappingURL=cat-tooltip.js.map