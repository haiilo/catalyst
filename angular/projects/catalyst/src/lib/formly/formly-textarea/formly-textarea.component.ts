import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-textarea',
  template: `
    <cat-textarea
      [formControl]="formControl"
      [formlyAttributes]="field"
      [requiredMarker]="props.requiredMarker"
      [horizontal]="props.horizontal"
      [identifier]="props.identifier"
      [label]="props.label"
      [labelHidden]="props.labelHidden"
      [maxLength]="props.maxLength"
      [minLength]="props.minLength"
      [rows]="props.rows"
      [name]="props.name"
      [placeholder]="props.placeholder"
      [readonly]="props.readonly"
      [errors]="props.errors"
      [errorUpdate]="props.errorUpdate"
      [hint]="props.hint"
      [nativeAttributes]="props.nativeAttributes"
      >
    </cat-textarea>
  `,
})
export class CatTextareaFieldType extends FieldType<FieldTypeConfig> {}