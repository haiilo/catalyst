# Catalyst: Tokens

[![Tokens: build & test](https://github.com/haiilo/catalyst/actions/workflows/tokens.yml/badge.svg)](https://github.com/haiilo/catalyst/actions/workflows/tokens.yml)

This project contains all design tokens for the Catalyst design system.

Tokens are being transformed using
[Amazon Style Dictionary](https://amzn.github.io/style-dictionary/#/).

> Style Dictionary is a build system that allows you to define styles once, in
> a way for any platform or language to consume. A single place to create and
> edit your styles, and a single command exports these rules to all the places
> you need them - iOS, Android, CSS, JS, HTML, sketch files, style
> documentation, or anything you can think of. It is available as a CLI through
> npm, but can also be used like any normal node module if you want to extend
> its functionality.

## Getting started

Install `@haiilo/catalyst-tokens` in your Node.js powered apps with the
[npm package](https://www.npmjs.com/package/@haiilo/catalyst-tokens):

```shell
npm install @haiilo/catalyst-tokens
```

## Contributing

If you want to add or update tokens in this repository, please make sure to
adhere to the design token structure outlined at
[Design token structure](https://amzn.github.io/style-dictionary/#/tokens?id=design-token-structure).

### Package management

This project is using [npm](https://www.npmjs.com/) as a package manager. This
is especially important if you want to add new dependencies to a project and
fail to provide an updated `package-lock.json`. This will cause the CI build to
fail. If dependencies in the package lock do not match those in `package.json`,
npm will exit with an error in the CI build, instead of updating the package
lock.

### Build

Run `npm run build` to build the project. The build artifacts will be stored in
the `dist` directory. Artifacts will automatically be generated on the basis of
the output configuration defined in `config.js`.

### Publishing

The library can be published by running `npm publish`. However, the preferred
way to publish a new version of the library is via the CI setup. A new version
of the library will automatically be published to
[npm](https://www.npmjs.com/package/@haiilo/catalyst-tokens) when pushing a new
tag on the main branch. To simplify this process, you can use the following npm
commands:

 * **npm run release:major** releases a new *major* version
 * **npm run release:minor** releases a new *minor* version
 * **npm run release:patch** releases a new *patch* version

These commands will automatically increase the version number in the
`package.json` and `package-lock.json`, commit the changed files, create a
corresponding git tag and push everything to the remote branch. This will then
automatically publish a new library version.

## License

The license is available within the main repository in the
[LICENSE](https://github.com/haiilo/catalyst/blob/main/LICENSE) file.
