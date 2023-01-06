module.exports = {
  color: {
    ui: {
      background: {
        canvas: { value: '{color.base.neutral.100.value}', attributes: { cssProp: "bg" } },
        surface: { value: '{color.base.white.value}' },
        surfaceInverted: { value: '{color.base.neutral.700.value}' },
        muted: { value: '{color.base.neutral.100.value}' },
        input: { value: '{color.base.white.value}' },
        skeleton: { value: '{color.base.neutral.200.value}' },
        skeletonHighlight: { value: '{color.base.neutral.300.value}' },
        tooltip: { value: '{color.base.black.value}', attributes: { cssProp: "bg-tooltip" } },
        backdrop: { value: '{color.base.neutral.700}', attributes: { cssProp: "bg-backdrop" } }
      },
      border: {
        light: { value: '{color.base.neutral.100.value}', attributes: { cssProp: "border-color-light" } },
        default: { value: '{color.base.neutral.200.value}', attributes: { cssProp: "border-color" } },
        dark: { value: '{color.base.neutral.300.value}', attributes: { cssProp: "border-color-dark" } },
        focus: { value: '#0071ff', attributes: { cssProp: "border-color-focus" } },
        quote: { value: '{color.base.neutral.400.value}' }
      },
      font: {
        head: { value: '{color.base.black.value}', attributes: { cssProp: "font-color-head" } },
        headInverted: { value: '{color.base.white.value}' },
        body: { value: '{color.base.black.value}', attributes: { cssProp: "font-color-body" } },
        bodyInverted: { value: '{color.base.white.value}' },
        mono: { value: '{color.base.black.value}', attributes: { cssProp: "font-color-mono" } },
        monoInverted: { value: '{color.base.white.value}' },
        muted: { value: '{color.base.neutral.400.value}', attributes: { cssProp: "font-color-muted" } },
        quote: { value: '{color.base.neutral.400.value}', attributes: { cssProp: "font-color-quote" } },
        tooltip: { value: '{color.base.white.value}', attributes: { cssProp: "font-color-tooltip" } }
      }
    }
  }
}
