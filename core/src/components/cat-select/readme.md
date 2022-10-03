# cat-select-remote



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                               | Type                                                                                                                                                                 | Default          |
| ------------- | -------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `clearable`   | `clearable`    | Whether the select should show a clear button.                                            | `boolean`                                                                                                                                                            | `false`          |
| `debounce`    | `debounce`     | The debounce time for the search.                                                         | `number`                                                                                                                                                             | `250`            |
| `disabled`    | `disabled`     | Whether the select is disabled.                                                           | `boolean`                                                                                                                                                            | `false`          |
| `hint`        | `hint`         | Optional hint text(s) to be displayed with the select.                                    | `string \| string[] \| undefined`                                                                                                                                    | `undefined`      |
| `label`       | `label`        | The label for the select.                                                                 | `string`                                                                                                                                                             | `''`             |
| `labelHidden` | `label-hidden` | Visually hide the label, but still show it to assistive technologies like screen readers. | `boolean`                                                                                                                                                            | `false`          |
| `multiple`    | `multiple`     | Enable multiple selection.                                                                | `boolean`                                                                                                                                                            | `false`          |
| `name`        | `name`         | The name of the form control. Submitted with the form as part of a name/value pair.       | `string`                                                                                                                                                             | `''`             |
| `placeholder` | `placeholder`  | The placeholder text to display within the select.                                        | `string \| undefined`                                                                                                                                                | `undefined`      |
| `placement`   | `placement`    | The placement of the select.                                                              | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom-start'` |
| `required`    | `required`     | A value is required or must be checked for the form to be submittable.                    | `boolean`                                                                                                                                                            | `false`          |
| `tagHint`     | `tag-hint`     | Optional hint text to be displayed on the new item to be added.                           | `string \| undefined`                                                                                                                                                | `undefined`      |
| `tags`        | `tags`         | Whether the select should add new items.                                                  | `boolean`                                                                                                                                                            | `false`          |
| `value`       | --             | The value of the select.                                                                  | `CatSelectValue \| undefined`                                                                                                                                        | `undefined`      |


## Events

| Event       | Description                                 | Type                      |
| ----------- | ------------------------------------------- | ------------------------- |
| `catBlur`   | Emitted when the select loses the focus.    | `CustomEvent<FocusEvent>` |
| `catChange` | Emitted when the value is changed.          | `CustomEvent<any>`        |
| `catClose`  | Emitted when the select dropdown is closed. | `CustomEvent<FocusEvent>` |
| `catOpen`   | Emitted when the select dropdown is opened. | `CustomEvent<FocusEvent>` |


## Methods

### `connect(connector: CatSelectConnector) => Promise<void>`

Connect the functions of the select

#### Returns

Type: `Promise<void>`




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

### Used by

 - [cat-select-demo](../cat-select-demo)

### Depends on

- [cat-avatar](../cat-avatar)
- [cat-button](../cat-button)
- [cat-spinner](../cat-spinner)
- [cat-scrollable](../cat-scrollable)
- [cat-checkbox](../cat-checkbox)
- [cat-skeleton](../cat-skeleton)

### Graph
```mermaid
graph TD;
  cat-select --> cat-avatar
  cat-select --> cat-button
  cat-select --> cat-spinner
  cat-select --> cat-scrollable
  cat-select --> cat-checkbox
  cat-select --> cat-skeleton
  cat-avatar --> cat-icon
  cat-button --> cat-icon
  cat-button --> cat-spinner
  cat-select-demo --> cat-select
  style cat-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Made with love in Hamburg, Germany
