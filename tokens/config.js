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
    scss: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'time/seconds', 'content/icon', 'cat/size', 'color/css', 'cat/rgbParts', 'cat/cssProp'],
      prefix: 'cat',
      files: [{
        destination: 'dist/scss/_variables.scss',
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
