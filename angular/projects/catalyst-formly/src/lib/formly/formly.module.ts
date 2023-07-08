import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { CatalystModule } from '@haiilo/catalyst-angular';
import { CatCheckboxFieldType } from './formly-checkbox/formly-checkbox.component';
import { CatDatepickerFieldType } from './formly-datepicker/formly-datepicker.component';
import { CatInputFieldType } from './formly-input/formly-input.component';
import { CatRadioGroupFieldType } from './formly-radio-group/formly-radio-group.component';
import { CatRadioFieldType } from './formly-radio/formly-radio.component';
import { CatSelectFieldType } from './formly-select/formly-select.component';
import { CatTextareaFieldType } from './formly-textarea/formly-textarea.component';
import { CatToggleFieldType } from './formly-toggle/formly-toggle.component';

@NgModule({
  declarations: [
    CatCheckboxFieldType,
    CatDatepickerFieldType,
    CatInputFieldType,
    CatRadioFieldType,
    CatRadioGroupFieldType,
    CatSelectFieldType,
    CatTextareaFieldType,
    CatToggleFieldType
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalystModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'cat-checkbox-formly',
          component: CatCheckboxFieldType
        },
        {
          name: 'cat-toggle-formly',
          component: CatToggleFieldType
        },
        {
          name: 'cat-radio-formly',
          component: CatRadioFieldType
        },
        {
          name: 'cat-radio-group-formly',
          component: CatRadioGroupFieldType
        },
        {
          name: 'cat-input-formly',
          component: CatInputFieldType
        },
        {
          name: 'cat-textarea-formly',
          component: CatTextareaFieldType
        },
        {
          name: 'cat-datepicker-formly',
          component: CatDatepickerFieldType
        },
        {
          name: 'cat-select-formly',
          component: CatSelectFieldType
        }
      ]
    })
  ],
  exports: [
    CatCheckboxFieldType,
    CatDatepickerFieldType,
    CatInputFieldType,
    CatRadioFieldType,
    CatRadioGroupFieldType,
    CatSelectFieldType,
    CatTextareaFieldType,
    CatToggleFieldType
  ]
})
export class CatalystFormlyModule {}
