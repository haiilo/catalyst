/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components } from '@haiilo/catalyst/components';

import { defineCustomElement as defineCatAlert } from '@haiilo/catalyst/components/cat-alert.js';
import { defineCustomElement as defineCatAvatar } from '@haiilo/catalyst/components/cat-avatar.js';
import { defineCustomElement as defineCatBadge } from '@haiilo/catalyst/components/cat-badge.js';
import { defineCustomElement as defineCatButton } from '@haiilo/catalyst/components/cat-button.js';
import { defineCustomElement as defineCatButtonGroup } from '@haiilo/catalyst/components/cat-button-group.js';
import { defineCustomElement as defineCatCard } from '@haiilo/catalyst/components/cat-card.js';
import { defineCustomElement as defineCatCheckbox } from '@haiilo/catalyst/components/cat-checkbox.js';
import { defineCustomElement as defineCatDatepicker } from '@haiilo/catalyst/components/cat-datepicker.js';
import { defineCustomElement as defineCatDatepickerInline } from '@haiilo/catalyst/components/cat-datepicker-inline.js';
import { defineCustomElement as defineCatDropdown } from '@haiilo/catalyst/components/cat-dropdown.js';
import { defineCustomElement as defineCatFormGroup } from '@haiilo/catalyst/components/cat-form-group.js';
import { defineCustomElement as defineCatIcon } from '@haiilo/catalyst/components/cat-icon.js';
import { defineCustomElement as defineCatInput } from '@haiilo/catalyst/components/cat-input.js';
import { defineCustomElement as defineCatPagination } from '@haiilo/catalyst/components/cat-pagination.js';
import { defineCustomElement as defineCatRadio } from '@haiilo/catalyst/components/cat-radio.js';
import { defineCustomElement as defineCatRadioGroup } from '@haiilo/catalyst/components/cat-radio-group.js';
import { defineCustomElement as defineCatScrollable } from '@haiilo/catalyst/components/cat-scrollable.js';
import { defineCustomElement as defineCatSelect } from '@haiilo/catalyst/components/cat-select.js';
import { defineCustomElement as defineCatSelectDemo } from '@haiilo/catalyst/components/cat-select-demo.js';
import { defineCustomElement as defineCatSkeleton } from '@haiilo/catalyst/components/cat-skeleton.js';
import { defineCustomElement as defineCatSpinner } from '@haiilo/catalyst/components/cat-spinner.js';
import { defineCustomElement as defineCatTab } from '@haiilo/catalyst/components/cat-tab.js';
import { defineCustomElement as defineCatTabs } from '@haiilo/catalyst/components/cat-tabs.js';
import { defineCustomElement as defineCatTextarea } from '@haiilo/catalyst/components/cat-textarea.js';
import { defineCustomElement as defineCatToggle } from '@haiilo/catalyst/components/cat-toggle.js';
import { defineCustomElement as defineCatTooltip } from '@haiilo/catalyst/components/cat-tooltip.js';
@ProxyCmp({
  defineCustomElementFn: defineCatAlert,
  inputs: ['color', 'icon', 'noIcon']
})
@Component({
  selector: 'cat-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'icon', 'noIcon'],
  standalone: true
})
export class CatAlert {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatAlert extends Components.CatAlert {}


@ProxyCmp({
  defineCustomElementFn: defineCatAvatar,
  inputs: ['icon', 'initials', 'label', 'round', 'size', 'src', 'url', 'urlTarget']
})
@Component({
  selector: 'cat-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['icon', 'initials', 'label', 'round', 'size', 'src', 'url', 'urlTarget'],
  standalone: true
})
export class CatAvatar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatAvatar extends Components.CatAvatar {}


@ProxyCmp({
  defineCustomElementFn: defineCatBadge,
  inputs: ['color', 'pulse', 'round', 'size', 'variant']
})
@Component({
  selector: 'cat-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'pulse', 'round', 'size', 'variant'],
  standalone: true
})
export class CatBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatBadge extends Components.CatBadge {}


@ProxyCmp({
  defineCustomElementFn: defineCatButton,
  inputs: ['a11yCurrent', 'a11yLabel', 'active', 'buttonGroupPosition', 'buttonId', 'color', 'disabled', 'icon', 'iconOnly', 'iconRight', 'loading', 'name', 'nativeAttributes', 'nativeContentAttributes', 'noEllipsis', 'round', 'size', 'submit', 'url', 'urlTarget', 'value', 'variant'],
  methods: ['doFocus', 'doBlur', 'doClick']
})
@Component({
  selector: 'cat-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['a11yCurrent', 'a11yLabel', 'active', 'buttonGroupPosition', 'buttonId', 'color', 'disabled', 'icon', 'iconOnly', 'iconRight', 'loading', 'name', 'nativeAttributes', 'nativeContentAttributes', 'noEllipsis', 'round', 'size', 'submit', 'url', 'urlTarget', 'value', 'variant'],
  standalone: true
})
export class CatButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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
  defineCustomElementFn: defineCatButtonGroup,
  inputs: ['a11yLabel']
})
@Component({
  selector: 'cat-button-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['a11yLabel'],
  standalone: true
})
export class CatButtonGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatButtonGroup extends Components.CatButtonGroup {}


@ProxyCmp({
  defineCustomElementFn: defineCatCard
})
@Component({
  selector: 'cat-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class CatCard {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatCard extends Components.CatCard {}


@ProxyCmp({
  defineCustomElementFn: defineCatCheckbox,
  inputs: ['checked', 'disabled', 'hint', 'identifier', 'indeterminate', 'label', 'labelHidden', 'labelLeft', 'name', 'nativeAttributes', 'noValue', 'required', 'resolvedValue', 'value'],
  methods: ['doFocus', 'doBlur']
})
@Component({
  selector: 'cat-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'hint', 'identifier', 'indeterminate', 'label', 'labelHidden', 'labelLeft', 'name', 'nativeAttributes', 'noValue', 'required', 'resolvedValue', 'value'],
  standalone: true
})
export class CatCheckbox {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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
  defineCustomElementFn: defineCatDatepicker,
  inputs: ['autoComplete', 'clearable', 'disabled', 'errorUpdate', 'errors', 'hint', 'horizontal', 'icon', 'iconRight', 'identifier', 'label', 'labelHidden', 'max', 'min', 'mode', 'name', 'nativeAttributes', 'nativePickerAttributes', 'placeholder', 'readonly', 'required', 'requiredMarker', 'step', 'textPrefix', 'textSuffix', 'value'],
  methods: ['doFocus', 'doBlur']
})
@Component({
  selector: 'cat-datepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoComplete', 'clearable', 'disabled', 'errorUpdate', 'errors', 'hint', 'horizontal', 'icon', 'iconRight', 'identifier', 'label', 'labelHidden', 'max', 'min', 'mode', 'name', 'nativeAttributes', 'nativePickerAttributes', 'placeholder', 'readonly', 'required', 'requiredMarker', 'step', 'textPrefix', 'textSuffix', 'value'],
  standalone: true
})
export class CatDatepicker {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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
  defineCustomElementFn: defineCatDatepickerInline,
  inputs: ['disabled', 'max', 'min', 'mode', 'nativePickerAttributes', 'readonly', 'step', 'value']
})
@Component({
  selector: 'cat-datepicker-inline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'max', 'min', 'mode', 'nativePickerAttributes', 'readonly', 'step', 'value'],
  standalone: true
})
export class CatDatepickerInline {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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
  defineCustomElementFn: defineCatDropdown,
  inputs: ['noAutoClose', 'overflow', 'placement'],
  methods: ['close']
})
@Component({
  selector: 'cat-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['noAutoClose', 'overflow', 'placement'],
  standalone: true
})
export class CatDropdown {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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
  defineCustomElementFn: defineCatFormGroup,
  inputs: ['horizontal', 'labelSize', 'requiredMarker']
})
@Component({
  selector: 'cat-form-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['horizontal', 'labelSize', 'requiredMarker'],
  standalone: true
})
export class CatFormGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatFormGroup extends Components.CatFormGroup {}


@ProxyCmp({
  defineCustomElementFn: defineCatIcon,
  inputs: ['a11yLabel', 'icon', 'iconSrc', 'size']
})
@Component({
  selector: 'cat-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['a11yLabel', 'icon', 'iconSrc', 'size'],
  standalone: true
})
export class CatIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatIcon extends Components.CatIcon {}


@ProxyCmp({
  defineCustomElementFn: defineCatInput,
  inputs: ['autoComplete', 'clearable', 'disabled', 'errorUpdate', 'errors', 'hint', 'horizontal', 'icon', 'iconRight', 'identifier', 'label', 'labelHidden', 'max', 'maxLength', 'min', 'minLength', 'name', 'nativeAttributes', 'placeholder', 'readonly', 'required', 'requiredMarker', 'round', 'textPrefix', 'textSuffix', 'togglePassword', 'type', 'value'],
  methods: ['doFocus', 'doBlur', 'clear']
})
@Component({
  selector: 'cat-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoComplete', 'clearable', 'disabled', 'errorUpdate', 'errors', 'hint', 'horizontal', 'icon', 'iconRight', 'identifier', 'label', 'labelHidden', 'max', 'maxLength', 'min', 'minLength', 'name', 'nativeAttributes', 'placeholder', 'readonly', 'required', 'requiredMarker', 'round', 'textPrefix', 'textSuffix', 'togglePassword', 'type', 'value'],
  standalone: true
})
export class CatInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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
  defineCustomElementFn: defineCatPagination,
  inputs: ['activePadding', 'compact', 'iconNext', 'iconPrev', 'page', 'pageCount', 'round', 'sidePadding', 'size', 'variant']
})
@Component({
  selector: 'cat-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activePadding', 'compact', 'iconNext', 'iconPrev', 'page', 'pageCount', 'round', 'sidePadding', 'size', 'variant'],
  standalone: true
})
export class CatPagination {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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
  defineCustomElementFn: defineCatRadio,
  inputs: ['checked', 'disabled', 'hint', 'identifier', 'label', 'labelHidden', 'labelLeft', 'name', 'nativeAttributes', 'required', 'value'],
  methods: ['doFocus', 'doBlur']
})
@Component({
  selector: 'cat-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'hint', 'identifier', 'label', 'labelHidden', 'labelLeft', 'name', 'nativeAttributes', 'required', 'value'],
  standalone: true
})
export class CatRadio {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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
  defineCustomElementFn: defineCatRadioGroup,
  inputs: ['a11yLabel', 'disabled', 'labelLeft', 'name', 'value']
})
@Component({
  selector: 'cat-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['a11yLabel', 'disabled', 'labelLeft', 'name', 'value'],
  standalone: true
})
export class CatRadioGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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
  defineCustomElementFn: defineCatScrollable,
  inputs: ['noOverflowX', 'noOverflowY', 'noOverscroll', 'noScrolledInit', 'noShadowX', 'noShadowY', 'scrolledBuffer']
})
@Component({
  selector: 'cat-scrollable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['noOverflowX', 'noOverflowY', 'noOverscroll', 'noScrolledInit', 'noShadowX', 'noShadowY', 'scrolledBuffer'],
  standalone: true
})
export class CatScrollable {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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
  defineCustomElementFn: defineCatSelect,
  inputs: ['clearable', 'debounce', 'disabled', 'errorUpdate', 'errors', 'hint', 'horizontal', 'identifier', 'label', 'labelHidden', 'multiple', 'name', 'nativeAttributes', 'noItems', 'placeholder', 'placement', 'required', 'requiredMarker', 'tagHint', 'tags', 'value'],
  methods: ['doFocus', 'doBlur', 'clear', 'connect']
})
@Component({
  selector: 'cat-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clearable', 'debounce', 'disabled', 'errorUpdate', 'errors', 'hint', 'horizontal', 'identifier', 'label', 'labelHidden', 'multiple', 'name', 'nativeAttributes', 'noItems', 'placeholder', 'placement', 'required', 'requiredMarker', 'tagHint', 'tags', 'value'],
  standalone: true
})
export class CatSelect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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


@ProxyCmp({
  defineCustomElementFn: defineCatSelectDemo
})
@Component({
  selector: 'cat-select-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class CatSelectDemo {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatSelectDemo extends Components.CatSelectDemo {}


@ProxyCmp({
  defineCustomElementFn: defineCatSkeleton,
  inputs: ['effect', 'lines', 'size', 'variant']
})
@Component({
  selector: 'cat-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['effect', 'lines', 'size', 'variant'],
  standalone: true
})
export class CatSkeleton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatSkeleton extends Components.CatSkeleton {}


@ProxyCmp({
  defineCustomElementFn: defineCatSpinner,
  inputs: ['a11yLabel', 'size']
})
@Component({
  selector: 'cat-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['a11yLabel', 'size'],
  standalone: true
})
export class CatSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatSpinner extends Components.CatSpinner {}


@ProxyCmp({
  defineCustomElementFn: defineCatTab,
  inputs: ['deactivated', 'error', 'icon', 'iconOnly', 'iconRight', 'label', 'nativeAttributes', 'url', 'urlTarget']
})
@Component({
  selector: 'cat-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['deactivated', 'error', 'icon', 'iconOnly', 'iconRight', 'label', 'nativeAttributes', 'url', 'urlTarget'],
  standalone: true
})
export class CatTab {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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
  defineCustomElementFn: defineCatTabs,
  inputs: ['activeTab', 'tabsAlign'],
  methods: ['setActive', 'setActiveIndex']
})
@Component({
  selector: 'cat-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activeTab', 'tabsAlign'],
  standalone: true
})
export class CatTabs {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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
  defineCustomElementFn: defineCatTextarea,
  inputs: ['disabled', 'errorUpdate', 'errors', 'hint', 'horizontal', 'identifier', 'label', 'labelHidden', 'maxLength', 'minLength', 'name', 'nativeAttributes', 'placeholder', 'readonly', 'required', 'requiredMarker', 'rows', 'value'],
  methods: ['doFocus', 'doBlur', 'clear']
})
@Component({
  selector: 'cat-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'errorUpdate', 'errors', 'hint', 'horizontal', 'identifier', 'label', 'labelHidden', 'maxLength', 'minLength', 'name', 'nativeAttributes', 'placeholder', 'readonly', 'required', 'requiredMarker', 'rows', 'value'],
  standalone: true
})
export class CatTextarea {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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
  defineCustomElementFn: defineCatToggle,
  inputs: ['checked', 'disabled', 'hint', 'identifier', 'label', 'labelHidden', 'labelLeft', 'name', 'nativeAttributes', 'noValue', 'required', 'resolvedValue', 'value'],
  methods: ['doFocus', 'doBlur']
})
@Component({
  selector: 'cat-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'hint', 'identifier', 'label', 'labelHidden', 'labelLeft', 'name', 'nativeAttributes', 'noValue', 'required', 'resolvedValue', 'value'],
  standalone: true
})
export class CatToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
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
  defineCustomElementFn: defineCatTooltip,
  inputs: ['content', 'disabled', 'hideDelay', 'longTouchDuration', 'placement', 'round', 'showDelay', 'size']
})
@Component({
  selector: 'cat-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['content', 'disabled', 'hideDelay', 'longTouchDuration', 'placement', 'round', 'showDelay', 'size'],
  standalone: true
})
export class CatTooltip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CatTooltip extends Components.CatTooltip {}


