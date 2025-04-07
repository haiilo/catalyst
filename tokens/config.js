const StyleDictionary = require('style-dictionary-utils');
const tinycolor = require("tinycolor2");

StyleDictionary.registerFileHeader({
  name: 'cat/header',
  fileHeader: () => ['Auto-generated file. Do not edit directly.']
});

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
    const tokens = dictionary.allTokens.reduce((acc, token) =>
      set(acc, token.path, token)
    , {});
    return JSON.stringify(tokens, null, 2);
  }
});

StyleDictionary.registerFormat({
  name: 'json/cssProp',
  formatter: function ({ dictionary }) {
    const tokens = dictionary.allTokens.reduce((acc, token) => {
      acc[token.cssProp] = {
        $type: token.$type,
        $value: token.value
      };
      return acc;
    }, {});
    return JSON.stringify(tokens, null, 2);
  }
});

StyleDictionary.registerTransform({
  type: 'value',
  name: 'cat/rgbParts',
  matcher: token => token.$type === 'color',
  transformer: token => {
    var rgb = tinycolor(token.value).toRgb();
    return rgb.a === 1 ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : `${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a}`;
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
        options: {
          fileHeader: 'cat/header'
        }
      }, {
        destination: 'variables.d.ts',
        format: 'typescript/es6-declarations',
        options: {
          fileHeader: 'cat/header'
        }
      }]
    },
    css: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'content/icon', 'color/css', 'cat/rgbParts'],
      prefix: 'cat',
      buildPath: 'dist/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: {
          fileHeader: 'cat/header',
          outputReferences: false
        }
      }]
    },
    cssHex: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'content/icon', 'color/css'],
      prefix: 'cat',
      buildPath: 'dist/css/',
      files: [{
        destination: 'variables-hex.css',
        format: 'css/variables',
        options: {
          fileHeader: 'cat/header',
          outputReferences: false
        }
      }]
    },
    scss: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'content/icon', 'color/css', 'cat/rgbParts', 'cat/cssProp'],
      prefix: 'cat',
      buildPath: 'dist/scss/',
      files: [{
        destination: '_variables.scss',
        format: 'scss/map-deep',
        options: {
          fileHeader: 'cat/header',
          outputReferences: true,
          themeable: true
        }
      }]
    },
    json: {
      transforms: ['name/cti/kebab'],
      buildPath: 'dist/json/',
      files: [{
        destination: 'variables.json',
        format: 'json/nested'
      }]
    },
    zeroheight: {
      transforms: ['name/cti/kebab'],
      buildPath: 'dist/export/',
      files: [{
        destination: 'zeroheight.json',
        format: 'json/designTokens'
      }]
    },
    figma: {
      transforms: ['name/cti/kebab', 'dimension/pixelUnitless'],
      buildPath: 'dist/export/',
      files: [{
        destination: 'figma.json',
        format: 'json/designTokens',
        filter: (token) => token.$type !== 'asset'
      }]
    },
    theme: {
      transforms: ['name/cti/kebab'],
      buildPath: 'dist/export/',
      files: [{
        destination: 'theme.json',
        format: 'json/cssProp',
        filter: (token) => token.hasOwnProperty('cssProp')
      }]
    }
  }
};
