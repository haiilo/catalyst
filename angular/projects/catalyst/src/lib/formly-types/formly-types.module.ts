import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { CatCheckboxFieldType } from './formly-field-checkbox/formly-field-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CatCheckboxFieldType],
  imports: [
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'cat-checkbox-formly',
          component: CatCheckboxFieldType,
        },
      ],
    }),
  ],
  exports: [CatCheckboxFieldType],
})
export class CatalystFormlyTypesModule {}