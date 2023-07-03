import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
// import { CatSelect } from '../../directives/proxies';

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
      [nativeAttributes]="props.nativeAttributes"
      #selectRef
      >
    </cat-select>
  `,
})
export class CatSelectFieldType extends FieldType<FieldTypeConfig> implements AfterViewInit {
  // @ViewChild('selectRef') selectRef!: CatSelect;
  
  ngAfterViewInit(): void {
    // this.selectRef.connect(this.props.connector)
  }
}
