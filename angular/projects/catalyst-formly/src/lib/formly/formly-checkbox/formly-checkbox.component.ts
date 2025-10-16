import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-checkbox',
  template: `
    <cat-checkbox
      [formControl]="formControl"
      [formlyAttributes]="field"
      [checked]="props.checked"
      [identifier]="props.identifier"
      [indeterminate]="props.indeterminate"
      [label]="props.label"
      [name]="props.name"
      [hint]="props.hint"
      [labelLeft]="props.labelLeft"
      [nativeAttributes]="props.nativeAttributes"
      [requiredMarker]="props.requiredMarker"
    >
    </cat-checkbox>
  `,
  standalone: false
})
export class CatCheckboxFieldType extends FieldType<FieldTypeConfig> {}
