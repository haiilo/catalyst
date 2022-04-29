module.exports = {
  color: {
    ui: {
      background: {
        canvas: { value: '{color.base.neutral.100.value}', attributes: { cssProp: "bg" } },
        body: { value: '{color.base.neutral.0.value}' },
        interaction: { value: '{color.base.brand.400.value}' },
        input: { value: '{color.base.neutral.0.value}' },
        inputDisabled: { value: '{color.base.neutral.100.value}' },
        notification: { value: '{color.base.red.400.value}' },
        skeleton: { value: '{color.base.neutral.200.value}' },
        skeletonHighlight: { value: '{color.base.neutral.300.value}' },
        tooltip: { value: '{color.base.neutral.0.value}' }
      },
      border: {
        default: { value: '{color.base.neutral.200.value}' },
        dark: { value: '{color.base.neutral.300.value}' },
        focus: { value: '#0071ff' },
        input: { value: '{color.base.neutral.300.value}' }
      },
      font: {
        head: { value: '{color.base.neutral.900.value}', attributes: { cssProp: "font-color-head" } },
        body: { value: '{color.base.neutral.900.value}', attributes: { cssProp: "font-color-body" } },
        mono: { value: '{color.base.neutral.900.value}', attributes: { cssProp: "font-color-mono" } },
        muted: { value: '{color.base.neutral.400.value}', attributes: { cssProp: "font-color-muted" } },
        quote: { value: '{color.ui.font.body.value}' },
        quoteSource: { value: '{color.ui.font.muted.value}' },
        tooltip: { value: '{color.base.neutral.900.value}' }
      }
    }
  }
}
