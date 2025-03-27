import type { Components, JSX } from "../dist/types/components";

interface CatSelect extends Components.CatSelect, HTMLElement {}
export const CatSelect: {
    prototype: CatSelect;
    new (): CatSelect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
