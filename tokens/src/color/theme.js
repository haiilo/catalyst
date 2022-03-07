module.exports = {
  color: {
    theme: {
      primary: {
        bg: { value: '{color.base.brand.400}', attributes: { cssProp: "primary-bg" } },
        bgHover: { value: '{color.base.brand.500}', attributes: { cssProp: "primary-bg-hover" } },
        bgActive: { value: '{color.base.brand.600}', attributes: { cssProp: "primary-bg-active" } },
        fill: { value: '{color.base.neutral.0}', attributes: { cssProp: "primary-fill" } },
        fillHover: { value: '{color.base.neutral.0}', attributes: { cssProp: "primary-fill-hover" } },
        fillActive: { value: '{color.base.neutral.0}', attributes: { cssProp: "primary-fill-active" } },
        text: { value: '{color.base.brand.400}', attributes: { cssProp: "primary-text" } },
        textHover: { value: '{color.base.brand.500}', attributes: { cssProp: "primary-text-hover" } },
        textActive: { value: '{color.base.brand.600}', attributes: { cssProp: "primary-text-active" } }
      },
      secondary: {
        bg: { value: '{color.base.neutral.100}' },
        bgHover: { value: '{color.base.neutral.200}' },
        bgActive: { value: '{color.base.neutral.200}' },
        fill: { value: '{color.base.neutral.900}' },
        fillHover: { value: '{color.base.neutral.900}' },
        fillActive: { value: '{color.base.neutral.900}' },
        text: { value: '{color.base.neutral.400}' },
        textHover: { value: '{color.base.neutral.900}' },
        textActive: { value: '{color.base.neutral.900}' }
      },
      success: {
        bg: { value: '{color.base.green.400}' },
        bgHover: { value: '{color.base.green.500}' },
        bgActive: { value: '{color.base.green.600}' },
        fill: { value: '{color.base.neutral.0}' },
        fillHover: { value: '{color.base.neutral.0}' },
        fillActive: { value: '{color.base.neutral.0}' },
        text: { value: '{color.base.green.400}' },
        textHover: { value: '{color.base.green.500}' },
        textActive: { value: '{color.base.green.600}' }
      },
      warning: {
        bg: { value: '{color.base.orange.300}' },
        bgHover: { value: '{color.base.orange.200}' },
        bgActive: { value: '{color.base.orange.100}' },
        fill: { value: '{color.base.neutral.900}' },
        fillHover: { value: '{color.base.neutral.900}' },
        fillActive: { value: '{color.base.neutral.900}' },
        text: { value: '{color.base.orange.400}' },
        textHover: { value: '{color.base.orange.500}' },
        textActive: { value: '{color.base.orange.600}' }
      },
      danger: {
        bg: { value: '{color.base.red.400}' },
        bgHover: { value: '{color.base.red.500}' },
        bgActive: { value: '{color.base.red.600}' },
        fill: { value: '{color.base.neutral.0}' },
        fillHover: { value: '{color.base.neutral.0}' },
        fillActive: { value: '{color.base.neutral.0}' },
        text: { value: '{color.base.red.400}' },
        textHover: { value: '{color.base.red.500}' },
        textActive: { value: '{color.base.red.600}' }
      }
    }
  }
}
