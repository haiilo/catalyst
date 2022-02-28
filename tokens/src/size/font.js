module.exports = {
  size: {
    font: {
      head: {
        1: { value: 1.75 },
        2: { value: 1.5 },
        3: { value: 1.25 },
        4: { value: 1.125 },
        5: { value: 0.9375 },
        6: { value: 0.875 }
      },
      body: {
        xl: { value: 1.25 },
        lg: { value: 1.125 },
        md: { value: 0.9375 },
        sm: { value: 0.875 },
        xs: { value: 0.75 },
      },
      mono: {
        xl: { value: '{size.font.body.xl.value}' },
        lg: { value: '{size.font.body.lg.value}' },
        md: { value: '{size.font.body.md.value}' },
        sm: { value: '{size.font.body.sm.value}' },
        xs: { value: '{size.font.body.xs.value}' },
      }
    },
    line: {
      head: {
        1: { value: 2 },
        2: { value: 1.75 },
        3: { value: 1.5 },
        4: { value: 1.5 },
        5: { value: 1.25 },
        6: { value: 1 }
      },
      body: {
        xl: { value: 1.5 },
        lg: { value: 1.5 },
        md: { value: 1.25 },
        sm: { value: 1 },
        xs: { value: 1 },
      },
      mono: {
        xl: { value: '{size.line.body.xl.value}' },
        lg: { value: '{size.line.body.lg.value}' },
        md: { value: '{size.line.body.md.value}' },
        sm: { value: '{size.line.body.sm.value}' },
        xs: { value: '{size.line.body.xs.value}' },
      }
    }
  }
}
