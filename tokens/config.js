const StyleDictionary = require('style-dictionary');
const tinycolor = require("tinycolor2");

StyleDictionary.registerFileHeader({
  name: 'cat/header',
  fileHeader: () => ['Auto-generated file. Do not edit directly.']
});

StyleDictionary.registerTransform({
  type: 'value',
  name: 'cat/size',
  matcher: token => token.attributes.category === 'size',
  transformer: token => `${token.value}${token.attributes.unit || 'rem'}`
});

StyleDictionary.registerTransform({
  type: 'value',
  name: 'cat/rgbParts',
  matcher: token => token.attributes.category === 'color',
  transformer: token => {
    var rgb = tinycolor(token.value).toRgb();
    return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  }
});

StyleDictionary.registerTransform({
  type: 'value',
  name: 'cat/cssProp',
  transitive: true,
  matcher: token => !!token.attributes.cssProp,
  transformer: token => `var(--cat-${token.attributes.cssProp}, ${token.value})`
});

module.exports = {
  source: ['src/**/*.js'],
  platforms: {
    js: {
      transforms: ['attribute/cti', 'name/cti/pascal', 'size/rem', 'color/hex'],
      buildPath: 'dist/js/',
      files: [{
        destination: '_variables.js',
        format: "javascript/es6",
        options: {
          fileHeader: 'cat/header'
        }
      }, {
        destination: '_variables.d.ts',
        format: 'typescript/es6-declarations',
        options: {
          fileHeader: 'cat/header'
        }
      }]
    },
    css: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'time/seconds', 'content/icon', 'color/css', 'cat/size', 'cat/rgbParts'],
      prefix: 'cat',
      buildPath: 'dist/css/',
      files: [{
        destination: '_variables.css',
        format: 'css/variables',
        options: {
          fileHeader: 'cat/header',
          outputReferences: false
        }
      }]
    },
    scss: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'time/seconds', 'content/icon', 'color/css', 'cat/size', 'cat/rgbParts', 'cat/cssProp'],
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
    }
  }
};
