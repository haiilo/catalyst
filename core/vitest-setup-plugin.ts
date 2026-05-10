// Provides a working ElementInternals mock for stencil unit tests.
// See: https://github.com/haiilo/catalyst/blob/main/ELEMENT_INTERNALS_MOCK.md
import { MockElement } from '@stencil/core/mock-doc';

const emptyValidity: ValidityState = {
  valueMissing: false,
  typeMismatch: false,
  patternMismatch: false,
  tooLong: false,
  tooShort: false,
  rangeUnderflow: false,
  rangeOverflow: false,
  stepMismatch: false,
  badInput: false,
  customError: false,
  valid: true
};

// @ts-ignore
MockElement.prototype.attachInternals = function (this: MockElement & { __internals?: ElementInternals }) {
  if (!this.__internals) {
    const self = this;
    let _formValue: FormDataEntryValue | File | null = null;
    let _formState: FormDataEntryValue | File | null = null;
    let _validity: ValidityState = { ...emptyValidity };
    let _validationMessage = '';

    this.__internals = {
      get form() {
        return null;
      },
      get labels() {
        return [] as unknown as NodeList;
      },
      get shadowRoot() {
        return self.shadowRoot as ShadowRoot | null;
      },
      get states() {
        return new Set() as unknown as CustomStateSet;
      },
      get validity() {
        return _validity;
      },
      get validationMessage() {
        return _validationMessage;
      },
      get willValidate() {
        return true;
      },
      checkValidity() {
        return _validity.valid;
      },
      reportValidity() {
        return _validity.valid;
      },
      setFormValue(value: FormDataEntryValue | FormData | null, state?: FormDataEntryValue | FormData | null) {
        _formValue = value as FormDataEntryValue | File | null;
        _formState = state !== undefined ? (state as FormDataEntryValue | File | null) : _formValue;
      },
      setValidity(flags?: ValidityStateFlags, message?: string, _anchor?: HTMLElement) {
        if (!flags || Object.keys(flags).length === 0) {
          _validity = { ...emptyValidity };
          _validationMessage = '';
        } else {
          _validity = {
            ..._validity,
            ...flags,
            valid: !Object.values(flags).some(flag => flag === true)
          };
          _validationMessage = message ?? '';
        }
      }
    } as unknown as ElementInternals;
  }
  return this.__internals!;
};

if (!globalThis.ResizeObserver) {
  (globalThis as any).ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (!globalThis.MutationObserver) {
  (globalThis as any).MutationObserver = class MutationObserver {
    constructor(_callback: MutationCallback) {}
    observe() {}
    disconnect() {}
    takeRecords(): MutationRecord[] {
      return [];
    }
  };
}
