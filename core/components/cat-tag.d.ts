import type { Components, JSX } from "../dist/types/components";

interface CatTag extends Components.CatTag, HTMLElement {}
export const CatTag: {
    prototype: CatTag;
    new (): CatTag;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
