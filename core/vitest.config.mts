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
      // Browser e2e tests
      {
        test: {
          name: 'e2e',
          include: ['src/**/*.e2e.{ts,tsx}'],
          setupFiles: ['./vitest-setup-browser.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }]
          }
        }
      },
      // Browser screenshot tests
      {
        test: {
          name: 'browser',
          include: ['src/**/*.screenshot.{ts,tsx}'],
          setupFiles: ['./vitest-setup-browser.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
            expect: {
              toMatchScreenshot: {
                comparatorName: 'pixelmatch',
                comparatorOptions: {
                  threshold: 0.05,
                  allowedMismatchedPixels: 0.5
                },
                resolveScreenshotPath: ({
                  arg,
                  browserName,
                  ext,
                  testFileName,
                  screenshotDirectory,
                  testFileDirectory,
                  root,
                  platform
                }) => `${root}/${testFileDirectory}/${screenshotDirectory}/${testFileName}/${arg}-${browserName}-${platform}${ext}`
              }
            }
          }
        }
      }
    ]
  }
});
