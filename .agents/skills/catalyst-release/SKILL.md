# Skill: catalyst-release

Perform a **release** of the Catalyst design system. All five packages share a single version via the `linked-versions` plugin — one Release PR bumps them all.

Ask the user: **stable or beta?** Then follow the matching track below.

Release-please monitors `main` (stable) and `beta` (pre-release). When it sees releasable commits it creates or updates a Release PR — changelog + manifest bump. Merging that PR triggers `release.yml`, which builds and publishes all five packages to npm.

| Branch | Config | Manifest | npm tag |
|--------|--------|----------|---------|
| `main` | `release-please-config.json` | `.release-please-manifest.json` | `latest` |
| `beta` | `release-please-config.beta.json` | `.release-please-manifest.beta.json` | `beta` |

## Version bump rules

The bump is the highest-impact commit since the last release. Scope determines which changelog gets the entry; all five packages bump regardless.

| Commit type | Bump |
|-------------|------|
| `feat(*)` | minor |
| `fix(*)`, `perf(*)` | patch |
| `BREAKING CHANGE` footer | major |
| `chore(*)`, `docs(*)`, `style(*)` | no release |

## Stable release

1. Confirm all feature/fix commits are on `main` with valid conventional commit messages.
2. Find the open Release PR (title: `chore(main): release X.Y.Z`).
3. Check before merging:
   - [ ] CHANGELOG entries match the commits and are readable
   - [ ] Version in `.release-please-manifest.json` matches the intended bump level
   - [ ] No unintended commits in the diff
   - [ ] CI on the Release PR is green
4. Merge the Release PR.
5. Confirm the `release` job completes and `publish` job runs — all five packages on npm at the new version.

Completion criterion: all five packages published at the new version under the `latest` tag.

## Beta release

1. Ensure `beta` is up-to-date with `main`: `git checkout beta && git merge main`.
2. Create a feature branch from `beta`, make changes, merge PR to `beta`.
3. Find the Release PR release-please created on `beta` (title: `chore(beta): release X.Y.Z-beta.N`).
4. Apply the same pre-merge checks as stable, then merge.
5. Confirm packages are published under the `beta` tag.

Completion criterion: all five packages published at `X.Y.Z-beta.N` under the `beta` tag.

**Promoting beta to stable:** open a PR from `beta` → `main` with a conventional commit message — release-please detects it and creates a stable Release PR. Then follow the stable track.

## Troubleshooting

**Release PR not appearing**
No releasable commits since last release. `chore(*)` alone does not trigger a release — at least one `feat` or `fix` must be present.

**`publish` job skipped**
`releases_created` was false — Release PR was not merged, or release-please found no new releasable commits. Re-check the Release PR state.

**Beta and stable manifests out of sync**
Sync `beta` with `main` after every stable release (`git merge main` into `beta`).

**Wrong version bumped**
linked-versions means packages cannot bump independently. Add a `fix` commit to force a patch bump if only `chore` commits exist.
