# cat-date



<!-- Auto Generated Below -->


## Overview

A date input component to select a date from a calendar in a dropdown.

## Properties

| Property           | Attribute         | Description                                                                                                                                                                                                                                                                                                                     | Type                                                                                                                                                                 | Default        |
| ------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `autoComplete`     | `auto-complete`   | Hint for form autofill feature.                                                                                                                                                                                                                                                                                                 | `string`                                                                                                                                                             | `'off'`        |
| `clearable`        | `clearable`       | Whether the input should show a clear button.                                                                                                                                                                                                                                                                                   | `boolean`                                                                                                                                                            | `false`        |
| `disabled`         | `disabled`        | Whether the input is disabled.                                                                                                                                                                                                                                                                                                  | `boolean`                                                                                                                                                            | `false`        |
| `errorUpdate`      | `error-update`    | Fine-grained control over when the errors are shown. Can be `false` to never show errors, `true` to show errors on blur, or a number to show errors change with the given delay in milliseconds or immediately on blur.                                                                                                         | `boolean \| number`                                                                                                                                                  | `0`            |
| `errors`           | `errors`          | The validation errors for this input. Will render a hint under the input with the translated error message(s) `error.${key}`. If an object is passed, the keys will be used as error keys and the values translation parameters. If the value is `true`, the input will be marked as invalid without any hints under the input. | `boolean \| string[] \| undefined \| { [key: string]: any; }`                                                                                                        | `undefined`    |
| `hint`             | `hint`            | Optional hint text(s) to be displayed with the input.                                                                                                                                                                                                                                                                           | `string \| string[] \| undefined`                                                                                                                                    | `undefined`    |
| `horizontal`       | `horizontal`      | Whether the label is on top or left.                                                                                                                                                                                                                                                                                            | `boolean`                                                                                                                                                            | `false`        |
| `icon`             | `icon`            | The name of an icon to be displayed in the input.                                                                                                                                                                                                                                                                               | `string \| undefined`                                                                                                                                                | `undefined`    |
| `iconRight`        | `icon-right`      | Display the icon on the right.                                                                                                                                                                                                                                                                                                  | `boolean`                                                                                                                                                            | `false`        |
| `identifier`       | `identifier`      | A unique identifier for the input.                                                                                                                                                                                                                                                                                              | `string \| undefined`                                                                                                                                                | `undefined`    |
| `label`            | `label`           | The label for the input.                                                                                                                                                                                                                                                                                                        | `string`                                                                                                                                                             | `''`           |
| `labelHidden`      | `label-hidden`    | Visually hide the label, but still show it to assistive technologies like screen readers.                                                                                                                                                                                                                                       | `boolean`                                                                                                                                                            | `false`        |
| `max`              | `max`             | A maximum value for the date, given in local ISO 8601 date format YYYY-MM-DD.                                                                                                                                                                                                                                                   | `string \| undefined`                                                                                                                                                | `undefined`    |
| `min`              | `min`             | A minimum value for the date, given in local ISO 8601 date format YYYY-MM-DD.                                                                                                                                                                                                                                                   | `string \| undefined`                                                                                                                                                | `undefined`    |
| `name`             | `name`            | The name of the form control. Submitted with the form as part of a name/value pair.                                                                                                                                                                                                                                             | `string \| undefined`                                                                                                                                                | `undefined`    |
| `nativeAttributes` | --                | Attributes that will be added to the native HTML input element.                                                                                                                                                                                                                                                                 | `undefined \| { [key: string]: string; }`                                                                                                                            | `undefined`    |
| `placeholder`      | `placeholder`     | The placeholder text to display within the input.                                                                                                                                                                                                                                                                               | `string \| undefined`                                                                                                                                                | `undefined`    |
| `placement`        | `placement`       | The placement of the dropdown.                                                                                                                                                                                                                                                                                                  | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom-end'` |
| `readonly`         | `readonly`        | The value is not editable.                                                                                                                                                                                                                                                                                                      | `boolean`                                                                                                                                                            | `false`        |
| `required`         | `required`        | A value is required or must be check for the form to be submittable.                                                                                                                                                                                                                                                            | `boolean`                                                                                                                                                            | `false`        |
| `requiredMarker`   | `required-marker` | Whether the label need a marker to shown if the input is required or optional.                                                                                                                                                                                                                                                  | `"none!" \| "none" \| "optional!" \| "optional" \| "required!" \| "required" \| undefined`                                                                           | `'optional'`   |
| `textPrefix`       | `text-prefix`     | A textual prefix to be displayed in the input.                                                                                                                                                                                                                                                                                  | `string \| undefined`                                                                                                                                                | `undefined`    |
| `textSuffix`       | `text-suffix`     | A textual suffix to be displayed in the input.                                                                                                                                                                                                                                                                                  | `string \| undefined`                                                                                                                                                | `undefined`    |
| `value`            | `value`           | The value of the control, given in local ISO 8601 date format YYYY-MM-DD.                                                                                                                                                                                                                                                       | `string \| undefined`                                                                                                                                                | `undefined`    |


## Events

| Event       | Description                            | Type                      |
| ----------- | -------------------------------------- | ------------------------- |
| `catBlur`   | Emitted when the input loses focus.    | `CustomEvent<FocusEvent>` |
| `catChange` | Emitted when the value is changed.     | `CustomEvent<string>`     |
| `catFocus`  | Emitted when the input received focus. | `CustomEvent<FocusEvent>` |


## Methods

### `clear() => Promise<void>`

Clear the input.

#### Returns

Type: `Promise<void>`



### `doBlur() => Promise<void>`

Programmatically remove focus from the input. Use this method instead of
`input.blur()`.

#### Returns

Type: `Promise<void>`



### `doFocus(options?: FocusOptions) => Promise<void>`

Programmatically move focus to the input. Use this method instead of
`input.focus()`.

#### Parameters

| Name      | Type                        | Description                                                                      |
| --------- | --------------------------- | -------------------------------------------------------------------------------- |
| `options` | `FocusOptions \| undefined` | An optional object providing options to control aspects of the focusing process. |

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [cat-input](../cat-input)
- [cat-dropdown](../cat-dropdown)
- [cat-button](../cat-button)
- [cat-date-inline](../cat-date-inline)

### Graph
```mermaid
graph TD;
  cat-date --> cat-input
  cat-date --> cat-dropdown
  cat-date --> cat-button
  cat-date --> cat-date-inline
  cat-input --> cat-icon
  cat-input --> cat-button
  cat-input --> cat-spinner
  cat-button --> cat-icon
  cat-button --> cat-spinner
  cat-date-inline --> cat-button
  style cat-date fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Made with love in Hamburg, Germany
