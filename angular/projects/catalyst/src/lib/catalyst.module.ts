import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { defineCustomElements } from '@haiilo/catalyst/loader';
import { DatetimeComponent } from './datetime/datetime.component';
import { CatDialogActionsComponent } from './dialog/dialog-actions.component';
import { CatDialogHeaderComponent } from './dialog/dialog-header.component';
import { CatDialogComponent } from './dialog/dialog.component';
import { BooleanValueAccessor } from './directives/boolean-value-accessor';
import { DateValueAccessor } from './directives/date-value-accessor';
import * as Components from './directives/proxies';
import { RadioValueAccessor } from './directives/radio-value-accessor';
import { SelectValueAccessor } from './directives/select-value-accessor';
import { SelectValueAccessorDecorator } from './directives/select-value-accessor-decorator';
import { TextValueAccessor } from './directives/text-value-accessor';
import { TimeValueAccessor } from './directives/time-value-accessor';
import { ValueAccessorDecorator } from './directives/value-accessor-decorator';
import { CatTooltipDirective } from './tooltip/tooltip.directive';

const CatComponents = [
  Components.CatAlert,
  Components.CatAvatar,
  Components.CatBadge,
  Components.CatButton,
  Components.CatButtonGroup,
  Components.CatCard,
  Components.CatCheckbox,
  Components.CatDate,
  Components.CatDateInline,
  Components.CatDatepicker,
  Components.CatDropdown,
  Components.CatFormGroup,
  Components.CatIcon,
  Components.CatInput,
  Components.CatPagination,
  Components.CatRadio,
  Components.CatRadioGroup,
  Components.CatScrollable,
  Components.CatSelect,
  Components.CatSkeleton,
  Components.CatSpinner,
  Components.CatTab,
  Components.CatTabs,
  Components.CatTextarea,
  Components.CatTime,
  Components.CatToggle,
  Components.CatTooltip,
  Components.CatTag,
  Components.CatMenu,
  Components.CatMenuItem
];

const CatDirectives = [
  BooleanValueAccessor,
  DateValueAccessor,
  RadioValueAccessor,
  SelectValueAccessor,
  SelectValueAccessorDecorator,
  TextValueAccessor,
  TimeValueAccessor,
  ValueAccessorDecorator,
  DatetimeComponent
];

@NgModule({
  imports: [CommonModule, DialogModule],
  declarations: [
    ...CatComponents,
    ...CatDirectives,
    CatDialogComponent,
    CatDialogHeaderComponent,
    CatDialogActionsComponent,
    CatTooltipDirective
  ],
  exports: [
    ...CatComponents,
    ...CatDirectives,
    CatDialogComponent,
    CatDialogHeaderComponent,
    CatDialogActionsComponent,
    CatTooltipDirective
  ],
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
