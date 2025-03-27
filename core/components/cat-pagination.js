import { p as proxyCustomElement, H, d as createEvent, h } from './p-DJz_AlH8.js';
import { c as catI18nRegistry } from './p-DYxciDq0.js';
import { d as defineCustomElement$4 } from './p-BAS0o037.js';
import { d as defineCustomElement$3 } from './p-tMJhdM6b.js';
import { d as defineCustomElement$2 } from './p-BWMxUNx3.js';

const catPaginationCss = ":host{display:inline-block}:host([hidden]){display:none}ol{display:flex;flex-wrap:wrap;list-style:none;margin:0;padding:0}li{display:inline-flex;justify-content:center}li.dots{-webkit-user-select:none;-ms-user-select:none;user-select:none;}:host([variant=outlined]) ol{gap:0.75rem}.cat-pagination-xs li.dots,.cat-pagination-xs li.text{height:1.5rem;line-height:1.5rem;font-size:0.875rem}.cat-pagination-xs li.dots{width:1.5rem}:host([variant=outlined]) .cat-pagination-xs{gap:0.375rem}.cat-pagination-s li.dots,.cat-pagination-s li.text{height:2rem;line-height:2rem;font-size:0.9375rem}.cat-pagination-s li.dots{width:2rem}:host([variant=outlined]) .cat-pagination-s{gap:0.5rem}.cat-pagination-m li.dots,.cat-pagination-m li.text{height:2.5rem;line-height:2.5rem;font-size:0.9375rem}.cat-pagination-m li.dots{width:2.5rem}:host([variant=outlined]) .cat-pagination-m{gap:0.625rem}.cat-pagination-l li.dots,.cat-pagination-l li.text{height:3rem;line-height:3rem;font-size:0.9375rem}.cat-pagination-l li.dots{width:3rem}:host([variant=outlined]) .cat-pagination-l{gap:0.75rem}.cat-pagination-xl li.dots,.cat-pagination-xl li.text{height:3.5rem;line-height:3.5rem;font-size:1.125rem}.cat-pagination-xl li.dots{width:3.5rem}:host([variant=outlined]) .cat-pagination-xl{gap:0.875rem}";

const CatPagination$1 = /*@__PURE__*/ proxyCustomElement(class CatPagination extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catChange = createEvent(this, "catChange");
        /**
         * The current page.
         */
        this.page = 0;
        /**
         * The total number of pages.
         */
        this.pageCount = 1;
        /**
         * The number of pages to be shown around the current page.
         */
        this.activePadding = 1;
        /**
         * The number of pages to be shown at the edges.
         */
        this.sidePadding = 1;
        /**
         * The size of the buttons.
         */
        this.size = 'm';
        /**
         * The rendering style of the buttons.
         */
        this.variant = 'text';
        /**
         * Use round button edges.
         */
        this.round = false;
        /**
         * Use compact pagination mode.
         */
        this.compact = false;
        /**
         * The icon of the "previous" button.
         */
        this.iconPrev = '$cat:pagination-left';
        /**
         * The icon of the "next" button.
         */
        this.iconNext = '$cat:pagination-right';
    }
    render() {
        this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
        return (h("nav", { key: 'ed5098e1578e2157e0f5b8c539f313e2892c5f05', role: "navigation" }, h("ol", { key: '6f63a5c0a79722913dafbf1b6391ab586a20695a', class: {
                [`cat-pagination-${this.size}`]: Boolean(this.size)
            } }, h("li", { key: '0dd989fa017490749141ab2029546b115a34ce27' }, h("cat-button", { key: '8614e9e1ebfc2ff3aeda2cec8be07aeff6e592eb', variant: this.variant, size: this.size, round: this.round, disabled: this.isFirst, a11yLabel: catI18nRegistry.t('pagination.prev'), icon: this.iconPrev, iconOnly: true, onClick: () => this.setPage(this.page - 1) })), this.content, h("li", { key: 'b864788a70e125ae93a34e705522e537b359a12a' }, h("cat-button", { key: '93f6d89967b6f6b93b733fbcb628cf4a3663dbf0', variant: this.variant, size: this.size, round: this.round, disabled: this.isLast, a11yLabel: catI18nRegistry.t('pagination.next'), icon: this.iconNext, iconOnly: true, onClick: () => this.setPage(this.page + 1) })))));
    }
    get isFirst() {
        return this.page === 0;
    }
    get isLast() {
        return this.page === this.pageCount - 1;
    }
    setPage(value) {
        this.page = value;
        this.catChange.emit(this.page);
    }
    get pages() {
        if (!this.sidePadding && !this.activePadding) {
            return [this.page];
        }
        const result = new Set();
        const minPage = this.page <= this.sidePadding + this.activePadding + 1;
        const minActivepage = minPage ? this.sidePadding + 2 * this.activePadding + 2 : this.sidePadding;
        const maxPage = this.page >= this.pageCount - this.sidePadding - this.activePadding - 2;
        const maxActivepage = maxPage
            ? this.pageCount - this.sidePadding - 2 * this.activePadding - 2
            : this.pageCount - this.sidePadding;
        this.addSeq(result, 0, minActivepage);
        if (!minPage && !maxPage) {
            this.addSeq(result, this.page - this.activePadding, this.page + this.activePadding + 1);
        }
        this.addSeq(result, maxActivepage, this.pageCount);
        return [...result];
    }
    addSeq(set, start, end) {
        const _start = this.clamp(start, 0, this.pageCount);
        const _end = this.clamp(end, 0, this.pageCount);
        Array(_end - _start)
            .fill(0)
            .forEach((_, i) => set.add(_start + i));
    }
    clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
    get content() {
        if (this.compact) {
            return (h("li", { class: "text" }, this.page + 1, "/", this.pageCount));
        }
        return this.pages.map((page, i) => [
            i > 0 && this.pages[i - 1] !== page - 1 ? h("li", { class: "dots" }, "\u2026") : null,
            h("li", null, h("cat-button", { variant: this.variant, size: this.size, round: this.round, color: this.page === page ? 'primary' : undefined, active: this.page === page, a11yLabel: catI18nRegistry.t('pagination.page', { page: page + 1 }), a11yCurrent: this.page === page ? 'step' : undefined, onClick: () => this.setPage(page) }, page + 1))
        ]);
    }
    static get delegatesFocus() { return true; }
    get hostElement() { return this; }
    static get style() { return catPaginationCss; }
}, [17, "cat-pagination", {
        "page": [1026],
        "pageCount": [2, "page-count"],
        "activePadding": [2, "active-padding"],
        "sidePadding": [2, "side-padding"],
        "size": [1],
        "variant": [1],
        "round": [4],
        "compact": [4],
        "iconPrev": [1, "icon-prev"],
        "iconNext": [1, "icon-next"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-pagination", "cat-button", "cat-icon", "cat-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-pagination":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatPagination$1);
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

const CatPagination = CatPagination$1;
const defineCustomElement = defineCustomElement$1;

export { CatPagination, defineCustomElement };
//# sourceMappingURL=cat-pagination.js.map

//# sourceMappingURL=cat-pagination.js.map