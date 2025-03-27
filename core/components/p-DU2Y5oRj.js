/* eslint-disable @typescript-eslint/no-explicit-any */
function coerceBoolean(value) {
    return value != null && `${value}` !== 'false';
}
function coerceNumber(value, fallbackValue = 0) {
    return isNumberValue(value) ? Number(value) : fallbackValue;
}
function isNumberValue(value) {
    return !isNaN(parseFloat(value)) && !isNaN(Number(value));
}

export { coerceNumber as a, coerceBoolean as c };
//# sourceMappingURL=p-DU2Y5oRj.js.map

//# sourceMappingURL=p-DU2Y5oRj.js.map