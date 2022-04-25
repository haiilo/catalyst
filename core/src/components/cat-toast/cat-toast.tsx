import { Component, h } from '@stencil/core';
import { NotificationsService, ToastOptions } from '../../utils/notifications-service';

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
    const infoOptions: ToastOptions = {
      duration: 2000
    };
    const successOptions: ToastOptions = {
      duration: 2000
    };
    NotificationsService.error('Error Click');
    NotificationsService.info('Info Click', 'Info message', infoOptions);
    NotificationsService.success('Success Click', ' ', successOptions);

  }
}
