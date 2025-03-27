import type { Components, JSX } from "../dist/types/components";

interface CatCheckbox extends Components.CatCheckbox, HTMLElement {}
export const CatCheckbox: {
    prototype: CatCheckbox;
    new (): CatCheckbox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
