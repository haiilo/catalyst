import { defineConfig } from 'vitest/config';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.map': 'text'
      }
    }
  }
});
