import type { Components, JSX } from "../dist/types/components";

interface CatSpinner extends Components.CatSpinner, HTMLElement {}
export const CatSpinner: {
    prototype: CatSpinner;
    new (): CatSpinner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
