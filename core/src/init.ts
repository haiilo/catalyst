import { CatIconRegistry } from './components/cat-icon/cat-icon-registry';
import { ci } from '@coyoapp/icons';

function registerIcons() {
  CatIconRegistry.getInstance().addIcons(ci);
}

export default function () {
  registerIcons();
}
