export class CatI18nRegistry {
  private static instance: CatI18nRegistry;

  private constructor() {}

  static getInstance() {
    if (!CatI18nRegistry.instance) {
      CatI18nRegistry.instance = new CatI18nRegistry();
    }
    return CatI18nRegistry.instance;
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
