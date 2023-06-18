import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { CatCheckboxFieldType } from './formly-checkbox/formly-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalystModule } from '../catalyst.module';

@NgModule({
  declarations: [CatCheckboxFieldType],
  imports: [
    CatalystModule,
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
export class CatalystFormlyModule {}