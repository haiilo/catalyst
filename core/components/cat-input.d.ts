import type { Components, JSX } from "../dist/types/components";

interface CatInput extends Components.CatInput, HTMLElement {}
export const CatInput: {
    prototype: CatInput;
    new (): CatInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
