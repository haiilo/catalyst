import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CatalystModule } from '../../../catalyst/src';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [BrowserModule, CatalystModule.forRoot(), ReactiveFormsModule, AppRoutingModule],
  declarations: [AppComponent, DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
