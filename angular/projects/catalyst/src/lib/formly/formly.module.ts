import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { CatCheckboxFieldType } from './formly-checkbox/formly-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalystModule } from '../catalyst.module';
import { CatToggleFieldType } from './formly-toggle/formly-toggle.component';
import { CatRadioFieldType } from './formly-radio/formly-radio.component';
import { CatInputFieldType } from './formly-input/formly-input.component';
import { CatTextareaFieldType } from './formly-textarea/formly-textarea.component';

@NgModule({
  declarations: [
    CatCheckboxFieldType,
    CatToggleFieldType,
    CatRadioFieldType,
    CatInputFieldType,
    CatTextareaFieldType
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
        {
          name: 'cat-input-formly',
          component: CatInputFieldType,
        },
        {
          name: 'cat-textarea-formly',
          component: CatTextareaFieldType,
        },
      ],
    }),
  ],
  exports: [
    CatCheckboxFieldType,
    CatToggleFieldType,
    CatRadioFieldType,
    CatInputFieldType,
    CatTextareaFieldType
  ],
})
export class CatalystFormlyModule {}