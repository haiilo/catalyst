import { CatIconRegistry } from './components/cat-icon/cat-icon-registry';
import { ci } from '@haiilo/catalyst-icons';

function registerIcons() {
  CatIconRegistry.getInstance().addIcons(ci);
}

export default function () {
  registerIcons();
}
