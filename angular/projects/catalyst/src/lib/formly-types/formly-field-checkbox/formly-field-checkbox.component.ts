import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-checkbox',
  template: `
    <input type="input" [formControl]="formControl" [formlyAttributes]="field">
  `,
})
export class CatCheckboxFieldType extends FieldType<FieldTypeConfig> {}