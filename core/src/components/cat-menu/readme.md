# cat-menu



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute       | Description                              | Type                                                                                                                                                                 | Default          |
| ------------- | --------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `noAutoClose` | `no-auto-close` | Do not close the menu on outside clicks. | `boolean`                                                                                                                                                            | `false`          |
| `overflow`    | `overflow`      | Allow overflow when menu is open.        | `boolean`                                                                                                                                                            | `false`          |
| `placement`   | `placement`     | The placement of the menu.               | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom-start'` |


## Events

| Event      | Description                      | Type                      |
| ---------- | -------------------------------- | ------------------------- |
| `catClose` | Emitted when the menu is closed. | `CustomEvent<FocusEvent>` |
| `catOpen`  | Emitted when the menu is opened. | `CustomEvent<FocusEvent>` |


## Methods

### `close() => Promise<void>`

Closes the menu.

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [cat-select-demo](../cat-select-demo)

### Graph
```mermaid
graph TD;
  cat-select-demo --> cat-menu
  style cat-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Made with love in Hamburg, Germany
