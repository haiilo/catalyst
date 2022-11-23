export function setAttributeDefault<T extends { hostElement: HTMLElement }>(
  host: T,
  attr: string,
  value: unknown
): void {
  if (!host.hostElement.hasAttribute(attr) && value != null) {
    host.hostElement.setAttribute(attr, String(value));
  }
}

export function setAttribute<T extends { hostElement: HTMLElement }>(host: T, attr: string, value: unknown): void {
  host.hostElement.setAttribute(attr, String(value));
}
