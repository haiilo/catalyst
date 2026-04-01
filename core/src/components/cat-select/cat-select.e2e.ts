import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-select', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-select label="Label"></cat-select>');
    const element = await page.locator('cat-select');
    await expect(element).toHaveClass('hydrated');
  });

  test('should not emit catChange event on initialization with value', async ({ page }) => {
    await page.setContent(`
      <cat-select label="Label" value="option1"></cat-select>
      <script type="module">
        const select = document.querySelector('cat-select');
        const connector = {
          resolve: ids => Promise.resolve([{ id: 'option1', label: 'Option 1' }].filter(item => ids.includes(item.id))),
          retrieve: () => Promise.resolve({
            content: [
              { id: 'option1', label: 'Option 1' },
              { id: 'option2', label: 'Option 2' },
              { id: 'option3', label: 'Option 3' }
            ],
            last: true
          }),
          render: item => ({ label: item.label })
        };
        select.connect(connector);
      </script>
    `);

    const changeSpy = await page.spyOnEvent('catChange');

    await page.waitForChanges();

    expect(changeSpy).not.toHaveReceivedEvent();
  });
});
