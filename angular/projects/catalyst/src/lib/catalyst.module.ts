import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CatI18nRegistry, CatIconRegistry } from '@haiilo/catalyst';
import { defineCustomElements } from '@haiilo/catalyst/loader';
import * as Components from './directives/proxies';

const CatComponents = [
  Components.CatAlert,
  Components.CatAvatar,
  Components.CatBadge,
  Components.CatButton,
  Components.CatCard,
  Components.CatCheckbox,
  Components.CatIcon,
  Components.CatInput,
  Components.CatMenu,
  Components.CatModal,
  Components.CatRadio,
  Components.CatScrollable,
  Components.CatSelect,
  Components.CatSkeleton,
  Components.CatSpinner,
  Components.CatTab,
  Components.CatTabs,
  Components.CatTextarea,
  Components.CatToggle,
  Components.CatTooltip
];

export const CAT_I18N_REGISTRY_TOKEN = new InjectionToken<CatI18nRegistry>('CAT_I18N_REGISTRY', {
  providedIn: 'root',
  factory: () => CatI18nRegistry.getInstance(),
});

export const CAT_ICON_REGISTRY_TOKEN = new InjectionToken<CatIconRegistry>('CAT_ICON_REGISTRY', {
  providedIn: 'root',
  factory: () => CatIconRegistry.getInstance(),
});

@NgModule({
  imports: [],
  declarations: [...CatComponents],
  exports: [...CatComponents],
  providers: []
})
export class CatalystModule {

  static forRoot(): ModuleWithProviders<CatalystModule> {
    defineCustomElements();
    return {
      ngModule: CatalystModule
    };
  }
}
