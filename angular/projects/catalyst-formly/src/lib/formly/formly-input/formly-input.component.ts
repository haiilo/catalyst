import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
    selector: 'formly-input',
    template: `
    <cat-input
      [formControl]="formControl"
      [formlyAttributes]="field"
      [requiredMarker]="props.requiredMarker"
      [horizontal]="props.horizontal"
      [autoComplete]="props.autoComplete"
      [clearable]="props.clearable"
      [icon]="props.icon"
      [iconRight]="props.iconRight"
      [identifier]="props.identifier"
      [label]="props.label"
      [labelHidden]="props.labelHidden"
      [max]="props.max"
      [maxLength]="props.maxLength"
      [min]="props.min"
      [minLength]="props.minLength"
      [name]="props.name"
      [placeholder]="props.placeholder"
      [textPrefix]="props.textPrefix"
      [textSuffix]="props.textSuffix"
      [readonly]="props.readonly"
      [round]="props.round"
      [type]="props.type"
      [errors]="props.errors"
      [errorUpdate]="props.errorUpdate"
      [errorInit]="props.errorInit"
      [hint]="props.hint"
      [nativeAttributes]="props.nativeAttributes"
    >
    </cat-input>
  `,
    standalone: false
})
export class CatInputFieldType extends FieldType<FieldTypeConfig> {}
