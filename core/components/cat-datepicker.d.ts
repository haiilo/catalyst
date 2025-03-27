import type { Components, JSX } from "../dist/types/components";

interface CatDatepicker extends Components.CatDatepicker, HTMLElement {}
export const CatDatepicker: {
    prototype: CatDatepicker;
    new (): CatDatepicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
