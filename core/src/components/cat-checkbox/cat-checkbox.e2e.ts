import { newE2EPage } from '@stencil/core/testing';

describe('cat-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-checkbox label="Label"></cat-checkbox>');

    const element = await page.find('cat-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('should toggle checked state on click', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-checkbox label="Accept terms"></cat-checkbox>');

    const checkbox = await page.find('cat-checkbox');
    const catChange = await page.spyOnEvent('catChange');

    await checkbox.click();
    await page.waitForChanges();

    expect(catChange).toHaveReceivedEvent();
    const checked = await checkbox.getProperty('checked');
    expect(checked).toBe(true);
  });

  it('should start as checked when checked attribute is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-checkbox label="Pre-checked" checked></cat-checkbox>');

    const checkbox = await page.find('cat-checkbox');
    const checked = await checkbox.getProperty('checked');

    expect(checked).toBe(true);
  });

  it('should not toggle when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-checkbox label="Disabled" disabled></cat-checkbox>');

    const checkbox = await page.find('cat-checkbox');
    const catChange = await page.spyOnEvent('catChange');

    await checkbox.click();
    await page.waitForChanges();

    expect(catChange).not.toHaveReceivedEvent();
  });

  it('should toggle from checked to unchecked', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-checkbox label="Toggle" checked></cat-checkbox>');

    const checkbox = await page.find('cat-checkbox');

    await checkbox.click();
    await page.waitForChanges();

    const checked = await checkbox.getProperty('checked');
    expect(checked).toBe(false);
  });

  it('should work with indeterminate state', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-checkbox label="Indeterminate" indeterminate></cat-checkbox>');

    const checkbox = await page.find('cat-checkbox');
    const indeterminate = await checkbox.getProperty('indeterminate');

    expect(indeterminate).toBe(true);
  });

  it('should display label text', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-checkbox label="My Label"></cat-checkbox>');

    const checkbox = await page.find('cat-checkbox');
    const label = checkbox.getAttribute('label');

    expect(label).toBe('My Label');
  });

  it('should have required attribute', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-checkbox label="Required" required></cat-checkbox>');

    const checkbox = await page.find('cat-checkbox');
    const required = await checkbox.getProperty('required');

    expect(required).toBe(true);
  });

  it('should have hint text', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-checkbox label="Checkbox" hint="Helper text"></cat-checkbox>');

    const checkbox = await page.find('cat-checkbox');
    const hint = checkbox.getAttribute('hint');

    expect(hint).toBe('Helper text');
  });
});
