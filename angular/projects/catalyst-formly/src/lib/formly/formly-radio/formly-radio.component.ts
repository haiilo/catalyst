import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

export type CatRadioType = {
  checked: boolean;
  disabled: boolean;
  identifier?: string;
  label: string;
  labelHidden: boolean;
  name?: string;
  required: string;
  value: string;
  hint?: string | string[];
  labelLeft: boolean;
  nativeAttributes?: { [key: string]: string };
};

@Component({
  selector: 'formly-radio',
  template: `
    <cat-radio
      [formControl]="formControl"
      [formlyAttributes]="field"
      [checked]="props.checked"
      [identifier]="props.identifier"
      [label]="props.label"
      [name]="props.name"
      [hint]="props.hint"
      [labelLeft]="props.labelLeft"
      [nativeAttributes]="props.nativeAttributes"
    >
    </cat-radio>
  `
})
export class CatRadioFieldType extends FieldType<FieldTypeConfig> {}
