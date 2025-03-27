import type { Components, JSX } from "../dist/types/components";

interface CatToggle extends Components.CatToggle, HTMLElement {}
export const CatToggle: {
    prototype: CatToggle;
    new (): CatToggle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
