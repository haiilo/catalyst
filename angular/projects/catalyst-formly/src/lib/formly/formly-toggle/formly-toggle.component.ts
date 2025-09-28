import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
    selector: 'formly-toggle',
    template: `
    <cat-toggle
      [formControl]="formControl"
      [formlyAttributes]="field"
      [checked]="props.checked"
      [identifier]="props.identifier"
      [label]="props.label"
      [labelHidden]="props.labelHidden"
      [name]="props.name"
      [hint]="props.hint"
      [resolvedValue]="props.resolvedValue"
      [nativeAttributes]="props.nativeAttributes"
    >
    </cat-toggle>
  `,
    standalone: false
})
export class CatToggleFieldType extends FieldType<FieldTypeConfig> {}
