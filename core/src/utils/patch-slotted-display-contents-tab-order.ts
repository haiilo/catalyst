import { tabbable } from 'tabbable';
import { deepActiveElement } from './deep-active-element';

/**
 * Works around a Firefox specific bug where sequential (Tab-key) focus navigation gets stuck and
 * cannot move forward once focus lands on a focusable element that is reached through an element
 * with `display: contents` which is itself assigned to another shadow root's named `<slot>` (e.g.
 * a `display: contents` component such as `cat-tooltip` or `cat-avatar` placed inside
 * `slot="trigger"` of `cat-dropdown`, `cat-menu`, etc.). Shift+Tab (backward navigation) is not
 * affected, and neither are components that aren't slotted into another shadow root. Chromium and
 * WebKit-based browsers are not affected either.
 *
 * The workaround listens for the Tab key on the given host element and, if focus did not
 * actually move on the next animation frame (i.e. the browser failed to advance focus), it
 * manually computes and focuses the next tabbable element in the document.
 *
 * This so far is reproducible only in Firefox: computing the document-wide tabbable list (which is what makes
 * this workaround possible) is a comparatively expensive operation, and it is not needed at all in
 * browsers where the native Tab order already works correctly.
 *
 * @param hostElement the host element of the `display: contents` component to patch.
 * @returns a cleanup function that removes the workaround listener.
 */
const patchSlottedDisplayContentsTabOrder = (hostElement: HTMLElement): (() => void) => {
  const handler = (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || event.shiftKey || event.defaultPrevented) {
      return;
    }
    if (!event.composedPath().includes(hostElement)) {
      return;
    }
    const before = deepActiveElement();
    requestAnimationFrame(() => {
      if (deepActiveElement() !== before) {
        return; // focus already moved, nothing to do
      }
      const candidates = tabbable(document.body, { getShadowRoot: true }).filter(
        element => !element.shadowRoot?.delegatesFocus
      );
      const index = before instanceof HTMLElement ? candidates.indexOf(before) : -1;
      if (index >= 0 && index + 1 < candidates.length) {
        candidates[index + 1].focus();
      }
    });
  };

  hostElement.addEventListener('keydown', handler);
  return () => hostElement.removeEventListener('keydown', handler);
};

export default patchSlottedDisplayContentsTabOrder;
