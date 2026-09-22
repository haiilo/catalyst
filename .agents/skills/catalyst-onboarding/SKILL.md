---
name: catalyst-onboarding
description: >
  Use when orienting to the Catalyst repo, when a contributor asks where to
  start or where to find something, or when mapping unfamiliar territory before
  doing work in components, tokens, or review.
---

# Catalyst Onboarding

The **map**: what exists and where to look.

## On load

Read the user's message and branch:

**No clear goal, or "getting started", or "I'm new"** → give this opening,
then ask what to dive into first:

> Catalyst is a design system monorepo — five published packages (tokens, core
> web components, Angular bindings, Angular Formly, React bindings) that all
> version together. Everything flows from one place: the Stencil components in
> `core/` consume tokens from `tokens/`, and the Angular/React wrappers are
> auto-generated from core on every build.
>
> To work here confidently you need four things: how the repo is structured,
> how components are built, how to review a PR, and how the token system works.
> I have a guide for each. Want to start at the beginning (repo structure), or
> is there something specific you're trying to do?

**Specific goal stated** (e.g. "I want to review a PR", "how do tokens work",
"I need to add a component") → skip the intro, go straight to the knowledge
map below and load the relevant file.

---

**New contributor starting from zero** → work through the Orientation path
below in order.

**Looking up a specific topic** → jump to the Knowledge map.

---

## Orientation path

| Step | Read | You can work independently when you can… |
|---|---|---|
| 1 | [REPO-STRUCTURE.md](REPO-STRUCTURE.md) | Name all 5 packages, their directories, build order, and which generated files must never be edited |
| 2 | [COMPONENT-ANATOMY.md](COMPONENT-ANATOMY.md) | Read any `cat-*.tsx` and explain every decorator, the SCSS conventions, and the purpose of all three test file types |
| 3 | [PR-REVIEW.md](PR-REVIEW.md) | Run through the full PR checklist unaided |
| 4 | [TOKENS.md](TOKENS.md) | Trace a token from source JSON to a `cat-token()` call in SCSS, and explain how a consumer overrides a theme color at runtime |

**Ready to build?** Load the `catalyst-component-development` skill — it walks through the full implementation contract step by step.

**Setup** — before or alongside Step 1: install Node 20+ (use `.nvmrc`), install
pnpm 9+ (`npm install -g pnpm@9`), then run `pnpm install` from the repo root.

---

## Knowledge map

| Topic | Go to |
|---|---|
| Packages, build order, generated files | [REPO-STRUCTURE.md](REPO-STRUCTURE.md) |
| Component decorators, lifecycle, naming, tests | [COMPONENT-ANATOMY.md](COMPONENT-ANATOMY.md) |
| PR review checklist, commit message rules | [PR-REVIEW.md](PR-REVIEW.md) |
| Token source structure, `cat-token()`, theming | [TOKENS.md](TOKENS.md) |
| Creating or modifying a component end-to-end | `catalyst-component-development` skill |
| CI workflows, local checks | [REPO-STRUCTURE.md](REPO-STRUCTURE.md) → Key build commands |
| Troubleshooting | [TROUBLESHOOTING.md](TROUBLESHOOTING.md) |
| Term definitions | [GLOSSARY.md](GLOSSARY.md) |
