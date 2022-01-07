import { ModuleWithProviders, NgModule } from '@angular/core';
import { defineCustomElements } from '@coyoapp/catalyst';
import * as Components from './directives/proxies';

const CatComponents = [
  Components.CatButton,
  Components.CatIcon,
  Components.CatSpinner
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
