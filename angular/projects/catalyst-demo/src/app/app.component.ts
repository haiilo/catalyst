import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CatI18nRegistry, CatIconRegistry } from '@haiilo/catalyst';
import { ci } from '@haiilo/catalyst-icons';
import { of } from 'rxjs';
import { CatDialogService, CAT_I18N_REGISTRY_TOKEN, CAT_ICON_REGISTRY_TOKEN } from '../../../catalyst/src';
import { DialogComponent } from './dialog/dialog.component';

interface Country {
  id: string;
  country: string;
}

const countries: Country[] = [
  { id: '0', country: 'Afghanistan' },
  { id: '1', country: 'Albania' },
  { id: '2', country: 'Algeria' },
  { id: '3', country: 'American Samoa' },
  { id: '4', country: 'Andorra' },
  { id: '5', country: 'Angola' }
];

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  form = new FormGroup({
    test: new FormControl('test', [Validators.pattern('a+'), Validators.required, Validators.minLength(3)]),
    option: new FormControl(null, [Validators.required])
  });

  countryConnector: any = {
    resolve: (ids: string[]) => of(ids.map(id => countries.find(value => value.id === id)!)),
    retrieve: () => of({ content: countries, last: true }),
    render: (country: Country) => ({ label: country.country })
  };

  constructor(
    private dialog: CatDialogService,
    @Inject(CAT_ICON_REGISTRY_TOKEN) private readonly iconRegistry: CatIconRegistry,
    @Inject(CAT_I18N_REGISTRY_TOKEN) private readonly i18nRegistry: CatI18nRegistry
  ) {
    i18nRegistry.set({
      'error.required': 'This field is required',
      'error.minlength': 'This field is too short',
      'error.pattern': 'This field is invalid',
      'input.optional': 'optional',
      'select.empty': 'No items',
      'select.close': 'Close',
      'select.open': 'Open'
    });
    iconRegistry.addIcons(ci);
  }

  openDialog() {
    this.dialog.open(DialogComponent);
  }
}
