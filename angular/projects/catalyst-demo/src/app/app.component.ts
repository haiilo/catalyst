import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CatI18nRegistry, CatIconRegistry } from '@haiilo/catalyst';
import { ci } from '@haiilo/catalyst-icons';
import { of } from 'rxjs';
import { CAT_I18N_REGISTRY_TOKEN, CAT_ICON_REGISTRY_TOKEN, CatDialogService, CatRadioFieldType } from '../../../catalyst/src';
import { DialogComponent } from './dialog/dialog.component';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CatCheckboxFieldType, CatInputFieldType, CatToggleFieldType } from 'catalyst';

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
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  form = new FormGroup({
    test: new FormControl('test', [Validators.pattern('a+'), Validators.required, Validators.minLength(3)]),
    relatedInput: new FormControl(null, [this.equalTo('test')]),
    option: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    catCheckbox: new FormControl(false),
    catToggle: new FormControl(true),
    catRadio: new FormControl(true),
    catInput: new FormControl('')
  });
  fields: FormlyFieldConfig[] = [
    {
      key: 'catCheckbox',
      type: CatCheckboxFieldType,
      props: {
        label: 'Custom Cat Checkbox'
      },
    },
    {
      key: 'catToggle',
      type: CatToggleFieldType,
      props: {
        label: 'Custom Cat Toggle'
      },
    },
    {
      key: 'catRadio',
      type: CatRadioFieldType,
      props: {
        label: 'Custom Cat Radio'
      },
    },
    {
      key: 'catInput',
      type: CatInputFieldType,
      defaultValue: 'type here',
      props: {
        label: 'Custom Cat Input',
        clearable: true
      },
    },
  ];

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

  ngOnInit(): void {
    this.form.controls.test.valueChanges.subscribe(() => {
      this.form.controls.relatedInput.updateValueAndValidity();
    });
    }

  equalTo(controlName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlToCompare = control.parent?.get(controlName);
      return control.dirty && controlToCompare && controlToCompare.value !== control.value ? { equalTo: true } : null;
    };
  }

  openDialog() {
    this.dialog.open(DialogComponent);
  }
}
