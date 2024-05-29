import log from 'loglevel';

export function delayedAssertWarn(component: unknown, assertion: () => boolean, message: string, timeout = 500): void {
  window.setTimeout(() => {
    if (!assertion()) {
      log.warn(message, component);
    }
  }, timeout);
}
