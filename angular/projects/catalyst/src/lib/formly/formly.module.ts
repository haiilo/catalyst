import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { CatCheckboxFieldType } from './formly-checkbox/formly-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalystModule } from '../catalyst.module';
import { CatToggleFieldType } from './formly-toggle/formly-toggle.component';
import { CatRadioFieldType } from './formly-radio/formly-radio.component';
import { CatInputFieldType } from './formly-input/formly-input.component';
import { CatTextareaFieldType } from './formly-textarea/formly-textarea.component';
import { CatRadioGroupFieldType } from './formly-radio-group/formly-radio-group.component';
import { CommonModule } from '@angular/common';
import { CatDatepickerFieldType } from './formly-datepicker/formly-datepicker.component';
import { CatSelectFieldType } from './formly-select/formly-select.component';

@NgModule({
  declarations: [
    CatCheckboxFieldType,
    CatToggleFieldType,
    CatRadioFieldType,
    CatRadioGroupFieldType,
    CatInputFieldType,
    CatTextareaFieldType,
    CatDatepickerFieldType,
    CatSelectFieldType
  ],
  imports: [
    CatalystModule,
    ReactiveFormsModule,
    CommonModule,
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
          name: 'cat-radio-group-formly',
          component: CatRadioGroupFieldType,
        },
        {
          name: 'cat-input-formly',
          component: CatInputFieldType,
        },
        {
          name: 'cat-textarea-formly',
          component: CatTextareaFieldType,
        },
        {
          name: 'cat-datepicker-formly',
          component: CatDatepickerFieldType,
        },
        {
          name: 'cat-select-formly',
          component: CatSelectFieldType,
        }
      ],
    }),
  ],
  exports: [
    CatCheckboxFieldType,
    CatToggleFieldType,
    CatRadioFieldType,
    CatRadioGroupFieldType,
    CatInputFieldType,
    CatTextareaFieldType,
    CatDatepickerFieldType,
    CatSelectFieldType
  ],
})
export class CatalystFormlyModule {}