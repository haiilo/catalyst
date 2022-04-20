import { Component, h, Prop } from '@stencil/core';
import { GlobalNotifications } from '../../utils/notifications';

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
  /**
   * Type of toast
   */
  @Prop() type: 'success' | 'warning' | 'info' | 'tip' | 'alert' = 'success';

  render() {
    return (
      <button onClick={this.onClick.bind(this)}>
        show toast
      </button>
    );
  }

  private onClick() {
    GlobalNotifications.notifier.success('Success Click');
    GlobalNotifications.notifier.warning('Warning Click');
  }
}
