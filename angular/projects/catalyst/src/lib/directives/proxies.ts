/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@coyoapp/catalyst';




export declare interface CatButton extends Components.CatButton {
  /**
   * Emitted when the button received focus. 
   */
  catFocus: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when the button loses focus. 
   */
  catBlur: EventEmitter<CustomEvent<FocusEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['a11yLabel', 'buttonId', 'color', 'disabled', 'ellipsed', 'icon', 'iconOnly', 'iconSuffix', 'loading', 'name', 'round', 'size', 'submit', 'url', 'urlTarget', 'value', 'variant'],
  methods: ['setFocus']
})
@Component({
  selector: 'cat-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['a11yLabel', 'buttonId', 'color', 'disabled', 'ellipsed', 'icon', 'iconOnly', 'iconSuffix', 'loading', 'name', 'round', 'size', 'submit', 'url', 'urlTarget', 'value', 'variant']
})
export class CatButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catFocus', 'catBlur']);
  }
}


export declare interface CatIcon extends Components.CatIcon {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['a11yLabel', 'icon', 'size']
})
@Component({
  selector: 'cat-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['a11yLabel', 'icon', 'size']
})
export class CatIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatSpinner extends Components.CatSpinner {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['a11yLabel', 'size']
})
@Component({
  selector: 'cat-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['a11yLabel', 'size']
})
export class CatSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
