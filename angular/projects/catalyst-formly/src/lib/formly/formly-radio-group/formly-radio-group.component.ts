import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { CatRadioType } from '../formly-radio/formly-radio.component';

export type CatRadioGroupType = {
  name: string;
  a11yLabel: string;
  labelLeft: boolean;
  options: CatRadioType[];
};

@Component({
  selector: 'formly-radio-group',
  template: `
    <cat-radio-group
      [formControl]="formControl"
      [formlyAttributes]="field"
      [name]="props.name"
      [a11yLabel]="props.a11yLabel"
      [labelLeft]="props.labelLeft"
    >
      <cat-radio
        *ngFor="let option of props.options"
        [checked]="option.checked"
        [disabled]="option.disabled"
        [identifier]="option.identifier"
        [label]="option.label"
        [labelHidden]="option.labelHidden"
        [name]="option.name"
        [required]="option.required"
        [value]="option.value"
        [hint]="option.hint"
        [labelLeft]="option.labelLeft"
        [nativeAttributes]="option.nativeAttributes"
      >
      </cat-radio>
    </cat-radio-group>
  `
})
export class CatRadioGroupFieldType extends FieldType<FieldTypeConfig<CatRadioGroupType>> {}
