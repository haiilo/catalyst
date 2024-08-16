const StyleDictionary = require('style-dictionary-utils');

StyleDictionary.registerFormat({
  name: 'json/designTokens',
  formatter: function ({ dictionary }) {
    const set = (obj, path, token) => {
      const [key, ...restPath] = path;
      obj[key] = restPath.length ? set(obj[key] || {}, restPath, token) : {
        $type: token.$type,
        $value: token.value
      };
      return obj;
    }
    const tokens = dictionary.allTokens.reduce((acc, token) => set(acc, token.path, token), {});
    return JSON.stringify(tokens, null, 2);
  }
});

StyleDictionary.registerTransform({
  type: 'value',
  name: 'cat/cssProp',
  transitive: true,
  matcher: token => !!token.cssProp,
  transformer: token => `var(--cat-${token.cssProp}, ${token.value})`
});


StyleDictionary.registerTransform({
  type: 'value',
  name: 'opacity/percent',
  transitive: true,
  matcher: token => token.$type === 'opacity',
  transformer: token => token.value * 100 + '%'
});

StyleDictionary.registerTransform({
  type: 'name',
  name: 'cat/scssPrivate',
  transitive: true,
  matcher: token => token.attributes.category === 'color' && token.attributes.type === 'base',
  transformer: token => `-${token.name}`
});

StyleDictionary.registerTransform({
  type: 'value',
  name: 'cat/jsNumber',
  transitive: true,
  matcher: token => token.$type === 'dimension' || token.$type === 'duration',
  transformer: token => parseFloat(token.value)
});

module.exports = {
  source: ['src/**/*.json'],
  platforms: {
    js: {
      transforms: ['attribute/cti', 'name/cti/camel', 'color/hex', 'cat/jsNumber'],
      buildPath: 'dist/js/',
      files: [{
        destination: 'variables.js',
        format: "javascript/es6",
      }, {
        destination: 'variables.d.ts',
        format: 'typescript/es6-declarations',
      }]
    },
    cssHex: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'content/icon', 'color/hex', 'opacity/percent'],
      prefix: 'cat',
      buildPath: 'dist/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: {
          outputReferences: true
        }
      }]
    },
    scss: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'color/hex', 'opacity/percent', 'cat/cssProp', 'cat/scssPrivate'],
      prefix: 'cat',
      buildPath: 'dist/scss/',
      files: [{
        destination: '_variables.scss',
        format: 'scss/map-deep',
        options: {
          outputReferences: true,
          themeable: true
        }
      }]
    },
    figma: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'color/hex', 'dimension/pixelUnitless'],
      buildPath: 'dist/export/',
      files: [{
        destination: 'figma.json',
        format: 'json/designTokens',
        filter: (token) => token.$type !== 'asset'
      }]
    },
    zeroheight: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'color/hex'],
      buildPath: 'dist/export/',
      files: [{
        destination: 'zeroheight.json',
        format: 'json/designTokens',
        filter: (token) => token.$type !== 'asset'
      }]
    }
  }
};
