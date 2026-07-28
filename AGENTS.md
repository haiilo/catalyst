# Catalyst Design System — AI Agent Instructions

This guide enables AI agents (and developers) to work effectively in the Catalyst monorepo.

## Skills

The following skills are available for deeper guidance. Load them when needed:

- **`catalyst-onboarding`** — orientation to repo structure, component anatomy, tokens, PR review, and troubleshooting. Load first if unfamiliar with the codebase.
- **`catalyst-component-development`** — full step-by-step workflow for creating or modifying a component. Load when ready to build.
- **`catalyst-pr-review`** — step-by-step PR review workflow with full checklist. Load when reviewing a PR.

## About Catalyst

**Catalyst** is a design system built as a monorepo with five published packages:

| Package | Type | Purpose |
|---------|------|---------|
| `@haiilo/catalyst-tokens` | NPM | Design tokens (Style Dictionary) |
| `@haiilo/catalyst` | NPM | Core web components (Stencil) |
| `@haiilo/catalyst-angular` | NPM | Angular bindings for core components |
| `@haiilo/catalyst-angular-formly` | NPM | Angular Formly custom field types |
| `@haiilo/catalyst-react` | NPM | React bindings for core components |

**Tech stack:**
- **Package manager:** pnpm (v9+)
- **Node:** v20+
- **Component framework:** Stencil (TypeScript)
- **Styling:** SCSS + Style Dictionary tokens
- **Testing:** Vitest, Playwright (screenshot + e2e)
- **CI/CD:** GitHub Actions + release-please
- **Release strategy:** Semantic versioning, all packages bumped together

## Setup

### Prerequisites

```bash
# Install Node 20+ (or use .nvmrc)
nvm use

# Install pnpm 9+
npm install -g pnpm@9

# Install workspace dependencies
pnpm install
```

### Useful aliases (optional)

```bash
alias pn='pnpm'
alias pnr='pnpm run'
alias pni='pnpm install'
alias pnb='pnpm build'
alias pnt='pnpm test'
```

### Build order

Packages must be built in dependency order:

```bash
pnpm run build:tokens   # First: design tokens
pnpm run build:core     # Second: web components (depend on tokens)
pnpm run build:angular  # Third: Angular bindings
pnpm run build:angular-formly  # Fourth: Angular Formly types
pnpm run build:react    # Fifth: React bindings
```

Or build all at once:

```bash
pnpm run build
```

## File Structure

```
catalyst/
├── tokens/                    # Design tokens (Style Dictionary)
│   └── src/tokens.json
├── core/                      # Core web components (Stencil)
│   └── src/components/
│       ├── cat-button/
│       │   ├── cat-button.tsx
│       │   ├── cat-button.spec.tsx        # Unit tests
│       │   ├── cat-button.e2e.tsx         # Interaction tests
│       │   ├── cat-button.screenshot.tsx  # Visual regression
│       │   ├── cat-button.scss
│       │   └── __screenshots__/           # Reference images
│       └── [other components]/
├── angular/                   # Angular bindings
├── react/                     # React bindings
├── .github/workflows/         # CI/CD jobs
│   ├── core.yml              # Test + lint for core package
│   ├── angular.yml
│   ├── react.yml
│   ├── tokens.yml
│   └── release.yml           # Automated release via release-please
├── .commitlintrc.json         # Commit message validation
├── .husky/                    # Git hooks (pre-commit, commit-msg)
└── README.md
```

## Guardrails — Core Patterns to Follow

These rules are **derived from the existing codebase** and are enforced by CI or convention.

### 1. Commit Messages (enforced by commitlint)

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

**Valid types:** `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`

**Valid scopes** (only these allowed):
- `core` — core web components
- `angular` — Angular bindings
- `angular-formly` — Angular Formly types
- `react` — React bindings
- `tokens` — design tokens
- `release` — release-related changes

**Examples:**
```bash
feat(core): add clearable prop to cat-input
fix(angular): correct CVA for cat-select
chore(tokens): update color palette
```

**Why it matters:** scope selection triggers version bumps in release-please. A `feat(core)` commits bumps **all packages** (minor version), while `chore(tokens)` may not trigger a release.

**Pre-commit enforcement:** Husky runs commitlint on every commit. To bypass (not recommended): `git commit --no-verify`.

### 2. Component API Design

**Props:**
- Boolean props **must default to `false`**, never optional: `active = false`, not `active?: boolean`
- String unions use established scales only:
  - Sizes: `'xs' | 's' | 'm' | 'l' | 'xl'`
  - Colors: `'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'`
- Multi-word props use camelCase: `iconOnly`, `labelHidden`
- Every `@Prop()` **must have JSDoc** (becomes API documentation)
- Deprecated props: add `@deprecated` note in JSDoc; never remove

**Events:**
- All events prefixed `cat`: `catClick`, `catChange`, `catFocus`, `catBlur`
- Payload typed to match event type: `EventEmitter<MouseEvent>`, `EventEmitter<string>`
- Use definite assignment: `catChange!: EventEmitter<string>` (not optional)

**Methods:**
- Native wraps: `doFocus()`, `doBlur()`, `doClick()` — JSDoc explains "use instead of native"
- State transitions (no `do`): `open()`, `close()`, `clear()`
- **All methods must be `async` and return `Promise<void>`**

**Required boilerplate** (every interactive component):
```tsx
@Element() el!: HTMLElement;

@Prop() testId?: string;
@Prop() nativeAttributes?: { [key: string]: string };

render() {
  return (
    <button
      data-test={this.testId}
      {...this.nativeAttributes}
    >
      {/* content */}
    </button>
  );
}
```

**CSS Parts:**
- Declared in JSDoc: `@part button - The native button element.`
- Applied in render: `<button part="button">`
- Cover: interactive native element, visible sub-regions (label, prefix, suffix)
- Skip: layout wrappers, state-only elements

**Example:**
```tsx
/**
 * A clickable button for triggering actions.
 *
 * @part button - The native button element.
 * @part content - The button text.
 * @part icon - The optional icon.
 */
@Component({
  tag: 'cat-button',
  styleUrl: 'cat-button.scss',
  shadow: { delegatesFocus: true }
})
export class CatButton {
  @Prop() disabled = false;
  @Prop() size: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';
  @Prop() testId?: string;
  @Prop() nativeAttributes?: { [key: string]: string };

  @Event() catClick!: EventEmitter<MouseEvent>;

  @Method() async doFocus(): Promise<void> {
    this.button?.focus();
  }
}
```

### 3. SCSS Styling

**Imports:**
```scss
@use 'variables' as *;
@use 'mixins' as *;
```

**No hardcoded values:**
- Colors: **always use `cat-token('color.*')`**
- Border-radius: **use `cat-border-radius('s' | 'm' | 'l')`** (exception: `10rem` for pill shapes)
- Font sizing: **use `@include cat-body()`, `@include cat-head()` mixins**
- Transitions: **use `cat-token('time.transition.*')`**

**Shadow DOM:**
- `:host` is the top-level layout selector — no wrapping div for layout
- Include `:host([hidden]) { display: none; }` if component affects display
- Vendor prefixes: wrap with `/* stylelint-disable property-no-vendor-prefix */ ... /* stylelint-enable */`

**Example:**
```scss
@use 'variables' as *;
@use 'mixins' as *;

:host {
  display: inline-block;
  max-width: 100%;
}

:host([hidden]) {
  display: none;
}

.button {
  border-radius: cat-border-radius('m');
  color: cat-token('color.text.primary');
  transition: background-color cat-token('time.transition.s') linear;

  &:focus-visible {
    outline: 2px solid cat-token('color.ui.border.focus');
  }
}
```

### 4. Shadow DOM Utilities

These utils exist because Shadow DOM breaks native APIs. Use them:

| Utility | Why | When |
|---------|-----|------|
| `findClosest(selector, el)` | Native `closest()` stops at shadow boundaries | Finding ancestors (parent form, wrapper) |
| `delegatesFocus: true` in `@Component()` | Focus on host auto-delegates to first focusable element | All interactive components |
| `event.composedPath()` | `event.target` is retargeted at shadow boundaries | Outside-click detection, drag-drop |
| Slot detection in `componentWillRender` | Can't query slots inside shadow root synchronously | Detect if label/icon/etc. was slotted |

**Example:**
```tsx
import { findClosest } from '../../utils/find-closest';

export class CatInput {
  @Element() el!: HTMLElement;

  componentWillLoad() {
    // Find parent form
    const form = findClosest('form', this.el);
  }

  handleClick(event: MouseEvent) {
    // Check if click happened outside the component
    const path = event.composedPath();
    const isInside = path.includes(this.el);
  }
}
```

### 5. Testing Requirements

All components must have three test files:

| File | Runner | What | Minimum bar |
|------|--------|------|------------|
| `*.spec.tsx` | Vitest + JSDOM | HTML structure, prop → render, event emission | Renders without error. Structure matches for key prop combinations. |
| `*.e2e.tsx` | Vitest + Playwright | User interactions, focus, form behavior | `.toHaveClass('hydrated')`. Plus interactions needing real browser (typing, clicking, focus). |
| `*.screenshot.tsx` | Vitest + Playwright | Visual appearance per variant | Only for visual variants. Cover all variant × color × state combos. Reset hover in `afterEach`. |

**CI runs all three:**
```yaml
pnpm run test          # spec + e2e
pnpm run test:screenshot
```

**Screenshot references:**
- macOS local: `__screenshots__/*-darwin.png`
- CI (Linux): `__screenshots__/*-linux.png`
- Both committed to repo

**When screenshot test fails in CI:**
1. Download `screenshot-diffs` artifact from workflow
2. Review actual vs expected
3. If intentional: run `pnpm run test:screenshot:update` locally (updates `-darwin` images) or trigger "Update Screenshots" workflow (updates `-linux` images)

**Example:**
```tsx
// cat-button.spec.tsx
describe('cat-button', () => {
  it('renders with disabled prop', async () => {
    const { root } = await render(<cat-button disabled />);
    expect(root.querySelector('button')).toHaveAttribute('disabled');
  });
});

// cat-button.e2e.tsx
describe('cat-button e2e', () => {
  it('emits catClick on click', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-button>Click me</cat-button>');
    const spy = await page.spyOnEvent('catClick');
    await page.click('cat-button');
    expect(spy).toHaveReceivedEvent();
  });
});

// cat-button.screenshot.tsx
describe('cat-button screenshot', () => {
  it('renders all sizes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <cat-button size="xs">XS</cat-button>
      <cat-button size="m">M</cat-button>
      <cat-button size="xl">XL</cat-button>
    `);
    expect(await page.screenshot()).toMatchScreenshot();
  });
});
```

## CI/CD

### Local checks before pushing

```bash
# Format all files (run from core/)
pnpm --filter @haiilo/catalyst run prettier

# Lint and fix (run from core/)
pnpm --filter @haiilo/catalyst run lint --fix
pnpm --filter @haiilo/catalyst run lint:style --fix

# Build all packages
pnpm run build

# Run all tests
pnpm run test
```

### GitHub Actions Workflows

Push triggers automatic CI. All three jobs must pass to merge:

**`.github/workflows/core.yml` (on changes to `core/`)**
1. **build** — `pnpm run build:tokens && pnpm run build:core`
2. **lint** — prettier, ESLint, stylelint
3. **test** — spec, screenshot, e2e tests

Similar workflows exist for `angular.yml`, `react.yml`, `tokens.yml`.

**`.github/workflows/release.yml` (merge to `main` or `beta`)**
- Triggered by release-please PR merge
- Updates CHANGELOG, creates git tag, publishes to npm

### Release Process

**Automated (recommended):**

1. Merge commits with valid conventional commit messages to `main`
2. release-please creates/updates a Release PR automatically
3. Review and merge the Release PR
4. release-please tags, creates GitHub release, and publishes to npm

**For pre-releases (beta):**

1. Ensure `beta` branch is up-to-date with `main`
2. Create feature branch from `beta`
3. Push and merge PR to `beta`
4. release-please creates pre-release PR on `beta`
5. Merge pre-release PR
6. When ready: create PR from `beta` → `main` (with conventional commit message)
7. Merge to `main` to trigger regular release

**Check manifest for current version:**
- `.release-please-manifest.json` — prod versions
- `.release-please-manifest.beta.json` — beta versions

## Common Tasks

### Add a new component to core

1. **Create directory:**
   ```bash
   mkdir core/src/components/cat-mycomponent
   ```

2. **Create files:**
   ```
   cat-mycomponent.tsx         # Component
   cat-mycomponent.spec.tsx    # Unit tests
   cat-mycomponent.e2e.tsx     # E2E tests
   cat-mycomponent.screenshot.tsx  # Visual tests
   cat-mycomponent.scss        # Styles
   ```

3. **Implement component:**
   - Follow component API design (props, events, methods, parts)
   - Use Shadow DOM utilities (`findClosest`, `delegatesFocus`)
   - Use token-based styling (no hardcoded colors)
   - Include JSDoc for all public props/events/methods

4. **Write tests:**
   - spec: HTML structure for key prop combinations
   - e2e: user interactions
   - screenshot: all visual variants

5. **Build and test:**
   ```bash
   pnpm run build
   pnpm run test
   ```

6. **Commit:**
   ```bash
   git add .
   git commit -m "feat(core): add cat-mycomponent"
   ```

### Add a new design token

1. **Edit `tokens/src/tokens.json`**
2. **Build:**
   ```bash
   pnpm run build:tokens
   pnpm run build:core
   ```
3. **Commit:**
   ```bash
   git commit -m "chore(tokens): add new color token"
   ```

### Update a component

1. **Make changes** in the component, styles, and tests
2. **Update tests** if behavior changed
3. **Update screenshots** if appearance changed:
   ```bash
   pnpm run test:screenshot:update  # Local (macOS)
   ```
   Or trigger "Update Screenshots" workflow for CI reference
4. **Build and test:**
   ```bash
   pnpm run build
   pnpm run test
   ```
5. **Commit:**
   ```bash
   git commit -m "fix(core): correct focus behavior in cat-input"
   ```

### Review a PR

Load the `catalyst-pr-review` skill. It walks through CI verification and the full manual checklist step by step.

## Troubleshooting

### Build fails with "not found" error
**Cause:** Dependency order wrong. Always build in order: tokens → core → angular/react

**Fix:**
```bash
pnpm run build:tokens
pnpm run build:core
pnpm run build:angular
```

### Screenshot test fails locally but passes in CI
**Cause:** macOS screenshots (`-darwin`) differ from Linux (`-linux`). Both are committed; CI uses Linux.

**Fix:** Run the test again locally, or manually verify it's an OS-specific rendering difference (not a bug).

### Commit hook rejects message
**Cause:** Message doesn't follow conventional commits or uses invalid scope.

**Fix:**
```bash
git commit --amend -m "feat(core): description"
```

### release-please doesn't trigger a release
**Cause:** No commits with valid conventional commit messages since last release.

**Fix:** Ensure PR has commits like `feat(core): ...` or `fix(angular): ...`

## Resources

- **[Conventional Commits](https://www.conventionalcommits.org/)** — commit message format
- **[release-please](https://github.com/googleapis/release-please)** — automated versioning
- **[Stencil docs](https://stenciljs.com/)** — web component framework
- **[Style Dictionary](https://amzn.github.io/style-dictionary/)** — design token system
- **[Vitest](https://vitest.dev/)** — test runner
- **[Playwright](https://playwright.dev/)** — E2E testing

## Questions or Issues?

For questions about this guide, ask the tech lead or open an issue on GitHub.

