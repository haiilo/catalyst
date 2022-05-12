# cat-toggle



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                               | Type                              | Default     |
| ------------- | -------------- | ----------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `checked`     | `checked`      | Checked state of the toggle.                                                              | `boolean`                         | `false`     |
| `disabled`    | `disabled`     | Disabled state of the toggle.                                                             | `boolean`                         | `false`     |
| `hint`        | `hint`         | Optional hint text(s) to be displayed with the toggle.                                    | `string \| string[] \| undefined` | `undefined` |
| `label`       | `label`        | The label of the toggle that is visible.                                                  | `string`                          | `''`        |
| `labelHidden` | `label-hidden` | Visually hide the label, but still show it to assistive technologies like screen readers. | `boolean`                         | `false`     |
| `name`        | `name`         | The name of the input                                                                     | `string \| undefined`             | `undefined` |
| `required`    | `required`     | Required state of the toggle                                                              | `boolean`                         | `false`     |
| `value`       | `value`        | The value of the toggle                                                                   | `string \| undefined`             | `undefined` |


## Events

| Event       | Description                                               | Type                      |
| ----------- | --------------------------------------------------------- | ------------------------- |
| `catBlur`   | Emitted when the toggle loses focus.                      | `CustomEvent<FocusEvent>` |
| `catChange` | Emitted when the checked status of the toggle is changed. | `CustomEvent<any>`        |
| `catFocus`  | Emitted when the toggle received focus.                   | `CustomEvent<FocusEvent>` |


## Methods

### `setFocus(options?: FocusOptions | undefined) => Promise<void>`

Sets focus on the toggle. Use this method instead of `toggle.focus()`.

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part       | Description         |
| ---------- | ------------------- |
| `"label"`  | The label content.  |
| `"toggle"` | The toggle element. |


----------------------------------------------

Made with love in Hamburg, Germany
