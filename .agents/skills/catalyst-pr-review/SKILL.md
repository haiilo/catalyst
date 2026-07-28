# Skill: catalyst-pr-review

Act as a **reviewer**: confirm CI coverage, then apply the manual checklist exhaustively. Every item must be checked or explicitly marked N/A before the review is done.

## Step 1 — Identify the PR and check CI

Ask the user which PR to review if not already specified. Fetch the diff and CI status.

All three CI jobs must be green. If any are red, report the failing job and ask the user whether to wait for a fix or proceed anyway — do not silently continue.

| Job | Runs | Catches |
|-----|------|---------|
| build | `build:tokens` → `build:core` | Type errors, broken imports, SCSS compile failures |
| lint | prettier, ESLint, stylelint | Formatting drift, lint violations |
| test | spec, screenshot, e2e | HTML regression, visual regression, interaction regression |

**Note:** commitlint runs as a Husky pre-commit hook, not in CI. A contributor who used `--no-verify` bypasses it — always check commit messages manually, especially on PRs from external contributors.

Completion criterion: CI status confirmed; any red job surfaced and disposition agreed with user.

## Step 2 — Manual checklist

Work through every section in [CHECKLIST.md](CHECKLIST.md). Mark each item ✅ (pass), ❌ (fail — note the file/line), or N/A (not applicable — one-word reason).

Collect all failures before writing the review so the author gets one complete pass, not a drip of comments.

Completion criterion: every item marked, all ❌ failures documented with file and line.

## Step 3 — Write the review

- Lead with a one-sentence summary of what the PR does.
- List every ❌ as a required change with file, line, and the specific rule it breaks.
- List non-blocking observations as optional suggestions, clearly labelled.
- If all items are ✅ or N/A, approve.

Completion criterion: review drafted for the user to post.
