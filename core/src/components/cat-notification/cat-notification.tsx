import Toastify from 'toastify-js'

export enum TypeIcons {
  'success' = 'check-circle-filled',
  'error' = 'sparkle-filled',
  'info' = 'sparkle-filled'
}

interface Offset {
  x: number | string;
  y: number | string;
}

export interface ToastOptions {
  /**
   * HTML content of the toast
   */
  node: Node;
  /**
   * Duration of the toast
   */
  duration: number;
  /**
   * CSS Selector or Element Node on which the toast should be added
   */
  selector: string | Node;
  /**
   * URL to which the browser should be navigated on click of the toast
   */
  destination: string;
  /**
   * Open link in new window
   */
  newWindow: boolean;
  /**
   * Show close button
   */
  close: boolean;
  /**
   * Push direction for toast
   */
  gravity: 'top' | 'bottom';
  /**
   * Toast position
   */
  position: 'left' | 'center' | 'right';
  /**
   *  Provide custom class name for further customization
   */
  className: string;
  /**
   *  Stop timer when hovered over the toast
   */
  stopOnFocus: boolean;
  /**
   *  Type of toast
   */
  type: 'success' | 'info' | 'error';
  /**
   * Invoked when the toast is dismissed
   */
  callback: (() => void);
  /**
   *  Invoked when the toast is clicked
   */
  onClick: (() => void);
  /**
   *  Add some offset to axis
   */
  offset: Offset;
  /**
   * Toggle the default behavior of escaping HTML markup
   */
  escapeMarkup: boolean;
  /**
   * HTML DOM Style properties to add any style directly to toast
   */
  style: { [cssRule: string]: string };
  /**
   * Set the order in which toasts are stacked in page
   */
  oldestFirst: boolean;
}

class CatNotificationService {
  private static DURATION = 8000;

  toastHTMLTemplate(title: string, message = ' ', options?: Partial<ToastOptions>): HTMLElement {
    const template = document.createElement('template');
    const typeIcon = options?.type ? TypeIcons[options.type] : TypeIcons.info;
    title = title.trim();
    message = message.trim();
    const hasMessage = message && message !== '';
    const hasMessageClass = hasMessage ? 'has-message' : '';
    template.innerHTML = `<div class="cat-toastify-wrapper">
        <div class="cat-toastify-icon-wrapper ${options?.type ?? 'info'}">
             <cat-icon icon="${typeIcon}"></cat-icon>
        </div>
        <div class="cat-toastify-title-wrapper ${hasMessageClass}">
            <div class="cat-toastify-title">${title}</div></div>
        ${hasMessage ? `<div class="cat-toastify-message">${message}</div>` : ''}
      </div>`;
    return template.content.firstChild as HTMLElement;
  }

  error(title: string, message = ' ', options?: Partial<ToastOptions>): void {
    options = {
      ...{
        node: this.toastHTMLTemplate(title, message, options),
        duration: CatNotificationService.DURATION,
        close: true,
        className: 'cat-toastify',
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
      }, ...options
    };
    Toastify(options).showToast();
  }

  success(title: string, message = ' ', options?: Partial<ToastOptions>): void {
    options = {
      ...{
        node: this.toastHTMLTemplate(title, message, options),
        duration: CatNotificationService.DURATION,
        close: true,
        className: 'cat-toastify',
        gravity: "bottom",
        position: "right",
        stopOnFocus: true
      }, ...options
    };
    Toastify(options).showToast();
  }

  info(title: string, message = ' ', options?: Partial<ToastOptions>): void {
    options = {
      ...{
        node: this.toastHTMLTemplate(title, message, options),
        duration: CatNotificationService.DURATION,
        close: true,
        className: 'cat-toastify',
        gravity: "bottom",
        position: "right",
        stopOnFocus: true
      }, ...options
    };
    Toastify(options).showToast();
  }
}

export const NotificationsService = new CatNotificationService();
