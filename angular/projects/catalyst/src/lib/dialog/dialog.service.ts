import { Injectable } from '@angular/core';
import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';
import {A11yModule} from '@angular/cdk/a11y';


@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: Dialog) {}

  openDialog() {
    this.dialog.open(CdkDialogDataExampleDialog, {
      minWidth: '300px',
      data: {
        animal: 'panda',
      },
    });
  }
}
