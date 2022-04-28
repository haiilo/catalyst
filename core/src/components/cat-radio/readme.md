# cat-radio

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                                 | Type                  | Default     |
| ----------- | ------------ | ------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `checked`   | `checked`    | Whether this radio is checked.                                                              | `boolean`             | `false`     |
| `disabled`  | `disabled`   | Whether this radio is disabled.                                                             | `boolean`             | `false`     |
| `hideLabel` | `hide-label` | Hides the visibility of the label but still shows it to users who use assistive technology. | `boolean`             | `false`     |
| `label`     | `label`      | The label of the radio that is visible.                                                     | `string`              | `''`        |
| `name`      | `name`       | The name of the radio component.                                                            | `string \| undefined` | `undefined` |
| `required`  | `required`   | Whether the radio is required.                                                              | `boolean`             | `false`     |
| `value`     | `value`      | The value of the radio component.                                                           | `string \| undefined` | `undefined` |


## Events

| Event       | Description                        | Type               |
| ----------- | ---------------------------------- | ------------------ |
| `catChange` | Emitted when the radio is changed. | `CustomEvent<any>` |


## Shadow Parts

| Part      | Description                   |
| --------- | ----------------------------- |
| `"label"` | The label of the input.       |
| `"radio"` | The input type radio element. |


----------------------------------------------

Made with love in Hamburg, Germany
