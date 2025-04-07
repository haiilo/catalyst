const focusableSelectors = [
  'input',
  'select',
  'textarea',
  'button',
  'a[href]',
  '[tabindex]',
  'iframe',
  '[contenteditable]',
  'audio[controls]',
  'video[controls]'
];

const findFirstTabbableIncludeHidden = (element: HTMLElement | ShadowRoot): HTMLElement | undefined => {
  if (element instanceof HTMLElement) {
    const potentiallyTabbableElement = getPotentiallyTabbable(element);
    if (potentiallyTabbableElement) {
      return potentiallyTabbableElement;
    }
  }

  const children = Array.from(element.querySelectorAll<HTMLElement>('*'));
  for (const child of children) {
    const potentiallyTabbableElement = getPotentiallyTabbable(child);

    if (potentiallyTabbableElement) {
      return potentiallyTabbableElement;
    }
  }
  return undefined;
};

function couldBeTabbable(value: HTMLElement) {
  if (!value.matches(focusableSelectors.join(','))) {
    return false;
  }

  const tabindex = value.getAttribute('tabindex');
  return tabindex === null || Number(tabindex) >= 0;
}

function getPotentiallyTabbable(element: HTMLElement) {
  if (couldBeTabbable(element)) {
    return element;
  }
  if (element.shadowRoot) {
    const shadowTabbable = findFirstTabbableIncludeHidden(element.shadowRoot);
    if (shadowTabbable) {
      return shadowTabbable;
    }
  }
  return undefined;
}

export default findFirstTabbableIncludeHidden;
