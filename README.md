# Catalyst Design System

[![Deploy](https://github.com/haiilo/catalyst/actions/workflows/deploy.yml/badge.svg)](https://github.com/haiilo/catalyst/actions/workflows/deploy.yml)

| Package | Description | Status | Docs |
| ------- | ----------- | ------ | ---- |
| `@haiilo/catalyst`           | Core web components               | [![Core](https://github.com/haiilo/catalyst/actions/workflows/core.yml/badge.svg)](https://github.com/haiilo/catalyst/actions/workflows/core.yml) | [README](https://github.com/haiilo/catalyst/blob/main/core/README.md) |
| `@haiilo/catalyst-tokens`    | Style Dictionary design tokens    | [![Tokens](https://github.com/haiilo/catalyst/actions/workflows/tokens.yml/badge.svg)](https://github.com/haiilo/catalyst/actions/workflows/tokens.yml) | [README](https://github.com/haiilo/catalyst/blob/main/tokens/README.md) |
| `@haiilo/catalyst-angular`   | Angular bindings for components   | [![Angular](https://github.com/haiilo/catalyst/actions/workflows/angular.yml/badge.svg)](https://github.com/haiilo/catalyst/actions/workflows/angular.yml) | [README](https://github.com/haiilo/catalyst/blob/main/angular/README.md) |
| `@haiilo/catalyst-react`     | React bindings for components     | [![React](https://github.com/haiilo/catalyst/actions/workflows/react.yml/badge.svg)](https://github.com/haiilo/catalyst/actions/workflows/react.yml) | [README](https://github.com/haiilo/catalyst/blob/main/react/README.md) |
| `@haiilo/catalyst-vue`       | View bindings for components      |  | [README](https://github.com/haiilo/catalyst/blob/main/vue/README.md) |

## Setup

Please take a look at the official design documentation at
https://design.haiilo.com and follow the [Getting Started](https://design.haiilo.com/7a807c8eb/p/12e811-getting-started)
guide to learn how to setup your project locally.

## Working with workspaces

### Install dependencies

Using `npm install` in the root project will install projects' dependencies and automate link procedures, avoiding using `npm link`.

To install all dependencies of a workspace in isolation, at the specific project level, use `npm install --workspaces=false` or `npm install -ws false`.

To add a new dependency, at the specific project, use `npm install <dependecy>`. In the root project level, use `npm install <dependency> -w <workspace>`.

### Running commands

Using the workspace option in the root project, it is possible to run a command on a specific workspace. `npm run <script> -w <workspace>`.

It is also possible to run all with the option workspaces: `npm run <script> -ws`.
Use `--if-present` to ignore missing scripts, e.g: 
```
npm run test -ws --if-present
``` 

### Publish

Use `npm publish` to publish. The command will publish the workspaces as well.


## Release (workaround)

Sadly, the release process is not automated yet. Here are the steps to take for
a new release

1. Start in root folder
1. Run `npm run release:{patch|minor|major}`
1. Run `npm run replace -- {new version}`
1. Run `npm i -f && npm run build`
1. Run `npm run publish`
1. Run `git add -A && git commit -m "chore(release): update dependencies"`
1. Run `git push --follow-tags origin main`

## Code Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/haiilo/catalyst/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=haiilo/catalyst" />
</a>

## License

The license is available within the repository in the
[LICENSE](https://github.com/haiilo/catalyst/blob/main/LICENSE) file.
