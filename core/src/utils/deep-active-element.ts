/**
 * Returns the actual focused element by walking down through nested shadow roots, since
 * `document.activeElement` only ever returns the top-level shadow host, not the real focused
 * leaf element inside its shadow tree(s).
 */
export function deepActiveElement(): Element | null {
  let element = document.activeElement;
  while (element?.shadowRoot?.activeElement) {
    element = element.shadowRoot.activeElement;
  }
  return element;
}
