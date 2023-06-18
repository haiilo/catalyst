import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { CatCheckboxFieldType } from './formly-checkbox/formly-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalystModule } from '../catalyst.module';
import { CatToggleFieldType } from './formly-toggle/formly-toggle.component';
import { CatRadioFieldType } from './formly-radio/formly-radio.component';

@NgModule({
  declarations: [
    CatCheckboxFieldType,
    CatToggleFieldType,
    CatRadioFieldType
  ],
  imports: [
    CatalystModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'cat-checkbox-formly',
          component: CatCheckboxFieldType,
        },
        {
          name: 'cat-toggle-formly',
          component: CatToggleFieldType,
        },
        {
          name: 'cat-radio-formly',
          component: CatRadioFieldType,
        },
      ],
    }),
  ],
  exports: [
    CatCheckboxFieldType,
    CatToggleFieldType,
    CatRadioFieldType
  ],
})
export class CatalystFormlyModule {}