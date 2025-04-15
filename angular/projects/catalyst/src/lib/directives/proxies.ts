/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@haiilo/catalyst';

@ProxyCmp({
  inputs: ['color', 'icon', 'noIcon']
})
@Component({
  selector: 'cat-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'icon', 'noIcon']
})
export class CatAlert {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CatAlert extends Components.CatAlert {}

@ProxyCmp({
  inputs: ['icon', 'initials', 'label', 'round', 'size', 'src', 'url', 'urlTarget']
})
@Component({
  selector: 'cat-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['icon', 'initials', 'label', 'round', 'size', 'src', 'url', 'urlTarget']
})
export class CatAvatar {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CatAvatar extends Components.CatAvatar {}

@ProxyCmp({
  inputs: ['color', 'icon', 'iconOnly', 'iconRight', 'pulse', 'round', 'size', 'variant']
})
@Component({
  selector: 'cat-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'icon', 'iconOnly', 'iconRight', 'pulse', 'round', 'size', 'variant']
})
export class CatBadge {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CatBadge extends Components.CatBadge {}

@ProxyCmp({
  inputs: [
    'a11yCurrent',
    'a11yLabel',
    'active',
    'buttonGroupPosition',
    'buttonId',
    'color',
    'disabled',
    'icon',
    'iconOnly',
    'iconRight',
    'loading',
    'name',
    'nativeAttributes',
    'nativeContentAttributes',
    'noEllipsis',
    'round',
    'size',
    'submit',
    'testId',
    'url',
    'urlTarget',
    'value',
    'variant'
  ],
  methods: ['doFocus', 'doBlur', 'doClick']
})
@Component({
  selector: 'cat-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'a11yCurrent',
    'a11yLabel',
    'active',
    'buttonGroupPosition',
    'buttonId',
    'color',
    'disabled',
    'icon',
    'iconOnly',
    'iconRight',
    'loading',
    'name',
    'nativeAttributes',
    'nativeContentAttributes',
    'noEllipsis',
    'round',
    'size',
    'submit',
    'testId',
    'url',
    'urlTarget',
    'value',
    'variant'
  ]
})
export class CatButton {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catClick', 'catFocus', 'catBlur']);
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
  inputs: ['a11yLabel']
})
@Component({
  selector: 'cat-button-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['a11yLabel']
})
export class CatButtonGroup {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CatButtonGroup extends Components.CatButtonGroup {}

@ProxyCmp({})
@Component({
  selector: 'cat-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: []
})
export class CatCard {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catLoad']);
  }
}

export declare interface CatCard extends Components.CatCard {
  /**
   * Emitted when the card and all the children are fully loaded.
   */
  catLoad: EventEmitter<CustomEvent<FocusEvent>>;
}

@ProxyCmp({
  inputs: [
    'alignment',
    'checked',
    'disabled',
    'hint',
    'identifier',
    'indeterminate',
    'label',
    'labelHidden',
    'labelLeft',
    'name',
    'nativeAttributes',
    'noValue',
    'required',
    'requiredMarker',
    'resolvedValue',
    'testId',
    'value'
  ],
  methods: ['doFocus', 'doBlur']
})
@Component({
  selector: 'cat-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'alignment',
    'checked',
    'disabled',
    'hint',
    'identifier',
    'indeterminate',
    'label',
    'labelHidden',
    'labelLeft',
    'name',
    'nativeAttributes',
    'noValue',
    'required',
    'requiredMarker',
    'resolvedValue',
    'testId',
    'value'
  ]
})
export class CatCheckbox {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
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
  inputs: [
    'autoComplete',
    'clearable',
    'disabled',
    'errorUpdate',
    'errors',
    'hint',
    'horizontal',
    'icon',
    'iconRight',
    'identifier',
    'label',
    'labelHidden',
    'max',
    'min',
    'name',
    'nativeAttributes',
    'placeholder',
    'placement',
    'readonly',
    'required',
    'requiredMarker',
    'testId',
    'textPrefix',
    'textSuffix',
    'value'
  ],
  methods: ['doFocus', 'doBlur', 'clear']
})
@Component({
  selector: 'cat-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'autoComplete',
    'clearable',
    'disabled',
    'errorUpdate',
    'errors',
    'hint',
    'horizontal',
    'icon',
    'iconRight',
    'identifier',
    'label',
    'labelHidden',
    'max',
    'min',
    'name',
    'nativeAttributes',
    'placeholder',
    'placement',
    'readonly',
    'required',
    'requiredMarker',
    'testId',
    'textPrefix',
    'textSuffix',
    'value'
  ]
})
export class CatDate {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
  }
}

export declare interface CatDate extends Components.CatDate {
  /**
   * Emitted when the value is changed.
   */
  catChange: EventEmitter<CustomEvent<string>>;
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
  inputs: [
    'a11yLabel',
    'hint',
    'identifier',
    'label',
    'labelHidden',
    'max',
    'min',
    'noClear',
    'noToday',
    'range',
    'required',
    'requiredMarker',
    'value',
    'weeks'
  ],
  methods: ['select', 'clear', 'resetView', 'doFocus']
})
@Component({
  selector: 'cat-date-inline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'a11yLabel',
    'hint',
    'identifier',
    'label',
    'labelHidden',
    'max',
    'min',
    'noClear',
    'noToday',
    'range',
    'required',
    'requiredMarker',
    'value',
    'weeks'
  ]
})
export class CatDateInline {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange']);
  }
}

export declare interface CatDateInline extends Components.CatDateInline {
  /**
   * Emitted when the value is changed.
   */
  catChange: EventEmitter<CustomEvent<string>>;
}

@ProxyCmp({
  inputs: [
    'attachToElement',
    'autoComplete',
    'clearable',
    'disabled',
    'errorUpdate',
    'errors',
    'hint',
    'horizontal',
    'icon',
    'iconRight',
    'identifier',
    'label',
    'labelHidden',
    'max',
    'min',
    'mode',
    'name',
    'nativeAttributes',
    'nativePickerAttributes',
    'placeholder',
    'position',
    'readonly',
    'required',
    'requiredMarker',
    'step',
    'textPrefix',
    'textSuffix',
    'value'
  ],
  methods: ['doFocus', 'doBlur']
})
@Component({
  selector: 'cat-datepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'attachToElement',
    'autoComplete',
    'clearable',
    'disabled',
    'errorUpdate',
    'errors',
    'hint',
    'horizontal',
    'icon',
    'iconRight',
    'identifier',
    'label',
    'labelHidden',
    'max',
    'min',
    'mode',
    'name',
    'nativeAttributes',
    'nativePickerAttributes',
    'placeholder',
    'position',
    'readonly',
    'required',
    'requiredMarker',
    'step',
    'textPrefix',
    'textSuffix',
    'value'
  ]
})
export class CatDatepicker {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
  }
}

export declare interface CatDatepicker extends Components.CatDatepicker {
  /**
   * Emitted when the value is changed.
   */
  catChange: EventEmitter<CustomEvent<string>>;
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
  inputs: ['disabled', 'max', 'min', 'mode', 'nativePickerAttributes', 'readonly', 'step', 'value']
})
@Component({
  selector: 'cat-datepicker-inline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'max', 'min', 'mode', 'nativePickerAttributes', 'readonly', 'step', 'value']
})
export class CatDatepickerInline {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange']);
  }
}

export declare interface CatDatepickerInline extends Components.CatDatepickerInline {
  /**
   * Emitted when the value is changed.
   */
  catChange: EventEmitter<CustomEvent<string>>;
}

@ProxyCmp({
  inputs: [
    'arrowNavigation',
    'justify',
    'noAutoClose',
    'noInitialFocus',
    'noResize',
    'noReturnFocus',
    'overflow',
    'placement'
  ],
  methods: ['toggle', 'open', 'close']
})
@Component({
  selector: 'cat-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'arrowNavigation',
    'justify',
    'noAutoClose',
    'noInitialFocus',
    'noResize',
    'noReturnFocus',
    'overflow',
    'placement'
  ]
})
export class CatDropdown {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catOpen', 'catClose']);
  }
}

export declare interface CatDropdown extends Components.CatDropdown {
  /**
   * Emitted when the dropdown is opened.
   */
  catOpen: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when the dropdown is closed.
   */
  catClose: EventEmitter<CustomEvent<FocusEvent>>;
}

@ProxyCmp({
  inputs: ['horizontal', 'labelSize', 'requiredMarker']
})
@Component({
  selector: 'cat-form-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['horizontal', 'labelSize', 'requiredMarker']
})
export class CatFormGroup {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CatFormGroup extends Components.CatFormGroup {}

@ProxyCmp({
  inputs: ['a11yLabel', 'icon', 'iconSrc', 'size']
})
@Component({
  selector: 'cat-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['a11yLabel', 'icon', 'iconSrc', 'size']
})
export class CatIcon {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CatIcon extends Components.CatIcon {}

@ProxyCmp({
  inputs: [
    'autoComplete',
    'clearable',
    'disabled',
    'errorUpdate',
    'errors',
    'hint',
    'horizontal',
    'icon',
    'iconRight',
    'identifier',
    'label',
    'labelHidden',
    'loading',
    'max',
    'maxLength',
    'min',
    'minLength',
    'name',
    'nativeAttributes',
    'placeholder',
    'readonly',
    'required',
    'requiredMarker',
    'round',
    'testId',
    'textPrefix',
    'textSuffix',
    'togglePassword',
    'type',
    'value'
  ],
  methods: ['doFocus', 'doBlur', 'clear', 'mask']
})
@Component({
  selector: 'cat-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'autoComplete',
    'clearable',
    'disabled',
    'errorUpdate',
    'errors',
    'hint',
    'horizontal',
    'icon',
    'iconRight',
    'identifier',
    'label',
    'labelHidden',
    'loading',
    'max',
    'maxLength',
    'min',
    'minLength',
    'name',
    'nativeAttributes',
    'placeholder',
    'readonly',
    'required',
    'requiredMarker',
    'round',
    'testId',
    'textPrefix',
    'textSuffix',
    'togglePassword',
    'type',
    'value'
  ]
})
export class CatInput {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
  }
}

export declare interface CatInput extends Components.CatInput {
  /**
   * Emitted when the value is changed.
   */
  catChange: EventEmitter<CustomEvent<string>>;
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
  inputs: [
    'activePadding',
    'compact',
    'iconNext',
    'iconPrev',
    'page',
    'pageCount',
    'round',
    'sidePadding',
    'size',
    'variant'
  ]
})
@Component({
  selector: 'cat-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'activePadding',
    'compact',
    'iconNext',
    'iconPrev',
    'page',
    'pageCount',
    'round',
    'sidePadding',
    'size',
    'variant'
  ]
})
export class CatPagination {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange']);
  }
}

export declare interface CatPagination extends Components.CatPagination {
  /**
   * Emitted when the page of the pagination has changed.
   */
  catChange: EventEmitter<CustomEvent<number>>;
}

@ProxyCmp({
  inputs: [
    'alignment',
    'checked',
    'disabled',
    'hint',
    'identifier',
    'label',
    'labelHidden',
    'labelLeft',
    'name',
    'nativeAttributes',
    'required',
    'testId',
    'value'
  ],
  methods: ['doFocus', 'doBlur']
})
@Component({
  selector: 'cat-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'alignment',
    'checked',
    'disabled',
    'hint',
    'identifier',
    'label',
    'labelHidden',
    'labelLeft',
    'name',
    'nativeAttributes',
    'required',
    'testId',
    'value'
  ]
})
export class CatRadio {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
  }
}

export declare interface CatRadio extends Components.CatRadio {
  /**
   * Emitted when the radio is changed.
   */
  catChange: EventEmitter<CustomEvent<boolean | string>>;
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
  inputs: ['a11yLabel', 'disabled', 'labelLeft', 'name', 'value']
})
@Component({
  selector: 'cat-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['a11yLabel', 'disabled', 'labelLeft', 'name', 'value']
})
export class CatRadioGroup {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
  }
}

export declare interface CatRadioGroup extends Components.CatRadioGroup {
  /**
   * Emitted when the value is changed.
   */
  catChange: EventEmitter<CustomEvent<boolean | string>>;
  /**
   * Emitted when the radio group received focus.
   */
  catFocus: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when the radio group loses focus.
   */
  catBlur: EventEmitter<CustomEvent<FocusEvent>>;
}

@ProxyCmp({
  inputs: ['noOverflowX', 'noOverflowY', 'noOverscroll', 'noScrolledInit', 'noShadowX', 'noShadowY', 'scrolledBuffer']
})
@Component({
  selector: 'cat-scrollable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['noOverflowX', 'noOverflowY', 'noOverscroll', 'noScrolledInit', 'noShadowX', 'noShadowY', 'scrolledBuffer']
})
export class CatScrollable {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['scrolledTop', 'scrolledLeft', 'scrolledRight', 'scrolledBottom']);
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
  inputs: [
    'clearable',
    'debounce',
    'disabled',
    'errorUpdate',
    'errors',
    'hint',
    'horizontal',
    'identifier',
    'label',
    'labelHidden',
    'multiple',
    'name',
    'nativeAttributes',
    'noItems',
    'placeholder',
    'placement',
    'required',
    'requiredMarker',
    'tagHint',
    'tags',
    'testId',
    'value'
  ],
  methods: ['doFocus', 'doBlur', 'clear', 'connect']
})
@Component({
  selector: 'cat-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'clearable',
    'debounce',
    'disabled',
    'errorUpdate',
    'errors',
    'hint',
    'horizontal',
    'identifier',
    'label',
    'labelHidden',
    'multiple',
    'name',
    'nativeAttributes',
    'noItems',
    'placeholder',
    'placement',
    'required',
    'requiredMarker',
    'tagHint',
    'tags',
    'testId',
    'value'
  ]
})
export class CatSelect {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catOpen', 'catClose', 'catChange', 'catBlur']);
  }
}

export declare interface CatSelect extends Components.CatSelect {
  /**
   * Emitted when the select dropdown is opened.
   */
  catOpen: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when the select dropdown is closed.
   */
  catClose: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when the value is changed.
   */
  catChange: EventEmitter<CustomEvent<InputEvent>>;
  /**
   * Emitted when the select loses the focus.
   */
  catBlur: EventEmitter<CustomEvent<FocusEvent>>;
}

@ProxyCmp({})
@Component({
  selector: 'cat-select-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: []
})
export class CatSelectDemo {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CatSelectDemo extends Components.CatSelectDemo {}

@ProxyCmp({
  inputs: ['effect', 'lines', 'size', 'variant']
})
@Component({
  selector: 'cat-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['effect', 'lines', 'size', 'variant']
})
export class CatSkeleton {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CatSkeleton extends Components.CatSkeleton {}

@ProxyCmp({
  inputs: ['a11yLabel', 'size', 'value']
})
@Component({
  selector: 'cat-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['a11yLabel', 'size', 'value']
})
export class CatSpinner {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CatSpinner extends Components.CatSpinner {}

@ProxyCmp({
  inputs: [
    'deactivated',
    'error',
    'icon',
    'iconOnly',
    'iconRight',
    'label',
    'nativeAttributes',
    'noActive',
    'testId',
    'url',
    'urlTarget'
  ]
})
@Component({
  selector: 'cat-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'deactivated',
    'error',
    'icon',
    'iconOnly',
    'iconRight',
    'label',
    'nativeAttributes',
    'noActive',
    'testId',
    'url',
    'urlTarget'
  ]
})
export class CatTab {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catClick']);
  }
}

export declare interface CatTab extends Components.CatTab {
  /**
   * Emitted when tab is clicked.
   */
  catClick: EventEmitter<CustomEvent<MouseEvent>>;
}

@ProxyCmp({
  inputs: ['activeTab', 'tabsAlign'],
  methods: ['setActive', 'setActiveIndex']
})
@Component({
  selector: 'cat-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activeTab', 'tabsAlign']
})
export class CatTabs {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange']);
  }
}

export declare interface CatTabs extends Components.CatTabs {
  /**
   * Emitted when active tab is changed.
   */
  catChange: EventEmitter<CustomEvent<{ id: string; index: number }>>;
}

@ProxyCmp({
  inputs: [
    'addOnBlur',
    'clearable',
    'disabled',
    'errorUpdate',
    'errors',
    'hint',
    'identifier',
    'label',
    'labelHidden',
    'name',
    'nativeAttributes',
    'placeholder',
    'required',
    'requiredMarker',
    'tagCreationChars',
    'testId',
    'value'
  ]
})
@Component({
  selector: 'cat-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'addOnBlur',
    'clearable',
    'disabled',
    'errorUpdate',
    'errors',
    'hint',
    'identifier',
    'label',
    'labelHidden',
    'name',
    'nativeAttributes',
    'placeholder',
    'required',
    'requiredMarker',
    'tagCreationChars',
    'testId',
    'value'
  ]
})
export class CatTag {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
  }
}

export declare interface CatTag extends Components.CatTag {
  /**
   * Emitted when the value is changed.
   */
  catChange: EventEmitter<CustomEvent<string[]>>;
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
  inputs: [
    'autoComplete',
    'disabled',
    'errorUpdate',
    'errors',
    'hint',
    'horizontal',
    'identifier',
    'label',
    'labelHidden',
    'maxLength',
    'minLength',
    'name',
    'nativeAttributes',
    'placeholder',
    'readonly',
    'required',
    'requiredMarker',
    'rows',
    'testId',
    'value'
  ],
  methods: ['doFocus', 'doBlur', 'clear']
})
@Component({
  selector: 'cat-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'autoComplete',
    'disabled',
    'errorUpdate',
    'errors',
    'hint',
    'horizontal',
    'identifier',
    'label',
    'labelHidden',
    'maxLength',
    'minLength',
    'name',
    'nativeAttributes',
    'placeholder',
    'readonly',
    'required',
    'requiredMarker',
    'rows',
    'testId',
    'value'
  ]
})
export class CatTextarea {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
  }
}

export declare interface CatTextarea extends Components.CatTextarea {
  /**
   * Emitted when the value is changed.
   */
  catChange: EventEmitter<CustomEvent<string>>;
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
  inputs: [
    'autoComplete',
    'clearable',
    'disabled',
    'errorUpdate',
    'errors',
    'hint',
    'horizontal',
    'icon',
    'iconRight',
    'identifier',
    'label',
    'labelHidden',
    'max',
    'min',
    'name',
    'nativeAttributes',
    'placeholder',
    'placement',
    'readonly',
    'required',
    'requiredMarker',
    'step',
    'testId',
    'textPrefix',
    'textSuffix',
    'value'
  ],
  methods: ['select', 'doFocus', 'doBlur', 'clear']
})
@Component({
  selector: 'cat-time',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'autoComplete',
    'clearable',
    'disabled',
    'errorUpdate',
    'errors',
    'hint',
    'horizontal',
    'icon',
    'iconRight',
    'identifier',
    'label',
    'labelHidden',
    'max',
    'min',
    'name',
    'nativeAttributes',
    'placeholder',
    'placement',
    'readonly',
    'required',
    'requiredMarker',
    'step',
    'testId',
    'textPrefix',
    'textSuffix',
    'value'
  ]
})
export class CatTime {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
  }
}

export declare interface CatTime extends Components.CatTime {
  /**
   * Emitted when the value is changed.
   */
  catChange: EventEmitter<CustomEvent<string>>;
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
  inputs: [
    'alignment',
    'checked',
    'disabled',
    'hint',
    'identifier',
    'label',
    'labelHidden',
    'labelLeft',
    'name',
    'nativeAttributes',
    'noValue',
    'required',
    'resolvedValue',
    'testId',
    'value'
  ],
  methods: ['doFocus', 'doBlur']
})
@Component({
  selector: 'cat-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'alignment',
    'checked',
    'disabled',
    'hint',
    'identifier',
    'label',
    'labelHidden',
    'labelLeft',
    'name',
    'nativeAttributes',
    'noValue',
    'required',
    'resolvedValue',
    'testId',
    'value'
  ]
})
export class CatToggle {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['catChange', 'catFocus', 'catBlur']);
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
  inputs: ['content', 'disabled', 'hideDelay', 'longTouchDuration', 'placement', 'round', 'showDelay', 'size']
})
@Component({
  selector: 'cat-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['content', 'disabled', 'hideDelay', 'longTouchDuration', 'placement', 'round', 'showDelay', 'size']
})
export class CatTooltip {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CatTooltip extends Components.CatTooltip {}
