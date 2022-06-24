import log from 'loglevel';

export class CatI18nRegistry {
  private static instance: CatI18nRegistry;

  private _locale = 'en';
  private readonly _dicts: Map<string, Map<string, string>> = new Map();

  private constructor() {
    // hide constructor
  }

  static getInstance(): CatI18nRegistry {
    if (!CatI18nRegistry.instance) {
      CatI18nRegistry.instance = new CatI18nRegistry();
    }
    return CatI18nRegistry.instance;
  }

  locale(locale?: string): string {
    if (locale) {
      this._locale = locale;
      log.info(`[CatI18nRegistry] Locale set to ${locale}`);
      window.dispatchEvent(this.buildEvent('cat-i18n-locale', { locale }));
    }
    return this._locale;
  }

  register(locale: string, i18n: { [key: string]: string }): void {
    const dict = this.getDict(locale);
    Object.entries(i18n).forEach(([key, message]) => dict.set(key, message));
    log.info(`[CatI18nRegistry] Registered messages for ${locale}`, i18n);
    window.dispatchEvent(this.buildEvent('cat-i18n-register', { i18n }));
  }

  clear(locale?: string): void {
    if (locale) {
      this.getDict(locale).clear();
      log.info(`[CatI18nRegistry] Cleared messages for ${locale}`);
      window.dispatchEvent(this.buildEvent('cat-i18n-clear', { locale }));
    } else {
      this._dicts.clear();
      log.info(`[CatI18nRegistry] Cleared messages`);
      window.dispatchEvent(this.buildEvent('cat-i18n-clear'));
    }
  }

  t(key: string, params?: { [key: string]: string | number }): string {
    const message = this._dicts.get(this._locale)?.get(key);
    if (!message) {
      log.error(`[CatI18nRegistry] Unknown message for ${this._locale}: ${key}`);
    }
    return message?.replace(/{{\s*([-a-zA-Z._]+)\s*}}/g, (_match, key) => `${params?.[key] ?? ''}`) || '';
  }

  private buildEvent<T>(name: string, detail?: T) {
    return new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail
    });
  }

  private getDict(lang: string) {
    let dict = this._dicts.get(lang);
    if (!dict) {
      dict = new Map();
      this._dicts.set(lang, dict);
    }
    return dict;
  }
}
