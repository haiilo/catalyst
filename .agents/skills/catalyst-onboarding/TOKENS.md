# Catalyst Design Token System

## Source file structure

The token source is a directory tree of JSON files that Style Dictionary merges
at build time via `source: ['src/**/*.json']`.

```
tokens/src/
├── color/
│   ├── base.json       ← Layer 1: primitive palette (raw hex values)
│   ├── theme.json      ← Layer 2: semantic role colors (primary, danger, …)
│   └── ui.json         ← Layer 3: UI-specific semantics (background, border, font)
├── size/
│   ├── border.json     ← Border radius scale
│   ├── font.json       ← Font sizes + line heights
│   └── spacing.json    ← Spacing scale
├── font.json           ← Font family, weight, decoration
├── opacity.json        ← Opacity values
├── time.json           ← Animation durations and transitions
└── z-index.json        ← Z-index values
```

The top-level JSON key becomes the first segment of the token path. A token at
`color/base.json` → `color.base.brand.400` is accessed as
`cat-token('color.base.brand.400')`.

## The three color layers

```
LAYER 1 — Primitives  (color.base.*)
  color.base.brand.400  = #008194   ← raw hex, no semantic meaning

        ↓ referenced by

LAYER 2 — Theme semantics  (color.theme.*)
  color.theme.primary.bg   → color.base.brand.400
  color.theme.danger.bg    → color.base.red.400

        ↓ referenced by

LAYER 3 — UI semantics  (color.ui.*)
  color.ui.background.canvas  → color.base.neutral.100
  color.ui.border.default     → color.base.neutral.200
```

**Three rules:**
1. Layer 1 never references anything — only raw values
2. Layers 2 and 3 reference Layer 1 only — never each other
3. Component SCSS always consumes Layer 2 or 3 — never Layer 1 directly

**Flag in PR review:** `cat-token('color.base.*')` in a component SCSS file is
reaching past the semantic layer. Correct paths are `color.theme.*` or `color.ui.*`.

## Token value formats

**Form 1 — Primitive:**
```json
{ "$type": "color", "$value": "#008194" }
```

**Form 2 — Reference (alias):**
```json
{ "$type": "color", "$value": "{color.base.brand.400}" }
```

**Form 3 — Themeable reference (with `cssProp`):**
```json
{
  "$type": "color",
  "$value": { "value": "{color.base.brand.400}" },
  "cssProp": "primary-bg"
}
```

`cssProp` is a Catalyst custom extension. It marks a token as themeable and
controls the CSS custom property name consumers can override.

## Build pipeline

`pnpm run build:tokens` runs Style Dictionary and produces seven outputs:

| output | format | used by |
|---|---|---|
| `dist/css/variables.css` | CSS custom properties, colors as R,G,B triplets | browser consumers |
| `dist/css/variables-hex.css` | CSS custom properties, colors as hex | design tools |
| `dist/scss/_variables.scss` | SCSS variables + `$tokens` map | `core/` components |
| `dist/js/variables.js` / `.d.ts` | ES module + TypeScript declarations | JS/TS consumers |

**Why colors are R,G,B triplets in CSS:**

```css
:root {
  --cat-color-theme-primary-bg: 0, 129, 148;
}
```

This allows alpha composition without repeating the color:
```css
background: rgba(var(--cat-color-theme-primary-bg), 0.2);
```

## Consuming tokens in SCSS

Every component SCSS starts with:
```scss
@use 'variables' as *;
@use 'mixins' as *;
```

**`cat-token($key)` — primary accessor:**

```scss
// Color token → rgb(var(--cat-*, r, g, b))
background-color: cat-token('color.ui.background.canvas');

// With alpha → rgba(var(--cat-*, r, g, b), 0.2)
background-color: cat-token('color.theme.primary.bg', 0.2);

// Raw RGB triplet (for CSS custom property chains)
--my-color: #{cat-token('color.ui.border.dark', $wrap: false)};
background: cat-token-wrap(var(--my-color));

// Non-color token — returns value directly
transition-duration: cat-token('time.transition.s');  // → 125ms
font-size: cat-token('size.font.body.m');
```

**`cat-border-radius($size)` — shorthand:**

```scss
border-radius: cat-border-radius('s');    // small
border-radius: cat-border-radius('m');    // medium
border-radius: cat-border-radius('full'); // → 100rem (pill)
border-radius: cat-border-radius(0);      // → 0 (square)
```

Always use this over the raw `cat-token('size.border.radius.*')` path.

**Typography mixins — never hardcode font-size or line-height:**

```scss
@include cat-body('m');   // body text medium — sets font-size + line-height together
@include cat-body('s');   // body text small
@include cat-head('l');   // heading large
```

## Theming

Theming is CSS custom property overrides. No JavaScript, no theme provider, no
class switching.

A Form 3 token with `"cssProp": "primary-bg"` emits this SCSS variable:

```scss
$cat-color-theme-primary-bg: var(--cat-primary-bg, 0, 129, 148) !default;
```

The `--cat-primary-bg` slot is the override. Any ancestor element can set it:

```css
/* Consumer app — override primary color per tenant */
.tenant-a {
  --cat-primary-bg: 91, 94, 219;
}
```

All components using `cat-token('color.theme.primary.bg')` pick up the override
automatically — no component code changes needed.

## After changing tokens

Any token change requires a dual build before the change is visible in components:

```bash
pnpm run build:tokens   # regenerates dist/scss/_variables.scss
pnpm run build:core     # picks up the new variables
```

Skipping the dual build is the most common token-related mistake. Flag it in
PR review if the token source changed but `build:tokens` wasn't run.
