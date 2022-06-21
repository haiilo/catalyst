# cat-modal



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description            | Type                | Default |
| -------- | --------- | ---------------------- | ------------------- | ------- |
| `size`   | `size`    | The size of the modal. | `"l" \| "m" \| "s"` | `'m'`   |


## Methods

### `show() => Promise<void>`

Shows the modal.

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [cat-button](../cat-button)

### Graph
```mermaid
graph TD;
  cat-modal --> cat-button
  cat-button --> cat-icon
  cat-button --> cat-spinner
  style cat-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Made with love in Hamburg, Germany
