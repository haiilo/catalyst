export type FilterObjectFn = (value: never, key: string | number, obj: object) => boolean;

export function filterObject(obj: object, fn: FilterObjectFn): object {
  return Object.keys(obj).reduce((accum, property) => {
    const value = (obj as never)[property];

    if (fn(value, property, obj)) {
      (accum as never)[property] = value;
    }

    return accum;
  }, {});
}

export function isDefined(value: never): boolean {
  return typeof value !== 'undefined';
}
