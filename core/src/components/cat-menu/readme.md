# cat-menu



<!-- Auto Generated Below -->


## Overview

A menu component that provides a dropdown with a built-in configurable trigger button
and proper ARIA semantics and keyboard navigation for menu items.

The trigger is always a cat-button with sensible defaults but fully configurable
through trigger-specific props.

## Properties

| Property                  | Attribute                   | Description                                                                                                                                                                                          | Type                                                                                                                                                                 | Default                    |
| ------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `delayedTriggerInit`      | `delayed-trigger-init`      | Whether the dropdown trigger should be initialized only before first opening. Can be useful when trigger is rendered dynamically.                                                                    | `boolean`                                                                                                                                                            | `false`                    |
| `disabled`                | `disabled`                  | Disable the menu.                                                                                                                                                                                    | `boolean`                                                                                                                                                            | `false`                    |
| `justify`                 | `justify`                   | Make the dropdown match the width of the reference regardless of its contents. Note that this only applies to the minimum width of the dropdown. The maximum width is still limited by the viewport. | `boolean`                                                                                                                                                            | `false`                    |
| `noAutoClose`             | `no-auto-close`             | Do not close the dropdown on outside clicks.                                                                                                                                                         | `boolean`                                                                                                                                                            | `false`                    |
| `noResize`                | `no-resize`                 | Do not change the size of the dropdown to ensure it isn’t too big to fit in the viewport (or more specifically, its clipping context).                                                               | `boolean`                                                                                                                                                            | `false`                    |
| `overflow`                | `overflow`                  | Allow overflow when dropdown is open.                                                                                                                                                                | `boolean`                                                                                                                                                            | `false`                    |
| `placement`               | `placement`                 | The placement of the dropdown.                                                                                                                                                                       | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom-start'`           |
| `triggerClass`            | `trigger-class`             | Additional CSS class for the trigger button.                                                                                                                                                         | `string \| undefined`                                                                                                                                                | `undefined`                |
| `triggerIcon`             | `trigger-icon`              | The trigger button icon.                                                                                                                                                                             | `string`                                                                                                                                                             | `'more-horizontal-filled'` |
| `triggerIconOnly`         | `trigger-icon-only`         | Show only the icon in the trigger button.                                                                                                                                                            | `"l" \| "m" \| "s" \| "xl" \| "xs" \| boolean`                                                                                                                       | `true`                     |
| `triggerLabel`            | `trigger-label`             | The trigger button label (for accessibility).                                                                                                                                                        | `string`                                                                                                                                                             | `'Show menu'`              |
| `triggerNativeAttributes` | `trigger-native-attributes` | Native attributes for the trigger button.                                                                                                                                                            | `undefined \| { [key: string]: string; }`                                                                                                                            | `undefined`                |
| `triggerSize`             | `trigger-size`              | The trigger button size.                                                                                                                                                                             | `"l" \| "m" \| "s" \| "xl" \| "xs"`                                                                                                                                  | `'s'`                      |
| `triggerTestId`           | `trigger-test-id`           | Test ID for the trigger button.                                                                                                                                                                      | `string \| undefined`                                                                                                                                                | `undefined`                |
| `triggerVariant`          | `trigger-variant`           | The trigger button variant.                                                                                                                                                                          | `"filled" \| "outlined" \| "text"`                                                                                                                                   | `'text'`                   |


## Events

| Event             | Description                                 | Type                      |
| ----------------- | ------------------------------------------- | ------------------------- |
| `catClose`        | Emitted when the dropdown is closed.        | `CustomEvent<FocusEvent>` |
| `catOpen`         | Emitted when the dropdown is opened.        | `CustomEvent<FocusEvent>` |
| `catTriggerClick` | Emitted when the trigger button is clicked. | `CustomEvent<MouseEvent>` |


## Dependencies

### Depends on

- [cat-dropdown](../cat-dropdown)
- [cat-button](../cat-button)

### Graph
```mermaid
graph TD;
  cat-menu --> cat-dropdown
  cat-menu --> cat-button
  cat-button --> cat-icon
  cat-button --> cat-spinner
  style cat-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Made with love in Hamburg, Germany
