import type { Components, JSX } from "../dist/types/components";

interface CatScrollable extends Components.CatScrollable, HTMLElement {}
export const CatScrollable: {
    prototype: CatScrollable;
    new (): CatScrollable;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
