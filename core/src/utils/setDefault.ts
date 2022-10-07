export function setAttributeDefault<T extends { hostElement: HTMLElement }>(
  host: T,
  attr: string,
  value: unknown
): void {
  if (!host.hostElement.hasAttribute(attr) && value != null) {
    host.hostElement.setAttribute(attr, String(value));
  }
}

export function setPropertyDefault<T extends { hostElement: HTMLElement }>(host: T, prop: keyof T): void {
  setAttributeDefault(host, String(prop), host[prop]);
}
