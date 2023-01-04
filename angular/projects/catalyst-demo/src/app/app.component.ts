import { Component } from '@angular/core';
import { CatDialogService } from 'catalyst';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dialog: CatDialogService) {}

  openDialog() {
    const t = this.dialog.open(DialogComponent, {
      width: '400px',
    });
  }
}
