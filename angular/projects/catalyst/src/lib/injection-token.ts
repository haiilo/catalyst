// It is important to declare the InjectionTokens first
import { InjectionToken } from '@angular/core';
import {
  catI18nRegistry,
  CatI18nRegistry,
  catIconRegistry,
  CatIconRegistry,
  catNotificationService,
  CatNotificationService
} from '@haiilo/catalyst';

export const CAT_I18N_REGISTRY_TOKEN = new InjectionToken<CatI18nRegistry>('CAT_I18N_REGISTRY', {
  providedIn: 'root',
  factory: () => catI18nRegistry
});

export const CAT_ICON_REGISTRY_TOKEN = new InjectionToken<CatIconRegistry>('CAT_ICON_REGISTRY', {
  providedIn: 'root',
  factory: () => catIconRegistry
});

export const CAT_NOTIFICATION_SERVICE_TOKEN = new InjectionToken<CatNotificationService>('CAT_NOTIFICATION_SERVICE', {
  providedIn: 'root',
  factory: () => catNotificationService
});
