# cat-spinner

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                                                                                  | Type                                            | Default     |
| ----------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------- |
| `a11yLabel` | `a11y-label` | Adds accessible label for the spinner that is only shown for screen readers. The `aria-hidden` attribute will be set if no label is present. | `string \| undefined`                           | `undefined` |
| `size`      | `size`       | The size of the spinner.                                                                                                                     | `"inline" \| "l" \| "m" \| "s" \| "xl" \| "xs"` | `'m'`       |


## Dependencies

### Used by

 - [cat-button](../cat-button)
 - [cat-select](../cat-select)

### Graph
```mermaid
graph TD;
  cat-button --> cat-spinner
  cat-select --> cat-spinner
  style cat-spinner fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Made with love in Hamburg, Germany
