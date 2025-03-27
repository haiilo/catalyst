import type { Components, JSX } from "../dist/types/components";

interface CatBadge extends Components.CatBadge, HTMLElement {}
export const CatBadge: {
    prototype: CatBadge;
    new (): CatBadge;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
