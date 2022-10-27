export class CatI18nRegistry {
  static getInstance() {
    return new CatI18nRegistry();
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
