import {FocusableElement, tabbable} from "tabbable";

type Container = Element | FocusableElement | null;

const firstTabbable = (container?: Container): FocusableElement | undefined => {
  return (container ? tabbable(container, { includeContainer: true, getShadowRoot: true }) : []).shift();
}

export default firstTabbable;
