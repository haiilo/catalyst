import { defineVitestConfig } from '@stencil/vitest/config';
import { stencilVitestPlugin } from '@stencil/vitest/plugin';
import { playwright } from '@vitest/browser-playwright';

export default defineVitestConfig({
  stencilConfig: './stencil.config.ts',
  test: {
    projects: [
      {
        plugins: [stencilVitestPlugin()],
        // esbuild: { target: 'esnext' },
        test: {
          name: 'plugin',
          environment: 'stencil',
          include: ['src/**/*.spec.{ts,tsx}'],
          setupFiles: ['./vitest-setup-plugin.ts']
        }
      },
      // Browser tests
      {
        test: {
          name: 'browser',
          include: ['src/**/*.screenshot.{ts,tsx}'],
          setupFiles: ['./vitest-setup-dist.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
            expect: {
              toMatchScreenshot: {
                comparatorName: 'pixelmatch',
                comparatorOptions: {
                  threshold: 0.5,
                  allowedMismatchedPixels: 100,
                },
                resolveScreenshotPath: ({
                                          arg,
                                          browserName,
                                          ext,
                                          testFileName,
                                          screenshotDirectory,
                                          testFileDirectory,
                                          root,
                                        }) => `${root}/${testFileDirectory}/${screenshotDirectory}/${testFileName}/${arg}-${browserName}${ext}`,
              },
            },
          },
        },
      },
    ]
  }
});
