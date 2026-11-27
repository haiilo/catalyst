import { defineConfig } from 'vite';

export default defineConfig({
  // React 16 has no automatic JSX runtime, so compile JSX to React.createElement calls.
  oxc: {
    jsx: { runtime: 'classic' }
  },
  resolve: {
    // The demo and @haiilo/catalyst-react must share a single React instance.
    dedupe: ['react', 'react-dom']
  },
  server: {
    port: 4300
  }
});
