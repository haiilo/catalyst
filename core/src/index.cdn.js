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
    CatI18nRegistry.getInstance().set({
      'input.clear': 'Clear',
      'input.optional': 'Optional',
      'pagination.prev': 'Previous',
      'pagination.page': 'Go to page {{page}}',
      'pagination.next': 'Next',
      'select.close': 'Close',
      'select.deselect': 'Deselect',
      'select.empty': 'No items',
      'select.open': 'Open'
    });
  `;

  doc.head.appendChild(scriptMap);
  doc.head.appendChild(scriptComp);
  doc.head.appendChild(scriptInit);
})(document);
