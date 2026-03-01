/* tslint:disable */
/* auto-generated angular directive proxies */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  NgZone
} from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import { Components } from '@haiilo/catalyst';

@ProxyCmp({
  inputs: ['color', 'icon', 'noIcon']
})
@Component({
  selector: 'cat-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'icon', 'noIcon'],
  standalone: false
})
export class CatAlert {
  protected el: HTMLCatAlertElement;
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
  inputs: ['icon', 'initials', 'label', 'round', 'size', 'src', 'url', 'urlTarget'],
  standalone: false
})
export class CatAvatar {
  protected el: HTMLCatAvatarElement;
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
  inputs: ['color', 'icon', 'iconOnly', 'iconRight', 'pulse', 'round', 'size', 'variant'],
  standalone: false
})
export class CatBadge {
  protected el: HTMLCatBadgeElement;
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
    'inline',
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
    'inline',
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
  outputs: ['catClick', 'catFocus', 'catBlur'],
  standalone: false
})
export class CatButton {
  protected el: HTMLCatButtonElement;
  @Output() catClick = new EventEmitter<CustomEvent<MouseEvent>>();
  @Output() catFocus = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catBlur = new EventEmitter<CustomEvent<FocusEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
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
  inputs: ['a11yLabel']
})
@Component({
  selector: 'cat-button-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['a11yLabel'],
  standalone: false
})
export class CatButtonGroup {
  protected el: HTMLCatButtonGroupElement;
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
  inputs: [],
  outputs: ['catLoad'],
  standalone: false
})
export class CatCard {
  protected el: HTMLCatCardElement;
  @Output() catLoad = new EventEmitter<CustomEvent<FocusEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
  ],
  outputs: ['catChange', 'catFocus', 'catBlur'],
  standalone: false
})
export class CatCheckbox {
  protected el: HTMLCatCheckboxElement;
  @Output() catChange = new EventEmitter<CustomEvent<any>>();
  @Output() catFocus = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catBlur = new EventEmitter<CustomEvent<FocusEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
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
  ],
  outputs: ['catChange', 'catFocus', 'catBlur'],
  standalone: false
})
export class CatDate {
  protected el: HTMLCatDateElement;
  @Output() catChange = new EventEmitter<CustomEvent<string>>();
  @Output() catFocus = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catBlur = new EventEmitter<CustomEvent<FocusEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
  ],
  outputs: ['catChange'],
  standalone: false
})
export class CatDateInline {
  protected el: HTMLCatDateInlineElement;
  @Output() catChange = new EventEmitter<CustomEvent<string>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
  ],
  outputs: ['catChange', 'catFocus', 'catBlur'],
  standalone: false
})
export class CatDatepicker {
  protected el: HTMLCatDatepickerElement;
  @Output() catChange = new EventEmitter<CustomEvent<string>>();
  @Output() catFocus = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catBlur = new EventEmitter<CustomEvent<FocusEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
  inputs: ['disabled', 'max', 'min', 'mode', 'nativePickerAttributes', 'readonly', 'step', 'value'],
  outputs: ['catChange'],
  standalone: false
})
export class CatDatepickerInline {
  protected el: HTMLCatDatepickerInlineElement;
  @Output() catChange = new EventEmitter<CustomEvent<string>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
    'delayedTriggerInit',
    'isOpen',
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
    'delayedTriggerInit',
    'isOpen',
    'justify',
    'noAutoClose',
    'noInitialFocus',
    'noResize',
    'noReturnFocus',
    'overflow',
    'placement'
  ],
  outputs: ['catOpen', 'catClose'],
  standalone: false
})
export class CatDropdown {
  protected el: HTMLCatDropdownElement;
  @Output() catOpen = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catClose = new EventEmitter<CustomEvent<FocusEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
  inputs: ['horizontal', 'labelSize', 'requiredMarker'],
  standalone: false
})
export class CatFormGroup {
  protected el: HTMLCatFormGroupElement;
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
  inputs: ['a11yLabel', 'icon', 'iconSrc', 'size'],
  standalone: false
})
export class CatIcon {
  protected el: HTMLCatIconElement;
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
    'accept',
    'autoComplete',
    'clearable',
    'dateMaskOptions',
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
    'multiple',
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
    'timeMaskOptions',
    'togglePassword',
    'type',
    'value'
  ],
  methods: ['doFocus', 'doBlur', 'clear']
})
@Component({
  selector: 'cat-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'accept',
    'autoComplete',
    'clearable',
    'dateMaskOptions',
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
    'multiple',
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
    'timeMaskOptions',
    'togglePassword',
    'type',
    'value'
  ],
  outputs: ['catChange', 'catFocus', 'catBlur', 'catChangeFiles'],
  standalone: false
})
export class CatInput {
  protected el: HTMLCatInputElement;
  @Output() catChange = new EventEmitter<CustomEvent<string>>();
  @Output() catFocus = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catBlur = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catChangeFiles = new EventEmitter<CustomEvent<FileList | null>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
  /**
   * Emitted if the input type is "file" and files are selected.
   */
  catChangeFiles: EventEmitter<CustomEvent<FileList | null>>;
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
  ],
  outputs: ['catChange'],
  standalone: false
})
export class CatPagination {
  protected el: HTMLCatPaginationElement;
  @Output() catChange = new EventEmitter<CustomEvent<number>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
  ],
  outputs: ['catChange', 'catFocus', 'catBlur'],
  standalone: false
})
export class CatRadio {
  protected el: HTMLCatRadioElement;
  @Output() catChange = new EventEmitter<CustomEvent<boolean | string>>();
  @Output() catFocus = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catBlur = new EventEmitter<CustomEvent<FocusEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
  inputs: ['a11yLabel', 'disabled', 'labelLeft', 'name', 'value'],
  outputs: ['catChange', 'catFocus', 'catBlur'],
  standalone: false
})
export class CatRadioGroup {
  protected el: HTMLCatRadioGroupElement;
  @Output() catChange = new EventEmitter<CustomEvent<boolean | string>>();
  @Output() catFocus = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catBlur = new EventEmitter<CustomEvent<FocusEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
  inputs: ['noOverflowX', 'noOverflowY', 'noOverscroll', 'noScrolledInit', 'noShadowX', 'noShadowY', 'scrolledBuffer'],
  outputs: ['scrolledTop', 'scrolledLeft', 'scrolledRight', 'scrolledBottom'],
  standalone: false
})
export class CatScrollable {
  protected el: HTMLCatScrollableElement;
  @Output() scrolledTop = new EventEmitter<CustomEvent<void>>();
  @Output() scrolledLeft = new EventEmitter<CustomEvent<void>>();
  @Output() scrolledRight = new EventEmitter<CustomEvent<void>>();
  @Output() scrolledBottom = new EventEmitter<CustomEvent<void>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
  ],
  outputs: ['catOpen', 'catClose', 'catChange', 'catBlur'],
  standalone: false
})
export class CatSelect {
  protected el: HTMLCatSelectElement;
  @Output() catOpen = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catClose = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catChange = new EventEmitter<CustomEvent<InputEvent>>();
  @Output() catBlur = new EventEmitter<CustomEvent<FocusEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
  inputs: [],
  standalone: false
})
export class CatSelectDemo {
  protected el: HTMLCatSelectDemoElement;
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
  inputs: ['effect', 'lines', 'size', 'variant'],
  standalone: false
})
export class CatSkeleton {
  protected el: HTMLCatSkeletonElement;
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
  inputs: ['a11yLabel', 'size', 'value'],
  standalone: false
})
export class CatSpinner {
  protected el: HTMLCatSpinnerElement;
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
    'sticky',
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
    'sticky',
    'testId',
    'url',
    'urlTarget'
  ],
  outputs: ['catClick'],
  standalone: false
})
export class CatTab {
  protected el: HTMLCatTabElement;
  @Output() catClick = new EventEmitter<CustomEvent<MouseEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CatTab extends Components.CatTab {
  /**
   * Emitted when tab is clicked.
   */
  catClick: EventEmitter<CustomEvent<MouseEvent>>;
}

@ProxyCmp({
  inputs: ['activeTab', 'activeTabAlwaysVisible', 'adaptive', 'tabsAlign'],
  methods: ['setActive', 'setActiveIndex', 'updateAdaptiveTabs']
})
@Component({
  selector: 'cat-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activeTab', 'activeTabAlwaysVisible', 'adaptive', 'tabsAlign'],
  outputs: ['catChange'],
  standalone: false
})
export class CatTabs {
  protected el: HTMLCatTabsElement;
  @Output() catChange = new EventEmitter<CustomEvent<{ id: string; index: number; fromDropdown: boolean }>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CatTabs extends Components.CatTabs {
  /**
   * Emitted when active tab is changed.
   */
  catChange: EventEmitter<CustomEvent<{ id: string; index: number; fromDropdown: boolean }>>;
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
  ],
  outputs: ['catChange', 'catFocus', 'catBlur'],
  standalone: false
})
export class CatTag {
  protected el: HTMLCatTagElement;
  @Output() catChange = new EventEmitter<CustomEvent<string[]>>();
  @Output() catFocus = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catBlur = new EventEmitter<CustomEvent<FocusEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
  ],
  outputs: ['catChange', 'catFocus', 'catBlur'],
  standalone: false
})
export class CatTextarea {
  protected el: HTMLCatTextareaElement;
  @Output() catChange = new EventEmitter<CustomEvent<string>>();
  @Output() catFocus = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catBlur = new EventEmitter<CustomEvent<FocusEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
  ],
  outputs: ['catChange', 'catFocus', 'catBlur'],
  standalone: false
})
export class CatTime {
  protected el: HTMLCatTimeElement;
  @Output() catChange = new EventEmitter<CustomEvent<string>>();
  @Output() catFocus = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catBlur = new EventEmitter<CustomEvent<FocusEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
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
  ],
  outputs: ['catChange', 'catFocus', 'catBlur'],
  standalone: false
})
export class CatToggle {
  protected el: HTMLCatToggleElement;
  @Output() catChange = new EventEmitter<CustomEvent<any>>();
  @Output() catFocus = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() catBlur = new EventEmitter<CustomEvent<FocusEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
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
  inputs: ['content', 'disabled', 'hideDelay', 'longTouchDuration', 'placement', 'round', 'showDelay', 'size']
})
@Component({
  selector: 'cat-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['content', 'disabled', 'hideDelay', 'longTouchDuration', 'placement', 'round', 'showDelay', 'size'],
  standalone: false
})
export class CatTooltip {
  protected el: HTMLCatTooltipElement;
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
