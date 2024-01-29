/* eslint-disable @typescript-eslint/no-explicit-any */

export function coerceBoolean(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

export function coerceNumber(value: any): number;
export function coerceNumber<D>(value: any, fallback: D): number | D;
export function coerceNumber(value: any, fallbackValue = 0) {
  return isNumberValue(value) ? Number(value) : fallbackValue;
}

function isNumberValue(value: any): boolean {
  return !isNaN(parseFloat(value)) && !isNaN(Number(value));
}
