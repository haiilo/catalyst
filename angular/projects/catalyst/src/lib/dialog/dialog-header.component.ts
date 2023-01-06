import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, ViewEncapsulation } from '@angular/core';
import { CatI18nRegistry } from '@haiilo/catalyst';
import { CAT_I18N_REGISTRY_TOKEN } from '../catalyst.module';

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
  protected readonly closeTxt = this.i18n.t('dialog.close');
  protected readonly closeSvg =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.53 6.47a.75.75 0 0 0-1.06 1.06L10.94 12l-4.47 4.47a.75.75 0 1 0 1.06 1.06L12 13.06l4.47 4.47a.75.75 0 1 0 1.06-1.06L13.06 12l4.47-4.47a.75.75 0 0 0-1.06-1.06L12 10.94 7.53 6.47Z"/></svg>';

  constructor(@Inject(CAT_I18N_REGISTRY_TOKEN) private readonly i18n: CatI18nRegistry) {}

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
