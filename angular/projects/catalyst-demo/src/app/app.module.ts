import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CatalystModule } from '../../../catalyst/src';
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  imports: [
    BrowserModule, 
    CatalystModule.forRoot(), 
    ReactiveFormsModule,
    FormlyModule.forRoot()
  ],
  declarations: [AppComponent, DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
