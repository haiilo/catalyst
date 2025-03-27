import type { Components, JSX } from "../dist/types/components";

interface CatTooltip extends Components.CatTooltip, HTMLElement {}
export const CatTooltip: {
    prototype: CatTooltip;
    new (): CatTooltip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
