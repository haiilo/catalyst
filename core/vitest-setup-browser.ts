import { afterEach, beforeAll } from 'vitest';
import { ci } from '@haiilo/catalyst-icons';
import './dist/catalyst/catalyst.css';

// Default English messages, matching the CDN bootstrap in src/index.cdn.js.
const DEFAULT_I18N: { [key: string]: string } = {
  'datepicker.year': 'Year',
  'datepicker.month': 'Month',
  'datepicker.hour': 'Hour',
  'datepicker.minute': 'Minute',
  'datepicker.scroll': 'Scroll to increment',
  'datepicker.toggle': 'Click to toggle',
  'dialog.close': 'Close',
  'input.clear': 'Clear',
  'input.optional': 'Optional',
  'input.required': 'Required',
  'input.showPassword': 'Show password',
  'input.hidePassword': 'Hide password',
  'notification.dismiss': 'Dismiss',
  'pagination.ariaLabel': 'Pagination',
  'pagination.prev': 'Previous',
  'pagination.page': 'Go to page {{page}}',
  'pagination.next': 'Next',
  'select.close': 'Close',
  'select.deselect': 'Deselect',
  'select.empty': 'No items',
  'select.open': 'Open'
};

let registries: typeof import('./src/index') | undefined;

beforeAll(async () => {
  // Load the lazy-loader for this project
  await import('./dist/catalyst/catalyst.esm.js');
  // Configure the registries of the built bundle directly. Registries imported
  // from source are separate instances that only sync via window events, which
  // the bundle misses if its registries are created later.
  registries = await import('./dist/catalyst/index.esm.js');
  registries.catIconRegistry.addIcons(ci);
  registries.catI18nRegistry.set(DEFAULT_I18N);
});

afterEach(() => {
  // Reset messages so per-test overrides do not leak into later tests.
  registries?.catI18nRegistry.clear();
  registries?.catI18nRegistry.set(DEFAULT_I18N);
});

export {};
