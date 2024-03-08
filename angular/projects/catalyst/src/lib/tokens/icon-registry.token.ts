import { InjectionToken } from '@angular/core';
import { CatIconRegistry, catIconRegistry } from '@haiilo/catalyst';

export const CAT_ICON_REGISTRY_TOKEN = new InjectionToken<CatIconRegistry>('CAT_ICON_REGISTRY', {
  providedIn: 'root',
  factory: () => catIconRegistry
});
