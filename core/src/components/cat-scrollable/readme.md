# cat-scrollable



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                 | Type      | Default |
| ---------------- | ----------------- | ----------------------------------------------------------- | --------- | ------- |
| `overflowX`      | `overflow-x`      | Flags to enable/disable overflowX.                          | `boolean` | `true`  |
| `overflowY`      | `overflow-y`      | Flags to enable/disable overflowY.                          | `boolean` | `true`  |
| `overscroll`     | `overscroll`      | Flag to enable/disable overscroll behavior.                 | `boolean` | `true`  |
| `scrolledBuffer` | `scrolled-buffer` | Buffer to be used to calculate the scroll distance.         | `number`  | `0`     |
| `scrolledInit`   | `scrolled-init`   | Flag to fire an initial event after content initialization. | `boolean` | `true`  |
| `shadowX`        | `shadow-x`        | Flags to enable/disable scroll shadowX.                     | `boolean` | `true`  |
| `shadowY`        | `shadow-y`        | Flags to enable/disable scroll shadowY.                     | `boolean` | `true`  |


## Events

| Event            | Description                                               | Type                |
| ---------------- | --------------------------------------------------------- | ------------------- |
| `scrolledBottom` | Emitted when the content is fully scrolled to the bottom. | `CustomEvent<void>` |
| `scrolledLeft`   | Emitted when the content is fully scrolled to the left.   | `CustomEvent<void>` |
| `scrolledRight`  | Emitted when the content is fully scrolled to the right.  | `CustomEvent<void>` |
| `scrolledTop`    | Emitted when the content is fully scrolled to the top.    | `CustomEvent<void>` |


----------------------------------------------

Made with love in Hamburg, Germany
