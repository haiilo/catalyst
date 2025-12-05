import { newE2EPage } from '@stencil/core/testing';

describe('cat-select', () => {
  beforeAll(() => {
    console.error = jest.fn();
    console.warn = jest.fn();
  });

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-select label="Label"></cat-select>');

    const element = await page.find('cat-select');
    expect(element).toHaveClass('hydrated');
  });

  it('should not emit catChange event on initialization with value', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <cat-select label="Label" value="option1"></cat-select>
      <script type="module">
        const select = document.querySelector('cat-select');
        const connector = {
          resolve: ids => Promise.resolve([{ id: 'option1', label: 'Option 1' }].filter(item => ids.includes(item.id))),
          retrieve: () => Promise.resolve({
            content: [
              { id: 'option1', label: 'Option 1' },
              { id: 'option2', label: 'Option 2' },
              { id: 'option3', label: 'Option 3' }
            ],
            last: true
          }),
          render: item => ({ label: item.label })
        };
        select.connect(connector);
      </script>
    `);

    const select = await page.find('cat-select');
    const changeSpy = await select.spyOnEvent('catChange');

    await page.waitForChanges();

    expect(changeSpy).not.toHaveReceivedEvent();
  });
});
