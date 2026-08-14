# Catalyst Code Review Checklist

Apply only sections relevant to changed paths. Mark every applicable rule ✅, ❌, or N/A with a reason.

## Repository-wide

- [ ] PR description explains user-facing or maintenance intent and scope.
- [ ] Commit messages follow Conventional Commits. If a scope is present, it is one of `core`, `angular`, `angular-formly`, `react`, `tokens`, or `release`; scope is review policy, not enforced as required by current commitlint config.
- [ ] Commit-message validation is absent from CI. Local commitlint runs from Husky's `commit-msg` hook and can be bypassed; inspect commits when relevant.
- [ ] No secrets, credentials, `.env` files, or sensitive infrastructure information are added.
- [ ] Dependency, lockfile, CI, release, deployment, or infrastructure changes are intentional, minimal, and documented. Escalate shared-infrastructure changes for platform review.
- [ ] No generated output is hand-edited: `dist/`, `core/loader/`, `core/www/`, `.stencil/`, generated Angular proxies, or generated React bindings.

## Tokens (`tokens/**`)

- [ ] Token source follows existing design-token structure.
- [ ] Token build output is regenerated and reviewed; affected Core consumers are rebuilt when token names or values change.
- [ ] Token changes preserve consumer compatibility or include a deprecation/migration path.

## Core public contract (`core/src/components/**`)

- [ ] Public props, events, methods, slots, CSS parts, and form behavior remain backward compatible; removals or semantic changes include deprecation and migration guidance.
- [ ] Public API changes regenerate and review `angular/projects/catalyst/src/lib/directives/proxies.ts` and `react/src/components/stencil-generated/index.ts`; Angular and React builds pass.
- [ ] Changes to `cat-input`, `cat-textarea`, `cat-datepicker`, `cat-datepicker-inline`, `cat-checkbox`, `cat-toggle`, `cat-radio`, `cat-radio-group`, `cat-select`, or `cat-tag` preserve or deliberately update value-accessor bindings in `core/stencil.config.ts`.

### Props, events, and methods

- [ ] Boolean props use explicit `false` defaults when false is their default behavior.
- [ ] Multi-word props are camelCase; string unions reuse established scales unless an intentional contract addition is documented.
- [ ] Public `@Prop()`, `@Event()`, and `@Method()` members have accurate JSDoc.
- [ ] Deprecated APIs remain available and their JSDoc gives actionable replacement or migration guidance.
- [ ] Events use `cat` prefix and precise `EventEmitter<T>` payloads; value-change events emit their value type.
- [ ] Native-element wrappers expose `doFocus`, `doBlur`, or `doClick` as appropriate; documentation directs consumers away from inner-element access.
- [ ] Public `@Method()` members are asynchronous and return `Promise<void>` unless an established contract requires another return type.

### Native controls and parts

- [ ] Components wrapping a native control expose `@Element()`, `testId`, and `nativeAttributes` when an inner native element can receive them; `testId` maps to `data-test` and `nativeAttributes` is forwarded.
- [ ] Component JSDoc declares every exposed CSS part; every declared part appears in render output.
- [ ] Parts expose consumer-meaningful surfaces, not internal layout or state-only wrappers.

### SCSS and Shadow DOM

- [ ] Component SCSS uses established imports, token helpers, mixins, `:host` layout, and `:host([hidden]) { display: none; }` where applicable.
- [ ] Colors, typography, radii, and transitions use existing token or mixin patterns. Hardcoded color values are rejected; token-backed CSS custom-property and RGB consumption is allowed.
- [ ] Vendor-prefix exceptions use narrow paired Stylelint disable/enable comments.
- [ ] Shadow-boundary ancestor traversal uses `findClosest`; outside-click detection uses `event.composedPath()`.
- [ ] Focusable wrappers use `shadow: { delegatesFocus: true }` when this matches established component behavior.

### Accessibility and tests

- [ ] Keyboard behavior, focus movement/restoration, disabled behavior, labels, semantic roles, and ARIA state remain correct.
- [ ] Render-affecting prop changes have spec coverage.
- [ ] Interaction, focus, value, or event changes have e2e coverage.
- [ ] Visual variants or state changes have screenshot coverage; baseline changes are intentional and reviewed.

## Angular and Formly (`angular/**`)

- [ ] Public Angular or Formly API changes preserve compatibility or include deprecation and migration guidance.
- [ ] Changes are covered by relevant Angular or Formly tests and `build:angular` / `build:angular-formly` validation.
- [ ] Generated Core proxies are not hand-edited.

## React (`react/**`)

- [ ] Public wrapper API changes preserve compatibility or include deprecation and migration guidance.
- [ ] Generated Stencil bindings are not hand-edited.
- [ ] React build passes; add targeted tests when test infrastructure exists or behavior changes warrant coverage.

## Tooling and release

- [ ] CI changes map correctly to affected paths and preserve required build order: tokens → core → Angular/Formly and tokens → core → React.
- [ ] Public breaking changes are explicitly flagged with consumer migration path; linked release versions do not eliminate compatibility review.
- [ ] Formatter, linter, builds, and relevant tests were run or CI status proves their applicable execution.
