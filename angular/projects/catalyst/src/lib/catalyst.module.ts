import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CatI18nRegistry, CatIconRegistry } from '@haiilo/catalyst';
import { defineCustomElements } from '@haiilo/catalyst/loader';
import * as Components from './directives/proxies';
import { TextValueAccessor } from "./directives/text-value-accessor";
import { SelectValueAccessor } from "./directives/select-value-accessor";
import { RadioValueAccessor } from "./directives/radio-value-accessor";
import { BooleanValueAccessor } from "./directives/boolean-value-accessor";

const CatComponents = [
  Components.CatAlert,
  Components.CatAvatar,
  Components.CatBadge,
  Components.CatButton,
  Components.CatCard,
  Components.CatCheckbox,
  Components.CatDropdown,
  Components.CatIcon,
  Components.CatInput,
  Components.CatModal,
  Components.CatRadio,
  Components.CatRadioGroup,
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

const CatDirectives = [
  TextValueAccessor,
  SelectValueAccessor,
  RadioValueAccessor,
  BooleanValueAccessor
]

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
  declarations: [...CatComponents, ...CatDirectives],
  exports: [...CatComponents, ...CatDirectives],
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
