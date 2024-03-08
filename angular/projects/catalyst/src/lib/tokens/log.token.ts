import { InjectionToken } from '@angular/core';
import log, { RootLogger } from 'loglevel';

export const CAT_LOG_TOKEN = new InjectionToken<RootLogger>('CAT_LOG', {
  providedIn: 'root',
  factory: () => log
});
