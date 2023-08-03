/**
 * Find the closest parent element matching the given selector while traversing
 * up the DOM tree (including Shadow DOM).
 */
export function findClosest(selector: string, element: Element | ShadowRoot): Element | null {
  if (element instanceof Element && element.matches(selector)) {
    return element;
  }

  // Search in parent element or Shadow DOM host
  const nextElement =
    element instanceof ShadowRoot ? element.host : element.parentElement || (element.getRootNode() as ShadowRoot).host;
  return nextElement ? findClosest(selector, nextElement) : null;
}
