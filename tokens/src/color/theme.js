module.exports = {
  color: {
    theme: {
      primary: {
        bg: { value: '{color.base.brand.400}', attributes: { cssProp: "primary-bg" } },
        bgHover: { value: '{color.base.brand.500}', attributes: { cssProp: "primary-bg-hover" } },
        bgActive: { value: '{color.base.brand.600}', attributes: { cssProp: "primary-bg-active" } },
        fill: { value: '{color.base.white}', attributes: { cssProp: "primary-fill" } },
        fillHover: { value: '{color.base.white}', attributes: { cssProp: "primary-fill-hover" } },
        fillActive: { value: '{color.base.white}', attributes: { cssProp: "primary-fill-active" } },
        text: { value: '{color.base.brand.400}', attributes: { cssProp: "primary-text" } },
        textHover: { value: '{color.base.brand.500}', attributes: { cssProp: "primary-text-hover" } },
        textActive: { value: '{color.base.brand.600}', attributes: { cssProp: "primary-text-active" } }
      },
      secondary: {
        bg: { value: '{color.base.neutral.400}', attributes: { cssProp: "secondary-bg" } },
        bgHover: { value: '{color.base.neutral.400}', attributes: { cssProp: "secondary-bg-hover" } },
        bgActive: { value: '{color.base.neutral.400}', attributes: { cssProp: "secondary-bg-active" } },
        fill: { value: '{color.base.white}', attributes: { cssProp: "secondary-fill" } },
        fillHover: { value: '{color.base.white}', attributes: { cssProp: "secondary-fill-hover" } },
        fillActive: { value: '{color.base.white}', attributes: { cssProp: "secondary-fill-active" } },
        text: { value: '{color.base.black}', attributes: { cssProp: "secondary-text" } },
        textHover: { value: '{color.base.black}', attributes: { cssProp: "secondary-text-hover" } },
        textActive: { value: '{color.base.black}', attributes: { cssProp: "secondary-text-active" } }
      },
      success: {
        bg: { value: '{color.base.green.400}', attributes: { cssProp: "success-bg-" } },
        bgHover: { value: '{color.base.green.500}', attributes: { cssProp: "success-bg-hover" } },
        bgActive: { value: '{color.base.green.600}', attributes: { cssProp: "success-bg-active" } },
        fill: { value: '{color.base.white}', attributes: { cssProp: "success-fill" } },
        fillHover: { value: '{color.base.white}', attributes: { cssProp: "success-fill-hover" } },
        fillActive: { value: '{color.base.white}', attributes: { cssProp: "success-fill-active" } },
        text: { value: '{color.base.green.400}', attributes: { cssProp: "success-text" } },
        textHover: { value: '{color.base.green.500}', attributes: { cssProp: "success-text-hover" } },
        textActive: { value: '{color.base.green.600}', attributes: { cssProp: "success-text-active" } }
      },
      warning: {
        bg: { value: '{color.base.orange.300}', attributes: { cssProp: "warning-bg" } },
        bgHover: { value: '{color.base.orange.200}', attributes: { cssProp: "warning-bg-hover" } },
        bgActive: { value: '{color.base.orange.100}', attributes: { cssProp: "warning-bg-active" } },
        fill: { value: '{color.base.black}', attributes: { cssProp: "warning-fill" } },
        fillHover: { value: '{color.base.black}', attributes: { cssProp: "warning-fill-hover" } },
        fillActive: { value: '{color.base.black}', attributes: { cssProp: "warning-fill-active" } },
        text: { value: '{color.base.orange.700}', attributes: { cssProp: "warning-text" } },
        textHover: { value: '{color.base.orange.700}', attributes: { cssProp: "warning-text-hover" } },
        textActive: { value: '{color.base.orange.700}', attributes: { cssProp: "warning-text-active" } }
      },
      danger: {
        bg: { value: '{color.base.red.400}', attributes: { cssProp: "danger-bg" } },
        bgHover: { value: '{color.base.red.500}', attributes: { cssProp: "danger-bg-hover" } },
        bgActive: { value: '{color.base.red.600}', attributes: { cssProp: "danger-bg-active" } },
        fill: { value: '{color.base.white}', attributes: { cssProp: "danger-fill" } },
        fillHover: { value: '{color.base.white}', attributes: { cssProp: "danger-fill-hover" } },
        fillActive: { value: '{color.base.white}', attributes: { cssProp: "danger-fill-active" } },
        text: { value: '{color.base.red.400}', attributes: { cssProp: "danger-text" } },
        textHover: { value: '{color.base.red.500}', attributes: { cssProp: "danger-text-hover" } },
        textActive: { value: '{color.base.red.600}', attributes: { cssProp: "danger-text-active" } }
      }
    }
  }
}
