import { DialogRef } from '@angular/cdk/dialog';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CatDialogHeaderComponent } from './dialog-header.component';

/**
 * A modal dialog.
 */
@Component({
  selector: 'cat-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'cat-dialog'
  }
})
export class CatDialogComponent implements AfterContentInit {
  /**
   * Flag to disable scrolling behavior of dialog content. Default is false. If set to true the
   * using component is responsible for not overflowing the viewport.
   */
  @Input() noScroll = false;

  /**
   * Flag to disable/enable overscroll behavior.
   */
  @Input() noOverscroll = false;

  /**
   * Flag to not fire an initial scroll event after content initialization.
   */
  @Input() noScrolledInit = false;

  /**
   * Buffer to be used to calculate the content scroll distance.
   */
  @Input() scrolledBuffer = 0;

  /**
   * Emitted when the dialog content is fully scrolled to the bottom.
   */
  @Output() scrolledBottom = new EventEmitter<void>();

  @ContentChild(CatDialogHeaderComponent)
  private header?: CatDialogHeaderComponent;

  constructor(private readonly dialogRef: DialogRef) {}

  ngAfterContentInit(): void {
    this.header?.close.subscribe(() => this.dialogRef.close());
  }
}
