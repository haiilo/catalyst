export const CAT_ICON_SET_ATTR = 'data-cat-icon-set';

export class CatIconRegistry {
  static getInstance() {
    return new CatIconRegistry();
  }

  hasIcon(_name: string, _setName?: string): boolean {
    return false;
  }

  getIcon(_name: string, _setName?: string): string | undefined {
    return undefined;
  }

  addIcons(_icons: { [name: string]: string }, _setName?: string): CatIconRegistry {
    return this;
  }

  removeIcons(_names: string[], _setName?: string): CatIconRegistry {
    return this;
  }

  attachSet(_element: Element, _setName: string): CatIconRegistry {
    return this;
  }

  detachSet(_element: Element): CatIconRegistry {
    return this;
  }
}

export const catIconRegistry = CatIconRegistry.getInstance();
