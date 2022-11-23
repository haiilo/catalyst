# cat-radio

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                               | Type                              | Default     |
| ------------- | -------------- | ----------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `checked`     | `checked`      | Whether this radio is checked.                                                            | `boolean`                         | `false`     |
| `disabled`    | `disabled`     | Whether this radio is disabled.                                                           | `boolean`                         | `false`     |
| `hint`        | `hint`         | Optional hint text(s) to be displayed with the radio.                                     | `string \| string[] \| undefined` | `undefined` |
| `identifier`  | `identifier`   | A unique identifier for the input.                                                        | `string \| undefined`             | `undefined` |
| `label`       | `label`        | The label of the radio that is visible.                                                   | `string`                          | `''`        |
| `labelHidden` | `label-hidden` | Visually hide the label, but still show it to assistive technologies like screen readers. | `boolean`                         | `false`     |
| `labelLeft`   | `label-left`   | Whether the label should appear to the left of the radio component.                       | `boolean`                         | `false`     |
| `name`        | `name`         | The name of the radio component.                                                          | `string \| undefined`             | `undefined` |
| `required`    | `required`     | Whether the radio is required.                                                            | `boolean`                         | `false`     |
| `value`       | `value`        | The value of the radio component.                                                         | `string \| undefined`             | `undefined` |


## Events

| Event       | Description                            | Type                      |
| ----------- | -------------------------------------- | ------------------------- |
| `catBlur`   | Emitted when the radio loses focus.    | `CustomEvent<FocusEvent>` |
| `catChange` | Emitted when the radio is changed.     | `CustomEvent<any>`        |
| `catFocus`  | Emitted when the radio received focus. | `CustomEvent<FocusEvent>` |


## Methods

### `doBlur() => Promise<void>`

Programmatically remove focus from the radio button. Use this method
instead of `input.blur()`.

#### Returns

Type: `Promise<void>`



### `doClick() => Promise<void>`

Programmatically simulate a click on the radio button.

#### Returns

Type: `Promise<void>`



### `doFocus(options?: FocusOptions | undefined) => Promise<void>`

Programmatically move focus to the radio button. Use this method instead of
`input.focus()`.

#### Returns

Type: `Promise<void>`




## Slots

| Slot      | Description                                                                                                          |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| `"hint"`  | Optional hint element to be displayed with the radio.                                                                |
| `"label"` | The slotted label. If both the label property and the label slot are present, only the label slot will be displayed. |


## Shadow Parts

| Part      | Description        |
| --------- | ------------------ |
| `"label"` | The label content. |


----------------------------------------------

Made with love in Hamburg, Germany
