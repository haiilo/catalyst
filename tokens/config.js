import { StyleDictionary } from 'style-dictionary-utils';
import tinycolor from 'tinycolor2';

StyleDictionary.registerFileHeader({
  name: 'cat/header',
  fileHeader: () => ['Auto-generated file. Do not edit directly.']
});

StyleDictionary.registerFormat({
  name: 'json/designTokens',
  format: async function({ dictionary }) {
    const set = (obj, path, token) => {
      const [key, ...restPath] = path;
      obj[key] = restPath.length ? set(obj[key] || {}, restPath, token) : {
        $type: token.$type,
        $value: token.$value
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
  format: async function({ dictionary }) {
    const tokens = dictionary.allTokens.reduce((acc, token) => {
      acc[token.cssProp] = {
        $type: token.$type,
        $value: token.$value
      };
      return acc;
    }, {});
    return JSON.stringify(tokens, null, 2);
  }
});

StyleDictionary.registerTransform({
  type: 'value',
  name: 'cat/rgbParts',
  filter: token => token.$type === 'color',
  transform: token => {
    var rgb = tinycolor(token.$value).toRgb();
    return rgb.a === 1 ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : `${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a}`;
  }
});

StyleDictionary.registerTransform({
  type: 'value',
  name: 'cat/cssProp',
  transitive: true,
  filter: token => !!token.cssProp,
  transform: token => `var(--cat-${token.cssProp}, ${token.$value})`
});

StyleDictionary.registerTransform({
  type: 'value',
  name: 'cat/jsNumber',
  transitive: true,
  filter: token => token.$type === 'dimension' || token.$type === 'duration',
  transform: token => parseFloat(token.$value)
});

StyleDictionary.registerTransform({
  type: 'value',
  name: 'cat/asset',
  filter: token => token.$type === 'asset',
  transform: token => {
    return `"${token.$value}"`;
  }
});

StyleDictionary.registerTransform({
  type: 'value',
  name: 'cat/remToPx',
  filter: token => token.$type === 'dimension' && typeof token.$value === 'string' && token.$value.includes('rem'),
  transform: token => {
    const parsedVal = parseFloat(token.$value);
    return (parsedVal * 16).toFixed(0) + 'px';
  }
});

export default {
  source: ['src/**/*.json'],
  platforms: {
    js: {
      transforms: ['attribute/cti', 'name/camel', 'color/hex', 'cat/jsNumber'],
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
      transforms: ['attribute/cti', 'name/kebab', 'html/icon', 'color/css', 'cat/rgbParts'],
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
      transforms: ['attribute/cti', 'name/kebab', 'html/icon', 'color/css'],
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
      transforms: ['attribute/cti', 'name/kebab', 'html/icon', 'color/css', 'cat/rgbParts', 'cat/cssProp', 'cat/asset'],
      prefix: 'cat',
      buildPath: 'dist/scss/',
      files: [{
        destination: '_variables.scss',
        format: 'scss/map-deep',
        options: {
          fileHeader: 'cat/header',
          outputReferences: true,
          themeable: true,
          usesDtcg: true
        }
      }]
    },
    json: {
      transforms: ['name/kebab'],
      buildPath: 'dist/json/',
      files: [{
        destination: 'variables.json',
        format: 'json/nested'
      }]
    },
    zeroheight: {
      transforms: ['name/kebab'],
      buildPath: 'dist/export/',
      files: [{
        destination: 'zeroheight.json',
        format: 'json/designTokens'
      }]
    },
    figma: {
      transforms: ['name/kebab', 'cat/remToPx'],
      buildPath: 'dist/export/',
      files: [{
        destination: 'figma.json',
        format: 'json/designTokens',
        filter: (token) => token.$type !== 'asset'
      }]
    },
    theme: {
      transforms: ['name/kebab'],
      buildPath: 'dist/export/',
      files: [{
        destination: 'theme.json',
        format: 'json/cssProp',
        filter: (token) => token.hasOwnProperty('cssProp')
      }]
    }
  }
};
