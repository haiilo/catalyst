import type { Components, JSX } from "../dist/types/components";

interface CatSelectDemo extends Components.CatSelectDemo, HTMLElement {}
export const CatSelectDemo: {
    prototype: CatSelectDemo;
    new (): CatSelectDemo;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
