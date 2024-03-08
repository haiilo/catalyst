import type { CatI18nTranslationFn } from '../cat-i18n-registry';

export class CatI18nRegistry {
  static getInstance() {
    return new CatI18nRegistry();
  }

  getLocale(): string {
    return 'en';
  }

  setLocale(_locale: string): void {
    // NOOP
  }

  set(_translationFn: CatI18nTranslationFn): void {
    // NOOP
  }

  t(key: string, _params?: { [key: string]: string | number }): string {
    return key;
  }
}

export const catI18nRegistry = CatI18nRegistry.getInstance();
