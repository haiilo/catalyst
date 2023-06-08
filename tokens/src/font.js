module.exports = {
  font: {
    family: {
      head: { value: "{asset.font.lato.name.value}", attributes: { cssProp: "font-family-head" } },
      body: { value: "{asset.font.lato.name.value}", attributes: { cssProp: "font-family-body" } },
      mono: { value: "''", attributes: { cssProp: "font-family-mono" } },
      emoji: { value: "''", attributes: { cssProp: "font-family-emoji" } }
    },
    weight: {
      head: { value: 600, attributes: { cssProp: "font-weight-head" } },
      body: { value: 400, attributes: { cssProp: "font-weight-body" } },
      mono: { value: 400, attributes: { cssProp: "font-weight-mono" } }
    },
    decoration: {
      link: { value: "none", attributes: { cssProp: "link-decoration" } },
      linkHover: { value: "underline", attributes: { cssProp: "link-decoration-hover" } },
      linkButton: { value: "none", attributes: { cssProp: "link-button-decoration" } },
      linkButtonHover: { value: "none", attributes: { cssProp: "link-button-decoration-hover" } }
    }
  }
}
