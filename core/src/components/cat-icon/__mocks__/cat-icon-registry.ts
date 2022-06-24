export class CatIconRegistry {
  static getInstance() {
    return new CatIconRegistry();
  }

  getIcon(_name: string, _setName?: string): string | undefined {
    return undefined;
  }

  addIcon(_name: string, _data: string, _setName?: string): CatIconRegistry {
    return this;
  }

  addIcons(_icons: { [name: string]: string }, _setName?: string): CatIconRegistry {
    return this;
  }

  removeIcon(_name: string, _setName?: string): CatIconRegistry {
    return this;
  }

  removeIcons(_names: string[], _setName?: string): CatIconRegistry {
    return this;
  }
}
