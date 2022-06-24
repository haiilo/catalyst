export class CatI18nRegistry {
  static getInstance() {
    return new CatI18nRegistry();
  }

  locale(_locale?: string): string {
    return '';
  }

  register(_locale: string, _i18n: { [key: string]: string }): void {
    // NOOP
  }

  clear(_locale?: string): void {
    // NOOP
  }

  t(key: string, _params?: { [key: string]: string | number }): string {
    return key;
  }
}
