# cat-segmented-control



<!-- Auto Generated Below -->


## Overview

A segmented control for selecting one option from a mutually-exclusive set.

## Properties

| Property           | Attribute    | Description                                                | Type                                      | Default     |
| ------------------ | ------------ | ---------------------------------------------------------- | ----------------------------------------- | ----------- |
| `a11yLabel`        | `a11y-label` | Accessible label for the group (screen readers only).      | `string \| undefined`                     | `undefined` |
| `disabled`         | `disabled`   | Whether the entire control is disabled.                    | `boolean`                                 | `false`     |
| `nativeAttributes` | --           | Spread onto the root element.                              | `undefined \| { [key: string]: string; }` | `undefined` |
| `size`             | `size`       | The size of the control, propagated to all child segments. | `"l" \| "m" \| "s" \| "xl" \| "xs"`       | `'m'`       |
| `testId`           | `test-id`    | Renders as data-test on the root element.                  | `string \| undefined`                     | `undefined` |
| `value`            | `value`      | The value of the currently selected segment.               | `string \| undefined`                     | `undefined` |


## Events

| Event       | Description                                                                  | Type                  |
| ----------- | ---------------------------------------------------------------------------- | --------------------- |
| `catBlur`   | Emitted when a segment loses focus. Payload is the segment value.            | `CustomEvent<string>` |
| `catChange` | Emitted when the selected segment changes. Payload is the new segment value. | `CustomEvent<string>` |
| `catFocus`  | Emitted when a segment gains focus. Payload is the segment value.            | `CustomEvent<string>` |


## Shadow Parts

| Part        | Description               |
| ----------- | ------------------------- |
| `"control"` | The tray wrapper element. |


----------------------------------------------

Made with love in Hamburg, Germany
