import { Component, h } from '@stencil/core';
import { NotificationsService, ToastOptions } from '../cat-notification/cat-notification';

/**
 * Toast Component
 *
 * @part toast - The content of the toast.
 */
@Component({
  tag: 'cat-toast',
  styleUrl: 'cat-toast.scss'
})
export class CatToast {
  render() {
    return (
      <button onClick={this.onClick.bind(this)}>
        show toast
      </button>
    );
  }

  private onClick() {
    const infoOptions: Partial<ToastOptions> = {
      duration: 200000,
      gravity: "top",
    };
    const errorOptions: Partial<ToastOptions> = {
      duration: 200000,
      gravity: "bottom",
      type: 'error'
    };
    const errorOptions2: Partial<ToastOptions> = {
      duration: 200000,
      gravity: "bottom",
      position: 'left',
      type: 'error'
    };
    const successOptions3: Partial<ToastOptions> = {
      duration: 200000,
      gravity: "top",
      position: 'left',
      type: 'success'
    };
    NotificationsService.error('Default Click');
    NotificationsService.error('Long default title, long default title, long default title, long default title');
    NotificationsService.info('Info Click', 'Info message', infoOptions);
    NotificationsService.success('Error Title', ' ', errorOptions);
    NotificationsService.success('Error 2 Title', 'Very long message, Very long message, Very long message, Very long message, Very long message, Very long message, Very long message, Very long message, Very long message, Very long message,Very long message, Very long message, Very long message, Very long message, Very long message, ', errorOptions2);
    NotificationsService.success('Success Title - very long title without message', ' ', successOptions3);
  }
}
