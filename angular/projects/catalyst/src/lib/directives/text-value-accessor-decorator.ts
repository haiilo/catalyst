import { AfterViewInit, Directive, ElementRef, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'cat-input, cat-textarea'
})
export class TextValueAccessorDecorator implements AfterViewInit {

  constructor(private readonly el: ElementRef, @Self() @Optional() private readonly controlDirective?: NgControl) {

  }

  ngAfterViewInit(): void {
    this.controlDirective?.statusChanges?.subscribe(value => {
      this.el.nativeElement.invalid = value === 'INVALID';
      this.el.nativeElement.errors = this.controlDirective?.errors;
    });
  }
}
