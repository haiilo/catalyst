import { ModuleWithProviders, NgModule } from '@angular/core';
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
