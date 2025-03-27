import { p as proxyCustomElement, H, h, c as Host } from './p-DJz_AlH8.js';

const catSkeletonCss = ":host{display:flex;flex-direction:column;position:relative;--background:#ebecf0;--highlight:#d7dbe0;--speed:2s}:host([variant=square]),:host([variant=circle]){display:inline-flex}:host([hidden]){display:none}:host([variant=head]:not(:last-child)){margin-bottom:1rem}:host([variant=body]:not(:last-child)){margin-bottom:2rem}.skeleton{display:block;border-radius:var(--cat-border-radius-m, 0.25rem);background:var(--background)}.skeleton-circle{border-radius:10rem}.skeleton-xs.skeleton-rectangle{width:var(--width, 100%);height:var(--height, 1.5rem)}.skeleton-xs.skeleton-square,.skeleton-xs.skeleton-circle{width:var(--width, 1.5rem);height:var(--height, 1.5rem)}.skeleton-xs.skeleton-head,.skeleton-xs.skeleton-body{width:var(--width, var(--line-width, 100%))}.skeleton-xs.skeleton-head{height:calc(0.9375rem - 4px);margin:calc((1.25rem - 0.9375rem + 4px) * 0.5) 0}.skeleton-xs.skeleton-body{height:calc(0.75rem - 4px);margin:calc((1rem - 0.75rem + 4px) * 0.5) 0}.skeleton-s.skeleton-rectangle{width:var(--width, 100%);height:var(--height, 2rem)}.skeleton-s.skeleton-square,.skeleton-s.skeleton-circle{width:var(--width, 2rem);height:var(--height, 2rem)}.skeleton-s.skeleton-head,.skeleton-s.skeleton-body{width:var(--width, var(--line-width, 100%))}.skeleton-s.skeleton-head{height:calc(1.125rem - 4px);margin:calc((1.5rem - 1.125rem + 4px) * 0.5) 0}.skeleton-s.skeleton-body{height:calc(0.875rem - 4px);margin:calc((1.125rem - 0.875rem + 4px) * 0.5) 0}.skeleton-m.skeleton-rectangle{width:var(--width, 100%);height:var(--height, 2.5rem)}.skeleton-m.skeleton-square,.skeleton-m.skeleton-circle{width:var(--width, 2.5rem);height:var(--height, 2.5rem)}.skeleton-m.skeleton-head,.skeleton-m.skeleton-body{width:var(--width, var(--line-width, 100%))}.skeleton-m.skeleton-head{height:calc(1.25rem - 4px);margin:calc((1.5rem - 1.25rem + 4px) * 0.5) 0}.skeleton-m.skeleton-body{height:calc(0.9375rem - 4px);margin:calc((1.25rem - 0.9375rem + 4px) * 0.5) 0}.skeleton-l.skeleton-rectangle{width:var(--width, 100%);height:var(--height, 3rem)}.skeleton-l.skeleton-square,.skeleton-l.skeleton-circle{width:var(--width, 3rem);height:var(--height, 3rem)}.skeleton-l.skeleton-head,.skeleton-l.skeleton-body{width:var(--width, var(--line-width, 100%))}.skeleton-l.skeleton-head{height:calc(1.5rem - 4px);margin:calc((1.75rem - 1.5rem + 4px) * 0.5) 0}.skeleton-l.skeleton-body{height:calc(1.125rem - 4px);margin:calc((1.5rem - 1.125rem + 4px) * 0.5) 0}.skeleton-xl.skeleton-rectangle{width:var(--width, 100%);height:var(--height, 3.5rem)}.skeleton-xl.skeleton-square,.skeleton-xl.skeleton-circle{width:var(--width, 3.5rem);height:var(--height, 3.5rem)}.skeleton-xl.skeleton-head,.skeleton-xl.skeleton-body{width:var(--width, var(--line-width, 100%))}.skeleton-xl.skeleton-head{height:calc(1.75rem - 4px);margin:calc((2rem - 1.75rem + 4px) * 0.5) 0}.skeleton-xl.skeleton-body{height:calc(1.25rem - 4px);margin:calc((1.5rem - 1.25rem + 4px) * 0.5) 0}.skeleton-sheen{background:linear-gradient(90deg, var(--background) 33%, var(--highlight) 50%, var(--background) 66%) var(--background);background-size:300% 100%;animation:sheen var(--speed) ease-in-out infinite}.skeleton-pulse{position:relative;overflow:hidden}.skeleton-pulse::before{content:\"\";display:block;position:absolute;width:100%;height:100%;background-color:var(--highlight);animation:var(--speed) ease-in-out 0.5s infinite normal none running pulse;opacity:0}@keyframes sheen{0%{background-position:right}}@keyframes pulse{50%{opacity:1}}";

const CatSkeleton = /*@__PURE__*/ proxyCustomElement(class CatSkeleton extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /**
         * The animation style of the skeleton.
         */
        this.effect = 'sheen';
        /**
         * The rendering style of the skeleton.
         */
        this.variant = 'rectangle';
        /**
         * The size of the skeleton. If the variant is set to "head", the size values
         * "xs" to "xl" translate to the head levels `h1` to `h5`.
         */
        this.size = 'm';
    }
    render() {
        return (h(Host, { key: '95992890ce7b8c90068af979179fe6e512cd599c' }, Array.from(Array(this.count)).map(() => (h("div", { style: this.style, class: {
                skeleton: true,
                [`skeleton-${this.effect}`]: Boolean(this.effect),
                [`skeleton-${this.variant}`]: Boolean(this.variant),
                [`skeleton-${this.size}`]: Boolean(this.size)
            } })))));
    }
    get count() {
        switch (this.variant) {
            case 'head':
                return Math.max(1, this.lines || 1);
            case 'body':
                return Math.max(1, this.lines || 3);
            default:
                return 1;
        }
    }
    get style() {
        return this.variant === 'head' || this.variant === 'body'
            ? {
                '--line-width': `${this.random(50, 100)}%`
            }
            : undefined;
    }
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static get style() { return catSkeletonCss; }
}, [1, "cat-skeleton", {
        "effect": [1],
        "variant": [1],
        "size": [1],
        "lines": [2]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-skeleton"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-skeleton":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatSkeleton);
            }
            break;
    } });
}

export { CatSkeleton as C, defineCustomElement as d };
//# sourceMappingURL=p-DItsaqDw.js.map

//# sourceMappingURL=p-DItsaqDw.js.map