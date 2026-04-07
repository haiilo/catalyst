/**
 * Detail payload for the `cat-icon-request` custom event.
 *
 * `cat-icon` dispatches this event (bubbling, composed, cancelable) to let an
 * ancestor CatIconRegistry instance resolve the SVG for the requested icon name.
 * The provider calls `resolve(svg)` synchronously and calls `preventDefault()`
 * to signal that the request was handled.  If no provider cancels the event,
 * `cat-icon` falls back to the global `catIconRegistry`.
 */
export interface CatIconRequestDetail {
  /** The icon name as passed to the `icon` prop of `cat-icon`. */
  readonly name: string;
  /** Called by the nearest CatIconRegistry instance with the resolved SVG string. */
  resolve(svg: string): void;
}
