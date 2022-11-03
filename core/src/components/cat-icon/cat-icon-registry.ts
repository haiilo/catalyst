import log from 'loglevel';

export class CatIconRegistry {
  private static instance: CatIconRegistry;

  private readonly icons: Map<string, string> = new Map();

  private constructor() {
    // hide constructor
  }

  static getInstance(): CatIconRegistry {
    if (!CatIconRegistry.instance) {
      CatIconRegistry.instance = new CatIconRegistry();
    }
    return CatIconRegistry.instance;
  }

  getIcon(name: string, setName?: string): string | undefined {
    const icon = this.icons.get(this.buildName(name, setName));
    if (!icon) {
      log.error(`[CatIconRegistry] Unknown icon${setName ? ` in set ${setName}` : ''}: ${name}`);
    }
    return icon;
  }

  addIcon(name: string, data: string, setName?: string): CatIconRegistry {
    this.icons.set(this.buildName(name, setName), data);
    log.info(`[CatIconRegistry] Added icon${setName ? ` to set ${setName}` : ''}: ${name}`);
    window.dispatchEvent(this.buildEvent('cat-icon-added', { name, setName }));
    return this;
  }

  addIcons(icons: { [name: string]: string }, setName?: string): CatIconRegistry {
    Object.entries(icons).forEach(([name, data]) => this.icons.set(this.buildName(name, setName), data));
    log.info(`[CatIconRegistry] Added icons${setName ? ` to set ${setName}` : ''}: ${Object.keys(icons).concat(', ')}`);
    window.dispatchEvent(this.buildEvent('cat-icons-added', { names: Object.keys(icons), setName }));
    return this;
  }

  removeIcon(name: string, setName?: string): CatIconRegistry {
    this.icons.delete(this.buildName(name, setName));
    log.info(`[CatIconRegistry] Removed icon${setName ? ` from set ${setName}` : ''}: ${name}`);
    window.dispatchEvent(this.buildEvent('cat-icon-removed', { name, setName }));
    return this;
  }

  removeIcons(names: string[], setName?: string): CatIconRegistry {
    names.forEach(name => this.icons.delete(this.buildName(name, setName)));
    log.info(`[CatIconRegistry] Removed icons${setName ? ` from set ${setName}` : ''}: ${names.concat(', ')}`);
    window.dispatchEvent(this.buildEvent('cat-icons-removed', { names, setName }));
    return this;
  }

  private buildName(name: string, setName?: string) {
    return setName ? `${setName}:name` : name;
  }

  private buildEvent<T>(name: string, detail?: T) {
    return new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail
    });
  }
}

export const catIconRegistry = CatIconRegistry.getInstance();
