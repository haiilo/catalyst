# Build from monorepo root:
# docker build -f docs/Dockerfile -t catalyst-docs .

FROM node:lts-alpine AS base

# Install git for docs build scripts
RUN apk add --no-cache git

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app

# Copy root config files (remove patchedDependencies to avoid error)
COPY package.json pnpm-workspace.yaml .npmrc ./
RUN sed -i '/"patchedDependencies"/,/},/d' package.json

COPY patches patches/
COPY debug-install-probe.js prepare.js ./

# Copy docs-specific files
COPY docs/package.json docs/
COPY docs/source.config.ts docs/
COPY docs/.source docs/.source

# Configure pnpm and install
RUN echo "auto-install-peers=true" >> .npmrc
RUN corepack enable pnpm && pnpm install --filter @haiilo/catalyst-docs --ignore-scripts --config.strict-peer-dependencies=false

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm --filter @haiilo/catalyst-docs postinstall
RUN corepack enable pnpm && pnpm --filter @haiilo/catalyst-docs build

# Stage 3: Production server
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0

COPY --from=builder /app/docs/.next/standalone ./
COPY --from=builder /app/docs/.next/static ./docs/.next/static
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "docs/server.js"]
