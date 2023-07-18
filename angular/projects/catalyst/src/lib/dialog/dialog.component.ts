import { DialogRef } from '@angular/cdk/dialog';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ViewChild, ViewEncapsulation } from '@angular/core';
import { CatDialogHeaderComponent } from './dialog-header.component';
import { CdkTrapFocus } from '@angular/cdk/a11y';

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
    class: 'cat-dialog-inner'
  }
})
export class CatDialogComponent implements AfterContentInit, AfterViewInit {
  @ContentChild(CatDialogHeaderComponent)
  private header?: CatDialogHeaderComponent;
  @ViewChild(CdkTrapFocus) 
  private cdkTrapFocus!: CdkTrapFocus;
  
  constructor(private readonly dialogRef: DialogRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {        
      this.cdkTrapFocus.focusTrap.focusFirstTabbableElement();
    });
  }

  ngAfterContentInit(): void {
    this.header?.close.subscribe(() => this.dialogRef.close());
  }
}
