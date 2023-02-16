import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CatSelectConnector } from '@haiilo/catalyst';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'cat-select'
})
export class SelectValueAccessorDecorator implements OnChanges {
  /**
   * The connector to use for the select.
   */
  @Input() connector?: CatSelectConnector;

  constructor(private readonly el: ElementRef) {}

  ngOnChanges({ connector }: SimpleChanges): void {
    if (connector?.currentValue) {
      this.el.nativeElement.connect(connector.currentValue);
    }
  }
}
