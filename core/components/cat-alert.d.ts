import type { Components, JSX } from "../dist/types/components";

interface CatAlert extends Components.CatAlert, HTMLElement {}
export const CatAlert: {
    prototype: CatAlert;
    new (): CatAlert;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
