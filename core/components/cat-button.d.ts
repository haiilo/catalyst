import type { Components, JSX } from "../dist/types/components";

interface CatButton extends Components.CatButton, HTMLElement {}
export const CatButton: {
    prototype: CatButton;
    new (): CatButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
