import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-select',
  template: `
    <cat-select
      [formControl]="formControl"
      [formlyAttributes]="field"
      [requiredMarker]="props.requiredMarker"
      [horizontal]="props.horizontal"
      [multiple]="props.multiple"
      [debounce]="props.debounce"
      [placement]="props.placement"
      [placeholder]="props.placeholder"
      [hint]="props.hint"
      [identifier]="props.identifier"
      [label]="props.label"
      [name]="props.name"
      [labelHidden]="props.labelHidden"
      [clearable]="props.clearable"
      [tags]="props.tags"
      [tagHint]="props.tagHint"
      [noItems]="props.noItems"
      [errors]="props.errors"
      [errorUpdate]="props.errorUpdate"
      [errorInit]="props.errorInit"
      [nativeAttributes]="props.nativeAttributes"
      [connector]="props.connector"
    >
    </cat-select>
  `,
  standalone: false
})
export class CatSelectFieldType extends FieldType<FieldTypeConfig> {}
