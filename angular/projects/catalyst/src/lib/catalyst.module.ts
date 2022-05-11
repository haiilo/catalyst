import { ModuleWithProviders, NgModule } from '@angular/core';
import { defineCustomElements } from '@haiilo/catalyst/loader';
import * as Components from './directives/proxies';

const CatComponents = [
  Components.CatButton,
  Components.CatIcon,
  Components.CatSpinner,
  Components.CatScrollable,
  Components.CatAlert,
  Components.CatBadge,
  Components.CatSkeleton,
  Components.CatCard,
  Components.CatInput,
  Components.CatCheckbox,
  Components.CatMenu,
  Components.CatRadio,
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
