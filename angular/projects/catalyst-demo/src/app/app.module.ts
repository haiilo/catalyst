import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CatalystModule } from '../../../catalyst/src';
import { FormlyModule } from '@ngx-formly/core';
import { CatalystFormlyModule } from '../../../catalyst-formly/src';
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    CatalystModule.forRoot(),
    CatalystFormlyModule,
    CatalystModule,
    FormsModule
  ],
  declarations: [AppComponent, DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
