# Glossary

**`@haiilo/catalyst`** — the core npm package. Contains all Stencil web
components. Source of truth for component logic and markup.

**`@haiilo/catalyst-tokens`** — the tokens npm package. Style Dictionary source
compiled into CSS custom properties, SCSS variables, JSON, and JS exports.

**`cat-*`** — the tag name prefix for all Catalyst web components
(`cat-button`, `cat-input`, etc.).

**`cssProp`** — a Catalyst custom extension to the W3C design token format.
Marks a token as themeable and sets the CSS custom property name consumers
can override at runtime (e.g. `"cssProp": "primary-bg"` → `--cat-primary-bg`).
See TOKENS.md for the full theming mechanism.

**`delegatesFocus`** — `shadow: { delegatesFocus: true }` in `@Component`.
Makes focus on the host element automatically delegate to the first focusable
element inside the shadow root. Required on all interactive components.

**`findClosest(selector, el)`** — utility in `core/src/utils/find-closest`.
Like `el.closest()` but traverses shadow boundaries. Use instead of native
`closest()` whenever searching for an ancestor from inside a shadow root.

**`hostElement`** — the conventional name for `@Element() hostElement!: HTMLElement`.
The ref to the outer custom element in the DOM.

**`nativeAttributes`** — standard prop (`{ [key: string]: string }`) spread
onto the native inner element. Lets consumers pass arbitrary HTML attributes
without requiring a dedicated prop for each one.

**`proxies.ts`** — auto-generated Angular wrapper file at
`angular/projects/catalyst/src/lib/directives/proxies.ts`. Regenerated on
every `pnpm run build:core`. Never edit by hand.

**`release-please`** — Google OSS tool that automates versioning and changelog
generation from conventional commit messages. All five Catalyst packages version
together (linked-versions plugin).

**Shadow DOM** — browser-native encapsulation for web components. Styles and
DOM inside a shadow root are isolated from the page. Catalyst components always
use `shadow: true`.

**Style Dictionary** — Amazon OSS token pipeline tool. Reads the token source
JSON in `tokens/src/` and compiles it into CSS, SCSS, JS, and JSON outputs.

**`testId`** — standard prop (`string | undefined`) on every interactive
component. Rendered as `data-test` on the native inner element for test selectors.
