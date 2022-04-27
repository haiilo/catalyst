import Toastify, { Offset } from 'toastify-js'

export enum TypeIcons {
  'success' = 'check-circle-filled',
  'error' = 'sparkle-filled',
  'info' = 'sparkle-filled'
}

export interface ToastOptions {
  text?: string | undefined;
  node?: Node | undefined;
  duration?: number | undefined;
  selector?: string | Node | undefined;
  /**
   * Add link to toast
   */
  destination?: string | undefined;
  /**
   * Open link in new window
   */
  newWindow?: boolean | undefined;
  /**
   * Show close button
   */
  close?: boolean | undefined;
  /**
   * Push direction for toast
   */
  gravity?: 'top' | 'bottom' | undefined;
  /**
   * Toast position
   */
  position?: 'left' | 'center' | 'right' | undefined;
  className?: string | undefined;
  stopOnFocus?: boolean | undefined;
  type?: 'success' | 'info' | 'error' | undefined;
  /**
   * Invoked when the toast is dismissed
   */
  callback?: (() => void) | undefined;
  onClick?: (() => void) | undefined;
  offset?: Offset | undefined;
  /**
   * Toggle the default behavior of escaping HTML markup
   */
  escapeMarkup?: boolean | undefined;
  /**
   * HTML DOM Style properties to add any style directly to toast
   */
  style?: { [cssRule: string]: string };
  /**
   * Set the order in which toasts are stacked in page
   */
  oldestFirst?: boolean | undefined;
}

class NotificationsWrapper {
  toastHTMLTemplate(title: string, message = ' ', options?: ToastOptions): HTMLElement {
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

  error(title: string, message = ' ', options?: ToastOptions): void {
    options = {
      ...{
        node: this.toastHTMLTemplate(title, message, options),
        duration: 300000,
        close: true,
        className: 'cat-toastify',
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
      }, ...options
    };
    Toastify(options).showToast();
  }

  success(title: string, message = ' ', options?: ToastOptions): void {
    options = {
      ...{
        node: this.toastHTMLTemplate(title, message, options),
        duration: 3000000,
        close: true,
        className: 'cat-toastify',
        gravity: "bottom",
        position: "right",
        stopOnFocus: true
      }, ...options
    };
    Toastify(options).showToast();
  }

  info(title: string, message = ' ', options?: ToastOptions): void {
    options = {
      ...{
        node: this.toastHTMLTemplate(title, message, options),
        duration: 3000000,
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

export const NotificationsService = new NotificationsWrapper();
