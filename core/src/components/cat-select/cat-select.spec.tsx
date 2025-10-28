jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from '@stencil/core/testing';
import { CatSelect } from './cat-select';
import { stringArrayConnector } from './connectors';

describe('cat-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatSelect],
      html: `<cat-select label="Label"></cat-select>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-select label="Label" tabindex="0"></cat-select>
    `);
  });

  describe('catChange', () => {
    it('should not emit catChange event on initialization with value', async () => {
      const page = await newSpecPage({
        components: [CatSelect],
        html: `<cat-select label="Label" value="option1"></cat-select>`
      });

      const select = page.rootInstance as CatSelect;
      const catChangeSpy = jest.fn();

      page.root?.addEventListener('catChange', catChangeSpy);

      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await page.waitForChanges();

      expect(catChangeSpy).not.toHaveBeenCalled();
    });

    it('should emit catChange event when selection state changes from user interaction', async () => {
      const page = await newSpecPage({
        components: [CatSelect],
        html: `<cat-select label="Label"></cat-select>`
      });

      const select = page.rootInstance as CatSelect;
      let eventEmitted = false;

      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await page.waitForChanges();

      page.root?.addEventListener('catChange', () => {
        eventEmitted = true;
      });

      // Directly update selection state (simulating what happens after user interaction)
      // This mimics the internal flow when user clicks an option
      select['patchState']({
        selection: [{ item: { id: 'option1' }, render: { label: 'option1' } }],
        tempSelection: []
      });
      await page.waitForChanges();

      expect(eventEmitted).toBe(true);
    });

    it('should not emit catChange event when value is changed programmatically', async () => {
      const page = await newSpecPage({
        components: [CatSelect],
        html: `<cat-select label="Label"></cat-select>`
      });

      const select = page.rootInstance as CatSelect;
      const catChangeSpy = jest.fn();

      await select.connect(stringArrayConnector(['option1', 'option2', 'option3']));
      await page.waitForChanges();

      page.root?.addEventListener('catChange', catChangeSpy);

      select.value = 'option2';
      await page.waitForChanges();

      expect(catChangeSpy).not.toHaveBeenCalled();
    });
  });
});
