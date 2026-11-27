import { afterEach, beforeAll, describe, it, expect } from 'vitest';
import { render, h, waitForStable } from '@stencil/vitest';
import { page, userEvent } from '@vitest/browser/context';
import { Subject } from 'rxjs';
import { objectArrayConnector } from './connectors';
import { catI18nRegistry } from '../cat-i18n/cat-i18n-registry';

const OPTIONS = [
  { id: 'alpha', label: 'Alpha' },
  { id: 'beta', label: 'Beta', description: 'Beta description', avatar: { initials: 'BT', round: true } },
  { id: 'gamma', label: 'Gamma' }
];

type SelectProps = Partial<
  Pick<
    HTMLCatSelectElement,
    | 'clearable'
    | 'debounce'
    | 'disabled'
    | 'errorUpdate'
    | 'errors'
    | 'hint'
    | 'horizontal'
    | 'label'
    | 'labelHidden'
    | 'multiple'
    | 'noItems'
    | 'placeholder'
    | 'placement'
    | 'required'
    | 'requiredMarker'
    | 'tagHint'
    | 'tags'
    | 'value'
  >
>;

let defaultViewport: { width: number; height: number } | undefined;
let shouldRestoreViewport = false;

describe('cat-select screenshot', () => {
  beforeAll(() => {
    defaultViewport = { width: window.innerWidth, height: window.innerHeight };
  });

  afterEach(async () => {
    if (shouldRestoreViewport && defaultViewport) {
      await page.viewport(defaultViewport.width, defaultViewport.height);
      await nextAnimationFrame();
      shouldRestoreViewport = false;
    }
    await page.elementLocator(document.body).hover();
  });

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

  it('renders default empty single select', async () => {
    const { root } = await renderSelect({ label: 'Team', placeholder: 'Choose a team' });

    await expect(root).toMatchScreenshot();
  });

  it('renders focused single select', async () => {
    const { root, select } = await renderSelect({ label: 'Team', placeholder: 'Choose a team' });
    await select.doFocus();
    await waitForStable(select);

    await expect(root).toMatchScreenshot();
  });

  it('renders disabled control', async () => {
    const { root } = await renderSelect({ label: 'Team', placeholder: 'Choose a team', disabled: true });

    await expect(root).toMatchScreenshot();
  });

  it('renders required label marker', async () => {
    const { root } = await renderSelect({ label: 'Team', required: true, requiredMarker: 'required' });

    await expect(root).toMatchScreenshot();
  });

  it('renders required label without marker when configured', async () => {
    const { root } = await renderSelect({ label: 'Team', required: true, requiredMarker: 'none' });

    await expect(root).toMatchScreenshot();
  });

  it('renders visually hidden label', async () => {
    const { root } = await renderSelect({ label: 'Team', labelHidden: true, placeholder: 'Choose a team' });

    await expect(root).toMatchScreenshot();
  });

  it('renders horizontal label layout', async () => {
    const { root } = await renderSelect({ label: 'Team', hint: 'Choose one team', horizontal: true });

    await expect(root).toMatchScreenshot();
  });

  it('renders slotted label and hint', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '280px', minHeight: '380px' }}>
        <cat-select placeholder="Choose a team" style={{ width: '100%' }}>
          <span slot="label">Team label</span>
          <span slot="hint">Choose one team</span>
        </cat-select>
      </div>
    );
    const select = root.querySelector<HTMLCatSelectElement>('cat-select')!;
    await select.connect(objectArrayConnector(OPTIONS));
    await waitForStable(select);

    await expect(root).toMatchScreenshot();
  });

  it('renders invalid state with error message', async () => {
    catI18nRegistry.set({ 'error.required': 'Select a team before continuing.' });
    const { root, select } = await renderSelect({
      label: 'Team',
      required: true,
      errors: ['required'],
      errorUpdate: true
    });
    await select.doFocus();
    await select.doBlur();
    await waitForStable(select);

    await expect(root).toMatchScreenshot();
  });

  it('renders invalid state without error message', async () => {
    const { root, select } = await renderSelect({ label: 'Team', errors: true, errorUpdate: true });
    await select.doFocus();
    await select.doBlur();
    await waitForStable(select);

    await expect(root).toMatchScreenshot();
  });

  it('renders resolving spinner', async () => {
    const pendingResolve = new Subject<{ id: string; label: string }[]>();
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '280px', minHeight: '380px' }}>
        <cat-select label="Team" value="alpha" style={{ width: '100%' }}></cat-select>
      </div>
    );
    const select = root.querySelector<HTMLCatSelectElement>('cat-select')!;
    await select.connect({
      ...objectArrayConnector(OPTIONS),
      resolve: () => pendingResolve.asObservable()
    });
    await waitForStable(select);

    try {
      await expect(root).toMatchScreenshot();
    } finally {
      pendingResolve.next([{ id: 'alpha', label: 'Alpha' }]);
      pendingResolve.complete();
      await waitForStable(select);
    }
  });

  it('renders selected single value with clear button', async () => {
    const { root } = await renderSelect({ label: 'Team', value: 'alpha', clearable: true });

    await expect(root).toMatchScreenshot();
  });

  it('renders selected single value with avatar', async () => {
    const { root } = await renderSelect({ label: 'Team', value: 'beta' });

    await expect(root).toMatchScreenshot();
  });

  it('shows tooltip for truncated selected single value', async () => {
    const label = 'A very long team name that does not fit inside the available select input width';
    const { root, select } = await renderSelect(
      { label: 'Team', value: 'long' },
      [{ id: 'long', label }],
      '420px',
      '220px',
      '80px'
    );
    const tooltip = select.shadowRoot!.querySelector<HTMLCatTooltipElement>('.select-wrapper-inner cat-tooltip')!;
    await expect.poll(() => tooltip.content).toBe(label);
    await userEvent.hover(select.shadowRoot!.querySelector('input')!);
    await expect.element(page.getByRole('tooltip')).toBeVisible();

    await expect(root).toMatchScreenshot();
  });

  it('renders multiple pills with remove controls', async () => {
    const { root } = await renderSelect({ label: 'Teams', multiple: true, value: ['alpha', 'gamma'] });

    await expect(root).toMatchScreenshot();
  });

  it('renders multiple pill with avatar', async () => {
    const { root } = await renderSelect({ label: 'Teams', multiple: true, value: ['beta'] });

    await expect(root).toMatchScreenshot();
  });

  it('shows tooltip for truncated multiple pill', async () => {
    const label = 'A very long team name that does not fit inside the available pill width';
    const { root, select } = await renderSelect(
      { label: 'Teams', multiple: true, value: ['long'] },
      [{ id: 'long', label }],
      '420px',
      '220px',
      '80px'
    );
    await expect
      .poll(() => select.shadowRoot!.querySelector<HTMLCatTooltipElement>('.select-pills cat-tooltip')?.content)
      .toBe(label);
    await userEvent.hover(select.shadowRoot!.querySelector('[data-pill-index="0"]')!);
    await expect.element(page.getByRole('tooltip')).toBeVisible();

    await expect(root).toMatchScreenshot();
  });

  it('renders selected and keyboard-active single options', async () => {
    const { root, select } = await renderSelect({ label: 'Team', value: 'beta' });
    await openSelect(select);
    await select.doFocus();
    await userEvent.keyboard('{ArrowDown}');
    await waitForStable(select);

    await expect(root).toMatchScreenshot();
  });

  it('renders hover state', async () => {
    const { root, select } = await renderSelect({ label: 'Team', placeholder: 'Choose a team' });
    await openSelect(select);
    await userEvent.hover(select.shadowRoot!.querySelector('li.select-option')!);

    await expect(root).toMatchScreenshot();
  });

  it('renders checked options in multiple select', async () => {
    const { root, select } = await renderSelect({ label: 'Teams', multiple: true, value: ['alpha'] });
    await openSelect(select);

    await expect(root).toMatchScreenshot();
  });

  it('renders option descriptions and avatars', async () => {
    const { root, select } = await renderSelect({ label: 'Team' }, [
      { id: 'design', label: 'Design', description: 'Creates product experiences', avatar: { initials: 'DS' } },
      { id: 'platform', label: 'Platform', description: 'Builds shared foundations', avatar: { initials: 'PL' } }
    ]);
    await openSelect(select);

    await expect(root).toMatchScreenshot();
  });

  it('renders initial option skeletons while retrieval is pending', async () => {
    const pendingRetrieve = new Subject<{
      content: { id: string; label: string }[];
      last: boolean;
      totalElements: number;
    }>();
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '280px', minHeight: '380px' }}>
        <cat-select label="Team" style={{ width: '100%' }}></cat-select>
      </div>
    );
    const select = root.querySelector<HTMLCatSelectElement>('cat-select')!;
    await select.connect({
      ...objectArrayConnector(OPTIONS),
      retrieve: () => pendingRetrieve.asObservable()
    });
    await openSelect(select);
    const skeletons = select.shadowRoot!.querySelectorAll('cat-skeleton');
    expect(skeletons).toHaveLength(8);
    for (const skeleton of skeletons) {
      await waitForStable(skeleton);
      const line = skeleton.shadowRoot?.querySelector<HTMLElement>('.skeleton');
      if (!line) throw new Error('Expected skeleton line');
      // Freeze random line widths and sheen animation for repeatable snapshots.
      line.style.animation = 'none';
      line.style.backgroundPosition = '50% 50%';
      line.style.setProperty('--line-width', '75%');
    }

    try {
      await expect(root).toMatchScreenshot();
    } finally {
      pendingRetrieve.complete();
    }
  });

  it('renders custom empty state', async () => {
    const { root, select } = await renderSelect({ label: 'Team', noItems: 'No teams match your search' }, []);
    await openSelect(select);

    await expect(root).toMatchScreenshot();
  });

  it('renders tag suggestion with tag hint', async () => {
    const { root, select } = await renderSelect({ label: 'Team', tags: true, tagHint: 'new team', debounce: 0 }, []);
    await openSelect(select);
    await userEvent.type(select.shadowRoot!.querySelector('input')!, 'Newteam');
    await expect.element(page.getByText('Newteam (new team)')).toBeVisible();

    await expect(root).toMatchScreenshot();
  });

  it('renders selected single custom tag', async () => {
    const { root } = await renderSelect({ label: 'Team', tags: true, value: { id: '', tag: 'External' } }, []);

    await expect(root).toMatchScreenshot();
  });

  it('renders selected multiple custom tags', async () => {
    const { root } = await renderSelect(
      { label: 'Teams', multiple: true, tags: true, value: { ids: [], tags: ['External', 'Internal'] } },
      []
    );

    await expect(root).toMatchScreenshot();
  });

  it('shows tooltip for truncated option label', async () => {
    const label =
      'A very long option label that wraps to more than two lines and needs a tooltip to show its full content';
    const { root, select } = await renderSelect({ label: 'Team' }, [{ id: 'long', label }], '420px', '220px', '80px');
    await openSelect(select);
    const tooltip = select.shadowRoot!.querySelector<HTMLCatTooltipElement>('.select-options cat-tooltip')!;
    await expect.poll(() => tooltip.content).toBe(label);
    await userEvent.hover(select.shadowRoot!.querySelector('.select-option-label')!);
    await expect.element(page.getByRole('tooltip')).toBeVisible();

    await expect(root).toMatchScreenshot();
  });

  it('scrolls constrained option list to keyboard-active option', async () => {
    const options = Array.from({ length: 12 }, (_, index) => ({
      id: `option-${index + 1}`,
      label: `Option ${index + 1}`
    }));
    const { root, select } = await renderSelect({ label: 'Team' }, options);
    await openSelect(select);
    await select.doFocus();
    for (let index = 0; index < 8; index += 1) {
      await userEvent.keyboard('{ArrowDown}');
    }
    await waitForStable(select);

    await expect(root).toMatchScreenshot();
  });

  it('flips option list near viewport edge', async () => {
    await setViewport(800, 400);
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block', width: '300px', height: '360px' }}>
        <div style={{ height: '100%', display: 'flex', alignItems: 'flex-end' }}>
          <cat-select label="Team" style={{ width: '100%' }}></cat-select>
        </div>
      </div>
    );
    const select = root.querySelector<HTMLCatSelectElement>('cat-select')!;
    await select.connect(objectArrayConnector(OPTIONS));
    await waitForStable(select);
    await openSelect(select);
    const dropdown = select.shadowRoot!.querySelector<HTMLElement>('.select-dropdown')!;
    await expect.poll(() => dropdown.dataset.placement).toBe('top-start');

    await expect(root).toMatchScreenshot();
  });

  it('renders disabled control with selected value', async () => {
    const { root } = await renderSelect({ label: 'Team', value: 'beta', disabled: true });

    await expect(root).toMatchScreenshot();
  });

  it('renders disabled multiple select with pills', async () => {
    const { root } = await renderSelect({ label: 'Teams', multiple: true, value: ['alpha', 'gamma'], disabled: true });

    await expect(root).toMatchScreenshot();
  });

  it('opens option list with top-start placement', async () => {
    const { root, select } = await renderSelect(
      { label: 'Team', placement: 'top-start' },
      OPTIONS,
      '280px',
      '100%',
      '220px'
    );
    await openSelect(select);
    const dropdown = select.shadowRoot!.querySelector<HTMLElement>('.select-dropdown')!;
    await expect.poll(() => dropdown.dataset.placement).toBe('top-start');

    await expect(root).toMatchScreenshot();
  });

  it('renders clearable multiple select', async () => {
    const { root } = await renderSelect({ label: 'Teams', multiple: true, value: ['alpha', 'gamma'], clearable: true });

    await expect(root).toMatchScreenshot();
  });

  it('wraps many pills onto multiple lines', async () => {
    const options = ['Design', 'Platform', 'Marketing', 'Sales', 'Support', 'Finance', 'Legal'].map(label => ({
      id: label.toLowerCase(),
      label
    }));
    const { root } = await renderSelect(
      { label: 'Teams', multiple: true, value: options.map(({ id }) => id), clearable: true },
      options
    );

    await expect(root).toMatchScreenshot();
  });

  it('renders focused invalid state', async () => {
    catI18nRegistry.set({ 'error.required': 'Select a team before continuing.' });
    const { root, select } = await renderSelect({
      label: 'Team',
      required: true,
      errors: ['required'],
      errorUpdate: true
    });
    await select.doFocus();
    await select.doBlur();
    await waitForStable(select);
    await select.doFocus();
    await waitForStable(select);
    expect(select.shadowRoot!.activeElement).toBe(select.shadowRoot!.querySelector('input'));

    await expect(root).toMatchScreenshot();
  });
});

async function renderSelect(
  props: SelectProps = {},
  options: {
    id: string;
    label: string;
    description?: string;
    avatar?: { initials: string; round?: boolean };
  }[] = OPTIONS,
  frameWidth = '280px',
  selectWidth = '100%',
  paddingTop = '10px'
) {
  const { root } = await render(
    <div style={{ padding: '10px', paddingTop, display: 'inline-block', width: frameWidth, minHeight: '380px' }}>
      <cat-select {...props} style={{ width: selectWidth }}></cat-select>
    </div>
  );
  const select = root.querySelector<HTMLCatSelectElement>('cat-select')!;
  await select.connect(objectArrayConnector(options));
  await waitForStable(select);
  return { root, select };
}

async function openSelect(select: HTMLCatSelectElement): Promise<void> {
  await userEvent.click(select.shadowRoot!.querySelector('.select-wrapper')!);
  await waitForStable(select);
}

async function setViewport(width: number, height: number): Promise<void> {
  shouldRestoreViewport = true;
  await page.viewport(width, height);
  await nextAnimationFrame();
}

async function nextAnimationFrame(): Promise<void> {
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
}
