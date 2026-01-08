# cat-tab



<!-- Auto Generated Below -->


## Overview

A single tab inside a tabs component.

## Properties

| Property           | Attribute     | Description                                                                                                                                                                                                                                                                            | Type                                           | Default     |
| ------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ----------- |
| `deactivated`      | `deactivated` | Specifies that the tab should be deactivated.                                                                                                                                                                                                                                          | `boolean`                                      | `false`     |
| `error`            | `error`       | Specifies that the tab content pane contains an error. This will color the tab in an error state and also switch to an error icon if an icon is specified.                                                                                                                             | `boolean`                                      | `false`     |
| `icon`             | `icon`        | The name of an icon to be displayed in the tab.                                                                                                                                                                                                                                        | `string \| undefined`                          | `undefined` |
| `iconOnly`         | `icon-only`   | Hide the actual button content and only display the tab.                                                                                                                                                                                                                               | `"l" \| "m" \| "s" \| "xl" \| "xs" \| boolean` | `false`     |
| `iconRight`        | `icon-right`  | Display the icon on the right.                                                                                                                                                                                                                                                         | `boolean`                                      | `false`     |
| `label`            | `label`       | The label of the tab.                                                                                                                                                                                                                                                                  | `string`                                       | `''`        |
| `nativeAttributes` | --            | Attributes that will be added to the native HTML button element                                                                                                                                                                                                                        | `undefined \| { [key: string]: string; }`      | `undefined` |
| `noActive`         | `no-active`   | Specifies that the tab does not have an active state and thus cannot be activated. This does not mean, that the tab is deactivated. The tab can still be clicked and emit the `catClick` event. This is helpful if a tab should only trigger a click action (such as opening a modal). | `boolean`                                      | `false`     |
| `sticky`           | `sticky`      | Specifies that the tab is always visible in adaptive mode. Only the first sticky tab will be taken into account. Sticky has advantage on activeTabAlwaysVisible if there is no space to show both.                                                                                     | `boolean`                                      | `false`     |
| `testId`           | `test-id`     | A unique identifier for the underlying native element that is used for testing purposes. The attribute is added as `data-test` attribute and acts as a shorthand for `nativeAttributes={ 'data-test': 'test-Id' }`.                                                                    | `string \| undefined`                          | `undefined` |
| `url`              | `url`         | A destination to link to, rendered in the href attribute of a link.                                                                                                                                                                                                                    | `string \| undefined`                          | `undefined` |
| `urlTarget`        | `url-target`  | Specifies where to open the linked document.                                                                                                                                                                                                                                           | `"_blank" \| "_self" \| undefined`             | `undefined` |


## Events

| Event      | Description                  | Type                      |
| ---------- | ---------------------------- | ------------------------- |
| `catClick` | Emitted when tab is clicked. | `CustomEvent<MouseEvent>` |


----------------------------------------------

Made with love in Hamburg, Germany
