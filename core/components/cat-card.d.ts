import type { Components, JSX } from "../dist/types/components";

interface CatCard extends Components.CatCard, HTMLElement {}
export const CatCard: {
    prototype: CatCard;
    new (): CatCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
