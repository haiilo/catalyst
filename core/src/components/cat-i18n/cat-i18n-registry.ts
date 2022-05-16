import log from 'loglevel';

export class CatI18nRegistry {
  private static instance: CatI18nRegistry;

  private lang = 'en';
  private readonly messages: Map<string, Map<string, string>> = new Map();

  private constructor() {
    // hide constructor
  }

  static getInstance(): CatI18nRegistry {
    if (!CatI18nRegistry.instance) {
      CatI18nRegistry.instance = new CatI18nRegistry();
    }
    return CatI18nRegistry.instance;
  }

  getLanguage(): string {
    return this.lang;
  }

  setLanguage(lang: string): void {
    this.lang = lang;
  }

  getMessage(key: string): string | undefined {
    const message = this.messages.get(this.lang)?.get(key);
    if (!message) {
      log.error(`[CatI18nRegistry] Unknown message for lang ${this.lang}: ${key}`);
    }
    return message;
  }

  addMessage(lang: string, key: string, message: string): CatI18nRegistry {
    this.getDict(lang).set(key, message);
    log.info(`[CatI18nRegistry] Added message for lang ${lang}: ${key}`);
    window.dispatchEvent(this.buildEvent('cat-i18n-added', { lang, key }));
    return this;
  }

  addMessages(lang: string, i18n: { [key: string]: string }): CatI18nRegistry {
    const dict = this.getDict(lang);
    Object.entries(i18n).forEach(([key, message]) => dict.set(key, message));
    log.info(`[CatI18nRegistry] Added message for lang ${lang}: ${Object.keys(i18n).concat(', ')}`);
    window.dispatchEvent(this.buildEvent('cat-i18n-added', { lang, keys: Object.keys(i18n) }));
    return this;
  }

  removeMessage(lang: string, key: string): CatI18nRegistry {
    this.getDict(lang).delete(key);
    log.info(`[CatI18nRegistry] Removed message for lang ${lang}: ${key}`);
    window.dispatchEvent(this.buildEvent('cat-i18n-removed', { lang, key }));
    return this;
  }

  removeMessages(lang: string, keys: string[]): CatI18nRegistry {
    const dict = this.getDict(lang);
    keys.forEach(key => dict.delete(key));
    log.info(`[CatI18nRegistry] Removed messages for lang ${lang}: ${keys.concat(', ')}`);
    window.dispatchEvent(this.buildEvent('cat-i18n-added', { lang, keys }));
    return this;
  }

  private buildEvent<T>(name: string, detail?: T) {
    return new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail
    });
  }

  private getDict(lang: string) {
    let messages = this.messages.get(lang);
    if (!messages) {
      messages = new Map();
      this.messages.set(lang, messages);
    }
    return messages;
  }
}
