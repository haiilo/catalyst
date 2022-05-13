# cat-scrollable



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                                     | Type      | Default |
| ---------------- | ------------------ | --------------------------------------------------------------- | --------- | ------- |
| `noOverflowX`    | `no-overflow-x`    | Flags to disable/enable overflowX.                              | `boolean` | `false` |
| `noOverflowY`    | `no-overflow-y`    | Flags to disable/enable overflowY.                              | `boolean` | `false` |
| `noOverscroll`   | `no-overscroll`    | Flag to disable/enable overscroll behavior.                     | `boolean` | `false` |
| `noScrolledInit` | `no-scrolled-init` | Flag to not fire an initial event after content initialization. | `boolean` | `false` |
| `noShadowX`      | `no-shadow-x`      | Flags to disable/enable scroll shadowX.                         | `boolean` | `false` |
| `noShadowY`      | `no-shadow-y`      | Flags to disable/enable scroll shadowY.                         | `boolean` | `false` |
| `scrolledBuffer` | `scrolled-buffer`  | Buffer to be used to calculate the scroll distance.             | `number`  | `0`     |


## Events

| Event            | Description                                               | Type                |
| ---------------- | --------------------------------------------------------- | ------------------- |
| `scrolledBottom` | Emitted when the content is fully scrolled to the bottom. | `CustomEvent<void>` |
| `scrolledLeft`   | Emitted when the content is fully scrolled to the left.   | `CustomEvent<void>` |
| `scrolledRight`  | Emitted when the content is fully scrolled to the right.  | `CustomEvent<void>` |
| `scrolledTop`    | Emitted when the content is fully scrolled to the top.    | `CustomEvent<void>` |


----------------------------------------------

Made with love in Hamburg, Germany
