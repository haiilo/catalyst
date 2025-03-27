import { p as proxyCustomElement, H, h } from './p-DJz_AlH8.js';
import { d as defineCustomElement$1 } from './p-tMJhdM6b.js';

/**
 * Loads an image and wraps the result in a promise.
 *
 * @param src the image URL
 * @returns a promise
 */
const loadImg = (src) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', resolve);
        image.addEventListener('error', reject);
        image.src = src;
    });
};

const catAvatarCss = ":host{display:contents}:host([hidden]){display:none}.avatar{flex:none;display:inline-flex;align-items:center;justify-content:center;border-radius:var(--cat-border-radius-m, 0.25rem);text-decoration:inherit;color:var(--cat-avatar-fill, #515c6c);background-color:var(--cat-avatar-bg, #f2f4f7);background-size:cover;background-position:center;white-space:nowrap;overflow:hidden;vertical-align:middle;font-weight:600;-webkit-user-select:none;-ms-user-select:none;user-select:none;}.avatar:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.avatar-round{border-radius:50%}.avatar-xs{width:var(--cat-avatar-size, 1.5rem);height:var(--cat-avatar-size, 1.5rem);line-height:var(--cat-avatar-size, 1.5rem);font-size:var(--cat-avatar-font-size, 0.75rem)}.avatar-s{width:var(--cat-avatar-size, 2rem);height:var(--cat-avatar-size, 2rem);line-height:var(--cat-avatar-size, 2rem);font-size:var(--cat-avatar-font-size, 0.875rem)}.avatar-m{width:var(--cat-avatar-size, 2.5rem);height:var(--cat-avatar-size, 2.5rem);line-height:var(--cat-avatar-size, 2.5rem);font-size:var(--cat-avatar-font-size, 0.9375rem)}.avatar-l{width:var(--cat-avatar-size, 3rem);height:var(--cat-avatar-size, 3rem);line-height:var(--cat-avatar-size, 3rem);font-size:var(--cat-avatar-font-size, 1.125rem)}.avatar-xl{width:var(--cat-avatar-size, 3.5rem);height:var(--cat-avatar-size, 3.5rem);line-height:var(--cat-avatar-size, 3.5rem);font-size:var(--cat-avatar-font-size, 1.25rem)}";

const CatAvatar = /*@__PURE__*/ proxyCustomElement(class CatAvatar extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /**
         * The size of the avatar.
         */
        this.size = 'm';
        /**
         * Use round avatar edges.
         */
        this.round = false;
        /**
         * The label of the avatar.
         */
        this.label = '';
    }
    onSrcChanged(value) {
        if (value) {
            loadImg(value).then(() => (this.backgroundImage = `url(${value})`), () => (this.backgroundImage = undefined));
        }
        else {
            this.backgroundImage = undefined;
        }
    }
    componentWillLoad() {
        this.onSrcChanged(this.src);
    }
    render() {
        if (this.url) {
            this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
            return (h("a", { href: this.url, target: this.urlTarget, style: this.cssStyle, class: this.cssClass, "aria-label": this.label }, this.content));
        }
        else {
            return (h("span", { style: this.cssStyle, class: this.cssClass, "aria-label": this.label }, this.content));
        }
    }
    get content() {
        return !this.backgroundImage
            ? [this.icon ? h("cat-icon", { icon: this.icon, size: this.size }) : this.getInitials()]
            : [];
    }
    get cssStyle() {
        return { 'background-image': this.backgroundImage };
    }
    get cssClass() {
        return {
            avatar: true,
            'avatar-round': this.round,
            [`avatar-${this.size}`]: Boolean(this.size)
        };
    }
    getInitials() {
        return (this.initials ??
            (this.label ?? '')
                .split(' ')
                .map(n => n[0])
                .join(''));
    }
    static get delegatesFocus() { return true; }
    get hostElement() { return this; }
    static get watchers() { return {
        "src": ["onSrcChanged"]
    }; }
    static get style() { return catAvatarCss; }
}, [17, "cat-avatar", {
        "size": [1],
        "round": [4],
        "label": [1],
        "initials": [1],
        "src": [1],
        "icon": [1],
        "url": [1],
        "urlTarget": [1, "url-target"],
        "backgroundImage": [32]
    }, undefined, {
        "src": ["onSrcChanged"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-avatar", "cat-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-avatar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatAvatar);
            }
            break;
        case "cat-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { CatAvatar as C, defineCustomElement as d };
//# sourceMappingURL=p-Ceq_H4Q6.js.map

//# sourceMappingURL=p-Ceq_H4Q6.js.map