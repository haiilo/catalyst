import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { CAT_DIALOG_SIZE_TOKEN } from '../../catalyst/src';
import { bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch(err => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: CAT_DIALOG_SIZE_TOKEN,
      useValue: {
        small: '400px',
        medium: '600px',
        large: '800px',
        default: '500px'
      }
    }
  ]
})
