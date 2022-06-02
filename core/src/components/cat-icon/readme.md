# cat-icon

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                                                                               | Type                                            | Default     |
| ----------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------- |
| `a11yLabel` | `a11y-label` | Adds accessible label for the icon that is only shown for screen readers. The `aria-hidden` attribute will be set if no label is present. | `string \| undefined`                           | `undefined` |
| `icon`      | `icon`       | The name of the icon.                                                                                                                     | `string`                                        | `''`        |
| `size`      | `size`       | The size of the icon.                                                                                                                     | `"inline" \| "l" \| "m" \| "s" \| "xl" \| "xs"` | `'m'`       |


## Shadow Parts

| Part     | Description                             |
| -------- | --------------------------------------- |
| `"icon"` | The span element wrapping the SVG icon. |


## Dependencies

### Used by

 - [cat-avatar](../cat-avatar)
 - [cat-button](../cat-button)
 - [cat-input](../cat-input)

### Graph
```mermaid
graph TD;
  cat-avatar --> cat-icon
  cat-button --> cat-icon
  cat-input --> cat-icon
  style cat-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Made with love in Hamburg, Germany
