import { NgModule } from '@angular/core';
import { CatDialogModule } from './dialog/dialog.module';
import * as Components from './directives/proxies';
import { CatFormsModule } from './forms.module';

const CatComponents = [
  Components.CatAlert,
  Components.CatAvatar,
  Components.CatBadge,
  Components.CatButton,
  Components.CatButtonGroup,
  Components.CatCard,
  Components.CatCheckbox,
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
  Components.CatToggle,
  Components.CatTooltip
];

@NgModule({
  imports: [...CatComponents, CatFormsModule, CatDialogModule],
  exports: [...CatComponents, CatFormsModule, CatDialogModule]
})
export class CatalystModule {}
