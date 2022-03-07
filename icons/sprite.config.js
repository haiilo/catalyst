'use strict';

const config = {
  dest: '.',
  bust: false,
  prefix: '.ci-%s',
  example: true
};

module.exports = {
  dest: 'dist',
  svg: {
    precision: -1,
    namespaceIDs: false,
    namespaceClassnames: false,
  },
  mode: {
    css: {...config, ...{
      common: 'ci',
      dimensions: '-size',
      render: {
        css: { dest: 'style/sprite.css.css' },
        scss: { dest: 'style/sprite.css.scss' },
        less: { dest: 'style/sprite.css.less' },
      }
    }},
    view: {...config, ...{
      common: 'ci',
      dimensions: '-size',
      render: {
        css: { dest: 'style/sprite.view.css' },
        scss: { dest: 'style/sprite.view.scss' },
        less: { dest: 'style/sprite.view.less' },
      }
    }},
    defs: {...config},
    symbol: {...config},
    stack: {...config}
  }
};
