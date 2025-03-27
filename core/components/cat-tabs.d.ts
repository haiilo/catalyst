import type { Components, JSX } from "../dist/types/components";

interface CatTabs extends Components.CatTabs, HTMLElement {}
export const CatTabs: {
    prototype: CatTabs;
    new (): CatTabs;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
