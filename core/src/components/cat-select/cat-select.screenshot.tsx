import { describe, it, expect } from 'vitest';
import { render, h, waitForStable } from '@stencil/vitest';
import { userEvent } from '@vitest/browser/context';
import { objectArrayConnector } from './connectors';

describe('cat-select screenshot', () => {
  it('renders disabled option for single select', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', minHeight: '300px' }}>
        <cat-select label="Label"></cat-select>
      </div>
    );

    const select = root.querySelector('cat-select') as HTMLCatSelectElement;
    await select.connect(
      objectArrayConnector([
        { id: 'option1', label: 'Option 1' },
        { id: 'option2', label: 'Option 2', disabled: true },
        { id: 'option3', label: 'Option 3' }
      ])
    );
    await waitForStable(select);

    await userEvent.click(select.shadowRoot!.querySelector('.select-wrapper')!);
    await waitForStable(select);

    await expect(root).toMatchScreenshot();
  });

    it('renders disabled option for multiple select', async () => {
        const { root } = await render(
            <div style={{ padding: '16px', minHeight: '300px' }}>
                <cat-select label="Label" multiple></cat-select>
            </div>
        );

        const select = root.querySelector('cat-select') as HTMLCatSelectElement;
        await select.connect(
            objectArrayConnector([
                { id: 'option1', label: 'Option 1' },
                { id: 'option2', label: 'Option 2', disabled: true },
                { id: 'option3', label: 'Option 3' }
            ])
        );
        await waitForStable(select);

        await userEvent.click(select.shadowRoot!.querySelector('.select-wrapper')!);
        await waitForStable(select);

        await expect(root).toMatchScreenshot();
    });
});
