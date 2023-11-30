import { AfterViewInit, Directive, ElementRef, Host, Input, Optional, Self, SkipSelf } from '@angular/core';
import { ControlContainer, NgControl, Validators } from '@angular/forms';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'cat-input, cat-textarea, cat-datepicker, cat-select',
  host: {
    '(catBlur)': 'updateErrors()'
  }
})
export class ValueAccessorDecorator implements AfterViewInit {
  /**
   * Whether to show errors directly after initialization
   * (i.e. before the user has interacted with the input).
   */
  @Input() errorInit = false;

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
    if (this.errorInit) {
      this.updateErrors();
    }
  }

  updateErrors(): void {
    this.el.nativeElement.errors = this.controlDirective?.errors || !!this.controlDirective?.invalid;
  }
}
