import { afterEach, describe, expect, it } from 'vitest';
import { render, h, waitForStable } from '@stencil/vitest';
import { page, userEvent } from 'vitest/browser';
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
          requiredMarker="none"
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
        <cat-textarea label="Message" requiredMarker="none" placeholder="Describe your request" />
      </div>
    );
    const textarea = root.querySelector('cat-textarea')!.shadowRoot!.querySelector('textarea')!;

    await userEvent.click(textarea);
    await page.elementLocator(document.body).hover();
    await expect(root).toMatchScreenshot();
  });

  it('auto-sizes for multi-line content', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea
          label="Message"
          requiredMarker="none"
          value={'First line\nSecond line\nThird line\nFourth line'}
          rows={2}
        />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('auto-sizes as multi-line content is entered', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea label="Message" requiredMarker="none" placeholder="Describe your request" rows={2} />
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
        <cat-textarea
          label="Message"
          requiredMarker="none"
          hint="This field is unavailable."
          value="Saved response"
          disabled
        />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('invalid without an error message', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '420px' }}>
        <cat-textarea label="Message" requiredMarker="none" errors={true} errorUpdate={true} />
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
          requiredMarker="none"
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
          requiredMarker="none"
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
        <cat-textarea requiredMarker="none">
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
          requiredMarker="none"
          hint="Your message is still associated with its label."
          placeholder="Describe your request"
        />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });
});
