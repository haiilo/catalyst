import { p as proxyCustomElement, H, h } from './p-DJz_AlH8.js';

const catSpinnerCss = ":host{display:inline-flex;vertical-align:middle;-webkit-user-select:none;-ms-user-select:none;user-select:none;}:host[hidden]{display:none}span{display:inline-flex}svg{fill:none;stroke:currentColor;stroke-dasharray:135px;stroke-dashoffset:95px;stroke-linecap:round;stroke-width:5px;transform-origin:center center;animation:spin 0.75s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite;width:1em;height:1em}.spinner-xs svg{font-size:0.75rem}.spinner-s svg{font-size:1rem}.spinner-m svg{font-size:1.25rem}.spinner-l svg{font-size:1.5rem}.spinner-xl svg{font-size:1.75rem}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}";

const CatSpinner = /*@__PURE__*/ proxyCustomElement(class CatSpinner extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /**
         * The size of the spinner.
         */
        this.size = 'm';
        /**
         * Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow.
         */
        this.value = 0;
    }
    render() {
        return (h("span", { key: '8922d0ec7f5474084a39a8b3a4620bee426cea78', role: "progressbar", tabindex: "-1", "aria-label": this.a11yLabel, "aria-hidden": this.a11yLabel ? null : 'true', "aria-valuenow": this.value, "aria-valuemin": "0", "aria-valuemax": "100", class: {
                [`spinner-${this.size}`]: this.size !== 'inline'
            } }, h("svg", { key: '6a649c21b27b3dbad3c73a71936566e7e9648254', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48" }, h("circle", { key: '3fb75a339ec6e18d0209e9da2cbf650f2dae4420', cx: "24", cy: "24", r: "21.5" }))));
    }
    static get style() { return catSpinnerCss; }
}, [1, "cat-spinner", {
        "size": [1],
        "a11yLabel": [1, "a11y-label"],
        "value": [2]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-spinner":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatSpinner);
            }
            break;
    } });
}

export { CatSpinner as C, defineCustomElement as d };
//# sourceMappingURL=p-BWMxUNx3.js.map

//# sourceMappingURL=p-BWMxUNx3.js.map