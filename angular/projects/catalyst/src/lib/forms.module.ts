import { NgModule } from '@angular/core';
import { BooleanValueAccessor } from './directives/boolean-value-accessor';
import { RadioValueAccessor } from './directives/radio-value-accessor';
import { SelectValueAccessor } from './directives/select-value-accessor';
import { SelectValueAccessorDecorator } from './directives/select-value-accessor-decorator';
import { TextValueAccessor } from './directives/text-value-accessor';
import { ValueAccessorDecorator } from './directives/value-accessor-decorator';

const CatDirectives = [
  BooleanValueAccessor,
  RadioValueAccessor,
  SelectValueAccessor,
  SelectValueAccessorDecorator,
  TextValueAccessor,
  ValueAccessorDecorator
];

@NgModule({
  declarations: [...CatDirectives],
  exports: [...CatDirectives]
})
export class CatFormsModule {}
