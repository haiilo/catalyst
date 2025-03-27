import type { Components, JSX } from "../dist/types/components";

interface CatRadio extends Components.CatRadio, HTMLElement {}
export const CatRadio: {
    prototype: CatRadio;
    new (): CatRadio;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
