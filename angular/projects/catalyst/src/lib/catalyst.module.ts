import { NgModule } from '@angular/core';
import { defineCustomElements } from '@coyoapp/catalyst/loader';
import * as Components from './directives/proxies';

const CatComponents = [
  Components.CatButton,
  Components.CatIcon,
  Components.CatSpinner
];

defineCustomElements();

@NgModule({
  imports: [],
  declarations: [...CatComponents],
  exports: [...CatComponents],
  providers: []
})
export class CatalystModule {}
