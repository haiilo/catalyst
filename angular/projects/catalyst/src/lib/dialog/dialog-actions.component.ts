import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * The bottom actions of a dialog.
 */
@Component({
  selector: 'cat-dialog-actions',
  template: '<ng-content></ng-content>',
  styleUrls: ['./dialog-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'cat-dialog-actions',
    '[class.cat-dialog-actions-center]': 'align === "center"',
    '[class.cat-dialog-actions-end]': 'align === "end"',
    '[class.cat-dialog-actions-space-between]': 'align === "space-between"'
  }
})
export class CatDialogActionsComponent {
  /**
   * Horizontal alignment of action buttons.
   */
  @Input() align: 'start' | 'center' | 'end' | 'space-between' = 'end';
}
