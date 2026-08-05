# AGENTS.md

Agent instructions for Catalyst Design System. This file complements package READMEs; use the closest nested `AGENTS.md` if one is added later.

## Project overview

Catalyst is a pnpm monorepo that publishes five related packages:

| Directory                           | Package                           | Purpose                        |
|-------------------------------------|-----------------------------------|--------------------------------|
| `tokens/`                           | `@haiilo/catalyst-tokens`         | Style Dictionary design tokens |
| `core/`                             | `@haiilo/catalyst`                | Stencil web components         |
| `angular/`                          | `@haiilo/catalyst-angular`        | Angular bindings               |
| `angular/projects/catalyst-formly/` | `@haiilo/catalyst-angular-formly` | Angular Formly types           |
| `react/`                            | `@haiilo/catalyst-react`          | React bindings                 |

Technology: TypeScript, Stencil, Angular, React, SCSS, Style Dictionary, Vitest, Playwright, pnpm, and GitHub Actions. Build dependencies in this order:

```text
tokens -> core -> angular -> angular-formly
tokens -> core -> react
```

## Repository skills

Use these optional skills for deeper guidance when working in this repository:

- `catalyst-onboarding` — orient to repository structure and package workflows.
- `catalyst-component-development` — create or modify Catalyst components.
- `catalyst-pr-review` — review changes against repository standards.
- `stenciljs-component-development` — apply Stencil implementation patterns.

Skill files live under `.agents/skills/`. Follow this file and package documentation when a skill is unavailable.

## Repository navigation

- Tokens: `tokens/src/`, `tokens/config.js`
- Core components/utilities: `core/src/components/cat-*/`, `core/src/utils/`
- Angular source/demos: `angular/projects/`
- React bindings: `react/src/`
- CI: `.github/workflows/`; releases: `release-please-config*.json`, `.release-please-manifest*.json`
- Package documentation: each package's `README.md`

Do not edit generated output under `dist/`, `core/loader/`, `core/www/`, or
`.stencil/` unless a workflow explicitly requires it. Generated files are normally recreated by package scripts.

## Setup

Requirements are declared in the root `package.json`: Node `>=20`, pnpm `>=9`. CI uses the Node version in `.nvmrc` (`24`) and pnpm 9; use those versions locally.

```bash
nvm use
pnpm --version
pnpm install
```

Run commands from repository root unless a command says otherwise. Keep
`pnpm-lock.yaml` synchronized with dependency changes. Do not use npm or Yarn for workspace installation.

## Development commands

### Build

```bash
pnpm run build                 # all packages, in dependency order
pnpm run build:tokens
pnpm run build:core
pnpm run build:angular
pnpm run build:angular-formly
pnpm run build:react
```

Core development server and watch mode:

```bash
pnpm --filter @haiilo/catalyst run start
pnpm --filter @haiilo/catalyst run build:watch
```

Angular development server and watch mode:

```bash
pnpm --filter @haiilo/catalyst-angular-workspace run start
pnpm --filter @haiilo/catalyst-angular-workspace run watch
```

Build output is package-specific: tokens use `tokens/dist`, core uses
`core/dist`, Angular uses `angular/dist`, and React uses `react/dist`.

### Formatting and linting

CI checks core with Prettier, ESLint, and Stylelint:

```bash
pnpm --filter @haiilo/catalyst run prettier:check
pnpm --filter @haiilo/catalyst run lint
pnpm --filter @haiilo/catalyst run lint:style
```

To format or autofix during development, use `prettier`, `lint -- --fix`, and
`lint:style -- --fix` on the core filter. Angular exposes `prettier:check`.

```bash
pnpm --filter @haiilo/catalyst run prettier
pnpm --filter @haiilo/catalyst run lint -- --fix
pnpm --filter @haiilo/catalyst run lint:style -- --fix
pnpm --filter @haiilo/catalyst-angular-workspace run prettier:check
```

Run the applicable formatter and linter after changes. Do not suppress lint rules without a repository-specific reason.

## Testing

### Core

Core tests are configured in `core/vitest.config.mts`:

- `*.spec.tsx`: Stencil/Vitest plugin tests
- `*.e2e.tsx`: headless Chromium browser interaction tests
- `*.screenshot.tsx`: headless Chromium visual regression tests

```bash
pnpm --filter @haiilo/catalyst run test
pnpm --filter @haiilo/catalyst run test:e2e
pnpm --filter @haiilo/catalyst run test:screenshot
pnpm --filter @haiilo/catalyst run test:watch
```

Install browser dependencies when needed:

```bash
pnpm --dir core exec playwright install --with-deps
```

Run one test file or test name through Vitest from `core/`, for example:

```bash
pnpm --dir core exec vitest run src/components/cat-button/cat-button.spec.tsx
pnpm --dir core exec vitest run -t "renders with disabled prop"
```

Screenshot references live in component `__screenshots__/` directories. Local macOS references end in `-darwin`; CI Linux references end in `-linux`. After an intentional visual change:

```bash
pnpm run test:screenshot:update
```

This updates local references. Use the manually triggered **Update Screenshots**
workflow to regenerate Linux references. Do not update snapshots to hide an unexplained rendering or behavior regression.

### Angular

```bash
pnpm --filter @haiilo/catalyst-angular-workspace run test
pnpm --filter @haiilo/catalyst-angular-workspace run test:ci
```

`test:ci` runs both `catalyst` and `catalyst-formly` with ChromiumHeadless.

### React and tokens

React exposes build/type checking rather than a test script:

```bash
pnpm --filter @haiilo/catalyst-react run build
pnpm --filter @haiilo/catalyst-react run tsc
```

Tokens are validated through their build:

```bash
pnpm run build:tokens
```

Always add or update tests for behavior changes. Keep component tests beside their implementation under `core/src/components/`.

## Implementation conventions

### Core components

For a new or changed component, inspect a nearby component with similar behavior first. Keep implementation, styles, documentation, and applicable
`*.spec.tsx`, `*.e2e.tsx`, and `*.screenshot.tsx` files together.

Follow these project conventions:

- Use `cat-*` tags and PascalCase class names.
- Document public `@Prop`, `@Event`, and `@Method` APIs with JSDoc.
- Boolean props have explicit `false` defaults.
- Use camelCase for multi-word props and `cat` prefixes for custom events.
- Type event payloads with `EventEmitter<T>` and definite assignment.
- Public Stencil methods are asynchronous and return `Promise<void>`.
- Use `delegatesFocus: true` for interactive shadow components where focus should enter the native control.
- Use `findClosest` across shadow boundaries and `event.composedPath()` for retargeted events/outside-click handling.
- Expose CSS parts only for meaningful public sub-elements; document each part in component JSDoc and apply its `part` attribute in render output.
- Use `:host` for component layout and token/mixin helpers for colors, typography, radius, and transitions. Avoid hardcoded design values.
- Use `@use 'variables' as *;` and `@use 'mixins' as *;` in component SCSS.

Do not introduce `as any`, TypeScript ignore directives, empty catch blocks, placeholder implementations, or unrelated refactors.

### Tokens and bindings

- Add or update source tokens, then run `pnpm run build:tokens`.
- Rebuild core after token changes: `pnpm run build:tokens && pnpm run build:core`.
- Build Angular and Formly after core changes before testing consumers.
- Build React after core changes; React depends on the workspace core package.
- Do not hand-edit generated bindings or package `dist` output.

## Git and pull requests

- Work on a feature branch; do not commit directly to `main` or `beta`.
- Never force-push shared branches or rewrite shared history.
- Never commit secrets, `.env` files, generated credentials, or agent-tooling configuration directories.
- Keep unrelated working-tree changes untouched.
- Commit messages must use Conventional Commits with one of these scopes:
  `angular`, `angular-formly`, `core`, `react`, `tokens`, or `release`.

Examples:

```text
feat(core): add segmented control
fix(angular): correct value accessor
chore(tokens): update color token
```

Before opening a PR, run relevant build, tests, formatter, and linters.

Address critical and major findings before requesting review. PR descriptions should explain why change is needed and mention visual, API, or generated-output.

## CI and releases

Workflows are path-sensitive. Core CI runs build, lint, unit, screenshot, and e2e checks. Angular CI builds tokens/core/bindings and runs Angular tests. React CI builds tokens/core/React. Tokens CI builds tokens and commits generated token output. Main-branch deployment publishes core documentation to GitHub Pages.

Releases are managed by release-please on `main` (stable) and `beta`
(prerelease), followed by automated npm publishing. Do not publish packages or modify release configuration unless explicitly requested.

## Troubleshooting

- **Workspace package not found:** run `pnpm install`, then rebuild in order:
  `pnpm run build:tokens && pnpm run build:core`.
- **Browser test cannot launch:** run the Playwright install command above.
- **Screenshot mismatch:** inspect actual/diff artifacts before updating references; macOS and Linux references are intentionally separate.
- **Angular consumer testing:** run the full build, then use packages from
  `angular/dist/catalyst` or `angular/dist/catalyst-formly` as documented in the root README.
- **Commit rejected:** check Conventional Commit type and allowed lowercase scope in `.commitlintrc.json`.

## Documentation

Read root/package `README.md` files for consumer setup and release details. Design documentation: https://design.haiilo.com
