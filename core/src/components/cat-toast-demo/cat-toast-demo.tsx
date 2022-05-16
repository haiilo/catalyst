import { Component, h } from '@stencil/core';
import { NotificationsService, ToastOptions } from '../cat-notification/cat-notification';

/**
 * Toast Component Demo
 *
 * @part toast - The content of the toast.
 */
@Component({
  tag: 'cat-toast-demo',
  styleUrl: 'cat-toast-demo.scss'
})
export class CatToastDemo {
  render() {
    return <cat-button onClick={this.onClick.bind(this)}>Show Notifications</cat-button>;
  }

  private onClick() {
    const infoOptions: Partial<ToastOptions> = {
      position: 'top-left'
    };
    const errorOptions: Partial<ToastOptions> = {
      position: 'top-center',
      type: 'error'
    };
    const errorOptions2: Partial<ToastOptions> = {
      position: 'bottom-left',
      type: 'error'
    };
    const successOptions3: Partial<ToastOptions> = {
      position: 'bottom-right',
      type: 'success'
    };
    const template = document.createElement('template');
    template.innerHTML = `<div style="padding: 7px 30px 7px 10px">Custom HTML Node Content</div>`;
    const successOptions4: Partial<ToastOptions> = {
      position: 'bottom-right',
      type: 'success',
      content: template.content.firstChild as HTMLElement
    };

    NotificationsService.error('Default Click');
    NotificationsService.error('Long default title, long default title, long default title, long default title');
    NotificationsService.info('Info Click', 'Info message', infoOptions);
    NotificationsService.success('', ' ', successOptions4);
    NotificationsService.error('Error Title', ' ', errorOptions);
    NotificationsService.error(
      'Error 2 Title',
      'Very long message, Very long message, Very long message, Very long message, Very long message, Very long message, Very long message, Very long message, Very long message, Very long message,Very long message, Very long message, Very long message, Very long message, Very long message, ',
      errorOptions2
    );
    NotificationsService.success('Success Title - very long title without message', ' ', successOptions3);
  }
}
