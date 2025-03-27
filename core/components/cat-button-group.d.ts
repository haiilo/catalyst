import type { Components, JSX } from "../dist/types/components";

interface CatButtonGroup extends Components.CatButtonGroup, HTMLElement {}
export const CatButtonGroup: {
    prototype: CatButtonGroup;
    new (): CatButtonGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
