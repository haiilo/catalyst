import type { Components, JSX } from "../dist/types/components";

interface CatTime extends Components.CatTime, HTMLElement {}
export const CatTime: {
    prototype: CatTime;
    new (): CatTime;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
