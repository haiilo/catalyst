import { ci } from '@coyoapp/icons';

export class CatIconRegistry {
  private static instance: CatIconRegistry;

  private readonly icons: Map<string, string> = new Map();

  private constructor() {
    // hide constructor
  }

  static getInstance(): CatIconRegistry {
    if (!CatIconRegistry.instance) {
      CatIconRegistry.instance = new CatIconRegistry();
      CatIconRegistry.instance.addIcons(ci);
    }
    return CatIconRegistry.instance;
  }

  getIcon(name: string, setName?: string): string | undefined {
    return this.icons.get(this.buildName(name, setName));
  }

  addIcon(name: string, data: string, setName?: string): void {
    this.icons.set(this.buildName(name, setName), data);
    window.dispatchEvent(this.buildEvent('cat-icon-added', { name, setName }));
  }

  addIcons(icons: { [name: string]: string }, setName?: string): void {
    Object.entries(icons).forEach(([name, data]) => this.icons.set(this.buildName(name, setName), data));
    window.dispatchEvent(this.buildEvent('cat-icons-added', { names: Object.keys(icons), setName }));
  }

  removeIcon(name: string, setName?: string): void {
    this.icons.delete(this.buildName(name, setName));
    window.dispatchEvent(this.buildEvent('cat-icon-removed', { name, setName }));
  }

  removeIcons(names: string[], setName?: string): void {
    names.forEach(name => this.icons.delete(this.buildName(name, setName)));
    window.dispatchEvent(this.buildEvent('cat-icons-removed', { names, setName }));
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
