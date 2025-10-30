# Deploying Storybook

This guide explains how to deploy Storybook for the Catalyst Design System.

## 🚀 GitHub Pages Deployment (Current Setup)

Storybook is automatically deployed to GitHub Pages at a subdirectory alongside the main Catalyst site.

### URLs

- **Main Site (Stencil dev):** https://haiilo.github.io/catalyst/
- **Storybook:** https://haiilo.github.io/catalyst/storybook/

### How It Works

The `.github/workflows/deploy.yml` workflow automatically:
1. Builds the main Stencil dev site → deploys to root (`/`)
2. Builds Storybook → deploys to `/storybook/` subdirectory

Both sites coexist at different paths without overwriting each other.

### Triggering Deployment

**Automatic:**
- Push to `main` branch with changes in `core/` or `tokens/` directory

**Manual:**
- Go to **Actions** tab in GitHub
- Select **Deploy** workflow
- Click **Run workflow** button

### Configuration

The subdirectory deployment is configured in two places:

**1. Workflow (`.github/workflows/deploy.yml`):**
```yaml
- name: Deploy Storybook to /storybook/
  uses: JamesIves/github-pages-deploy-action@v4.2.3
  with:
    branch: gh-pages
    folder: core/storybook-static
    target-folder: storybook  # Deploys to /storybook/
    clean: false              # Keeps main site intact
```

**2. Storybook Config (`.storybook/main.ts`):**
```typescript
viteFinal: async (config) => {
  if (process.env.NODE_ENV === 'production') {
    config.base = '/catalyst/storybook/';  // Correct asset paths
  }
  return config;
}
```

This ensures all CSS, JS, and asset paths work correctly in the subdirectory.

---

## 🎨 Chromatic (Visual Testing + Hosting)

[Chromatic](https://www.chromatic.com/) provides visual regression testing and Storybook hosting.

### Setup

1. **Sign up:**
   - Go to https://www.chromatic.com/
   - Sign in with GitHub
   - Add your repository

2. **Get Project Token:**
   - Go to your project settings
   - Copy the project token

3. **Add Secret to GitHub:**
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `CHROMATIC_PROJECT_TOKEN`
   - Value: Your token from Chromatic

4. **Add to Workflow:**

```yaml
# .github/workflows/chromatic.yml
name: Chromatic

on: push

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Required for Chromatic

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Install dependencies
        run: pnpm install

      - name: Build Stencil
        run: pnpm --filter @haiilo/catalyst run build

      - name: Publish to Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          workingDir: core
          buildScriptName: storybook:build
```

**Benefits:**
- ✅ Visual regression testing on every PR
- ✅ Component history
- ✅ Hosted Storybook URLs
- ✅ Review UI changes visually

**Pricing:**
- Free for open source
- Paid for private repos (starts at $149/month)

---

## 🌐 Netlify (Alternative Hosting)

Deploy Storybook to Netlify for fast CDN hosting.

### Option A: Netlify CLI (Quick)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build Storybook
cd core
pnpm run build
pnpm run storybook:build

# Deploy
netlify deploy --dir=storybook-static --prod
```

### Option B: GitHub Integration (Automatic)

1. Go to https://app.netlify.com/
2. Click **Add new site** → **Import an existing project**
3. Connect to GitHub
4. Select your repository
5. Configure build settings:
   - **Base directory:** `core`
   - **Build command:** `pnpm run build && pnpm run storybook:build`
   - **Publish directory:** `core/storybook-static`
6. Click **Deploy site**

**Benefits:**
- ✅ Fast CDN
- ✅ Deploy previews for PRs
- ✅ Custom domains
- ✅ Free tier available

---

## 🐳 Vercel (Alternative Hosting)

Similar to Netlify, optimized for frontend deployments.

### Setup

1. Go to https://vercel.com/
2. Import your GitHub repository
3. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `core`
   - **Build Command:** `pnpm run build && pnpm run storybook:build`
   - **Output Directory:** `storybook-static`
4. Deploy

---

## 📦 Self-Hosted (Docker)

Host Storybook on your own infrastructure.

### Dockerfile

```dockerfile
# Build stage
FROM node:20 AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY core/package.json ./core/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN pnpm --filter @haiilo/catalyst run build
RUN pnpm --filter @haiilo/catalyst run storybook:build

# Serve stage
FROM nginx:alpine
COPY --from=builder /app/core/storybook-static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Deploy

```bash
# Build image
docker build -t catalyst-storybook .

# Run container
docker run -p 8080:80 catalyst-storybook
```

Access at: http://localhost:8080

---

## 🔧 Comparison

| Platform | Cost | Setup | CI/CD | Visual Testing | Custom Domain |
|----------|------|-------|-------|----------------|---------------|
| **GitHub Pages** | Free | Easy | Built-in | ❌ | ✅ (with config) |
| **Chromatic** | Free (OSS) | Easy | Built-in | ✅ | ❌ |
| **Netlify** | Free tier | Easy | Auto | ❌ | ✅ |
| **Vercel** | Free tier | Easy | Auto | ❌ | ✅ |
| **Self-hosted** | Server cost | Complex | Manual | ❌ | ✅ |

---

## 🎯 Recommendation

**For Catalyst:**
1. **Start with GitHub Pages** - Free, simple, integrated
2. **Add Chromatic later** - When you need visual regression testing
3. **Use Netlify/Vercel** - If you need deploy previews for PRs

---

## 🐛 Troubleshooting

### GitHub Pages 404

**Problem:** Storybook loads but shows 404 errors for assets

**Solution:** Set base path in `.storybook/main.ts`:
```typescript
export default {
  // ... other config
  viteFinal: (config) => {
    config.base = '/catalyst/'; // Replace with your repo name
    return config;
  },
};
```

### Build Fails in CI

**Problem:** Build works locally but fails in GitHub Actions

**Solution:**
1. Check Node version matches `.nvmrc`
2. Clear pnpm cache in workflow
3. Run `pnpm run build` before `storybook:build`

### Assets Not Loading

**Problem:** CSS/JS files return 404

**Solution:**
1. Check `publicPath` in build config
2. Ensure `dist/` folder is built before Storybook
3. Verify asset paths in browser DevTools

---

## 📚 Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Chromatic Docs](https://www.chromatic.com/docs/)
- [Netlify Docs](https://docs.netlify.com/)
- [Storybook Deployment](https://storybook.js.org/docs/web-components/sharing/publish-storybook)

---

**Happy deploying! 🚀**
