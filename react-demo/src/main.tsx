import '@haiilo/catalyst/dist/catalyst/catalyst.css';
import './styles.css';

import { catI18nRegistry, catIconRegistry } from '@haiilo/catalyst';
import { defineCustomElements } from '@haiilo/catalyst/loader';
import { ci } from '@haiilo/catalyst-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

catIconRegistry.addIcons(ci);
catI18nRegistry.set({
  'datepicker.prevYear': 'Previous year',
  'datepicker.nextYear': 'Next year',
  'datepicker.prevMonth': 'Previous month',
  'datepicker.nextMonth': 'Next month',
  'datepicker.arrowKeys': 'Arrow keys can navigate dates.',
  'datepicker.today': 'Today',
  'datepicker.change': 'Change date',
  'datepicker.choose': 'Choose date',
  'datepicker.year': 'Year',
  'datepicker.month': 'Month',
  'datepicker.hour': 'Hour',
  'datepicker.minute': 'Minute',
  'datepicker.scroll': 'Scroll to increment',
  'datepicker.toggle': 'Click to toggle',
  'datepicker.clear': 'Clear',
  'timepicker.change': 'Change time',
  'timepicker.choose': 'Choose time',
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
  'select.open': 'Open',
  'tabs.more': 'More'
});

// Register the custom elements before React renders. Otherwise React sets
// properties on not-yet-upgraded elements, and boolean props passed as
// `false` (e.g. `loading`, `checked`) are lost during the upgrade.
// The loader is typed as returning void but returns a Promise at runtime;
// Promise.resolve adopts it, so rendering waits until registration is done.
Promise.resolve(defineCustomElements()).then(() => ReactDOM.render(<App />, document.getElementById('root')));
