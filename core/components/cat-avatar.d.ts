import type { Components, JSX } from "../dist/types/components";

interface CatAvatar extends Components.CatAvatar, HTMLElement {}
export const CatAvatar: {
    prototype: CatAvatar;
    new (): CatAvatar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
