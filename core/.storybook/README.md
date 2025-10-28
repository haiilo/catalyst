# Storybook for Catalyst

This directory contains the Storybook configuration for the Catalyst Design System. Storybook provides an interactive documentation and development environment for our web components.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (check with `node --version`)
- pnpm 9+ (check with `pnpm --version`)

### Running Storybook Locally

1. **Build the Stencil components** (required for first run or after component changes):
   ```bash
   pnpm run build
   ```

2. **Start Storybook**:
   ```bash
   pnpm run storybook
   ```

3. **Open in browser**:
   - Navigate to http://localhost:6006/
   - Storybook will automatically reload when you make changes to stories

### Building Static Storybook

To build a static version of Storybook for deployment:

```bash
pnpm run storybook:build
```

This creates a `storybook-static/` directory that can be deployed to any static hosting service.

## 📁 Directory Structure

```
core/
├── .storybook/          # Storybook configuration
│   ├── main.ts         # Main configuration (addons, framework)
│   └── preview.ts      # Global decorators and parameters
├── src/
│   └── components/
│       └── cat-*/
│           └── *.stories.ts  # Component stories
```

## ✍️ Writing Stories

### Basic Story Structure

Stories are written using the Component Story Format (CSF 3.0) with Lit's `html` template:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/MyComponent',
  component: 'cat-my-component',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined'],
      description: 'The component variant',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
  },
  args: {
    variant: 'filled',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    variant: 'filled',
  },
  render: (args) => html`
    <cat-my-component
      variant="${args.variant}"
      ?disabled="${args.disabled}"
    >
      Content
    </cat-my-component>
  `,
};
```

### Key Points

- **Component name**: Use the web component tag name (e.g., `'cat-button'`)
- **Title**: Organizes stories in the sidebar (e.g., `'Components/Button'`)
- **Tags**: Use `['autodocs']` to auto-generate documentation
- **ArgTypes**: Define controls for interactive props
- **Lit templates**: Use Lit's `html` template literal for rendering
  - String attributes: `variant="${args.variant}"`
  - Boolean attributes: `?disabled="${args.disabled}"`
  - Properties: `.value="${args.value}"`

### Multiple Stories Per Component

Create multiple stories to showcase different use cases:

```typescript
export const Primary: Story = { /* ... */ };
export const AllVariants: Story = { /* ... */ };
export const WithIcon: Story = { /* ... */ };
export const Disabled: Story = { /* ... */ };
```

## 🎨 Styling

Global styles are automatically imported in `.storybook/preview.ts`:

```typescript
import '../dist/catalyst/catalyst.css';
```

This includes:
- Base styles and resets
- Typography
- Design tokens
- Vendor styles (Flatpickr, etc.)

## 🔧 Configuration

### Main Configuration (`.storybook/main.ts`)

- **Stories pattern**: `../src/**/*.stories.@(js|jsx|ts|tsx)`
- **Framework**: `@storybook/web-components-vite` (fast dev server)
- **Addons**:
  - `@storybook/addon-essentials` - Core addons (controls, actions, docs)
  - `@storybook/addon-links` - Link between stories
  - `@storybook/addon-interactions` - Interaction testing
  - `@storybook/addon-a11y` - Accessibility checks

### Preview Configuration (`.storybook/preview.ts`)

- Loads web components via `defineCustomElements()`
- Imports global CSS
- Configures default parameters

## 📚 Best Practices

### 1. Co-locate Stories

Place story files next to their components:
```
src/components/cat-button/
├── cat-button.tsx
├── cat-button.scss
├── cat-button.stories.ts  ✓
└── cat-button.spec.tsx
```

### 2. Use Descriptive Titles

```typescript
// ✓ Good
title: 'Components/Button'
title: 'Forms/Input'

// ✗ Avoid
title: 'Button'
title: 'MyButton'
```

### 3. Document Props

Use `argTypes` to provide descriptions and control types:

```typescript
argTypes: {
  size: {
    control: { type: 'select' },
    options: ['s', 'm', 'l'],
    description: 'The size of the component',
  },
}
```

### 4. Show Multiple Use Cases

Create stories for:
- Default/Primary state
- All variants
- Different states (disabled, loading, error)
- Edge cases (long text, empty state)
- Common combinations

### 5. Add Comments

Use JSDoc comments above stories for documentation:

```typescript
/**
 * The primary button variant used for main actions
 */
export const Primary: Story = { /* ... */ };
```

## 🔍 Testing with Storybook

### Accessibility Testing

The `@storybook/addon-a11y` addon automatically checks stories for accessibility issues. View results in the "Accessibility" panel.

### Interaction Testing

Use the `@storybook/addon-interactions` addon to test user interactions:

```typescript
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const ClickButton: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-pressed', 'true');
  },
};
```

## 🚢 Deployment

### GitHub Pages

Add to your CI/CD workflow:

```yaml
- name: Build Storybook
  run: pnpm run storybook:build

- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./core/storybook-static
```

### Chromatic

For visual regression testing:

```bash
npx chromatic --project-token=<your-token>
```

## 🐛 Troubleshooting

### Components don't render

1. Make sure Stencil components are built:
   ```bash
   pnpm run build
   ```

2. Check that `defineCustomElements()` is called in `.storybook/preview.ts`

### Styles look wrong

1. Verify global CSS is imported in `.storybook/preview.ts`
2. Rebuild Stencil to regenerate CSS:
   ```bash
   pnpm run build
   ```

### Stories don't appear

1. Check the story file matches the pattern in `.storybook/main.ts`
2. Ensure the story exports a default meta object
3. Restart Storybook

## 📖 Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Component Story Format](https://storybook.js.org/docs/web-components/api/csf)
- [Stencil Documentation](https://stenciljs.com/docs/storybook)
- [Lit Templates](https://lit.dev/docs/templates/overview/)

## 🤝 Contributing

When adding new components:

1. Create a `.stories.ts` file next to your component
2. Include at least a Primary story and a States/Variants story
3. Add `tags: ['autodocs']` for automatic documentation
4. Document all props in `argTypes`
5. Test your stories locally before committing

---

**Happy storytelling! 📚✨**
