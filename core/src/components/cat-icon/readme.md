# cat-icon

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute      | Description                                                                                                                               | Type                                            | Default     |
| ----------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------- |
| `a11yLabel` | `a-1-1y-label` | Adds accessible label for the icon that is only shown for screen readers. The `aria-hidden` attribute will be set if no label is present. | `string \| undefined`                           | `undefined` |
| `icon`      | `icon`         | The name of the icon.                                                                                                                     | `string`                                        | `''`        |
| `size`      | `size`         | The size of the icon.                                                                                                                     | `"inline" \| "l" \| "m" \| "s" \| "xl" \| "xs"` | `'m'`       |


## Shadow Parts

| Part     | Description                                    |
| -------- | ---------------------------------------------- |
| `"icon"` | The native span element wrapping the SVG icon. |


## Dependencies

### Used by

 - [cat-button](../cat-button)

### Graph
```mermaid
graph TD;
  cat-button --> cat-icon
  style cat-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Made with love in Hamburg, Germany
