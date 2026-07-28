# PR Review Checklist

## Commit message

- [ ] Format: `type(scope): description`
- [ ] Scope is one of: `core` `angular` `angular-formly` `react` `tokens` `release`
- [ ] `feat(core)` triggers a minor bump across all five packages — confirm scope is intentional

```
✓  feat(core): add clearable prop to cat-input
✗  feat(cat-input): add prop      — component name is not a valid scope
✗  fix: typo in readme             — missing scope
```

## Props

- [ ] Booleans default to `false`, not `undefined`: `disabled = false` not `disabled?: boolean`
- [ ] String unions use established scales only — no invented size or color names
  - sizes: `'xs' | 's' | 'm' | 'l' | 'xl'`
  - colors: `'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'`
- [ ] Multi-word props are camelCase: `iconOnly`, `labelHidden`
- [ ] Every `@Prop()` has a JSDoc comment
- [ ] Deprecated props have `@deprecated reason. Use X instead.` in JSDoc — never removed

## Events

- [ ] All events prefixed `cat`: `catClick`, `catChange`, `catFocus`, `catBlur`
- [ ] Payload typed to the event: `EventEmitter<FocusEvent>`, `EventEmitter<MouseEvent>`
- [ ] Value-change events carry the value type: `EventEmitter<string>` not `EventEmitter<Event>`
- [ ] Definite assignment: `catChange!: EventEmitter<string>`

## Methods

- [ ] Native wraps use `do` prefix: `doFocus()`, `doBlur()`, `doClick()`
- [ ] JSDoc on `do*` methods says "Use this instead of calling `.focus()` directly"
- [ ] State transitions have no prefix: `open()`, `close()`, `clear()`
- [ ] All `@Method()` are `async` and return `Promise<void>`

## Boilerplate

Every interactive component must have:

- [ ] `@Element() el!: HTMLElement`
- [ ] `testId?: string` prop — applied as `data-test` on the native inner element
- [ ] `nativeAttributes?: { [key: string]: string }` prop — spread on the native inner element

## CSS parts

- [ ] Every part declared in component JSDoc: `@part button - The native button element.`
- [ ] Every declared part applied in render: `part="button"`
- [ ] Parts cover: native interactive element, visible sub-regions (label, prefix, suffix, content)
- [ ] Parts do NOT expose: internal layout wrappers, state-only elements

## SCSS

- [ ] Starts with `@use 'variables' as *;` and `@use 'mixins' as *;`
- [ ] No hardcoded color hex or `rgb()` — all via `cat-token('color.*')`
- [ ] No raw `font-size` / `line-height` — use `@include cat-body()` / `@include cat-head()`
- [ ] No hardcoded `border-radius` px/rem — use `cat-border-radius()` (exception: `10rem` for pill)
- [ ] Vendor-prefix blocks wrapped in `/* stylelint-disable/enable property-no-vendor-prefix */`
- [ ] `:host` is the top-level layout selector — no wrapping div for host layout
- [ ] `:host([hidden]) { display: none; }` present

Token access patterns — three forms, all valid:

```scss
// 1. Standard
outline: 2px solid cat-token('color.ui.border.focus');
// 2. Raw RGB triplet for CSS custom property chain
--my-color: #{cat-token('color.ui.border.dark', $wrap: false)};
// 3. Re-wrap at consumption point
background: cat-token-wrap(var(--my-color));
```

## Tests

- [ ] New prop with render impact → spec test added
- [ ] New interaction (focus, value, event) → e2e test added
- [ ] New visual variant or state → screenshot test added and baselines committed

## Shadow DOM

- [ ] Ancestor traversal uses `findClosest(selector, el)` from `core/src/utils/find-closest` — not `el.closest()`
- [ ] Outside-click / inside detection uses `event.composedPath()` — not `event.target`
- [ ] Any component wrapping a focusable element uses `shadow: { delegatesFocus: true }`
