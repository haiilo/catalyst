import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * The bottom actions of a dialog.
 */
@Component({
  selector: 'cat-dialog-actions',
  template: '<ng-content></ng-content>',
  styleUrls: ['./dialog-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'cat-dialog-actions',
    '[class.cat-dialog-actions-center]': 'align === "center"',
    '[class.cat-dialog-actions-end]': 'align === "end"'
  }
})
export class CatDialogActionsComponent {
  /**
   * Horizontal alignment of action buttons.
   */
  @Input() align: 'start' | 'center' | 'end' = 'end';
}
