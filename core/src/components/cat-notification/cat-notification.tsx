import Toastify, { Options } from 'toastify-js';

export enum TypeIcons {
  'success' = 'check-circle-filled',
  'error' = 'cross-circle-filled',
  'info' = 'danger-filled',
  'primary' = 'star-circle-filled',
  'secondary' = 'info-circle-filled'
}

export const ToastPositions: { [key: string]: { gravity: 'top' | 'bottom'; position: 'left' | 'center' | 'right' } } = {
  'top-left': {
    gravity: 'top',
    position: 'left'
  },
  'top-center': {
    gravity: 'top',
    position: 'center'
  },
  'top-right': {
    gravity: 'top',
    position: 'right'
  },
  'bottom-left': {
    gravity: 'bottom',
    position: 'left'
  },
  'bottom-center': {
    gravity: 'bottom',
    position: 'center'
  },
  'bottom-right': {
    gravity: 'bottom',
    position: 'right'
  }
};

export interface ToastPosition {
  gravity: 'top' | 'bottom';
  position: 'left' | 'center' | 'right';
}

export interface ToastOptions {
  /**
   * HTML content of the toast
   */
  content: Node;
  /**
   * Show close button
   */
  close: boolean;
  /**
   * Toast position
   */
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  /**
   *  Type of toast
   */
  type: 'success' | 'info' | 'error' | 'primary' | 'secondary';
  /**
   *  Invoked when the toast is clicked
   */
  onClick: () => void;
  /**
   * Toggle the default behavior of escaping HTML markup
   */
  escapeMarkup: boolean;
}

class CatNotificationService {
  private static DURATION = 80000;

  toastHTMLTemplate(title: string, message = ' ', options?: Partial<ToastOptions>): HTMLElement {
    const template = document.createElement('template');
    const typeIcon = options?.type ? TypeIcons[options.type] : TypeIcons.secondary;
    title = title.trim();
    message = message.trim();
    const hasMessage = message && message !== '';
    const hasMessageClass = hasMessage ? 'has-message' : '';
    template.innerHTML = `<div class="cat-toastify-wrapper">
        <div class="cat-toastify-icon-wrapper ${options?.type ?? 'secondary'}">
             <cat-icon icon="${typeIcon}"></cat-icon>
        </div>
        <div class="cat-toastify-title-wrapper ${hasMessageClass}">
            <div class="cat-toastify-title">${title}</div></div>
        ${hasMessage ? `<div class="cat-toastify-message">${message}</div>` : ''}
      </div>`;
    return template.content.firstChild as HTMLElement;
  }

  error(title: string, message = ' ', options?: Partial<ToastOptions>): void {
    const toastOptions: Options = this.extractOptions(title, message, options);
    Toastify(toastOptions).showToast();
  }

  success(title: string, message = ' ', options?: Partial<ToastOptions>): void {
    const toastOptions: Options = this.extractOptions(title, message, options);
    Toastify(toastOptions).showToast();
  }

  info(title: string, message = ' ', options?: Partial<ToastOptions>): void {
    const toastOptions: Options = this.extractOptions(title, message, options);
    Toastify(toastOptions).showToast();
  }

  primary(title: string, message = ' ', options?: Partial<ToastOptions>): void {
    const toastOptions: Options = this.extractOptions(title, message, options);
    Toastify(toastOptions).showToast();
  }

  secondary(title: string, message = ' ', options?: Partial<ToastOptions>): void {
    const toastOptions: Options = this.extractOptions(title, message, options);
    Toastify(toastOptions).showToast();
  }

  private getPosition(options?: Partial<ToastOptions>): ToastPosition {
    const position: ToastPosition = {
      gravity: 'bottom',
      position: 'left'
    };
    if (options?.position && ToastPositions[options.position]) {
      position.position = ToastPositions[options.position].position;
      position.gravity = ToastPositions[options.position].gravity;
    }
    return position;
  }

  private extractOptions(title: string, message = ' ', options?: Partial<ToastOptions>): Options {
    const position: ToastPosition = this.getPosition(options);
    return {
      node: options?.content ? options.content : this.toastHTMLTemplate(title, message, options),
      duration: CatNotificationService.DURATION,
      close: true,
      className: 'cat-toastify',
      gravity: position.gravity,
      position: position.position,
      stopOnFocus: true,
      offset: {
        x: '1.5rem',
        y: '1.5rem'
      }
    };
  }
}

export const NotificationsService = new CatNotificationService();
