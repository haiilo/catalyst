# AGENTS.md

Agent instructions for Catalyst Design System. This file complements `README.md` and package READMEs. The nearest `AGENTS.md` applies to files below it.

## Start here

Before working:

1. Identify task type and load the matching skill from `.agents/skills/` by reading its `SKILL.md` and required references.
2. Tell the user which skill you selected and why.
3. Before implementation, show a concise plan. Include one short reason after each step when useful. Ask the user to approve the plan.
4. Wait for approval before editing files or running implementation commands. Read-only inspection needed to create the plan is allowed.
5. After approval, follow skill workflow, add/update tests, validate, inspect diff, and report results.

### Skill routing

| Task                                                                | Skill                                                                |
|---------------------------------------------------------------------|----------------------------------------------------------------------|
| Repository orientation or unfamiliar work                           | `catalyst-onboarding`                                                |
| New or changed `cat-*` component, props, events, or component SCSS  | `catalyst-component-development` + `stenciljs-component-development` |
| Stencil decorators, lifecycle, JSX, or web-component implementation | `stenciljs-component-development`                                    |
| PR or branch review                                                 | `catalyst-pr-review`                                                 |
| Tokens, Angular, React, bug fixes, refactoring, or other work       | `catalyst-onboarding`, then relevant package README and nearby code  |

If no skill exactly matches, use the closest skill and state the adaptation. Never claim to have loaded a skill without reading it. Do not treat “load skills” or a concrete task description as permission to edit before plan approval.

## Project map

Catalyst is a pnpm monorepo publishing:

- `tokens/` — `@haiilo/catalyst-tokens`; Style Dictionary tokens
- `core/` — `@haiilo/catalyst`; Stencil web components
- `angular/` — Angular workspace and bindings
- `angular/projects/catalyst-formly/` — Angular Formly package
- `react/` — `@haiilo/catalyst-react`; React bindings

Technologies: TypeScript, Stencil, Angular, React, SCSS, Style Dictionary, Vitest, Playwright, pnpm, GitHub Actions.

Build order:

```text
tokens -> core -> angular -> angular-formly
tokens -> core -> react
```

Key locations: `tokens/src/`, `core/src/components/cat-*/`, `core/src/utils/`, `angular/projects/`, `react/src/`, `.github/workflows/`.

Read package guidance in `tokens/README.md`, `core/README.md`, `angular/README.md`, and `react/README.md`. Design documentation: <https://design.haiilo.com>.

## Setup

Use Node version from `.nvmrc` (`24`) and pnpm `>=9`.

```bash
nvm use
pnpm install
```

Use pnpm for workspace commands. Keep `pnpm-lock.yaml` synchronized.

## Common commands

```bash
# Build
pnpm run build
pnpm run build:tokens
pnpm run build:core
pnpm run build:angular
pnpm run build:angular-formly
pnpm run build:react

# Development
pnpm --filter @haiilo/catalyst run start
pnpm --filter @haiilo/catalyst run build:watch
pnpm --filter @haiilo/catalyst-angular-workspace run start
pnpm --filter @haiilo/catalyst-angular-workspace run watch

# Core checks
pnpm --filter @haiilo/catalyst run prettier:check
pnpm --filter @haiilo/catalyst run lint
pnpm --filter @haiilo/catalyst run lint:style
pnpm --filter @haiilo/catalyst run test
pnpm --filter @haiilo/catalyst run test:e2e
pnpm --filter @haiilo/catalyst run test:screenshot

# Angular checks
pnpm --filter @haiilo/catalyst-angular-workspace run test
pnpm --filter @haiilo/catalyst-angular-workspace run test:ci

# React and targeted tests
pnpm --filter @haiilo/catalyst-react run build
pnpm --filter @haiilo/catalyst-react run tsc
pnpm --dir core exec vitest run src/components/cat-button/cat-button.spec.tsx
pnpm --dir core exec vitest run -t "test name"
```

Install browser dependencies when needed:

```bash
pnpm --dir core exec playwright install --with-deps
```

Core tests live beside components: `*.spec.tsx` unit, `*.e2e.tsx` browser, and `*.screenshot.tsx` visual regression. Screenshot references use `-darwin` locally and `-linux` in CI. Inspect failures before updating references; update local references only for intentional visual changes with `pnpm run test:screenshot:update`.

## Code rules

- Follow existing patterns; inspect a nearby implementation before introducing one.
- Use `cat-*` tags and `Cat<Name>` classes.
- Keep implementation, SCSS, documentation, and tests together.
- Document public Stencil props, events, and methods with JSDoc.
- Use explicit `false` defaults for boolean props, camelCase multi-word props, and typed `EventEmitter<T>` events prefixed with `cat`.
- Use token/mixin helpers in SCSS; avoid hardcoded design values.
- Add or update tests for behavior changes. Do not skip tests.
- Do not add `as any`, TypeScript ignore directives, empty catches, placeholder code, or unrelated refactors.

Do not hand-edit generated output under `dist/`, `core/loader/`, `core/www/`, `.stencil/`, or generated Angular/React bindings. Rebuild and review generated changes instead. Token changes require rebuilding tokens and affected consumers.

## Git, CI, and releases

- Work on feature branches, not `main` or `beta`.
- Keep unrelated working-tree changes untouched. Never force-push or rewrite shared history.
- Use Conventional Commits with scopes `angular`, `angular-formly`, `core`, `react`, `tokens`, or `release`.
- Before a PR, run relevant builds, tests, formatter, and linters. Run CodeRabbit (`cr --base <target-branch>`) when available; resolve critical and major findings.
- CI is path-sensitive. Core checks tokens/core build, lint, unit, screenshot, and e2e. Angular checks builds and ChromiumHeadless tests. React checks tokens/core/React builds. Tokens CI builds generated token output.
- Releases use release-please on `main` and `beta`, followed by automated npm publishing. Do not publish or change release configuration unless explicitly requested.

## Safety

- Never read, print, commit, or expose secrets, credentials, API keys, or environment files.
- Do not add dependencies or modify CI, deployment, release, or infrastructure files without explicit approval.
- Do not run destructive commands outside the repository.
