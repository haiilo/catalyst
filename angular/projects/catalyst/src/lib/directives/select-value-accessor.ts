import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CatSelectConnector } from '@haiilo/catalyst';

import { ValueAccessor } from './value-accessor';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'cat-select',
  host: {
    '(catChange)': 'handleChangeEvent($event.target.value)'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectValueAccessor,
      multi: true
    }
  ]
})
export class SelectValueAccessor extends ValueAccessor implements OnChanges {
  /**
   * The connector to use for the select.
   */
  @Input() connector?: CatSelectConnector;

  constructor(el: ElementRef) {
    super(el);
  }

  ngOnChanges({ connector }: SimpleChanges): void {
    if (connector?.currentValue) {
      this.el.nativeElement.connect(connector.currentValue);
    }
  }
}
