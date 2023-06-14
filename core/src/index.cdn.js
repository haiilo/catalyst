(function (doc) {
  var scriptMap = doc.createElement('script');
  scriptMap.setAttribute('type', 'importmap');
  scriptMap.text = `
    {
      "imports": {
        "@haiilo/catalyst": "https://cdn.jsdelivr.net/npm/@haiilo/catalyst@latest/dist/catalyst/index.esm.js",
        "@haiilo/catalyst-icons": "https://cdn.jsdelivr.net/npm/@haiilo/catalyst-icons@latest/dist/js/icons.object.js"
      }
    }
  `;

  var scriptComp = doc.createElement('script');
  scriptComp.setAttribute('type', 'module');
  scriptComp.setAttribute('data-stencil-namespace', 'catalyst');
  scriptComp.src = 'https://cdn.jsdelivr.net/npm/@haiilo/catalyst@latest/dist/catalyst/catalyst.esm.js';

  var scriptInit = doc.createElement('script');
  scriptInit.setAttribute('type', 'module');
  scriptInit.text = `
    import { ci } from '@haiilo/catalyst-icons';
    import { catI18nRegistry, catIconRegistry } from '@haiilo/catalyst';

    catIconRegistry.addIcons(ci);
    catI18nRegistry.set({
      'datepicker.year': 'Year',
      'datepicker.month': 'Month',
      'datepicker.hour': 'Hour',
      'datepicker.minute': 'Minute',
      'datepicker.scroll': 'Scroll to increment',
      'datepicker.toggle': 'Click to toggle',
      'dialog.close': 'Close',
      'input.clear': 'Clear',
      'input.optional': 'Optional',
      'input.required': 'Required',
      'input.today': 'Today',
      'notification.dismiss': 'Dismiss',
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
