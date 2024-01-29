# Catalyst Design System

[![Deploy](https://github.com/haiilo/catalyst/actions/workflows/deploy.yml/badge.svg)](https://github.com/haiilo/catalyst/actions/workflows/deploy.yml)

| Package | Description | Status | Docs |
| ------- | ----------- | ------ | ---- |
| `@haiilo/catalyst`           | Core web components               | [![Core](https://github.com/haiilo/catalyst/actions/workflows/core.yml/badge.svg)](https://github.com/haiilo/catalyst/actions/workflows/core.yml) | [README](https://github.com/haiilo/catalyst/blob/main/core/README.md) |
| `@haiilo/catalyst-tokens`    | Style Dictionary design tokens    | [![Tokens](https://github.com/haiilo/catalyst/actions/workflows/tokens.yml/badge.svg)](https://github.com/haiilo/catalyst/actions/workflows/tokens.yml) | [README](https://github.com/haiilo/catalyst/blob/main/tokens/README.md) |
| `@haiilo/catalyst-angular`   | Angular bindings for components   | [![Angular](https://github.com/haiilo/catalyst/actions/workflows/angular.yml/badge.svg)](https://github.com/haiilo/catalyst/actions/workflows/angular.yml) | [README](https://github.com/haiilo/catalyst/blob/main/angular/README.md) |
| `@haiilo/catalyst-angular-formly`   | Angular custom types for [Formly](https://formly.dev/)   | [![Angular](https://github.com/haiilo/catalyst/actions/workflows/angular.yml/badge.svg)](https://github.com/haiilo/catalyst/actions/workflows/angular.yml) | [README](https://github.com/haiilo/catalyst/blob/main/angular/README.md) |
| `@haiilo/catalyst-react`     | React bindings for components     | [![React](https://github.com/haiilo/catalyst/actions/workflows/react.yml/badge.svg)](https://github.com/haiilo/catalyst/actions/workflows/react.yml) | [README](https://github.com/haiilo/catalyst/blob/main/react/README.md) |
| `@haiilo/catalyst-vue`       | View bindings for components      |  | [README](https://github.com/haiilo/catalyst/blob/main/vue/README.md) |

## Setup

Please take a look at the official design documentation at
https://design.haiilo.com and follow the [Getting Started](https://design.haiilo.com/7a807c8eb/p/12e811-getting-started)
guide to learn how to setup your project locally.

When installing dependencies with `npm` or `Yarn` Classic, all packages are
hoisted to the root of the modules directory. As a result, source code has
access to dependencies that are not added as dependencies to the project. In the
past, this has resulted in a number of indeterministic errors, that are very
hard to debug. As a consequence, this monorepo uses `pnpm` as a package manager.
Please follow the [installation guide](https://pnpm.io/installation) to get
started.

When working with `pnpm`, we recommend to set the following aliases in your 
`.bashrc`, `.zshrc`, or `config.fish`:

```
alias pn='pnpm'
alias pnr='pnpm run'
alias pni='pnpm install'
alias pns='pnpm run start'
alias pnb='pnpm run build'
alias pnt='pnpm run test'
```

## Release

### Creating a new version via CI (recommended)

The entire release process is automated via Google's [release please](https://github.com/googleapis/release-please) action. Release Please automates `CHANGELOG` generation, the creation of GitHub releases, and version bumps for all projects of the monorepo. As of now, the version numbers of all projects are kept in sync. That means that releasing a new version will increase the version of every project, even if the project has not been changed.

Every commit that is prefixed with [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) guidelines triggers the creation (or update) of a release PR in the GitHub project. The PR is labeled with "[autorelease: pending](https://github.com/haiilo/catalyst/pulls?q=is%3Apr+is%3Aopen+label%3A%22autorelease%3A+pending%22)". These Release PRs are kept up-to-date as additional work is merged. When you're ready to tag a release, simply merge the release PR. When the Release PR is merged, release-please takes the following steps:

* Updates the `CHANGELOG` file(s), along with other language specific files (for example `package.json`).
* Tags the commit with the version number.
* Creates a GitHub Release based on the tag.

Additionally, the new release is directly published to npm.

### Manually creating a new version (not recommended)

All projects in the repository are using [semantic-release](https://www.npmjs.com/package/semantic-release) and define helper scripts in the respective `package.json` files. To create a new release bundle (i.e. release all projects in a new version), simply use the following combination of utility scripts provided in the top level `package.json`:

* Run `pnpm run release:{patch|minor|major}` to create a new version in every project of the repository.
* Run `pnpm run build` to build all projects.
* Run `pnpm install` to install dependencies for every project.
* Run `pnpm run publish` to publish every project to npmjs.com.
* Run `git push --follow-tags origin main` to push your changes.

**Note:** Make sure you are logged in with your npm account and you have permissions to release under the haiilo organisation. Otherwise contact one of the collaborators to request access.

## Code Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/haiilo/catalyst/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=haiilo/catalyst" />
</a>

## License

The license is available within the repository in the
[LICENSE](https://github.com/haiilo/catalyst/blob/main/LICENSE) file.
