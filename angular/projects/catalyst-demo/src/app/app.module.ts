import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CatalystModule } from 'catalyst';
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [BrowserModule, CatalystModule.forRoot()],
  declarations: [AppComponent, DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
