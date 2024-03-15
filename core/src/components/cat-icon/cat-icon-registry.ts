import {
  ci16ChevronDoubleLeft,
  ci16ChevronDoubleRight,
  ci16ChevronLeft,
  ci16ChevronRight,
  ci16Cross,
  ciAlertCircleOutlined,
  ciCalendarOutlined,
  ciCheckCircleFilled,
  ciChevronDownOutlined,
  ciChevronLeftOutlined,
  ciChevronRightOutlined,
  ciClockFilled,
  ciCrossCircleFilled,
  ciCrossCircleOutlined,
  ciCrossOutlined,
  ciDangerFilled,
  ciEyeClosedOutlined,
  ciEyeOpenOutlined,
  ciInfoCircleFilled,
  ciStarCircleFilled
} from '@haiilo/catalyst-icons';
import log from 'loglevel';

export class CatIconRegistry {
  private static instance: CatIconRegistry;

  private readonly id = (Math.random() + 1).toString(36).substring(2);
  private readonly icons: Map<string, string> = new Map();

  private constructor() {
    // hide constructor

    // register default icons that are used in the framework by other components
    this.addIcons(
      {
        'alert-primary': ciStarCircleFilled.data,
        'alert-secondary': ciClockFilled.data,
        'alert-info': ciInfoCircleFilled.data,
        'alert-success': ciCheckCircleFilled.data,
        'alert-warning': ciDangerFilled.data,
        'alert-danger': ciCrossCircleFilled.data,
        'datepicker-month-prev': ci16ChevronLeft.data,
        'datepicker-month-next': ci16ChevronRight.data,
        'datepicker-year-prev': ci16ChevronDoubleLeft.data,
        'datepicker-year-next': ci16ChevronDoubleRight.data,
        'datepicker-calendar': ciCalendarOutlined.data,
        'dialog-close': ciCrossOutlined.data,
        'input-close': ciCrossCircleOutlined.data,
        'input-error': ciAlertCircleOutlined.data,
        'input-password-show': ciEyeOpenOutlined.data,
        'input-password-hide': ciEyeClosedOutlined.data,
        'notification-close': ciCrossCircleOutlined.data,
        'pagination-left': ciChevronLeftOutlined.data,
        'pagination-right': ciChevronRightOutlined.data,
        'select-clear': ci16Cross.data,
        'select-open': ciChevronDownOutlined.data
      },
      '$cat',
      true
    );

    // In rare cases, the registry can be initialized twice. This can happen in
    // a micro frontend architecture where the registry is initialized in the
    // host application and in the micro frontend. To prevent the registry in
    // one application from overwriting the registry in the other, we listen for
    // events that are dispatched when icons are added or removed in other
    // applications and add or remove icons if the event was not dispatched by
    // this registry.
    window.addEventListener('cat-icons-added', event => {
      const { detail } = (event as CustomEvent) || {};
      if (detail && detail.id !== this.id) {
        this.addIcons(detail.icons, detail.setName, true);
      }
    });
    window.addEventListener('cat-icons-removed', event => {
      const { detail } = (event as CustomEvent) || {};
      if (detail && detail.id !== this.id) {
        this.removeIcons(detail.names, detail.setName, true);
      }
    });
  }

  static getInstance(): CatIconRegistry {
    if (!CatIconRegistry.instance) {
      CatIconRegistry.instance = new CatIconRegistry();
    }
    return CatIconRegistry.instance;
  }

  getIcon(name: string, setName?: string): string | undefined {
    const icon = this.icons.get(this.buildName(name, setName));
    if (!icon) {
      log.error(`[CatIconRegistry::${this.id}] Unknown icon${setName ? ` in set ${setName}` : ''}: ${name}`);
    }
    return icon;
  }

  addIcons(icons: { [name: string]: string }, setName?: string, silent = false): CatIconRegistry {
    const iconEntries = Object.entries(icons);
    const iconSize = iconEntries.length;
    iconEntries.forEach(([name, data]) => this.icons.set(this.buildName(name, setName), data));
    log.info(
      `[CatIconRegistry::${this.id}] Added ${iconSize !== 1 ? 'icons' : 'icon'}${setName ? ` to set ${setName}` : ''}`
    );
    !silent && window.dispatchEvent(this.buildEvent('cat-icons-added', { id: this.id, icons, setName }));
    return this;
  }

  removeIcons(names: string[], setName?: string, silent = false): CatIconRegistry {
    const iconSize = names.length;
    names.forEach(name => this.icons.delete(this.buildName(name, setName)));
    log.info(
      `[CatIconRegistry::${this.id}] Removed ${iconSize !== 1 ? 'icons' : 'icon'}${
        setName ? ` from set ${setName}` : ''
      }`
    );
    !silent && window.dispatchEvent(this.buildEvent('cat-icons-removed', { id: this.id, names, setName }));
    return this;
  }

  private buildName(name: string, setName?: string) {
    return setName ? `${setName}:${name}` : name;
  }

  private buildEvent<T>(name: string, detail?: T) {
    return new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail
    });
  }
}

export const catIconRegistry = CatIconRegistry.getInstance();
