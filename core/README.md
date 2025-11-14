
# Catalyst: Core

[![Core: buid & test](https://github.com/haiilo/catalyst/actions/workflows/core.yml/badge.svg)](https://github.com/haiilo/catalyst/actions/workflows/core.yml)
[![GitHub Pages](https://github.com/haiilo/catalyst/actions/workflows/pages.yml/badge.svg)](https://github.com/haiilo/catalyst/actions/workflows/pages.yml)
![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

This project contains the Catalyst design system standalone Web Components built with Stencil.

## Quick Start

```bash
# Install dependencies
pnpm install

# Build components
pnpm run build

# Start development server
pnpm start

# Run tests
pnpm test

# Run Storybook (interactive component documentation)
pnpm run storybook
```

## 📚 Storybook

Catalyst uses Storybook for component documentation and development. Storybook provides an interactive environment to browse components, view their variants, and test different props.

### Running Storybook

```bash
# Start Storybook dev server
pnpm run storybook

# Build static Storybook for deployment
pnpm run storybook:build
```

Storybook will be available at http://localhost:6006/

For more information on writing and contributing stories, see the [Storybook README](.storybook/README.md).

## Development

### Building Components

```bash
pnpm run build        # Production build
pnpm run build:watch  # Watch mode for development
```

### Testing

```bash
pnpm test             # Run all tests
pnpm test:watch       # Watch mode
```

### Linting & Formatting

```bash
pnpm run lint         # Lint TypeScript/JavaScript
pnpm run lint:style   # Lint SCSS
pnpm run prettier     # Format code
```

## Project Structure

```
core/
├── .storybook/          # Storybook configuration
├── src/
│   ├── components/      # Web components
│   │   └── cat-*/
│   │       ├── *.tsx           # Component implementation
│   │       ├── *.scss          # Component styles
│   │       ├── *.spec.tsx      # Unit tests
│   │       └── *.stories.ts    # Storybook stories
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
├── dist/                # Build output
└── loader/              # Lazy-loading scripts
```

## Web Components

Catalyst components are standards-based Web Components that work in any framework or with no framework at all. They are built with [Stencil](https://stenciljs.com/), which compiles to highly optimized Web Components.

### Usage

#### Script Tag

```html
<script type='module' src='https://unpkg.com/@haiilo/catalyst/dist/catalyst/catalyst.esm.js'></script>
<link rel="stylesheet" href="https://unpkg.com/@haiilo/catalyst/dist/catalyst/catalyst.css">

<cat-button variant="filled" color="primary">Click Me</cat-button>
```

#### Node Modules

```bash
npm install @haiilo/catalyst
```

```javascript
import { defineCustomElements } from '@haiilo/catalyst/loader';
import '@haiilo/catalyst/dist/catalyst/catalyst.css';

defineCustomElements();
```

#### Angular

See the [@haiilo/catalyst-angular](../angular/README.md) package.

#### React

See the [@haiilo/catalyst-react](../react/README.md) package.

#### Vue

See the [@haiilo/catalyst-vue](../vue/README.md) package.

## Contributing

When adding new components:

1. Generate component scaffold: `pnpm run generate`
2. Implement the component in `src/components/`
3. Add styles in the component's `.scss` file
4. Write unit tests in `*.spec.tsx`
5. Create Storybook stories in `*.stories.ts`
6. Document props with JSDoc comments
7. Run tests and linting before committing

For detailed Storybook contribution guidelines, see [.storybook/README.md](.storybook/README.md).

## Resources

- [Catalyst Design Documentation](https://design.haiilo.com)
- [Stencil Documentation](https://stenciljs.com/docs)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Storybook Documentation](https://storybook.js.org/docs)

## License

MIT - See [LICENSE](LICENSE) file for details.

---

Made with ❤️ in Hamburg, Germany
