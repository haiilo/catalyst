import type { Components, JSX } from "../dist/types/components";

interface CatDateInline extends Components.CatDateInline, HTMLElement {}
export const CatDateInline: {
    prototype: CatDateInline;
    new (): CatDateInline;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
