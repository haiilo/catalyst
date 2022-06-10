# cat-checkbox



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                                                                               | Type                  | Default     |
| --------------- | --------------- | ----------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `checked`       | `checked`       | Checked state of the checkbox                                                             | `boolean`             | `false`     |
| `disabled`      | `disabled`      | Disabled state of the checkbox                                                            | `boolean`             | `false`     |
| `indeterminate` | `indeterminate` | Indeterminate state of the checkbox                                                       | `boolean`             | `false`     |
| `label`         | `label`         | Label of the checkbox which is presented in the UI                                        | `string`              | `''`        |
| `labelHidden`   | `label-hidden`  | Visually hide the label, but still show it to assistive technologies like screen readers. | `boolean`             | `false`     |
| `name`          | `name`          | The name of the input                                                                     | `string \| undefined` | `undefined` |
| `required`      | `required`      | Required state of the checkbox                                                            | `boolean`             | `false`     |
| `value`         | `value`         | The value of the checkbox                                                                 | `string \| undefined` | `undefined` |


## Events

| Event       | Description                                                 | Type                      |
| ----------- | ----------------------------------------------------------- | ------------------------- |
| `catBlur`   | Emitted when the checkbox loses focus.                      | `CustomEvent<FocusEvent>` |
| `catChange` | Emitted when the checked status of the checkbox is changed. | `CustomEvent<any>`        |
| `catFocus`  | Emitted when the checkbox received focus.                   | `CustomEvent<FocusEvent>` |


## Methods

### `setFocus(options?: FocusOptions | undefined) => Promise<void>`

Sets focus on the checkbox. Use this method instead of `checkbox.focus()`.

#### Returns

Type: `Promise<void>`




## Slots

| Slot      | Description                                                                                                          |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| `"label"` | The slotted label. If both the label property and the label slot are present, only the label slot will be displayed. |


## Shadow Parts

| Part         | Description           |
| ------------ | --------------------- |
| `"checkbox"` | The checkbox element. |
| `"label"`    | The label content.    |


----------------------------------------------

Made with love in Hamburg, Germany
