import { Component } from '@angular/core';
import { CatDialogService } from 'catalyst';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private dialog: CatDialogService) {}

  openDialog() {
    this.dialog.open(DialogComponent);
  }
}
