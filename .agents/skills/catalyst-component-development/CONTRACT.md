# Catalyst Component Contract

Every rule here is part of the **contract** — the public API surface that
propagates into Angular and all consumer apps the moment it ships.

---

## Props (@Prop)

- Every prop has a JSDoc comment describing what it does (not what type it is —
  TypeScript already says that).
- Boolean props default to `false`. Never default to `true`.
- Use union string literals for enums: `'xs' | 's' | 'm' | 'l' | 'xl'`.
  Do not use TypeScript enums — they don't serialize cleanly to HTML attributes.
- Accessibility props use the `a11y-` attribute prefix:
  `@Prop({ attribute: 'a11y-label' }) a11yLabel?: string`
- Pass-through props for native element attributes use `nativeAttributes`:
  `@Prop() nativeAttributes?: { [key: string]: string }`. Never add a new prop
  just to expose a single native attribute — use `nativeAttributes` instead.
- `testId` is a standard prop on every interactive component. It maps to
  `data-test` on the native element. Copy the pattern from `cat-button`.
- Props that depend on a breakpoint accept `boolean | Breakpoint`. See
  `cat-button`'s `iconOnly` prop for the full pattern including `@Watch` and
  `MediaMatcher` teardown.
- Never make a prop `mutable: true` unless there is no alternative. Prefer
  emitting an event and letting the parent update the prop.

## Events (@Event)

- All event names are prefixed `cat`: `catClick`, `catChange`, `catFocus`, `catBlur`.
- Event payload is typed, never `any`: `EventEmitter<MouseEvent>`, `EventEmitter<string>`, etc.
- Focus/blur events use `FocusEvent` as payload. Click uses `MouseEvent`.
- Change events on form inputs carry the new value: `EventEmitter<string | boolean | number>`.
- Every event has a JSDoc comment.

## CSS Parts (@part)

- Declare every exposed part in the component-level JSDoc with `@part <name> - description`.
- Add `part="<name>"` to the corresponding element in the render output.
- Parts are the official theming extension point. Expose at minimum:
  the root interactive element (e.g. `button`, `input`) and any significant
  sub-regions consumers might need to target.
- Never expose internal implementation details as parts. Only expose stable,
  intentional extension points.

## Slots

- Declare named slots in the component JSDoc with `@slot <name> - description`.
- The default slot requires no `@slot` declaration unless its purpose is non-obvious.
- Check `this.hostElement.hasChildNodes()` in `componentWillRender()` to detect
  slotted content presence. Store in a `@State` to trigger re-render.
  See `cat-button`'s `hasSlottedContent` pattern.

## Public methods (@Method)

- All `@Method()` functions are `async` and return `Promise<void>` or a typed Promise.
- Use `do` prefix for imperative actions: `doFocus()`, `doBlur()`, `doClick()`.
- Document with JSDoc including what the method does and any caveats.

## Shadow DOM

- Always `shadow: true`. Never `scoped: true` for Catalyst components.
- Use `shadow: { delegatesFocus: true }` for any component that wraps a native
  focusable element (`input`, `button`, `a`, `textarea`, `select`).
- `@Element() hostElement!: HTMLElement` — always name it `hostElement`.
- Set `tabIndex` on the host element in `render()` for keyboard-navigable
  components. Copy the pattern from `cat-button`:
  `this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0`

## SCSS and tokens

**Imports** — every component SCSS starts with:
```scss
@use 'variables' as *;
@use 'mixins' as *;
```
Never use `@import`. Never use a relative path to `_variables.tokens.scss` directly.

**Token accessor** — use `cat-token('dot.separated.path')` for all design tokens:
```scss
color: cat-token('color.ui.font.default');
border-radius: cat-border-radius('m');  // 'xs'|'s'|'m'|'l'|'xl'|'full'|0
```

**RGB partial tokens** — color tokens resolve to bare RGB partials, not `#hex`.
Wrap them correctly:
```scss
// Direct use (results in rgb(...)):
background: cat-token('color.theme.primary.bg');

// With opacity:
background: cat-token('color.theme.primary.bg', 0.5);

// In CSS custom property chains (avoid wrapping prematurely):
--bg: #{cat-token('color.theme.primary.bg', $wrap: false)};
background: cat-token-wrap(var(--bg));
```

**Typography** — use mixins, never hardcode font-size or line-height:
```scss
@include cat-body('m');     // body text, medium size
@include cat-body('s');     // body text, small
@include cat-head('l');     // heading, large
```

**Available mixins quick-reference:**
| mixin | use |
|---|---|
| `cat-body($size)` | body font-size + line-height + weight |
| `cat-head($size)` | heading font-size + line-height + weight |
| `cat-ellipsis()` / `cat-ellipsis($n)` | single-line / multi-line truncation |
| `cat-break-word` | word-wrap for long strings |
| `cat-visually-hidden` | accessible hide (screen-reader visible) |
| `cat-select(none)` | disable user selection |
| `cat-font-smooth` | antialiasing for filled/inverted text |
| `cat-border-radius($size)` | border-radius from token scale |

**`:host` display** — set `display` on `:host` to whatever the component needs
(`block`, `inline-block`, `flex`). The bootstrap skeleton in SKILL.md Step 2
defaults to `block`; change it if the component requires otherwise.

Use `:host(.<class>)` selectors for consumer-applied variant classes (see
`cat-button`'s `.cat-tab`, `.cat-nav-item` patterns).

**No hardcoded values** — never write:
- A hex color or `rgb()` — use `cat-token('color.*')`
- A border-radius pixel value — use `cat-border-radius()`
- A transition duration literal — use `cat-token('time.transition.*')`

## Three test files

**`cat-<name>.spec.tsx`** — unit test using `@stencil/vitest` + `vitest`.
Tests shadow DOM render output for the default state and key prop combinations.

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

**`cat-<name>.e2e.tsx`** — integration test using `@stencil/vitest`.
Tests hydration and user interactions (clicks, events, keyboard).

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

**`cat-<name>.screenshot.tsx`** — visual regression using `@vitest/browser/context`.
Tests all meaningful visual states: default, hover, active, disabled, each
variant/color combination. Use `toMatchScreenshot()`.

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

Screenshot tests always wrap the component in a `<div style={{ padding: '10px', display: 'inline-block' }}>`.
Always reset hover state in `afterEach`.

## Angular binding side-effects

The Angular output target (`angular/`) is generated by the Stencil build from
`core/`. Never edit files in `angular/` by hand.

**Breaking contract changes** (require a major version bump):
- Removing a prop
- Renaming a prop
- Changing a prop's type in a non-additive way
- Removing or renaming an event
- Removing a CSS part

**Non-breaking additions** (minor version bump, handled by release-please):
- New prop with a default value
- New event
- New CSS part
- New slot

When making a breaking change: flag it in the PR description and in the commit
message with `BREAKING CHANGE:`.
