import type { Components, JSX } from "../dist/types/components";

interface CatDate extends Components.CatDate, HTMLElement {}
export const CatDate: {
    prototype: CatDate;
    new (): CatDate;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
