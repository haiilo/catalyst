# cat-select



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                                                              | Type                              | Default     |
| ------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `disabled`    | `disabled`     | Disable the select.                                                                                                                                                                                      | `boolean`                         | `false`     |
| `hint`        | `hint`         | Optional hint text(s) to be displayed with the select.                                                                                                                                                   | `string \| string[] \| undefined` | `undefined` |
| `items`       | --             | The available options for the input.                                                                                                                                                                     | `CatSelectItem[]`                 | `[]`        |
| `label`       | `label`        | The label for the select.                                                                                                                                                                                | `string`                          | `''`        |
| `labelHidden` | `label-hidden` | Visually hide the label, but still show it to assistive technologies like screen readers.                                                                                                                | `boolean`                         | `false`     |
| `multiple`    | `multiple`     | Enable multiple selection.                                                                                                                                                                               | `boolean`                         | `false`     |
| `placeholder` | `placeholder`  | The placeholder for the select.                                                                                                                                                                          | `string`                          | `''`        |
| `position`    | `position`     | Whether the dropdown should appear above `(top)` or below `(bottom)` the input. By default, if there is not enough space within the window the dropdown will appear above the input, otherwise below it. | `"auto" \| "bottom" \| "top"`     | `'auto'`    |
| `required`    | `required`     | A value is required or must be check for the form to be submittable.                                                                                                                                     | `boolean`                         | `false`     |
| `search`      | `search`       | Enable search for the select.                                                                                                                                                                            | `boolean`                         | `false`     |
| `value`       | `value`        | The value of the select.                                                                                                                                                                                 | `any`                             | `undefined` |


## Events

| Event               | Description                           | Type                      |
| ------------------- | ------------------------------------- | ------------------------- |
| `catBlur`           | Emitted when the select loses focus.  | `CustomEvent<FocusEvent>` |
| `catChange`         | Emitted when the value is changed.    | `CustomEvent<any>`        |
| `catScrolledBottom` | Emitted when scrolled to the bottom.  | `CustomEvent<any>`        |
| `catSearch`         | Emitted when the search is triggered. | `CustomEvent<any>`        |


## Slots

| Slot      | Description                                                                                                          |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| `"hint"`  | Optional hint element to be displayed with the select.                                                               |
| `"label"` | The slotted label. If both the label property and the label slot are present, only the label slot will be displayed. |


## Shadow Parts

| Part      | Description        |
| --------- | ------------------ |
| `"label"` | The label content. |


## Dependencies

### Depends on

- [cat-button](../cat-button)

### Graph
```mermaid
graph TD;
  cat-select --> cat-button
  cat-button --> cat-icon
  cat-button --> cat-spinner
  style cat-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Made with love in Hamburg, Germany
