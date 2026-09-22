---
name: code-review
description: Review Catalyst pull requests. Use for pull request and code review, especially changes to Catalyst components, tokens, Angular, Angular Formly, React bindings, generated bindings, CI checks, or public API contracts.
---

# Catalyst Code Review

The **gate**: approve only when every applicable check passes or is explicitly N/A. Report all blocking findings in one review.

## Step 1 — Establish review context

Use current pull request context. If unavailable, ask for its URL or number. Inspect the description, base and head commits, changed files, commits, existing review threads, and check runs.

Map changed paths to applicable workflows:

| Changed path | Workflow | Checks            |
|--------------|----------|-------------------|
| `tokens/**`  | Tokens   | build             |
| `core/**`    | Core     | build, lint, test |
| `angular/**` | Angular  | build, test       |
| `react/**`   | React    | build             |

Workflow paths are authoritative; check `.github/workflows/` when they change. React and Tokens have no dedicated lint or test workflow. If a public Core contract changes, also require generated binding review and Angular and React consumer builds: their workflows do not run for `core/**` alone.

Record failed applicable checks. Continue static review, but do not approve while required applicable checks fail.

Completion criterion: changed areas and applicable checks identified; every failed check recorded.

## Step 2 — Apply applicable checks

Load [CHECKLIST.md](CHECKLIST.md). Select sections by changed area. Mark every applicable item ✅, ❌, or N/A with a short reason. For every ❌, record exact file, line, evidence, and required correction.

Inspect changed source, tests, generated bindings, public contracts, and dependency or tooling changes; do not infer correctness from green CI.

Completion criterion: every applicable checklist item accounted for; every blocking finding has actionable evidence.

## Step 3 — Publish one review

- Lead with one sentence describing PR effect.
- List ❌ items as required changes with file, line, evidence, and rule.
- Label non-blocking observations as suggestions.
- Request changes for any blocking finding.
- Approve only when no blocking findings exist and all required applicable checks pass.
- Otherwise leave a comment review describing pending failed or missing checks.

Completion criterion: one complete review published or drafted, with no unreported blocking finding.
