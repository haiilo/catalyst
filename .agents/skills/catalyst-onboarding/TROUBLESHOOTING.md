# Troubleshooting

## Build fails with "not found" or missing module error

**Cause:** dependency build order violated.

**Fix:** `pnpm run build` runs the full pipeline in correct order. If building
selectively, follow the graph in REPO-STRUCTURE.md: tokens first, then core,
then angular/react.

## Screenshot test fails locally but passes in CI (or vice versa)

**Cause:** macOS screenshots (`-darwin`) differ from Linux (`-linux`). Both
variants are committed to `__screenshots__/`. CI uses the Linux baseline.

**Fix:** if the difference is intentional, update the correct baseline:
- Local (macOS): `pnpm --filter @haiilo/catalyst run test:screenshot:update`
- CI (Linux): trigger the "Update Screenshots" workflow on GitHub Actions

If the difference is a bug, fix the component.

## Commit hook rejects message

**Cause:** message doesn't follow conventional commits format or uses an
invalid scope.

**Fix:**
```bash
git commit --amend -m "feat(core): correct description"
```

Valid scopes: `core` `angular` `angular-formly` `react` `tokens` `release`

## Token change not reflected in component styles

**Cause:** `build:tokens` was run but `build:core` was not. Core picks up new
token variables only when rebuilt.

**Fix:**
```bash
pnpm run build:tokens
pnpm run build:core
```

## `pnpm install` fails or packages not found

**Cause:** wrong Node or pnpm version.

**Fix:** check `.nvmrc` for the required Node version (`nvm use`), and ensure
pnpm 9+ is installed (`pnpm --version`).
