# cat-datepicker-inline



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                              | Type                                                      | Default     |
| ---------- | ---------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------- |
| `disabled` | `disabled` | Whether the input is disabled.                                                           | `boolean`                                                 | `false`     |
| `max`      | `max`      | A maximum value as ISO Date string, e.g. 2017-03-04T01:23:43.000Z.                       | `string \| undefined`                                     | `undefined` |
| `min`      | `min`      | A minimum value as ISO Date string, e.g. 2017-03-04T01:23:43.000Z.                       | `string \| undefined`                                     | `undefined` |
| `mode`     | `mode`     | The mode of the datepicker, to select a date, time, both, a date range or a week number. | `"date" \| "daterange" \| "datetime" \| "time" \| "week"` | `'date'`    |
| `readonly` | `readonly` | The value is not editable.                                                               | `boolean`                                                 | `false`     |
| `step`     | `step`     | The step size to use when changing the time.                                             | `number`                                                  | `5`         |
| `value`    | `value`    | The value as ISO Date string, e.g. 2017-03-04T01:23:43.000Z or as a week number string.  | `string \| undefined`                                     | `undefined` |


## Events

| Event       | Description                        | Type                  |
| ----------- | ---------------------------------- | --------------------- |
| `catChange` | Emitted when the value is changed. | `CustomEvent<string>` |


----------------------------------------------

Made with love in Hamburg, Germany
