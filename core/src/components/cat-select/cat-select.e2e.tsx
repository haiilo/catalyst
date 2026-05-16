import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';
import { of } from 'rxjs';

describe('cat-select', () => {
  it('renders', async () => {
    const { root } = await render(<cat-select label="Label" />);
    await expect.element(root).toHaveClass('hydrated');
  });

  it('should not emit catChange event on initialization with value', async () => {
    const { root, spyOnEvent } = await render(<cat-select label="Label" value="option1" />);
    (root as HTMLCatSelectElement).connect({
      resolve: (ids: string[]) => of([{ id: 'option1', label: 'Option 1' }].filter(item => ids.includes(item.id))),
      retrieve: () => of({
        content: [
          { id: 'option1', label: 'Option 1' },
          { id: 'option2', label: 'Option 2' },
          { id: 'option3', label: 'Option 3' }
        ],
        last: true
      }),
      render: (item: { label: string }) => ({ label: item.label })
    });
    const changeSpy = spyOnEvent('catChange');
    expect(changeSpy).not.toHaveReceivedEvent();
  });
});
