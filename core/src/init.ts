import { ci } from '@haiilo/catalyst-icons';
import { CatI18nRegistry } from './components/cat-i18n/cat-i18n-registry';
import { CatIconRegistry } from './components/cat-icon/cat-icon-registry';

function registerIcons() {
  CatIconRegistry.getInstance().addIcons(ci);
}

function registerTranslations() {
  CatI18nRegistry.getInstance().register('en', {
    'input.clear': 'Clear',
    'input.optional': 'Optional'
  });
}

export default function () {
  registerIcons();
  registerTranslations();
}
