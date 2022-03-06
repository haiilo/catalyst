module.exports = {
  color: {
    ui: {
      background: {
        canvas: { value: '{color.base.neutral.100.value}' },
        body: { value: '{color.base.neutral.0.value}' },
        interaction: { value: '{color.base.brand.400.value}' },
        notification: { value: '{color.base.red.400.value}' }
      },
      border: {
        default: { value: '{color.base.neutral.200.value}' },
        dark: { value: '{color.base.neutral.300.value}' },
        focus: { value: '#0071ff' }
      },
      font: {
        primary: { value: '{color.base.neutral.900.value}' },
        secondary: { value: '{color.base.neutral.200.value}' },
        success: { value: '{color.base.green.400.value}' },
        warning: { value: '{color.base.orange.400.value}' },
        danger: { value: '{color.base.red.400.value}' },

        quote: { value: '{color.ui.font.primary.value}' },
        quoteSource: { value: '{color.ui.font.secondary.value}' }
      }
    }
  }
}
