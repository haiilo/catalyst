module.exports = {
  size: {
    screen: {
      // Note: CSS does not support the use of css properties in media queries,
      // thus we cannot use the cssProp attribute here.
      // See: https://bholmes.dev/blog/alternative-to-css-variable-media-queries
      xs: { value: 540, attributes: { unit: "px" } },
      s: { value: 768, attributes: { unit: "px" } },
      m: { value: 992, attributes: { unit: "px" } },
      l: { value: 1200, attributes: { unit: "px" } },
      xl: { value: 1400, attributes: { unit: "px" } }
    }
  }
}
