module.exports = {
  color: {
    ui: {
      background: {
        canvas: { value: '{color.base.grey.100.value}' },
        body: { value: '{color.base.white}' },
        interaction: { value: '{color.base.brand.400.value}' },
        notification: { value: '{color.base.red.400.value}' }
      },
      border: {
        light: { value: '{color.base.grey.200.value}' },
        dark: { value: '{color.base.grey.300.value}' },
        focus: { value: '#0071ff' }
      },
      font: {
        primary: { value: '{color.base.black}' },
        secondary: { value: '{color.base.grey.200.value}' },
        success: { value: '{color.base.green.400.value}' },
        warning: { value: '{color.base.orange.400.value}' },
        danger: { value: '{color.base.red.400.value}' },
      }
    }
  }
}
