import log from 'loglevel';

export type CatI18nTranslationFn = (key: string, params?: unknown) => string | null;

export class CatI18nRegistry {
  private static instance: CatI18nRegistry;

  private readonly id = (Math.random() + 1).toString(36).substring(2);

  private _locale?: string;
  private _translationFn?: CatI18nTranslationFn;

  private constructor() {
    // hide constructor
  }

  static getInstance(): CatI18nRegistry {
    if (!CatI18nRegistry.instance) {
      CatI18nRegistry.instance = new CatI18nRegistry();
    }
    return CatI18nRegistry.instance;
  }

  getLocale(): string {
    return this._locale ?? window?.navigator?.language ?? 'en';
  }

  setLocale(locale: string): void {
    try {
      this._locale = Intl.getCanonicalLocales(locale)[0];
      log.info(`[CatI18nRegistry::${this.id}] Set locale: ${this._locale}`);
    } catch (err) {
      log.error(`[CatI18nRegistry::${this.id}] Invalid locale: ${locale}`);
    }
  }

  set(translationFn: CatI18nTranslationFn): void {
    this._translationFn = translationFn;
    log.info(`[CatI18nRegistry::${this.id}] Set translation function`);
  }

  t(key: string, params?: { [key: string]: unknown }): string {
    const message = this._translationFn?.(key, params);
    if (message === undefined) {
      log.error(`[CatI18nRegistry::${this.id}] Missing translation function`);
      return key;
    } else if (message === null) {
      log.error(`[CatI18nRegistry::${this.id}] Unknown message key: ${key}`);
      return key;
    }
    return message;
  }
}

export const catI18nRegistry = CatI18nRegistry.getInstance();
