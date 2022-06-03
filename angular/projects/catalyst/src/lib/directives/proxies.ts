/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@haiilo/catalyst';




export declare interface CatAlert extends Components.CatAlert {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['color']
})
@Component({
  selector: 'cat-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color']
})
export class CatAlert {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatAvatar extends Components.CatAvatar {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['icon', 'initials', 'label', 'round', 'size', 'src', 'url', 'urlTarget']
})
@Component({
  selector: 'cat-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['icon', 'initials', 'label', 'round', 'size', 'src', 'url', 'urlTarget']
})
export class CatAvatar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatBadge extends Components.CatBadge {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['color', 'pulse', 'round', 'size', 'variant']
})
@Component({
  selector: 'cat-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'pulse', 'round', 'size', 'variant']
})
export class CatBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatButton extends Components.CatButton {
  /**
   * Emitted when the button is clicked. 
   */
  catClick: EventEmitter<CustomEvent<MouseEvent>>;
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
  inputs: ['a11yLabel', 'active', 'buttonId', 'color', 'disabled', 'icon', 'iconOnly', 'iconRight', 'loading', 'name', 'noEllipsis', 'round', 'size', 'submit', 'url', 'urlTarget', 'value', 'variant'],
  methods: ['setFocus']
})
@Component({
  selector: 'cat-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['a11yLabel', 'active', 'buttonId', 'color', 'disabled', 'icon', 'iconOnly', 'iconRight', 'loading', 'name', 'noEllipsis', 'round', 'size', 'submit', 'url', 'urlTarget', 'value', 'variant']
})
export class CatButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catClick', 'catFocus', 'catBlur']);
  }
}


export declare interface CatCard extends Components.CatCard {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'cat-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class CatCard {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatCheckbox extends Components.CatCheckbox {
  /**
   * Emitted when the checked status of the checkbox is changed. 
   */
  catChange: EventEmitter<CustomEvent<any>>;
  /**
   * Emitted when the checkbox received focus. 
   */
  catFocus: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when the checkbox loses focus. 
   */
  catBlur: EventEmitter<CustomEvent<FocusEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['checked', 'disabled', 'indeterminate', 'label', 'labelHidden', 'name', 'required', 'value'],
  methods: ['setFocus']
})
@Component({
  selector: 'cat-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checked', 'disabled', 'indeterminate', 'label', 'labelHidden', 'name', 'required', 'value']
})
export class CatCheckbox {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
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


export declare interface CatInput extends Components.CatInput {
  /**
   * Emitted when the value is changed. 
   */
  catChange: EventEmitter<CustomEvent<any>>;
  /**
   * Emitted when the input received focus. 
   */
  catFocus: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when the input loses focus. 
   */
  catBlur: EventEmitter<CustomEvent<FocusEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['autoComplete', 'clearable', 'disabled', 'hint', 'icon', 'iconRight', 'label', 'labelHidden', 'max', 'maxLength', 'min', 'minLength', 'name', 'placeholder', 'readonly', 'required', 'round', 'textPrefix', 'textSuffix', 'type', 'value'],
  methods: ['setFocus', 'clear']
})
@Component({
  selector: 'cat-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['autoComplete', 'clearable', 'disabled', 'hint', 'icon', 'iconRight', 'label', 'labelHidden', 'max', 'maxLength', 'min', 'minLength', 'name', 'placeholder', 'readonly', 'required', 'round', 'textPrefix', 'textSuffix', 'type', 'value']
})
export class CatInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
  }
}


export declare interface CatMenu extends Components.CatMenu {
  /**
   * Emitted when the menu is opened. 
   */
  catOpen: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when the menu is closed. 
   */
  catClose: EventEmitter<CustomEvent<FocusEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['placement']
})
@Component({
  selector: 'cat-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['placement']
})
export class CatMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catOpen', 'catClose']);
  }
}


export declare interface CatRadio extends Components.CatRadio {
  /**
   * Emitted when the radio is changed. 
   */
  catChange: EventEmitter<CustomEvent<any>>;
  /**
   * Emitted when the radio received focus. 
   */
  catFocus: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when the radio loses focus. 
   */
  catBlur: EventEmitter<CustomEvent<FocusEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['checked', 'disabled', 'label', 'labelHidden', 'name', 'required', 'value'],
  methods: ['setFocus']
})
@Component({
  selector: 'cat-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checked', 'disabled', 'label', 'labelHidden', 'name', 'required', 'value']
})
export class CatRadio {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
  }
}


export declare interface CatScrollable extends Components.CatScrollable {
  /**
   * Emitted when the content is fully scrolled to the top. 
   */
  scrolledTop: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the content is fully scrolled to the left. 
   */
  scrolledLeft: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the content is fully scrolled to the right. 
   */
  scrolledRight: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the content is fully scrolled to the bottom. 
   */
  scrolledBottom: EventEmitter<CustomEvent<void>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['noOverflowX', 'noOverflowY', 'noOverscroll', 'noScrolledInit', 'noShadowX', 'noShadowY', 'scrolledBuffer']
})
@Component({
  selector: 'cat-scrollable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['noOverflowX', 'noOverflowY', 'noOverscroll', 'noScrolledInit', 'noShadowX', 'noShadowY', 'scrolledBuffer']
})
export class CatScrollable {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['scrolledTop', 'scrolledLeft', 'scrolledRight', 'scrolledBottom']);
  }
}


export declare interface CatSkeleton extends Components.CatSkeleton {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['effect', 'lines', 'size', 'variant']
})
@Component({
  selector: 'cat-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['effect', 'lines', 'size', 'variant']
})
export class CatSkeleton {
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


export declare interface CatTab extends Components.CatTab {
  /**
   * Emitted when tab is clicked. 
   */
  tabClick: EventEmitter<CustomEvent<MouseEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['deactivated', 'icon', 'iconOnly', 'iconRight', 'label', 'url', 'urlTarget']
})
@Component({
  selector: 'cat-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['deactivated', 'icon', 'iconOnly', 'iconRight', 'label', 'url', 'urlTarget']
})
export class CatTab {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabClick']);
  }
}


export declare interface CatTabs extends Components.CatTabs {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['activeTab', 'tabsAlign']
})
@Component({
  selector: 'cat-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['activeTab', 'tabsAlign']
})
export class CatTabs {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatTextarea extends Components.CatTextarea {
  /**
   * Emitted when the value is changed. 
   */
  catChange: EventEmitter<CustomEvent<any>>;
  /**
   * Emitted when the textarea received focus. 
   */
  catFocus: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when the textarea loses focus. 
   */
  catBlur: EventEmitter<CustomEvent<FocusEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disabled', 'hint', 'label', 'labelHidden', 'maxLength', 'minLength', 'name', 'placeholder', 'readonly', 'required', 'rows', 'value'],
  methods: ['setFocus']
})
@Component({
  selector: 'cat-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'hint', 'label', 'labelHidden', 'maxLength', 'minLength', 'name', 'placeholder', 'readonly', 'required', 'rows', 'value']
})
export class CatTextarea {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
  }
}


export declare interface CatToastDemo extends Components.CatToastDemo {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'cat-toast-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class CatToastDemo {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatToggle extends Components.CatToggle {
  /**
   * Emitted when the checked status of the toggle is changed. 
   */
  catChange: EventEmitter<CustomEvent<any>>;
  /**
   * Emitted when the toggle received focus. 
   */
  catFocus: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when the toggle loses focus. 
   */
  catBlur: EventEmitter<CustomEvent<FocusEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['checked', 'disabled', 'label', 'labelHidden', 'name', 'required', 'value'],
  methods: ['setFocus']
})
@Component({
  selector: 'cat-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checked', 'disabled', 'label', 'labelHidden', 'name', 'required', 'value']
})
export class CatToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
  }
}


export declare interface CatTooltip extends Components.CatTooltip {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['content', 'disabled', 'hideDelay', 'longTouchDuration', 'placement', 'showDelay']
})
@Component({
  selector: 'cat-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['content', 'disabled', 'hideDelay', 'longTouchDuration', 'placement', 'showDelay']
})
export class CatTooltip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
