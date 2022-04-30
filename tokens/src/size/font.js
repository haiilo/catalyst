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
        l: { value: 1.125 },
        m: { value: 0.9375 },
        s: { value: 0.875 },
        xs: { value: 0.75 }
      },
      mono: {
        xl: { value: 1.125 },
        l: { value: 0.9375 },
        m: { value: 0.875 },
        s: { value: 0.75 },
        xs: { value: 0.625 }
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
        l: { value: 1.5 },
        m: { value: 1.25 },
        s: { value: 1 },
        xs: { value: 1 }
      },
      mono: {
        xl: { value: '{size.line.body.xl.value}' },
        l: { value: '{size.line.body.l.value}' },
        m: { value: '{size.line.body.m.value}' },
        s: { value: '{size.line.body.s.value}' },
        xs: { value: '{size.line.body.xs.value}' }
      }
    }
  }
}
