import { afterEach, describe, expect, it } from 'vitest';
import { render, h, waitForStable } from '@stencil/vitest';
import { page, userEvent } from '@vitest/browser/context';
import { catI18nRegistry } from '../cat-i18n/cat-i18n-registry';

describe('cat-textarea', () => {
  afterEach(async () => {
    await page.elementLocator(document.body).hover();
  });

  it('labeled with hint and character count', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea
          label="Message"
          hint="Add details to help us understand your request."
          placeholder="Describe your request"
          maxLength={280}
        />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('focused', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea label="Message" placeholder="Describe your request" />
      </div>
    );
    const textarea = root.querySelector('cat-textarea')!.shadowRoot!.querySelector('textarea')!;

    await userEvent.click(textarea);
    await page.elementLocator(document.body).hover();
    await expect(root).toMatchScreenshot();
  });

  it('auto-sizes as multi-line content is entered', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea label="Message" placeholder="Describe your request" rows={2} />
      </div>
    );
    const textarea = root.querySelector('cat-textarea')!.shadowRoot!.querySelector('textarea')!;

    await userEvent.fill(textarea, 'First line\nSecond line\nThird line\nFourth line');
    await waitForStable(root.querySelector('cat-textarea')!);
    textarea.blur();
    await page.elementLocator(document.body).hover();
    await expect(root).toMatchScreenshot();
  });

  it('disabled', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea label="Message" hint="This field is unavailable." value="Saved response" disabled />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('invalid without an error message', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea label="Message" errors={true} errorUpdate={true} />
      </div>
    );
    const textarea = root.querySelector('cat-textarea')!.shadowRoot!.querySelector('textarea')!;

    await userEvent.click(textarea);
    textarea.blur();
    await page.elementLocator(document.body).hover();
    await expect(root).toMatchScreenshot();
  });

  it('invalid with translated error message', async () => {
    catI18nRegistry.set({ 'error.required': 'Enter a message before continuing.' });
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea
          label="Message"
          required
          hint="Add a message before saving."
          errors={['required']}
          errorUpdate={true}
        />
      </div>
    );
    const textarea = root.querySelector('cat-textarea')!.shadowRoot!.querySelector('textarea')!;

    await userEvent.click(textarea);
    textarea.blur();
    await page.elementLocator(document.body).hover();
    await expect(root).toMatchScreenshot();
  });

  it('horizontal label', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea
          label="Additional information"
          hint="Include any context that may help."
          horizontal
          maxLength={280}
        />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('slotted label, hint, and counter', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea>
          <span slot="label">
            Request <strong>details</strong>
          </span>
          <span slot="hint">Do not include sensitive information.</span>
          <span slot="counter">12 / 280 characters</span>
        </cat-textarea>
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('character count without a label', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea maxLength={280} placeholder="Describe your request" />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('visually hidden label', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea
          label="Message"
          labelHidden
          hint="Your message is still associated with its label."
          placeholder="Describe your request"
        />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('readonly', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea label="Message" hint="This response can no longer be changed." value="Saved response" readonly />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('hovered', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea label="Message" placeholder="Describe your request" />
      </div>
    );
    const textarea = root.querySelector('cat-textarea')!.shadowRoot!.querySelector('textarea')!;

    await page.elementLocator(textarea).hover();
    expect(textarea.matches(':hover')).toBe(true);
    await expect(root).toMatchScreenshot();
  });

  it.each(['optional', 'required'] as const)('%s label marker', async marker => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea label="Message" required={marker === 'required'} requiredMarker={marker} />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('multiple hints', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea
          label="Message"
          hint={['Add details to help us understand your request.', 'Do not include sensitive information.']}
        />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('focused while invalid', async () => {
    catI18nRegistry.set({ 'error.required': 'Enter a message before continuing.' });
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea label="Message" required errors={['required']} errorUpdate={true} />
      </div>
    );
    const textarea = root.querySelector('cat-textarea')!.shadowRoot!.querySelector('textarea')!;

    await userEvent.click(textarea);
    textarea.blur();
    await userEvent.click(textarea);
    await page.elementLocator(document.body).hover();
    expect(root.querySelector('cat-textarea')!.shadowRoot!.activeElement).toBe(textarea);
    await expect(root).toMatchScreenshot();
  });
});
