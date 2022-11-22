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

export function setAttribute<T extends { hostElement: HTMLElement }>(
  host: T,
  attr: string,
  value: unknown
): void {
  host.hostElement.setAttribute(attr, String(value));
}

export function setProperty<T extends { hostElement: HTMLElement }>(host: T, prop: keyof T): void {
  setAttribute(host, String(prop), host[prop]);
}
