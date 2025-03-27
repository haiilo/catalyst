import type { Components, JSX } from "../dist/types/components";

interface CatTab extends Components.CatTab, HTMLElement {}
export const CatTab: {
    prototype: CatTab;
    new (): CatTab;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
