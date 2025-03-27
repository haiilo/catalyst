import { p as proxyCustomElement, H, d as createEvent, h, c as Host } from './p-DJz_AlH8.js';
import { i as isBreakpoint, M as MediaMatcher, B as Breakpoints } from './p-CGRE_AlP.js';
import { d as defineCustomElement$2 } from './p-tMJhdM6b.js';
import { d as defineCustomElement$1 } from './p-BWMxUNx3.js';

/**
 * Find the closest parent element matching the given selector while traversing
 * up the DOM tree (including Shadow DOM).
 */
function findClosest(selector, element) {
    if (element instanceof Element && element.matches(selector)) {
        return element;
    }
    // Search in parent element or Shadow DOM host
    const nextElement = element instanceof ShadowRoot ? element.host : element.parentElement || element.getRootNode().host;
    return nextElement ? findClosest(selector, nextElement) : null;
}

const catButtonCss = ":host{display:inline-block;max-width:100%;vertical-align:middle;-webkit-user-select:none;-ms-user-select:none;user-select:none;}:host([hidden]){display:none}:host([data-button-group=middle]),:host([data-button-group=last]){margin-left:-1px}.cat-button{position:relative;font:inherit;display:flex;align-items:center;justify-content:center;border:none;border-radius:var(--cat-border-radius-m, 0.25rem);text-decoration:none;width:100%;box-sizing:border-box;cursor:pointer;transition:color 125ms linear, border-color 125ms linear, background-color 125ms linear, box-shadow 125ms linear}.cat-button:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-button-content{display:flex;flex-direction:column;min-width:0}.cat-button-empty .cat-button-content{display:none}.cat-button-content-inner{word-wrap:break-word;word-break:break-word}.cat-button-ellipsed .cat-button-content-inner{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.cat-button-disabled{cursor:not-allowed}.cat-button-round{border-radius:10rem}.cat-button-loading{cursor:default}.cat-button-loading cat-spinner{position:absolute}.cat-button-loading>*:not(cat-spinner){visibility:hidden}.cat-button-group-first{border-top-right-radius:0;border-bottom-right-radius:0}.cat-button-group-middle{border-radius:0}.cat-button-group-last{border-top-left-radius:0;border-bottom-left-radius:0}.cat-button-group:hover{z-index:1}.cat-button-group:focus-visible{z-index:2}.cat-button-filled{background-color:rgb(var(--bg));color:rgb(var(--fill));font-weight:var(--cat-font-weight-button, 600);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:greyscale}.cat-button-filled.cat-button-disabled{--bg:242, 244, 247;--fill:var(--cat-font-color-muted, 81, 92, 108)}.cat-button-outlined{background-color:white;box-shadow:inset 0 0 0 1px color-mix(in srgb, rgb(var(--base)) 20%, #fff);color:rgb(var(--text))}.cat-button-outlined.cat-button-disabled{--base:var(--cat-font-color-muted, 81, 92, 108);--text:var(--cat-font-color-muted, 81, 92, 108)}.cat-button-outlined:hover:not(.cat-button-disabled):not(.cat-button-loading){background-color:color-mix(in srgb, rgb(var(--base)) 10%, #fff)}.cat-button-outlined.cat-button-active:not(.cat-button-disabled):not(.cat-button-loading){background-color:color-mix(in srgb, rgb(var(--base)) 10%, #fff)}.cat-button-outlined:active:not(.cat-button-disabled):not(.cat-button-loading){background-color:color-mix(in srgb, rgb(var(--base)) 10%, #fff)}.cat-button-text{background-color:transparent;color:rgb(var(--text));text-decoration:var(--cat-link-button-decoration, none)}.cat-button-text.cat-button-disabled{--text:var(--cat-font-color-muted, 81, 92, 108)}.cat-button-text:hover:not(.cat-button-disabled):not(.cat-button-loading){background-color:rgba(var(--base), 0.1)}.cat-button-text.cat-button-active:not(.cat-button-disabled):not(.cat-button-loading){background-color:rgba(var(--base), 0.1)}.cat-button-link{background-color:transparent;color:rgb(var(--text))}.cat-button-link.cat-button-disabled{--text:var(--cat-font-color-muted, 81, 92, 108)}.cat-button-link:hover:not(.cat-button-disabled):not(.cat-button-loading){text-decoration:var(--cat-link-decoration-hover, underline)}.cat-button-link.cat-button-active:not(.cat-button-disabled):not(.cat-button-loading){text-decoration:var(--cat-link-decoration-hover, underline)}.cat-button-primary{--bg:var(--cat-primary-bg, 0, 129, 148);--fill:var(--cat-primary-fill, 255, 255, 255);--text:var(--cat-primary-text, 0, 129, 148);--base:var(--cat-primary-text, 0, 129, 148)}.cat-button-primary:hover:not(.cat-button-disabled):not(.cat-button-loading){--bg:var(--cat-primary-bg-hover, 1, 115, 132);--fill:var(--cat-primary-fill-hover, 255, 255, 255);--text:var(--cat-primary-text-hover, 1, 115, 132)}.cat-button-primary.cat-button-active:not(.cat-button-disabled):not(.cat-button-loading),.cat-button-primary:active:not(.cat-button-disabled):not(.cat-button-loading){--bg:var(--cat-primary-bg-active, 2, 99, 113);--fill:var(--cat-primary-fill-active, 255, 255, 255);--text:var(--cat-primary-text-active, 2, 99, 113)}.cat-button-secondary{--bg:var(--cat-secondary-bg, 105, 118, 135);--fill:var(--cat-secondary-fill, 255, 255, 255);--text:var(--cat-secondary-text, 0, 0, 0);--base:var(--cat-secondary-bg, 105, 118, 135)}.cat-button-secondary:hover:not(.cat-button-disabled):not(.cat-button-loading){--bg:var(--cat-secondary-bg-hover, 105, 118, 135);--fill:var(--cat-secondary-fill-hover, 255, 255, 255);--text:var(--cat-secondary-text-hover, 0, 0, 0)}.cat-button-secondary.cat-button-active:not(.cat-button-disabled):not(.cat-button-loading),.cat-button-secondary:active:not(.cat-button-disabled):not(.cat-button-loading){--bg:var(--cat-secondary-bg-active, 105, 118, 135);--fill:var(--cat-secondary-fill-active, 255, 255, 255);--text:var(--cat-secondary-text-active, 0, 0, 0)}.cat-button-info{--bg:var(--cat-info-bg, 0, 115, 230);--fill:var(--cat-info-fill, 255, 255, 255);--text:var(--cat-info-text, 0, 115, 230);--base:var(--cat-info-text, 0, 115, 230)}.cat-button-info:hover:not(.cat-button-disabled):not(.cat-button-loading){--bg:var(--cat-info-bg-hover, 0, 107, 227);--fill:var(--cat-info-fill-hover, 255, 255, 255);--text:var(--cat-info-text-hover, 0, 107, 227)}.cat-button-info.cat-button-active:not(.cat-button-disabled):not(.cat-button-loading),.cat-button-info:active:not(.cat-button-disabled):not(.cat-button-loading){--bg:var(--cat-info-bg-active, 0, 96, 223);--fill:var(--cat-info-fill-active, 255, 255, 255);--text:var(--cat-info-text-active, 0, 96, 223)}.cat-button-success{--bg:var(--cat-success-bg, 0, 132, 88);--fill:var(--cat-success-fill, 255, 255, 255);--text:var(--cat-success-text, 0, 132, 88);--base:var(--cat-success-text, 0, 132, 88)}.cat-button-success:hover:not(.cat-button-disabled):not(.cat-button-loading){--bg:var(--cat-success-bg-hover, 0, 117, 78);--fill:var(--cat-success-fill-hover, 255, 255, 255);--text:var(--cat-success-text-hover, 0, 117, 78)}.cat-button-success.cat-button-active:not(.cat-button-disabled):not(.cat-button-loading),.cat-button-success:active:not(.cat-button-disabled):not(.cat-button-loading){--bg:var(--cat-success-bg-active, 0, 105, 70);--fill:var(--cat-success-fill-active, 255, 255, 255);--text:var(--cat-success-text-active, 0, 105, 70)}.cat-button-warning{--bg:var(--cat-warning-bg, 255, 206, 128);--fill:var(--cat-warning-fill, 0, 0, 0);--text:var(--cat-warning-text, 159, 97, 0);--base:var(--cat-warning-text, 159, 97, 0)}.cat-button-warning:hover:not(.cat-button-disabled):not(.cat-button-loading){--bg:var(--cat-warning-bg-hover, 255, 214, 148);--fill:var(--cat-warning-fill-hover, 0, 0, 0);--text:var(--cat-warning-text-hover, 159, 97, 0)}.cat-button-warning.cat-button-active:not(.cat-button-disabled):not(.cat-button-loading),.cat-button-warning:active:not(.cat-button-disabled):not(.cat-button-loading){--bg:var(--cat-warning-bg-active, 255, 222, 168);--fill:var(--cat-warning-fill-active, 0, 0, 0);--text:var(--cat-warning-text-active, 159, 97, 0)}.cat-button-danger{--bg:var(--cat-danger-bg, 217, 52, 13);--fill:var(--cat-danger-fill, 255, 255, 255);--text:var(--cat-danger-text, 217, 52, 13);--base:var(--cat-danger-text, 217, 52, 13)}.cat-button-danger:hover:not(.cat-button-disabled):not(.cat-button-loading){--bg:var(--cat-danger-bg-hover, 194, 46, 11);--fill:var(--cat-danger-fill-hover, 255, 255, 255);--text:var(--cat-danger-text-hover, 194, 46, 11)}.cat-button-danger.cat-button-active:not(.cat-button-disabled):not(.cat-button-loading),.cat-button-danger:active:not(.cat-button-disabled):not(.cat-button-loading){--bg:var(--cat-danger-bg-active, 174, 42, 10);--fill:var(--cat-danger-fill-active, 255, 255, 255);--text:var(--cat-danger-text-active, 174, 42, 10)}:host(.cat-button-pull:not([size])){margin:-0.625rem -0.75rem}:host(.cat-button-pull-h:not([size])){margin-left:-0.75rem;margin-right:-0.75rem}:host(.cat-button-pull-v:not([size])){margin-top:-0.625rem;margin-bottom:-0.625rem}:host(.cat-button-pull-t:not([size])){margin-top:-0.625rem}:host(.cat-button-pull-l:not([size])){margin-left:-0.75rem}:host(.cat-button-pull-b:not([size])){margin-bottom:-0.625rem}:host(.cat-button-pull-r:not([size])){margin-right:-0.75rem}.cat-button-xs{min-width:1.5rem;padding:0.1875rem 0.25rem;font-size:0.875rem;line-height:1.125rem;gap:0.25rem}.cat-button-xs.cat-button-icon{width:1.5rem;height:1.5rem;padding:0}:host(.cat-button-pull[size=xs]){margin:-0.1875rem -0.25rem}:host(.cat-button-pull-h[size=xs]){margin-left:-0.25rem;margin-right:-0.25rem}:host(.cat-button-pull-v[size=xs]){margin-top:-0.1875rem;margin-bottom:-0.1875rem}:host(.cat-button-pull-t[size=xs]){margin-top:-0.1875rem}:host(.cat-button-pull-l[size=xs]){margin-left:-0.25rem}:host(.cat-button-pull-b[size=xs]){margin-bottom:-0.1875rem}:host(.cat-button-pull-r[size=xs]){margin-right:-0.25rem}.cat-button-s{min-width:2rem;padding:0.375rem 0.5rem;font-size:0.9375rem;line-height:1.25rem;gap:0.25rem}.cat-button-s cat-icon{margin-top:-0.125rem;margin-bottom:-0.125rem}.cat-button-s.cat-button-icon{width:2rem;height:2rem;padding:0}:host(.cat-button-pull[size=s]){margin:-0.375rem -0.5rem}:host(.cat-button-pull-h[size=s]){margin-left:-0.5rem;margin-right:-0.5rem}:host(.cat-button-pull-v[size=s]){margin-top:-0.375rem;margin-bottom:-0.375rem}:host(.cat-button-pull-t[size=s]){margin-top:-0.375rem}:host(.cat-button-pull-l[size=s]){margin-left:-0.5rem}:host(.cat-button-pull-b[size=s]){margin-bottom:-0.375rem}:host(.cat-button-pull-r[size=s]){margin-right:-0.5rem}.cat-button-m{min-width:2.5rem;padding:0.625rem 0.75rem;font-size:0.9375rem;line-height:1.25rem;gap:0.25rem}.cat-button-m cat-icon{margin-top:-0.125rem;margin-bottom:-0.125rem}.cat-button-m.cat-button-icon{width:2.5rem;height:2.5rem;padding:0}:host(.cat-button-pull[size=m]){margin:-0.625rem -0.75rem}:host(.cat-button-pull-h[size=m]){margin-left:-0.75rem;margin-right:-0.75rem}:host(.cat-button-pull-v[size=m]){margin-top:-0.625rem;margin-bottom:-0.625rem}:host(.cat-button-pull-t[size=m]){margin-top:-0.625rem}:host(.cat-button-pull-l[size=m]){margin-left:-0.75rem}:host(.cat-button-pull-b[size=m]){margin-bottom:-0.625rem}:host(.cat-button-pull-r[size=m]){margin-right:-0.75rem}.cat-button-l{min-width:3rem;padding:0.875rem 1rem;font-size:0.9375rem;line-height:1.25rem;gap:0.5rem}.cat-button-l cat-icon{margin-top:-0.125rem;margin-bottom:-0.125rem}.cat-button-l.cat-button-icon{width:3rem;height:3rem;padding:0}:host(.cat-button-pull[size=l]){margin:-0.875rem -1rem}:host(.cat-button-pull-h[size=l]){margin-left:-1rem;margin-right:-1rem}:host(.cat-button-pull-v[size=l]){margin-top:-0.875rem;margin-bottom:-0.875rem}:host(.cat-button-pull-t[size=l]){margin-top:-0.875rem}:host(.cat-button-pull-l[size=l]){margin-left:-1rem}:host(.cat-button-pull-b[size=l]){margin-bottom:-0.875rem}:host(.cat-button-pull-r[size=l]){margin-right:-1rem}.cat-button-xl{min-width:3.5rem;padding:1rem 1.25rem;font-size:1.125rem;line-height:1.5rem;gap:0.75rem}.cat-button-xl.cat-button-icon{width:3.5rem;height:3.5rem;padding:0}:host(.cat-button-pull[size=xl]){margin:-1rem -1.25rem}:host(.cat-button-pull-h[size=xl]){margin-left:-1.25rem;margin-right:-1.25rem}:host(.cat-button-pull-v[size=xl]){margin-top:-1rem;margin-bottom:-1rem}:host(.cat-button-pull-t[size=xl]){margin-top:-1rem}:host(.cat-button-pull-l[size=xl]){margin-left:-1.25rem}:host(.cat-button-pull-b[size=xl]){margin-bottom:-1rem}:host(.cat-button-pull-r[size=xl]){margin-right:-1.25rem}:host(.cat-tab)::part(button){padding:1.125rem 0.75rem;--cat-secondary-bg:transparent;--cat-primary-text:transparent;--cat-danger-text:transparent}:host(.cat-tab)::part(content)::before{content:attr(data-text);content:attr(data-text)/\"\";height:0;visibility:hidden;overflow:hidden;user-select:none;pointer-events:none;font-weight:700}:host(.cat-text-left) .cat-button{justify-content:left;text-align:left}:host(.cat-text-right) .cat-button{justify-content:right;text-align:right}:host(.cat-nav-item){width:100%}:host(.cat-nav-item) .cat-button{box-shadow:none;justify-content:left;gap:0.5rem}:host(.cat-nav-item) .cat-button:focus-visible{outline-offset:-2px}:host(.cat-time-format) .cat-button{border-radius:0}:host(.cat-date-toggle) .cat-button,:host(.cat-time-toggle) .cat-button{margin-left:-1px;border-top-left-radius:0;border-bottom-left-radius:0}:host(.cat-date-item) .cat-button:hover,:host(.cat-date-toggle) .cat-button:hover,:host(.cat-time-format) .cat-button:hover,:host(.cat-time-toggle) .cat-button:hover{z-index:1}:host(.cat-date-item) .cat-button:focus-visible,:host(.cat-date-toggle) .cat-button:focus-visible,:host(.cat-time-format) .cat-button:focus-visible,:host(.cat-time-toggle) .cat-button:focus-visible{z-index:2}:host(.cat-date-item) .cat-button{padding:0;min-width:2rem;max-height:3rem;aspect-ratio:1}:host(.date-start:not(.date-end)) .cat-button{border-top-right-radius:0;border-bottom-right-radius:0}:host(.date-end:not(.date-start)) .cat-button{border-top-left-radius:0;border-bottom-left-radius:0}";

const CatButton = /*@__PURE__*/ proxyCustomElement(class CatButton extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catClick = createEvent(this, "catClick");
        this.catFocus = createEvent(this, "catFocus");
        this.catBlur = createEvent(this, "catBlur");
        this._iconOnly = true;
        this.hasSlottedContent = false;
        /**
         * The rendering style of the button.
         */
        this.variant = 'outlined';
        /**
         * The color palette of the button.
         */
        this.color = 'secondary';
        /**
         * Set the button into an active state.
         */
        this.active = false;
        /**
         * The size of the button.
         */
        this.size = 'm';
        /**
         * Specifies that the button should be disabled. A disabled button is unusable
         * and un-clickable. Corresponds with the native HTML disabled attribute.
         */
        this.disabled = false;
        /**
         * Displays the button in a loading state with a spinner. Just like a disabled
         * button, an inactive button is unusable and un-clickable. However, it
         * retains the current focus state.
         */
        this.loading = false;
        /**
         * Allows the button to submit a form.
         */
        this.submit = false;
        /**
         * Disables ellipse overflowing button content.
         */
        this.noEllipsis = false;
        /**
         * Use round button edges.
         */
        this.round = false;
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
    componentWillRender() {
        this.hasSlottedContent = this.hostElement.hasChildNodes();
    }
    haltDisabledEvents(event) {
        if (this.disabled || this.loading) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
        else if (this.submit) {
            const form = findClosest('form', this.hostElement);
            if (form && form instanceof HTMLFormElement) {
                // we can't provide a submitter as it is hidden in the shadow DOM
                form.requestSubmit();
            }
        }
    }
    /**
     * Programmatically move focus to the button. Use this method instead of
     * `button.focus()`.
     *
     * @param options An optional object providing options to control aspects of
     * the focusing process.
     */
    async doFocus(options) {
        this.button.focus(options);
    }
    /**
     * Programmatically remove focus from the button. Use this method instead of
     * `button.blur()`.
     */
    async doBlur() {
        this.button.blur();
    }
    /**
     * Programmatically simulate a click on the button.
     */
    async doClick() {
        this.button.click();
    }
    render() {
        this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
        if (this.url) {
            return (h(Host, { "data-button-group": this.buttonGroupPosition }, h("a", { "data-test": this.testId, ...this.nativeAttributes, ref: el => (this.button = el), href: this.disabled ? undefined : this.url, target: this.urlTarget, "aria-disabled": this.disabled ? 'true' : null, "aria-label": this.a11yLabel, "aria-current": this.a11yCurrent, id: this.buttonId, part: "button", class: {
                    'cat-button': true,
                    'cat-button-empty': !this.hasSlottedContent,
                    'cat-button-active': this.active,
                    'cat-button-icon': this.isIconButton,
                    'cat-button-round': this.round,
                    'cat-button-loading': this.loading,
                    'cat-button-disabled': this.disabled,
                    'cat-button-ellipsed': !this.noEllipsis && !this.isIconButton,
                    [`cat-button-${this.variant}`]: Boolean(this.variant),
                    [`cat-button-${this.color}`]: Boolean(this.color),
                    [`cat-button-${this.size}`]: Boolean(this.size),
                    [`cat-button-group-${this.buttonGroupPosition}`]: Boolean(this.buttonGroupPosition)
                }, onClick: this.onClick.bind(this), onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this) }, this.content)));
        }
        else {
            return (h(Host, { "data-button-group": this.buttonGroupPosition }, h("button", { "data-test": this.testId, ...this.nativeAttributes, ref: el => (this.button = el), type: this.submit ? 'submit' : 'button', name: this.name, value: this.value, disabled: this.disabled, "aria-disabled": this.disabled ? 'true' : null, "aria-label": this.a11yLabel, "aria-current": this.a11yCurrent, id: this.buttonId, part: "button", class: {
                    'cat-button': true,
                    'cat-button-empty': !this.hasSlottedContent,
                    'cat-button-active': this.active,
                    'cat-button-icon': this.isIconButton,
                    'cat-button-round': this.round ?? this.isIconButton,
                    'cat-button-loading': this.loading,
                    'cat-button-disabled': this.disabled,
                    'cat-button-ellipsed': !this.noEllipsis && !this.isIconButton,
                    [`cat-button-${this.variant}`]: Boolean(this.variant),
                    [`cat-button-${this.color}`]: Boolean(this.color),
                    [`cat-button-${this.size}`]: Boolean(this.size),
                    [`cat-button-group-${this.buttonGroupPosition}`]: Boolean(this.buttonGroupPosition)
                }, onClick: this.onClick.bind(this), onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this) }, this.content)));
        }
    }
    get iconSize() {
        switch (this.size) {
            case 'xs':
                return 's';
            default:
                return 'l';
        }
    }
    get spinnerSize() {
        switch (this.size) {
            case 'xs':
                return 'xs';
            default:
                return 'm';
        }
    }
    get isIconButton() {
        return Boolean(this.icon) && this._iconOnly;
    }
    get hasPrefixIcon() {
        return Boolean(this.icon) && !this._iconOnly && !this.iconRight;
    }
    get hasSuffixIcon() {
        return Boolean(this.icon) && !this._iconOnly && this.iconRight;
    }
    get content() {
        return [
            this.hasPrefixIcon ? h("cat-icon", { icon: this.icon, size: this.iconSize, part: "prefix" }) : null,
            this.isIconButton ? (h("cat-icon", { icon: this.icon, size: this.iconSize })) : (h("span", { class: "cat-button-content", part: "content", ...this.nativeContentAttributes }, h("span", { class: "cat-button-content-inner" }, h("slot", null)))),
            this.hasSuffixIcon ? h("cat-icon", { icon: this.icon, size: this.iconSize, part: "suffix" }) : null,
            this.loading ? h("cat-spinner", { size: this.spinnerSize }) : null
        ];
    }
    onClick(event) {
        this.catClick.emit(event);
    }
    onFocus(event) {
        this.catFocus.emit(event);
    }
    onBlur(event) {
        this.catBlur.emit(event);
    }
    static get delegatesFocus() { return true; }
    get hostElement() { return this; }
    static get watchers() { return {
        "iconOnly": ["onIconOnlyChanged"]
    }; }
    static get style() { return catButtonCss; }
}, [17, "cat-button", {
        "variant": [1],
        "color": [1],
        "active": [4],
        "size": [1],
        "name": [1],
        "value": [1],
        "disabled": [4],
        "loading": [4],
        "submit": [4],
        "noEllipsis": [4, "no-ellipsis"],
        "round": [4],
        "url": [1],
        "urlTarget": [1, "url-target"],
        "icon": [1],
        "iconOnly": [8, "icon-only"],
        "iconRight": [4, "icon-right"],
        "buttonId": [1, "button-id"],
        "a11yLabel": [1, "a11y-label"],
        "a11yCurrent": [1, "a11y-current"],
        "nativeAttributes": [16],
        "nativeContentAttributes": [16],
        "testId": [1, "test-id"],
        "buttonGroupPosition": [1, "button-group-position"],
        "_iconOnly": [32],
        "hasSlottedContent": [32],
        "doFocus": [64],
        "doBlur": [64],
        "doClick": [64]
    }, [[0, "click", "haltDisabledEvents"]], {
        "iconOnly": ["onIconOnlyChanged"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-button", "cat-icon", "cat-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-button":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatButton);
            }
            break;
        case "cat-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "cat-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { CatButton as C, defineCustomElement as d, findClosest as f };
//# sourceMappingURL=p-BAS0o037.js.map

//# sourceMappingURL=p-BAS0o037.js.map