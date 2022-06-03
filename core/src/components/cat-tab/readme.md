# cat-tab



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                         | Type                                           | Default     |
| ------------- | ------------- | ------------------------------------------------------------------- | ---------------------------------------------- | ----------- |
| `deactivated` | `deactivated` | Specifies that the tab should be deactivated.                       | `boolean`                                      | `false`     |
| `icon`        | `icon`        | The name of an icon to be displayed in the tab.                     | `string \| undefined`                          | `undefined` |
| `iconOnly`    | `icon-only`   | Hide the actual button content and only display the tab.            | `"l" \| "m" \| "s" \| "xl" \| "xs" \| boolean` | `false`     |
| `iconRight`   | `icon-right`  | Display the icon on the right.                                      | `boolean`                                      | `false`     |
| `label`       | `label`       | The label of the tab.                                               | `string`                                       | `''`        |
| `url`         | `url`         | A destination to link to, rendered in the href attribute of a link. | `string \| undefined`                          | `undefined` |
| `urlTarget`   | `url-target`  | Specifies where to open the linked document.                        | `"_blank" \| "_self" \| undefined`             | `undefined` |


## Events

| Event      | Description                  | Type                      |
| ---------- | ---------------------------- | ------------------------- |
| `tabClick` | Emitted when tab is clicked. | `CustomEvent<MouseEvent>` |


----------------------------------------------

Made with love in Hamburg, Germany
