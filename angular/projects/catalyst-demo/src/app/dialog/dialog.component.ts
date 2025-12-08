import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { countryConnector } from '../app.countries';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  standalone: false
})
export class DialogComponent {
  form = new FormGroup({
    option: new FormControl(null, [Validators.required])
  });

  countryConnector = countryConnector;
}
