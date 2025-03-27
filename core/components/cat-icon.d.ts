import type { Components, JSX } from "../dist/types/components";

interface CatIcon extends Components.CatIcon, HTMLElement {}
export const CatIcon: {
    prototype: CatIcon;
    new (): CatIcon;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
