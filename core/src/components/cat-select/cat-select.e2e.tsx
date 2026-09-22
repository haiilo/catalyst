import { describe, it, expect } from 'vitest';
import { render, waitForStable, h } from '@stencil/vitest';
import { userEvent } from '@vitest/browser/context';
import { of } from 'rxjs';

describe('cat-select', () => {
  it('renders', async () => {
    const { root } = await render(<cat-select label="Label" />);
    await expect.element(root).toHaveClass('hydrated');
  });

  it('should not emit catChange event on initialization with value', async () => {
    const { root, spyOnEvent } = await render(<cat-select label="Label" value="option1" />);
    const changeSpy = spyOnEvent('catChange');
    (root as HTMLCatSelectElement).connect({
      resolve: (ids: string[]) => of([{ id: 'option1', label: 'Option 1' }].filter(item => ids.includes(item.id))),
      retrieve: () =>
        of({
          content: [
            { id: 'option1', label: 'Option 1' },
            { id: 'option2', label: 'Option 2' },
            { id: 'option3', label: 'Option 3' }
          ],
          last: true
        }),
      render: (item: { label: string }) => ({ label: item.label })
    });
    await waitForStable(root);
    expect(changeSpy).not.toHaveReceivedEvent();
  });

  it('should not select a disabled option when clicked', async () => {
    const { root, spyOnEvent } = await render(<cat-select label="Label" />);
    const changeSpy = spyOnEvent('catChange');
    (root as HTMLCatSelectElement).connect({
      resolve: () => of([]),
      retrieve: () =>
        of({
          content: [
            { id: 'option1', label: 'Option 1', disabled: true },
            { id: 'option2', label: 'Option 2' }
          ],
          last: true
        }),
      render: (item: { label: string; disabled?: boolean }) => ({ label: item.label, disabled: item.disabled })
    });
    await waitForStable(root);

    await userEvent.click(root.shadowRoot!.querySelector('.select-wrapper')!);
    await waitForStable(root);

    const disabledOption = root.shadowRoot!.querySelector<HTMLElement>(
      '.select-option-disabled .select-option-single'
    )!;
    await userEvent.click(disabledOption, { force: true });
    await waitForStable(root);

    expect(changeSpy).not.toHaveReceivedEvent();
    expect((root as HTMLCatSelectElement).value).toBeFalsy();
  });
});
