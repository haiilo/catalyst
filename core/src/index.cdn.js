(function (doc) {
  var scriptMap = doc.createElement('script');
  scriptMap.setAttribute('type', 'importmap');
  scriptMap.text = `
    {
      "imports": {
        "@haiilo/catalyst": "https://cdn.jsdelivr.net/npm/@haiilo/catalyst/dist/catalyst/index.esm.js",
        "@haiilo/catalyst-icons": "https://cdn.jsdelivr.net/npm/@haiilo/catalyst-icons/dist/js/icons.object.js"
      }
    }
  `;

  var scriptComp = doc.createElement('script');
  scriptComp.setAttribute('type', 'module');
  scriptComp.setAttribute('data-stencil-namespace', 'catalyst');
  scriptComp.src = 'https://cdn.jsdelivr.net/npm/@haiilo/catalyst/dist/catalyst/catalyst.esm.js';

  var scriptInit = doc.createElement('script');
  scriptInit.setAttribute('type', 'module');
  scriptInit.text = `
    import { ci } from '@haiilo/catalyst-icons';
    import { CatI18nRegistry, CatIconRegistry } from '@haiilo/catalyst';

    CatIconRegistry.getInstance().addIcons(ci);
    CatI18nRegistry.getInstance().register('en', {
        'input.clear': 'Clear',
        'input.optional': 'Optional',
        'select.addItem': 'Add item',
        'select.customAddItem': 'Custom add item',
        'select.loading': 'Loading',
        'select.noResults': 'No results',
        'select.noChoices': 'No choices',
        'select.removeItem': 'Remove item',
        'select.searchPlaceholder': 'Search',
        'select.selectItem': 'Select item',
        'select.uniqueItem': 'Unique item',
        'select.open': 'Open',
        'select.close': 'Close',
        'select.clear': 'Clear',
        'select.deselect': 'Deselect',
        'select.empty': 'No items'
      });
  `;

  doc.head.appendChild(scriptMap);
  doc.head.appendChild(scriptComp);
  doc.head.appendChild(scriptInit);
})(document);
