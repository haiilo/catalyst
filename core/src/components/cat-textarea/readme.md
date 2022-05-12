# cat-textarea



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                               | Type                              | Default     |
| ------------- | -------------- | ----------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `disabled`    | `disabled`     | Whether the textarea is disabled.                                                         | `boolean`                         | `false`     |
| `hint`        | `hint`         | Optional hint text(s) to be displayed with the textarea.                                  | `string \| string[] \| undefined` | `undefined` |
| `label`       | `label`        | The label for the textarea.                                                               | `string`                          | `''`        |
| `labelHidden` | `label-hidden` | Visually hide the label, but still show it to assistive technologies like screen readers. | `boolean`                         | `false`     |
| `maxLength`   | `max-length`   | A maximum length (number of characters) for textual values.                               | `number \| undefined`             | `undefined` |
| `minLength`   | `min-length`   | A minimum length (number of characters) for textual values.                               | `number \| undefined`             | `undefined` |
| `name`        | `name`         | The name of the form control. Submitted with the form as part of a name/value pair.       | `string`                          | `''`        |
| `placeholder` | `placeholder`  | The placeholder text to display within the input.                                         | `string \| undefined`             | `undefined` |
| `readonly`    | `readonly`     | The value is not editable.                                                                | `boolean`                         | `false`     |
| `required`    | `required`     | A value is required or must be check for the form to be submittable.                      | `boolean`                         | `false`     |
| `rows`        | `rows`         | Specifies the initial number of lines in the textarea.                                    | `number`                          | `3`         |
| `value`       | `value`        | The initial value of the control.                                                         | `number \| string \| undefined`   | `undefined` |


## Events

| Event       | Description                               | Type                      |
| ----------- | ----------------------------------------- | ------------------------- |
| `catBlur`   | Emitted when the textarea loses focus.    | `CustomEvent<FocusEvent>` |
| `catChange` | Emitted when the value is changed.        | `CustomEvent<any>`        |
| `catFocus`  | Emitted when the textarea received focus. | `CustomEvent<FocusEvent>` |


## Methods

### `setFocus(options?: FocusOptions | undefined) => Promise<void>`

Sets focus on the textarea. Use this method instead of `textarea.focus()`.

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part      | Description        |
| --------- | ------------------ |
| `"label"` | The label content. |


----------------------------------------------

Made with love in Hamburg, Germany
