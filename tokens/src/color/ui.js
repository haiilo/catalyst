module.exports = {
  color: {
    ui: {
      background: {
        canvas: { value: '{color.base.neutral.100.value}', attributes: { cssProp: "bg" } },
        body: { value: '{color.base.neutral.0.value}' },
        interaction: { value: '{color.base.brand.400.value}' },
        input: { value: '{color.base.neutral.0.value}' },
        inputDisabled: { value: '{color.base.neutral.100.value}' },
        skeleton: { value: '{color.base.neutral.200.value}' },
        skeletonHighlight: { value: '{color.base.neutral.300.value}' },
        tooltip: { value: '{color.base.neutral.900.value}' },
        avatar: { value: '{color.base.neutral.400.value}' },
        modal: {
          body: { value: '{color.base.neutral.0.value}' },
          wrapper : { value: '{color.base.neutral.900.value}' }
        }
      },
      border: {
        light: { value: '{color.base.neutral.100.value}' },
        default: { value: '{color.base.neutral.200.value}' },
        dark: { value: '{color.base.neutral.300.value}' },
        focus: { value: '#0071ff', attributes: { cssProp: "border-color-focus" }  },
        input: { value: '{color.base.neutral.300.value}' },
        tabs: { value: '{color.base.neutral.300.value}' },
        activeTab: { value: '{color.base.brand.400.value}' }
      },
      font: {
        head: { value: '{color.base.neutral.900.value}', attributes: { cssProp: "font-color-head" } },
        body: { value: '{color.base.neutral.900.value}', attributes: { cssProp: "font-color-body" } },
        mono: { value: '{color.base.neutral.900.value}', attributes: { cssProp: "font-color-mono" } },
        muted: { value: '{color.base.neutral.400.value}', attributes: { cssProp: "font-color-muted" } },
        quote: { value: '{color.ui.font.body.value}' },
        tooltip: { value: '{color.base.neutral.0.value}' },
        avatar: { value: '{color.base.neutral.0.value}' },
        alert: {
          primary: { value: '{color.base.brand.400.value}' },
          secondary: { value: '{color.base.neutral.400.value}' },
          success: { value: '{color.base.green.400.value}' },
          warning: { value: '{color.base.orange.400.value}' },
          danger: { value: '{color.base.red.400.value}' }
        }
      }
    }
  }
}
