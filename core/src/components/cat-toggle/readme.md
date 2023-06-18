# cat-toggle



<!-- Auto Generated Below -->


## Overview

Toggles are graphical interface switches that give user control over a
feature or option that can be turned on or off.

## Properties

| Property           | Attribute        | Description                                                                               | Type                                      | Default     |
| ------------------ | ---------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------- | ----------- |
| `checked`          | `checked`        | Checked state of the toggle.                                                              | `boolean`                                 | `false`     |
| `disabled`         | `disabled`       | Disabled state of the toggle.                                                             | `boolean`                                 | `false`     |
| `hint`             | `hint`           | Optional hint text(s) to be displayed with the toggle.                                    | `string \| string[] \| undefined`         | `undefined` |
| `identifier`       | `identifier`     | A unique identifier for the input.                                                        | `string \| undefined`                     | `undefined` |
| `label`            | `label`          | The label of the toggle that is visible.                                                  | `string`                                  | `''`        |
| `labelHidden`      | `label-hidden`   | Visually hide the label, but still show it to assistive technologies like screen readers. | `boolean`                                 | `false`     |
| `labelLeft`        | `label-left`     | Whether the label should appear to the left of the toggle.                                | `boolean`                                 | `false`     |
| `name`             | `name`           | The name of the input.                                                                    | `string \| undefined`                     | `undefined` |
| `nativeAttributes` | --               | Attributes that will be added to the native HTML input element.                           | `undefined \| { [key: string]: string; }` | `undefined` |
| `required`         | `required`       | Required state of the toggle.                                                             | `boolean`                                 | `false`     |
| `resolvedValue`    | `resolved-value` | The resolved value of the toggle, based on the checked state and value.                   | `boolean \| null \| string`               | `null`      |
| `value`            | `value`          | The value of the toggle.                                                                  | `string \| undefined`                     | `undefined` |


## Events

| Event       | Description                                               | Type                                     |
| ----------- | --------------------------------------------------------- | ---------------------------------------- |
| `catBlur`   | Emitted when the toggle loses focus.                      | `CustomEvent<FocusEvent>`                |
| `catChange` | Emitted when the checked status of the toggle is changed. | `CustomEvent<boolean \| null \| string>` |
| `catFocus`  | Emitted when the toggle received focus.                   | `CustomEvent<FocusEvent>`                |


## Methods

### `doBlur() => Promise<void>`

Programmatically remove focus from the toggle. Use this method instead of
`input.blur()`.

#### Returns

Type: `Promise<void>`



### `doFocus(options?: FocusOptions) => Promise<void>`

Programmatically move focus to the toggle. Use this method instead of
`input.focus()`.

#### Returns

Type: `Promise<void>`




## Slots

| Slot      | Description                                                                                                          |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| `"hint"`  | Optional hint element to be displayed with the toggle.                                                               |
| `"label"` | The slotted label. If both the label property and the label slot are present, only the label slot will be displayed. |


## Shadow Parts

| Part       | Description         |
| ---------- | ------------------- |
| `"label"`  | The label content.  |
| `"toggle"` | The toggle element. |


----------------------------------------------

Made with love in Hamburg, Germany
