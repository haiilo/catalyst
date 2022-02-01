# @coyoapp/catalyst-tokens

Figma design tokens for the Catalyst design system.  
&nbsp;&nbsp;&nbsp;&nbsp;⇒ https://docs.tokens.studio  
&nbsp;&nbsp;&nbsp;&nbsp;⇒ https://amzn.github.io/style-dictionary

## Workflow

The Figma tokens are transformed by a GitHub Actions CI workflow. Changes in `tokens.json`
(either directly or with the [Figma Tokens plugin](https://docs.tokens.studio) in Figma)
will automatically generate tokens to the `build` directory that can then be read by
[Style Dictionary](https://amzn.github.io/style-dictionary), which will then
output tokens to the format defined in `config.json`.

## Setup

Follow the steps at https://docs.tokens.studio/sync/github to setup the GitHub
sync for the tokens.
