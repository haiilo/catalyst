import { DialogRef } from '@angular/cdk/dialog';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ViewEncapsulation } from '@angular/core';
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
    class: 'cat-dialog-inner',
  }
})
export class CatDialogComponent implements AfterContentInit {
  @ContentChild(CatDialogHeaderComponent)
  private header?: CatDialogHeaderComponent;

  constructor(private readonly dialogRef: DialogRef) {}

  ngAfterContentInit(): void {
    this.header?.close.subscribe(() => this.dialogRef.close());
  }
}
