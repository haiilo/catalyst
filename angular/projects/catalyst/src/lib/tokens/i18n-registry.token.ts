import { InjectionToken } from '@angular/core';
import { CatI18nRegistry, catI18nRegistry } from '@haiilo/catalyst';

export const CAT_I18N_REGISTRY_TOKEN = new InjectionToken<CatI18nRegistry>('CAT_I18N_REGISTRY', {
  providedIn: 'root',
  factory: () => catI18nRegistry
});
