import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { h, render } from '@stencil/vitest';
import { page, userEvent } from '@vitest/browser/context';

describe('cat-segmented-control screenshot', () => {
  const SIZES = ['xs', 's', 'm', 'l', 'xl'] as const;

  const WRAPPER_STYLE = {
    padding: '20px',
    width: '760px',
    display: 'inline-block',
    backgroundColor: 'white'
  };

  beforeEach(async () => {
    await page.viewport(800, 200);
  });

  afterEach(async () => {
    // Reset mouse position after each test to prevent hover state leaking into the next test.
    await page.elementLocator(document.body).hover();
  });

  it('renders', async () => {
    const { root } = await render(
      <div style={WRAPPER_STYLE}>
        <cat-segmented-control>
          <cat-segment value="one">Option 1</cat-segment>
          <cat-segment value="two">Option 2</cat-segment>
          <cat-segment value="three">Option 3</cat-segment>
        </cat-segmented-control>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('with overflowing labels', async () => {
    const { root } = await render(
      <div style={WRAPPER_STYLE}>
        <cat-segmented-control>
          <cat-segment value="one">Lorem ipsum dolor sit amet consetetur sadipscing elitr</cat-segment>
          <cat-segment value="two">Averylongtextwithoutwhitespace</cat-segment>
          <cat-segment value="three">Short enough</cat-segment>
        </cat-segmented-control>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('with active segment', async () => {
    const { root } = await render(
      <div style={WRAPPER_STYLE}>
        <cat-segmented-control value="two">
          <cat-segment value="one">Option 1</cat-segment>
          <cat-segment value="two">Option 2</cat-segment>
          <cat-segment value="three">Option 3</cat-segment>
        </cat-segmented-control>
      </div>
    );
    await expect(root).toMatchScreenshot();
  });

  it('hover on segment', async () => {
    const { root } = await render<HTMLCatSegmentedControlElement>(
      <div style={WRAPPER_STYLE}>
        <cat-segmented-control>
          <cat-segment value="one">Option 1</cat-segment>
          <cat-segment value="two" testId="two-segment">
            Option 2
          </cat-segment>
          <cat-segment value="three">Option 3</cat-segment>
        </cat-segmented-control>
      </div>
    );

    for (const segment of root.querySelectorAll('cat-segment')) {
      const button = segment.shadowRoot?.querySelector('button[data-test="two-segment"]');
      if (button) {
        await page.elementLocator(button!).hover();
        break;
      }
    }

    await expect(root).toMatchScreenshot();
  });

  it('focus on group', async () => {
    const { root } = await render<HTMLCatSegmentedControlElement>(
      <div style={WRAPPER_STYLE}>
        <cat-segmented-control>
          <cat-segment value="one">Option 1</cat-segment>
          <cat-segment value="two">Option 2</cat-segment>
          <cat-segment value="three">Option 3</cat-segment>
        </cat-segmented-control>
      </div>
    );

    // tab to move focus into the group, which will focus the first segment
    await userEvent.tab();

    await expect(root).toMatchScreenshot();
  });

  it('select second segment via keyboard', async () => {
    const { root } = await render<HTMLCatSegmentedControlElement>(
      <div style={WRAPPER_STYLE}>
        <cat-segmented-control>
          <cat-segment value="one">Option 1</cat-segment>
          <cat-segment value="two">Option 2</cat-segment>
          <cat-segment value="three">Option 3</cat-segment>
        </cat-segmented-control>
      </div>
    );

    // tab to move focus into the group, which will focus the first segment
    await userEvent.tab();
    // select the second segment via keyboard
    await userEvent.keyboard('{ArrowRight}');

    await expect(root).toMatchScreenshot();
  });

  it('disabled group', async () => {
    const { root } = await render<HTMLCatSegmentedControlElement>(
      <div style={WRAPPER_STYLE}>
        <cat-segmented-control disabled>
          <cat-segment value="one">Option 1</cat-segment>
          <cat-segment value="two">Option 2</cat-segment>
          <cat-segment value="three">Option 3</cat-segment>
        </cat-segmented-control>
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('disabled segment', async () => {
    const { root } = await render<HTMLCatSegmentedControlElement>(
      <div style={WRAPPER_STYLE}>
        <cat-segmented-control>
          <cat-segment value="one">Option 1</cat-segment>
          <cat-segment value="two" disabled>
            Option 2
          </cat-segment>
          <cat-segment value="three">Option 3</cat-segment>
        </cat-segmented-control>
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it.each(SIZES)('size %s with active segment', async size => {
    const { root } = await render<HTMLCatSegmentedControlElement>(
      <div style={WRAPPER_STYLE}>
        <cat-segmented-control size={size} value="two">
          <cat-segment value="one">Option 1 (size {size.toLocaleUpperCase()})</cat-segment>
          <cat-segment value="two">Option 2 (size {size.toLocaleUpperCase()})</cat-segment>
          <cat-segment value="three">Option 3 (size {size.toLocaleUpperCase()})</cat-segment>
        </cat-segmented-control>
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it.each(SIZES)('size %s with text and icon', async size => {
    const { root } = await render<HTMLCatSegmentedControlElement>(
      <div style={WRAPPER_STYLE}>
        <cat-segmented-control size={size} value="two">
          <cat-segment value="one" icon="$cat:alert-primary">
            Option 1 (size {size.toLocaleUpperCase()})
          </cat-segment>
          <cat-segment value="two" icon="$cat:datepicker-calendar">
            Option 2 (size {size.toLocaleUpperCase()})
          </cat-segment>
          <cat-segment value="three" icon="$cat:input-password-show">
            Option 3 (size {size.toLocaleUpperCase()})
          </cat-segment>
        </cat-segmented-control>
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it.each(SIZES)('size %s with icon only', async size => {
    const { root } = await render<HTMLCatSegmentedControlElement>(
      <div style={WRAPPER_STYLE}>
        <cat-segmented-control size={size} value="two">
          <cat-segment value="one" icon="$cat:alert-primary" iconOnly></cat-segment>
          <cat-segment value="two" icon="$cat:datepicker-calendar" iconOnly></cat-segment>
          <cat-segment value="three" icon="$cat:input-password-show" iconOnly></cat-segment>
        </cat-segmented-control>
      </div>
    );

    await expect(root).toMatchScreenshot();
  });
});
