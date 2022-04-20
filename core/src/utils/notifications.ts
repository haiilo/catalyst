import AWN from "awesome-notifications"

const globalOptions = {
  icons: {
    enabled: true,
    prefix: "<cat-icon icon='",
    info: "check-circle-outlined",
    tip: "check-circle-outlined",
    success: "check-circle-outlined",
    warning: "check-circle-outlined",
    alert: "check-circle-outlined",
    suffix: "'></cat-icon>"
  }
}

export class GlobalNotifications {
  static notifier: AWN = new AWN(globalOptions as any);
}
