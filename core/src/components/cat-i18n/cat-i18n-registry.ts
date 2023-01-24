import log from 'loglevel';

export class CatI18nRegistry {
  private static instance: CatI18nRegistry;

  private readonly id = (Math.random() + 1).toString(36).substring(2);
  private readonly i18n: Map<string, string> = new Map();

  private constructor() {
    // hide constructor

    // In rare cases, the registry can be initialized twice. This can happen in
    // a micro frontend architecture where the registry is initialized in the
    // host application and in the micro frontend. To prevent the registry in
    // one application from overwriting the registry in the other, we listen for
    // events that are dispatched when messages are added or removed in other
    // applications and add or remove messages if the event was not dispatched
    // by this registry.
    window.addEventListener('cat-i18n-set', event => {
      const { detail } = (event as CustomEvent) || {};
      if (detail && detail.id !== this.id) {
        this.set(detail.i18n, true);
      }
    });
    window.addEventListener('cat-i18n-clear', event => {
      const { detail } = (event as CustomEvent) || {};
      if (detail && detail.id !== this.id) {
        this.clear(true);
      }
    });
  }

  static getInstance(): CatI18nRegistry {
    if (!CatI18nRegistry.instance) {
      CatI18nRegistry.instance = new CatI18nRegistry();
    }
    return CatI18nRegistry.instance;
  }

  set(i18n: { [key: string]: string }, silent = false): void {
    const i18nEntries = Object.entries(i18n);
    i18nEntries.forEach(([key, message]) => this.i18n.set(key, message));
    log.info(`[CatI18nRegistry] Registered ${i18nEntries.length !== 1 ? 'messages' : 'message'}`);
    !silent && window.dispatchEvent(this.buildEvent('cat-i18n-set', { i18n, id: this.id }));
  }

  clear(silent = false): void {
    this.i18n.clear();
    log.info(`[CatI18nRegistry] Cleared messages`);
    !silent && window.dispatchEvent(this.buildEvent('cat-i18n-clear'));
  }

  t(key: string, params?: { [key: string]: unknown }): string {
    const message = this.i18n.get(key);
    if (message === undefined) {
      log.error(`[CatI18nRegistry] Unknown message key: ${key}`);
      return key;
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

export const catI18nRegistry = CatI18nRegistry.getInstance();
