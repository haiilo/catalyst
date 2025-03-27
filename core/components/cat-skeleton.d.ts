import type { Components, JSX } from "../dist/types/components";

interface CatSkeleton extends Components.CatSkeleton, HTMLElement {}
export const CatSkeleton: {
    prototype: CatSkeleton;
    new (): CatSkeleton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
