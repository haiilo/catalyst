# cat-menu



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute       | Description                              | Type                                                                                                                                                                 | Default          |
| ------------- | --------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `noAutoClose` | `no-auto-close` | Do not close the menu on outside clicks. | `boolean`                                                                                                                                                            | `false`          |
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




----------------------------------------------

Made with love in Hamburg, Germany
