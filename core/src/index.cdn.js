(function (doc) {
  var scriptElm = doc.scripts[doc.scripts.length - 1];
  var warn = ['Discouraged script use, please remove: ' + scriptElm.outerHTML];

  warn.push('To improve performance it is recommended to set the script in the head as follows:');

  var parts = scriptElm.src.split('/');
  parts.pop();
  // add subfolder(s) here
  // parts.push('...');
  var url = parts.join('/');

  var scriptElm = doc.createElement('script');
  scriptElm.setAttribute('type', 'module');
  scriptElm.src = url + '/catalyst.esm.js';
  warn.push(scriptElm.outerHTML);
  scriptElm.setAttribute('data-stencil-namespace', 'catalyst');
  doc.head.appendChild(scriptElm);

  console.warn(warn.join('\n'));
})(document);
