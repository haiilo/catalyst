if (!globalThis.ResizeObserver) {
  (globalThis as any).ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (!globalThis.MutationObserver) {
  (globalThis as any).MutationObserver = class MutationObserver {
    constructor(_callback: MutationCallback) {}
    observe() {}
    disconnect() {}
    takeRecords(): MutationRecord[] { return []; }
  };
}
