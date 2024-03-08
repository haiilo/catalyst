import { InjectionToken } from '@angular/core';
import { CatNotificationService, catNotificationService } from '@haiilo/catalyst';

export const CAT_NOTIFICATION_SERVICE_TOKEN = new InjectionToken<CatNotificationService>('CAT_NOTIFICATION_SERVICE', {
  providedIn: 'root',
  factory: () => catNotificationService
});
