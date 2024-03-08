import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatDialogActionsComponent } from './dialog-actions.component';
import { CatDialogHeaderComponent } from './dialog-header.component';
import { CatDialogComponent } from './dialog.component';
import { CatButton, CatScrollable } from '../directives/proxies';

@NgModule({
  imports: [CommonModule, CatButton, CatScrollable, DialogModule],
  declarations: [CatDialogComponent, CatDialogHeaderComponent, CatDialogActionsComponent],
  exports: [CatDialogComponent, CatDialogHeaderComponent, CatDialogActionsComponent]
})
export class CatDialogModule {}
