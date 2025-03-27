import type { Components, JSX } from "../dist/types/components";

interface CatRadioGroup extends Components.CatRadioGroup, HTMLElement {}
export const CatRadioGroup: {
    prototype: CatRadioGroup;
    new (): CatRadioGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
