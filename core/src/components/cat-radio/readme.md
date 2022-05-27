# cat-radio

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                               | Type                              | Default     |
| ------------- | -------------- | ----------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `checked`     | `checked`      | Whether this radio is checked.                                                            | `boolean`                         | `false`     |
| `disabled`    | `disabled`     | Whether this radio is disabled.                                                           | `boolean`                         | `false`     |
| `hint`        | `hint`         | Optional hint text(s) to be displayed with the radio.                                     | `string \| string[] \| undefined` | `undefined` |
| `label`       | `label`        | The label of the radio that is visible.                                                   | `string`                          | `''`        |
| `labelHidden` | `label-hidden` | Visually hide the label, but still show it to assistive technologies like screen readers. | `boolean`                         | `false`     |
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

### `setFocus(options?: FocusOptions | undefined) => Promise<void>`

Sets focus on the radio. Use this method instead of `radio.focus()`.

#### Returns

Type: `Promise<void>`




## Slots

| Slot     | Description                                           |
| -------- | ----------------------------------------------------- |
| `"hint"` | Optional hint element to be displayed with the radio. |


## Shadow Parts

| Part      | Description        |
| --------- | ------------------ |
| `"label"` | The label content. |


----------------------------------------------

Made with love in Hamburg, Germany
