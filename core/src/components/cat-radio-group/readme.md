# cat-radio-group



<!-- Auto Generated Below -->


## Overview

A group of radio buttons.

## Properties

| Property    | Attribute    | Description                                                                                                        | Type                  | Default     |
| ----------- | ------------ | ------------------------------------------------------------------------------------------------------------------ | --------------------- | ----------- |
| `a11yLabel` | `a11y-label` | Adds an accessible label for the radio group that it is only shown in assistive technologies, like screen readers. | `string \| undefined` | `undefined` |
| `disabled`  | `disabled`   | Whether this radio group is disabled.                                                                              | `boolean`             | `false`     |
| `labelLeft` | `label-left` | Whether the label of the radios should appear to the left of them.                                                 | `boolean`             | `false`     |
| `name`      | `name`       | The name of the radio group component.                                                                             | `string \| undefined` | `undefined` |
| `value`     | `value`      | The value of the radio group.                                                                                      | `string \| undefined` | `undefined` |


## Events

| Event       | Description                               | Type                      |
| ----------- | ----------------------------------------- | ------------------------- |
| `catBlur`   | Emitted when the radio group loses focus. | `CustomEvent<FocusEvent>` |
| `catChange` | Emitted when the value is changed.        | `CustomEvent<any>`        |


----------------------------------------------

Made with love in Hamburg, Germany
