import type { Components, JSX } from "../dist/types/components";

interface CatFormGroup extends Components.CatFormGroup, HTMLElement {}
export const CatFormGroup: {
    prototype: CatFormGroup;
    new (): CatFormGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
