import cross16 from '@haiilo/catalyst-icons/tmp/assets/16-cross.svg';
import alertCircleOutlined from '@haiilo/catalyst-icons/tmp/assets/alert-circle-outlined.svg';
import checkCircleFilled from '@haiilo/catalyst-icons/tmp/assets/check-circle-filled.svg';
import chevronDownOutlined from '@haiilo/catalyst-icons/tmp/assets/chevron-down-outlined.svg';
import chevronLeftOutlined from '@haiilo/catalyst-icons/tmp/assets/chevron-left-outlined.svg';
import chevronRightOutlined from '@haiilo/catalyst-icons/tmp/assets/chevron-right-outlined.svg';
import clockFilled from '@haiilo/catalyst-icons/tmp/assets/clock-filled.svg';
import crossCircleFilled from '@haiilo/catalyst-icons/tmp/assets/cross-circle-filled.svg';
import crossCircleOutlined from '@haiilo/catalyst-icons/tmp/assets/cross-circle-outlined.svg';
import crossOutlined from '@haiilo/catalyst-icons/tmp/assets/cross-outlined.svg';
import dangerFilled from '@haiilo/catalyst-icons/tmp/assets/danger-filled.svg';
import starCircleFilled from '@haiilo/catalyst-icons/tmp/assets/star-circle-filled.svg';
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
        'alert-danger': crossCircleFilled,
        'alert-primary': starCircleFilled,
        'alert-secondary': clockFilled,
        'alert-success': checkCircleFilled,
        'alert-warning': dangerFilled,
        'dialog-close': crossOutlined,
        'input-close': crossCircleOutlined,
        'input-error': alertCircleOutlined,
        'notification-close': crossCircleOutlined,
        'pagination-left': chevronLeftOutlined,
        'pagination-right': chevronRightOutlined,
        'select-clear': cross16,
        'select-open': chevronDownOutlined
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
      log.error(`[CatIconRegistry] Unknown icon${setName ? ` in set ${setName}` : ''}: ${name}`);
    }
    return icon;
  }

  addIcons(icons: { [name: string]: string }, setName?: string, silent = false): CatIconRegistry {
    const iconEntries = Object.entries(icons);
    const iconSize = iconEntries.length;
    iconEntries.forEach(([name, data]) => this.icons.set(this.buildName(name, setName), data));
    log.info(`[CatIconRegistry] Added ${iconSize !== 1 ? 'icons' : 'icon'}${setName ? ` to set ${setName}` : ''}`);
    !silent && window.dispatchEvent(this.buildEvent('cat-icons-added', { id: this.id, icons, setName }));
    return this;
  }

  removeIcons(names: string[], setName?: string, silent = false): CatIconRegistry {
    const iconSize = names.length;
    names.forEach(name => this.icons.delete(this.buildName(name, setName)));
    log.info(`[CatIconRegistry] Removed ${iconSize !== 1 ? 'icons' : 'icon'}${setName ? ` from set ${setName}` : ''}`);
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
