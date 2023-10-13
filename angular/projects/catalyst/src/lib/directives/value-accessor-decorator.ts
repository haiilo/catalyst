import { AfterViewInit, Directive, ElementRef, Host, Optional, Self, SkipSelf } from '@angular/core';
import { ControlContainer, NgControl, Validators } from '@angular/forms';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'cat-input, cat-textarea, cat-datepicker, cat-select',
  host: {
    '(catBlur)': 'updateErrors()'
  }
})
export class ValueAccessorDecorator implements AfterViewInit {
  constructor(
    private readonly el: ElementRef,
    @Self() @Optional() private readonly controlDirective?: NgControl,
    @Optional() @Host() @SkipSelf() private controlContainer?: ControlContainer
  ) {}

  ngAfterViewInit(): void {
    this.controlDirective?.statusChanges?.subscribe(() => this.updateErrors());
    const controlName = this.controlDirective?.name?.toString() ?? '';
    const control = this.controlContainer?.control?.get(controlName);
    if (control?.hasValidator(Validators.required)) {
      this.el.nativeElement.required = true;
    }
  }

  updateErrors(): void {
    this.el.nativeElement.errors = this.controlDirective?.errors || !!this.controlDirective?.invalid;
  }
}
