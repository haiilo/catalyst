import { l as log } from './p-CFH-AGT6.js';

/**
 * A registry for lightweight internationalization (i18n) in applications using
 * the Catalyst design system. The registry stores translations and provides
 * methods for setting the locale, registering translations, and retrieving
 * translated messages.
 */
class CatI18nRegistry {
    constructor() {
        // hide constructor
        this.id = (Math.random() + 1).toString(36).substring(2);
        this.i18n = new Map();
        // In rare cases, the registry can be initialized twice. This can happen in
        // a micro frontend architecture where the registry is initialized in the
        // host application and in the micro frontend. To prevent the registry in
        // one application from overwriting the registry in the other, we listen for
        // events that are dispatched when messages are added or removed in other
        // applications and add or remove messages if the event was not dispatched
        // by this registry.
        window.addEventListener('cat-i18n-setLocale', event => {
            const { detail } = event || {};
            if (detail && detail.id !== this.id) {
                this.setLocale(detail.locale, true);
            }
        });
        window.addEventListener('cat-i18n-set', event => {
            const { detail } = event || {};
            if (detail && detail.id !== this.id) {
                this.set(detail.i18n, true);
            }
        });
        window.addEventListener('cat-i18n-clear', event => {
            const { detail } = event || {};
            if (detail && detail.id !== this.id) {
                this.clear(true);
            }
        });
    }
    static getInstance() {
        if (!CatI18nRegistry.instance) {
            CatI18nRegistry.instance = new CatI18nRegistry();
        }
        return CatI18nRegistry.instance;
    }
    getLocale() {
        return this._locale ?? window?.navigator?.language ?? 'en';
    }
    setLocale(locale, silent = false) {
        try {
            this._locale = Intl.getCanonicalLocales(locale)[0];
            log.info(`[CatI18nRegistry::${this.id}] Set locale: ${this._locale}`);
            !silent && window.dispatchEvent(this.buildEvent('cat-i18n-setLocale', { locale, id: this.id }));
        }
        catch (err) {
            log.error(`[CatI18nRegistry::${this.id}] Invalid locale: ${locale}`);
        }
    }
    set(i18n, silent = false) {
        if (typeof i18n === 'function') {
            this._translator = i18n;
            log.info(`[CatI18nRegistry::${this.id}] Registered translator`);
        }
        else {
            const i18nEntries = Object.entries(i18n);
            i18nEntries.forEach(([key, message]) => this.i18n.set(key, message));
            log.info(`[CatI18nRegistry::${this.id}] Registered ${i18nEntries.length !== 1 ? 'messages' : 'message'}`);
        }
        !silent && window.dispatchEvent(this.buildEvent('cat-i18n-set', { i18n, id: this.id }));
    }
    clear(silent = false) {
        this.i18n.clear();
        log.info(`[CatI18nRegistry::${this.id}] Cleared messages`);
        !silent && window.dispatchEvent(this.buildEvent('cat-i18n-clear'));
    }
    t(key, params) {
        const message = this._translator?.(key, params) ??
            this.i18n.get(key)?.replace(/{{\s*([-a-zA-Z._]+)\s*}}/g, (_match, key) => `${params?.[key] ?? ''}`);
        if (message === undefined) {
            log.error(`[CatI18nRegistry::${this.id}] Unknown message key: ${key}`);
            return key;
        }
        return message;
    }
    buildEvent(name, detail) {
        return new CustomEvent(name, {
            bubbles: true,
            composed: true,
            detail
        });
    }
}
const catI18nRegistry = CatI18nRegistry.getInstance();

export { CatI18nRegistry as C, catI18nRegistry as c };
//# sourceMappingURL=p-DYxciDq0.js.map

//# sourceMappingURL=p-DYxciDq0.js.map