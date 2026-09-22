# Catalyst Component Anatomy

## File structure

Every component lives in `core/src/components/cat-<name>/` with exactly six files:

```
cat-<name>/
  cat-<name>.tsx            # component implementation
  cat-<name>.scss           # styles
  cat-<name>.spec.tsx       # unit test (shadow DOM render assertions)
  cat-<name>.e2e.tsx        # integration test (hydration, interaction)
  cat-<name>.screenshot.tsx # visual regression (toMatchScreenshot)
  readme.md                 # auto-generated on build
```

## Decorator map

| decorator | what it does |
|---|---|
| `@Component` | Registers the custom element. `shadow: true` always. `shadow: { delegatesFocus: true }` for any component wrapping a native focusable element (`input`, `button`, `a`, `textarea`, `select`). |
| `@Element() hostElement!: HTMLElement` | Ref to the outer `<cat-*>` DOM element. Always named `hostElement`. |
| `@Prop()` | Public API. Becomes `@Input()` in Angular, a prop in React. Every prop requires a JSDoc comment. |
| `@State()` | Internal reactive state. Changes trigger re-render. Not visible outside the component. |
| `@Watch('propName')` | Fires when a prop or state changes. Place immediately after the prop it watches. |
| `@Event()` | Declares a custom DOM event emitter. All events prefixed `cat`. Becomes `@Output()` in Angular. |
| `@Listen('event')` | Intercepts a DOM event on the host or a specified target. |
| `@Method()` | Public imperative API. Always `async`, returns `Promise<void>`. |

## Member order (enforced by convention)

```typescript
// 1. Private instance fields
// 2. @Element() hostElement
// 3. @State() — alphabetical
// 4. @Prop() + immediate @Watch() — alphabetical
// 5. @Event() — alphabetical
// 6. Lifecycle methods — natural order
// 7. @Listen()
// 8. @Method() — alphabetical
// 9. Private methods
// 10. render() — always last
```

Tag name: `cat-*` kebab-case. Class name: `Cat*` PascalCase.
Internal state fields: `_camelCase` prefix. CSS classes: `cat-{tag}-{modifier}`.
Events: `cat*` camelCase (`catClick`, `catChange`, `catBlur`).
Methods: `do*` for native wraps (`doFocus`, `doBlur`), no prefix for state transitions (`open`, `close`).
A11y props: `a11y*` camelCase → `a11y-*` attribute (`a11yLabel` → `a11y-label`).
CSS parts: semantic nouns (`part="button"`, `part="content"`).

## Key render() patterns

```tsx
// Host wrapper — sets attributes on the host element
<Host data-button-group={this.buttonGroupPosition}>
  <button part="button">...</button>
</Host>

// CSS parts — exposes shadow internals for consumer styling
<button part="button">
  <span part="content">...</span>
</button>
// Consumer: cat-button::part(button) { ... }

// Spread nativeAttributes — arbitrary passthrough to inner element
<button {...this.nativeAttributes} data-test={this.testId}>

// Dynamic class object
class={{
  'cat-button': true,
  'cat-button-loading': this.loading,
  [`cat-button-${this.variant}`]: Boolean(this.variant),
}}

// Conditional render — use null, not undefined
{this.loading ? <cat-spinner /> : null}

// Slot — renders consumer-provided content
<slot></slot>
```

## SCSS conventions

Every component SCSS starts with:

```scss
@use 'variables' as *;
@use 'mixins' as *;
```

Token access:

```scss
// Color token
outline: 2px solid cat-token('color.ui.border.focus');

// Border radius
border-radius: cat-border-radius('m');  // 'xs'|'s'|'m'|'l'|'xl'|'full'|0

// Typography — never hardcode font-size or line-height
@include cat-body('m');
@include cat-head('l');

// Transition
transition: color cat-token('time.transition.s') linear;
```

`:host` rules:

```scss
:host {
  display: inline-block;  // or block, flex — whatever the component needs
}

:host([hidden]) {
  display: none;  // always present
}
```

## Shadow DOM utilities

| utility | why | when |
|---|---|---|
| `findClosest(selector, el)` from `core/src/utils/find-closest` | `el.closest()` stops at shadow boundaries | Finding ancestor elements (e.g. parent `<form>`) |
| `shadow: { delegatesFocus: true }` | Focus on host delegates to first focusable element in shadow root | All interactive components |
| `event.composedPath()` | `event.target` is retargeted at shadow boundaries | Outside-click detection, drag-drop |
| Slot detection in `componentWillRender` | Slots can't be queried inside shadow root synchronously | `this.hostElement.hasChildNodes()` to detect slotted content |
| Manual `tabIndex` in `render()` | Host must stay in tab order when `delegatesFocus` is used | `this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) \|\| 0` |

## Three test files

**`cat-<name>.spec.tsx`** — unit test, JSDOM, no browser needed.
Tests shadow DOM render output for default state and key prop combinations.

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-<name>';

describe('cat-<name>', () => {
  it('renders', async () => {
    const { root } = await render(<cat-<name> />);
    await expect(root.shadowRoot).toEqualHtml(`...`);
  });
});
```

**`cat-<name>.e2e.tsx`** — integration test, real browser (Playwright).
Tests hydration and user interactions.

```typescript
import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-<name>', () => {
  it('renders', async () => {
    const { root } = await render(<cat-<name> />);
    await expect.element(root).toHaveClass('hydrated');
  });
});
```

**`cat-<name>.screenshot.tsx`** — visual regression, real browser (Playwright).
Tests all meaningful visual states. PNG baselines committed to `__screenshots__/`
as both `-darwin` and `-linux` variants.

```typescript
import { describe, it, expect, afterEach } from 'vitest';
import { render, h } from '@stencil/vitest';
import { page } from '@vitest/browser/context';

describe('cat-<name>', () => {
  afterEach(async () => {
    await page.elementLocator(document.body).hover(); // reset hover state
  });

  it('default', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-<name> />
      </div>
    );
    await expect(root).toMatchScreenshot();
  });
});
```

Always wrap in `<div style={{ padding: '10px', display: 'inline-block' }}>`.
Always reset hover state in `afterEach`.
Use `it.each` for variant × color × state matrices.
