import { newE2EPage } from '@stencil/core/testing';
import { checkA11y, formatViolations } from '../../utils/a11y-test';

describe('cat-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-button></cat-button>');

    const element = await page.find('cat-button');
    expect(element).toHaveClass('hydrated');
  });

  describe('accessibility', () => {
    it('should have no a11y violations with text content', async () => {
      const page = await newE2EPage();
      await page.setContent('<cat-button>Click me</cat-button>');

      const violations = await checkA11y(page);
      expect(formatViolations(violations)).toBe('No violations');
      expect(violations).toEqual([]);
    });

    it('should have no a11y violations with icon and a11y-label', async () => {
      const page = await newE2EPage();
      await page.setContent('<cat-button icon="check" a11y-label="Confirm action"></cat-button>');

      const violations = await checkA11y(page);
      expect(formatViolations(violations)).toBe('No violations');
      expect(violations).toEqual([]);
    });

    it('should have no a11y violations when disabled', async () => {
      const page = await newE2EPage();
      await page.setContent('<cat-button disabled>Disabled button</cat-button>');

      const violations = await checkA11y(page);
      expect(formatViolations(violations)).toBe('No violations');
      expect(violations).toEqual([]);
    });
  });
});
