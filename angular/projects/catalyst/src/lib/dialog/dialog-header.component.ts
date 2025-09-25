import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CatI18nRegistry } from '@haiilo/catalyst';
import { CAT_I18N_REGISTRY_TOKEN } from '../injection-token';

/**
 * The header of a dialog.
 */
@Component({
  selector: 'cat-dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'cat-dialog-header'
  }
})
export class CatDialogHeaderComponent {
  protected readonly closeTxt: string;

  constructor(@Inject(CAT_I18N_REGISTRY_TOKEN) readonly i18n: CatI18nRegistry) {
    this.closeTxt = i18n.t('dialog.close');
  }

  /**
   * The title of the dialog.
   */
  @Input() headline?: string;

  /**
   * The subtitle of the dialog.
   */
  @Input() subline?: string;

  /**
   * Whether the dialog can be closed via a close button.
   */
  @Input() closable: boolean = true;

  /**
   * Emits when the close button is clicked.
   */
  @Output() close: EventEmitter<void> = new EventEmitter();
}
