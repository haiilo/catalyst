# ElementInternals Mock for Stencil Unit Tests

## Status: ✅ FIXED

We've successfully patched `@stencil/core` to provide a working ElementInternals mock for unit tests. The patch is automatically applied via pnpm.

## Problem (Resolved)

Components using `formAssociated: true` and `@AttachInternals()` were failing in Stencil unit tests because:

1. Stencil's `mock-doc` implementation returned a Proxy for `attachInternals()` that didn't implement the actual ElementInternals API
2. Calling methods like `this.internals.setFormValue()` resulted in `TypeError: setFormValue is not a function`
3. This affected components: `cat-input`, `cat-textarea`, `cat-checkbox`, `cat-toggle`

## Solution Implemented

We used **pnpm patch** to fix Stencil's MockElement implementation:

- **Patch file**: `patches/@stencil__core@4.38.3.patch`
- **Files patched**: `mock-doc/index.js` and `mock-doc/index.cjs`
- **Auto-applied**: Yes, during `pnpm install`

The patch provides a complete ElementInternals mock with all methods (`setFormValue`, `setValidity`, `checkValidity`, etc.).

### Patch Maintenance

When upgrading `@stencil/core`:
1. Check if the new version fixes ElementInternals mock
2. If not, recreate the patch with `pnpm patch @stencil/core`
3. Apply the same changes to `mock-doc/index.js` and `mock-doc/index.cjs`
4. Commit with `pnpm patch-commit`

## References

- [Stencil ElementInternals Documentation](https://stenciljs.com/docs/form-associated)
- [MDN ElementInternals API](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals)
- [pnpm patch documentation](https://pnpm.io/cli/patch)
