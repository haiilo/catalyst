import { FocusableElement, tabbable } from 'tabbable';

type Container = Element | FocusableElement | null;

const firstTabbable = (container?: Container): FocusableElement | undefined => {
  return (
    container
      ? tabbable(container, { includeContainer: true, getShadowRoot: true }).filter(
          element => !element.shadowRoot?.delegatesFocus
        )
      : []
  ).shift();
};

export default firstTabbable;
