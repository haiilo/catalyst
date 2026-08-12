---
name: catalyst-component-development
description: >
  Use when creating a new cat-* component, modifying an existing one, adding or
  changing props or events, or touching component styles in
  core/src/components/.
---

# Catalyst Component Development

> **Requires:** load the `stenciljs-component-development` skill alongside this
> one. This skill covers Catalyst-specific rules only — Stencil decorator syntax,
> lifecycle methods, and JSX are assumed knowledge from that skill. Both skills
> are available in `.agents/skills/`.

The **contract** is the leading word for this skill. Every `cat-*` component
exposes a public contract — props, events, CSS parts, slots — that propagates
into Angular bindings and all consumer apps the moment it ships. Work that
respects the contract is safe. Work that breaks it requires a major version bump
across all five packages. Keep this in mind on every decision below.

---

## Entry point

**Creating a new component** → start at Step 1.  
**Modifying an existing component** → skip to Step 3. Steps 1–2 don't apply.

---

## Step 1 — Scaffold the component directory

Create `core/src/components/cat-<name>/` with exactly these six files:

```
cat-<name>/
  cat-<name>.tsx           # component implementation
  cat-<name>.scss          # styles
  cat-<name>.spec.tsx      # unit test (shadow DOM render assertions)
  cat-<name>.e2e.tsx       # integration test (hydration, interaction)
  cat-<name>.screenshot.tsx # visual regression test (toMatchScreenshot)
  readme.md                # auto-generated — leave as empty placeholder
```

No other files. No `.css`. No subdirectories. No `index.ts`.

**Naming rules:**
- Tag: `cat-<name>` (kebab-case, always `cat-` prefix)
- Class: `Cat<Name>` (PascalCase)
- Files: match the tag exactly

**Completion criterion:** all six files exist, no extras.

---

## Step 2 — Bootstrap the component skeleton

Start `.tsx` from this skeleton, preserving member order exactly:

```typescript
import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';

/**
 * One-sentence description of what this component is for.
 *
 * @part <part-name> - Description of each exposed CSS part.
 * @slot <slot-name> - Description of each named slot (omit if default slot only).
 */
@Component({
  tag: 'cat-<name>',
  styleUrl: 'cat-<name>.scss',
  shadow: true
})
export class Cat<Name> {
  // 1. Private instance fields
  // 2. @Element() hostElement!: HTMLElement;
  // 3. @State() (alphabetical)
  // 4. @Prop() + immediate @Watch() (alphabetical)
  // 5. @Event() (alphabetical)
  // 6. Lifecycle methods (natural order)
  // 7. @Listen()
  // 8. @Method() (alphabetical)
  // 9. Private methods
  // 10. render() — always last

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
```

Bootstrap `.scss` with the standard imports and `:host` block:

```scss
@use 'variables' as *;
@use 'mixins' as *;

:host {
  display: block;
}

:host([hidden]) {
  display: none;
}
```

**Completion criterion:** skeleton compiles (`pnpm --filter @haiilo/catalyst build` exits 0).

---

## Step 3 — Implement the contract

Implement props, events, slots, and methods according to the requirements. Apply
every rule in [CONTRACT.md](CONTRACT.md) while writing. The contract rules are
not optional — each one is a hard constraint, not a suggestion.

**Completion criterion:** run `pnpm --filter @haiilo/catalyst build`. It must
exit 0 with no TypeScript errors. Every prop and event in the requirements has
an implementation, a JSDoc comment, and a matching entry in the done checklist.

---

## Step 4 — Style with SCSS and tokens

Write styles in `cat-<name>.scss`. Apply every rule in [CONTRACT.md](CONTRACT.md)
under the SCSS section while writing.

**Completion criterion:** no hardcoded colors, no hardcoded radii, no hardcoded
transition durations. Every value that has a token uses the token.
Run `pnpm --filter @haiilo/catalyst build` to confirm no SCSS errors.

---

## Step 5 — Write three tests

Every component requires all three test files. See [CONTRACT.md](CONTRACT.md)
for what belongs in each.

Run `pnpm --filter @haiilo/catalyst test` and confirm all three files pass.

**Completion criterion:** spec, e2e, and screenshot tests all pass. Zero skipped tests.

---

## Step 6 — Register Angular exports

Stencil generates Angular proxies but does not register them in
`CatalystModule`. Add every new public component to `CatComponents` in
`angular/projects/catalyst/src/lib/catalyst.module.ts`; composed components
need entries for the parent and each public child.

**Completion criterion:** every new public component has a corresponding
`Components.Cat<Name>` entry in `CatComponents`, which the existing spreads
include in both `declarations` and `exports`.

## Step 7 — Verify Angular bindings

Run both builds:

1. `pnpm --filter @haiilo/catalyst build`
2. `pnpm run build:angular`

Inspect the generated directive at
`angular/projects/catalyst/src/lib/directives/proxies.ts`; new or modified
props and events must appear there. Never edit generated files. See
[CONTRACT.md](CONTRACT.md) for breaking changes.

`pnpm run build:core` generates this Angular proxy and the React proxy at
`react/src/components/stencil-generated/index.ts`. Review both files and commit
their changes with the component. CI regenerates them for validation but does
not commit them. Never discard generated binding changes or edit them manually.

**Completion criterion:** both builds exit 0. Generated Angular directive and
React proxy reflect the current component contract, and their tracked changes
are included in the component change.

---

## Step 8 — Verify React bindings

After the core build, verify every new public component has a `Cat<Name>` export
in the generated
`react/src/components/stencil-generated/index.ts`, then run:

```bash
pnpm run build:react
```

**Completion criterion:** React proxy exports exist for every new public
component and `pnpm run build:react` exits 0.

## Step 9 — Done checklist

Before considering the work complete, verify every item:

- [ ] Six files present, no extras
- [ ] Member order matches the skeleton (props before events, lifecycle before methods, render last)
- [ ] Every public prop and event has a JSDoc comment
- [ ] `@part` declarations in the component JSDoc match every `part="..."` in the render output
- [ ] No hardcoded color, radius, or transition value in SCSS — all via tokens
- [ ] `:host([hidden]) { display: none; }` present in SCSS
- [ ] Three test files pass (`pnpm --filter @haiilo/catalyst test`)
- [ ] Every new public component is registered in `CatComponents` in `CatalystModule`
- [ ] Angular build passes (`pnpm run build:angular`)
- [ ] React proxy export exists for every new public component
- [ ] React build passes (`pnpm run build:react`)
- [ ] Generated Angular and React binding changes are reviewed and committed
- [ ] No `as any`, `@ts-ignore`, or empty catch blocks introduced
- [ ] `readme.md` is present (content auto-generated on build; placeholder is fine)
