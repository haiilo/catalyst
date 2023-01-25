import { AfterViewInit, Directive, ElementRef, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'cat-input, cat-textarea, cat-select'
})
export class ValueAccessorDecorator implements AfterViewInit {
  constructor(private readonly el: ElementRef, @Self() @Optional() private readonly controlDirective?: NgControl) {}

  ngAfterViewInit(): void {
    this.updateErrors();
    this.controlDirective?.statusChanges?.subscribe(() => this.updateErrors());
  }

  private updateErrors(): void {
    this.el.nativeElement.errors = this.controlDirective?.errors || !!this.controlDirective?.invalid;
  }
}
