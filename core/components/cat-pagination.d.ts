import type { Components, JSX } from "../dist/types/components";

interface CatPagination extends Components.CatPagination, HTMLElement {}
export const CatPagination: {
    prototype: CatPagination;
    new (): CatPagination;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
