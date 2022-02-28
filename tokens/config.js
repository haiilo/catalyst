const StyleDictionary = require('style-dictionary');

StyleDictionary.registerTransform({
  type: `value`,
  name: `cat/size`,
  matcher: token => token.attributes.category === 'size',
  transformer: token => `${token.value}${token.attributes.unit || 'rem'}`
});

module.exports = {
  source: ['src/**/*.js'],
  platforms: {
    scss: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'time/seconds', 'content/icon', 'cat/size', 'color/css'],
      prefix: 'cat',
      files: [{
        destination: 'dist/scss/_variables.scss',
        format: 'scss/map-deep',
        options: {
          outputReferences: true,
          themeable: true
        }
      }]
    }
  }
};
