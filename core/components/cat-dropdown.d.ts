import type { Components, JSX } from "../dist/types/components";

interface CatDropdown extends Components.CatDropdown, HTMLElement {}
export const CatDropdown: {
    prototype: CatDropdown;
    new (): CatDropdown;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
