import { defineVitestConfig } from '@stencil/vitest/config';
import { stencilVitestPlugin } from '@stencil/vitest/plugin';

export default defineVitestConfig({
  stencilConfig: './stencil.config.ts',
  test: {
    projects: [
      {
        plugins: [
          stencilVitestPlugin(),
        ],
        // esbuild: { target: 'esnext' },
        test: {
          name: 'plugin',
          environment: 'stencil',
          include: ['src/**/*.spec.{ts,tsx}'],
          setupFiles: ['./vitest-setup-plugin.ts'],
        },
      },
    ]
  }
});
