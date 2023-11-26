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

Make sure you have all the rights to publish to NPM.
Sadly, the release process is not automated (yet). Here are the steps to take for
a new release

1. Start in root folder
1. Run `pnpm run release:{patch|minor|major}`
1. Run `pnpm run build`
1. Run `pnpm run install`
1. Run `pnpm run publish`
1. Run `git push --follow-tags origin main`


## Beta Release

This type of releases are used to test new features before they are released to
the public. They are published to the `beta` tag on NPM. Here are the steps to
take for a new beta release

1. Start in root folder
1. Run `pnpm run release:beta`
1. Run `pnpm run build`
1. Run `pnpm run install`
1. Run `pnpm run publish:beta`
1. Run `git push --follow-tags origin main`
2. Use new version in your project by specifying catalyst library (version is yours) `"@haiilo/catalyst-angular": "8.1.2-beta.0"`

## Code Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/haiilo/catalyst/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=haiilo/catalyst" />
</a>

## License

The license is available within the repository in the
[LICENSE](https://github.com/haiilo/catalyst/blob/main/LICENSE) file.
