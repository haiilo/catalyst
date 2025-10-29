import { newE2EPage } from '@stencil/core/testing';

describe('cat-toggle', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-toggle label="Label"></cat-toggle>');

    const element = await page.find('cat-toggle');
    expect(element).toHaveClass('hydrated');
  });

  it('should toggle on state on click', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-toggle label="Enable feature"></cat-toggle>');

    const toggle = await page.find('cat-toggle');
    const catChange = await page.spyOnEvent('catChange');

    await toggle.click();
    await page.waitForChanges();

    expect(catChange).toHaveReceivedEvent();
    const checked = await toggle.getProperty('checked');
    expect(checked).toBe(true);
  });

  it('should start as checked when checked attribute is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-toggle label="Pre-enabled" checked></cat-toggle>');

    const toggle = await page.find('cat-toggle');
    const checked = await toggle.getProperty('checked');

    expect(checked).toBe(true);
  });

  it('should not toggle when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-toggle label="Disabled" disabled></cat-toggle>');

    const toggle = await page.find('cat-toggle');
    const catChange = await page.spyOnEvent('catChange');

    await toggle.click();
    await page.waitForChanges();

    expect(catChange).not.toHaveReceivedEvent();
  });

  it('should toggle from on to off', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-toggle label="Toggle" checked></cat-toggle>');

    const toggle = await page.find('cat-toggle');

    await toggle.click();
    await page.waitForChanges();

    const checked = await toggle.getProperty('checked');
    expect(checked).toBe(false);
  });

  it('should display label text', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-toggle label="My Toggle"></cat-toggle>');

    const toggle = await page.find('cat-toggle');
    const label = toggle.getAttribute('label');

    expect(label).toBe('My Toggle');
  });

  it('should have required attribute', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-toggle label="Required" required></cat-toggle>');

    const toggle = await page.find('cat-toggle');
    const required = await toggle.getProperty('required');

    expect(required).toBe(true);
  });

  it('should have hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-toggle label="Toggle" hint="Helper text"></cat-toggle>');

    const toggle = await page.find('cat-toggle');
    const hint = toggle.getAttribute('hint');

    expect(hint).toBe('Helper text');
  });

  it('should display label on left when labelLeft is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-toggle label="Left Label" label-left></cat-toggle>');

    const toggle = await page.find('cat-toggle');
    const labelLeft = await toggle.getProperty('labelLeft');

    expect(labelLeft).toBe(true);
  });

  it('should handle keyboard interaction - Space key', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-toggle label="Keyboard"></cat-toggle>');

    const toggle = await page.find('cat-toggle');
    const catChange = await page.spyOnEvent('catChange');

    await toggle.press('Space');
    await page.waitForChanges();

    expect(catChange).toHaveReceivedEvent();
  });

  it('should display error state', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-toggle label="Toggle" errors="This field is required"></cat-toggle>');

    const toggle = await page.find('cat-toggle');
    const errors = toggle.getAttribute('errors');

    expect(errors).toBe('This field is required');
  });
});
