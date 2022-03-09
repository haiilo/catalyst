module.exports = {
  font: {
    family: {
      head: { value: "{asset.font.dmSans.name.value}", attributes: { cssProp: "font-family-head" } },
      body: { value: "{asset.font.lato.name.value}", attributes: { cssProp: "font-family-body" } },
      mono: { value: "{asset.font.azeretMono.name.value}", attributes: { cssProp: "font-family-mono" } }
    },
    weight: {
      head: { value: 500, attributes: { cssProp: "font-weight-head" } },
      body: { value: 400, attributes: { cssProp: "font-weight-body" } },
      mono: { value: 400, attributes: { cssProp: "font-weight-mono" } }
    }
  }
}
