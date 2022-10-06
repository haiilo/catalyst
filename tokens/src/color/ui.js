module.exports = {
  color: {
    ui: {
      background: {
        canvas: { value: '{color.base.neutral.100.value}', attributes: { cssProp: "bg" } },
        body: { value: '{color.base.neutral.0.value}' },
        muted: { value: '{color.base.neutral.200.value}' },
        input: { value: '{color.base.neutral.0.value}' },
        inputDisabled: { value: '{color.base.neutral.100.value}' },
        skeleton: { value: '{color.base.neutral.200.value}' },
        skeletonHighlight: { value: '{color.base.neutral.300.value}' },
        tooltip: { value: '{color.base.neutral.900.value}' },
        backdrop: { value: '{color.base.neutral.900.value}' },
        select: {
          pill: { value:'#f2f4f7' }
        }
      },
      border: {
        light: { value: '{color.base.neutral.100.value}' },
        default: { value: '{color.base.neutral.200.value}' },
        dark: { value: '{color.base.neutral.300.value}' },
        focus: { value: '#0071ff', attributes: { cssProp: "border-color-focus" } }
      },
      font: {
        head: { value: '{color.base.neutral.900.value}', attributes: { cssProp: "font-color-head" } },
        body: { value: '{color.base.neutral.900.value}', attributes: { cssProp: "font-color-body" } },
        mono: { value: '{color.base.neutral.900.value}', attributes: { cssProp: "font-color-mono" } },
        muted: { value: '{color.base.neutral.400.value}', attributes: { cssProp: "font-color-muted" } },
        quote: { value: '{color.ui.font.body.value}' },
        tooltip: { value: '{color.base.neutral.0.value}' }
      }
    }
  }
}
