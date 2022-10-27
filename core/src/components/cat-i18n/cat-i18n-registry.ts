import log from 'loglevel';

export class CatI18nRegistry {
  private static instance: CatI18nRegistry;

  private readonly i18n: Map<string, string> = new Map();

  private constructor() {
    // hide constructor
  }

  static getInstance(): CatI18nRegistry {
    if (!CatI18nRegistry.instance) {
      CatI18nRegistry.instance = new CatI18nRegistry();
    }
    return CatI18nRegistry.instance;
  }

  set(i18n: { [key: string]: string }): void {
    Object.entries(i18n).forEach(([key, message]) => this.i18n.set(key, message));
    log.info(`[CatI18nRegistry] Registered messages`, i18n);
    window.dispatchEvent(this.buildEvent('cat-i18n-set', { messages: i18n }));
  }

  clear(): void {
    this.i18n.clear();
    log.info(`[CatI18nRegistry] Cleared messages`);
    window.dispatchEvent(this.buildEvent('cat-i18n-clear'));
  }

  t(key: string, params?: { [key: string]: string | number }): string {
    const message = this.i18n.get(key);
    if (message === undefined) {
      log.error(`[CatI18nRegistry] Unknown message key: ${key}`);
      return '';
    }
    return message.replace(/{{\s*([-a-zA-Z._]+)\s*}}/g, (_match, key) => `${params?.[key] ?? ''}`);
  }

  private buildEvent<T>(name: string, detail?: T) {
    return new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail
    });
  }
}
