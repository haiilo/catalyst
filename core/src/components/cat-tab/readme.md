# cat-tab



<!-- Auto Generated Below -->


## Overview

A single tab inside a tabs component.

## Properties

| Property           | Attribute    | Description                                                                                         | Type                                           | Default     |
| ------------------ | ------------ | --------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ----------- |
| `disabled`         | `disabled`   | Specifies that the tab should be disabled.                                                          | `boolean`                                      | `false`     |
| `href`             | `href`       | A destination to link to, rendered in the href attribute of a link.                                 | `string \| undefined`                          | `undefined` |
| `icon`             | `icon`       | The name of an icon to be displayed in the tab.                                                     | `string \| undefined`                          | `undefined` |
| `iconOnly`         | `icon-only`  | Hide the actual button content and only display the tab.                                            | `"l" \| "m" \| "s" \| "xl" \| "xs" \| boolean` | `false`     |
| `iconRight`        | `icon-right` | Display the icon on the right.                                                                      | `boolean`                                      | `false`     |
| `iconSrc`          | `icon-src`   | The SVG source of an icon to be displayed in the tab. This takes precenedence over the `icon` name. | `string \| undefined`                          | `undefined` |
| `label`            | `label`      | The label of the tab.                                                                               | `string`                                       | `''`        |
| `nativeAttributes` | --           | Attributes that will be added to the native HTML button element                                     | `undefined \| { [key: string]: string; }`      | `undefined` |
| `target`           | `target`     | Specifies where to open the linked document.                                                        | `string \| undefined`                          | `undefined` |


## Events

| Event      | Description                  | Type                      |
| ---------- | ---------------------------- | ------------------------- |
| `tabClick` | Emitted when tab is clicked. | `CustomEvent<MouseEvent>` |


----------------------------------------------

Made with love in Hamburg, Germany
