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

  set(_i18n: { [key: string]: string }): void {
    // NOOP
  }

  clear(): void {
    // NOOP
  }

  t(key: string, _params?: { [key: string]: string | number }): string {
    return key;
  }
}

export const catI18nRegistry = CatI18nRegistry.getInstance();
