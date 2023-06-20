import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-datepicker',
  template: `
    <cat-datepicker
      [formControl]="formControl"
      [formlyAttributes]="field"
      [requiredMarker]="props.requiredMarker"
      [horizontal]="props.horizontal"
      [autoComplete]="props.autoComplete"
      [clearable]="props.clearable"
      [hint]="props.hint"
      [icon]="props.icon"
      [iconRight]="props.iconRight"
      [identifier]="props.identifier"
      [label]="props.label"
      [labelHidden]="props.labelHidden"
      [max]="props.max"
      [min]="props.min"
      [mode]="props.mode"
      [name]="props.name"
      [placeholder]="props.placeholder"
      [textPrefix]="props.textPrefix"
      [textSuffix]="props.textSuffix"
      [readonly]="props.readonly"
      [step]="props.step"
      [errors]="props.errors"
      [errorUpdate]="props.errorUpdate"      
      [nativeAttributes]="props.nativeAttributes"
      >
    </cat-datepicker>
  `,
})
export class CatDatepickerFieldType extends FieldType<FieldTypeConfig> {}