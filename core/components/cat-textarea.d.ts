import type { Components, JSX } from "../dist/types/components";

interface CatTextarea extends Components.CatTextarea, HTMLElement {}
export const CatTextarea: {
    prototype: CatTextarea;
    new (): CatTextarea;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
