import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-date',
  template: `
    <cat-date
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
      [name]="props.name"
      [placeholder]="props.placeholder"
      [textPrefix]="props.textPrefix"
      [textSuffix]="props.textSuffix"
      [readonly]="props.readonly"
      [errors]="props.errors"
      [errorUpdate]="props.errorUpdate"
      [errorInit]="props.errorInit"
      [nativeAttributes]="props.nativeAttributes"
    >
    </cat-date>
  `,
  standalone: false
})
export class CatDateFieldType extends FieldType<FieldTypeConfig> {}
