# cat-icon-provider

Provides a scoped `CatIconRegistry` to all descendant `cat-icon` components. Use this in micro-frontend architectures where multiple MFEs register icons with the same names but different SVG content.

## Usage

```ts
// MFE bootstrap
import { CatIconRegistry } from '@haiilo/catalyst';
import * as myIcons from './icons';

const registry = CatIconRegistry.createInstance();
registry.addIcons(myIcons);
```

```html
<!-- Wrap your MFE root -->
<cat-icon-provider>
  <cat-icon icon="home"></cat-icon>
</cat-icon-provider>
```

### Angular

```ts
@Component({
  template: `<cat-icon-provider [registry]="registry"><router-outlet /></cat-icon-provider>`
})
export class AppComponent {
  readonly registry = CatIconRegistry.createInstance();
  constructor() { this.registry.addIcons(myIcons); }
}
```

## Icon resolution order

1. **Scoped registry** (`registry` prop) — MFE-specific icons
2. **Global `catIconRegistry`** — framework default icons and host-app icons
3. If neither resolves the icon, `cat-icon` renders nothing and logs an error

<!-- Auto Generated Below -->


## Overview

Provides a scoped `CatIconRegistry` instance to all descendant `cat-icon`
components.

Use this component to isolate icon sets in micro-frontend architectures where
multiple MFEs register icons with the same names but different SVG content.

## Basic usage

```ts
// In your MFE bootstrap code:
const registry = CatIconRegistry.createInstance();
registry.addIcons(myIcons);
```

```html
<!-- Wrap your MFE root: -->
<cat-icon-provider>
  <!-- All cat-icon elements inside here use `registry` -->
</cat-icon-provider>
```

## Resolution order for child `cat-icon` elements

1. The `registry` prop of the nearest `cat-icon-provider` ancestor
2. The global `catIconRegistry` singleton (framework default icons and any
   icons added via the legacy `catIconRegistry.addIcons()` API)
3. If neither has the icon, `cat-icon` logs an error and renders nothing

## Angular example

```ts

## Properties

| Property   | Attribute | Description                                                                                                                                                                  | Type                           | Default     |
| ---------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------- |
| `registry` | --        | The isolated registry instance for this subtree. Create one with `CatIconRegistry.createInstance()`. If omitted, the global `catIconRegistry` is used (same as no provider). | `CatIconRegistry \| undefined` | `undefined` |


----------------------------------------------

Made with love in Hamburg, Germany
