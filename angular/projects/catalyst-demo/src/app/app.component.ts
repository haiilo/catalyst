import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CatI18nRegistry, CatIconRegistry } from '@haiilo/catalyst';
import { ci } from '@haiilo/catalyst-icons';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  CatCheckboxFieldType,
  CatDatepickerFieldType,
  CatInputFieldType,
  CatRadioFieldType,
  CatRadioGroupFieldType,
  CatSelectFieldType,
  CatTextareaFieldType,
  CatToggleFieldType
} from '../../../catalyst-formly/src';
import { CAT_I18N_REGISTRY_TOKEN, CAT_ICON_REGISTRY_TOKEN, CatDialogService } from '../../../catalyst/src';
import { countryConnector } from './app.countries';
import { DialogComponent } from './dialog/dialog.component';

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
    date2: new FormControl(new Date(), [Validators.required]),
    date3: new FormControl(new Date(), [Validators.required]),
    time: new FormControl(new Date(), [Validators.required]),
    datepickerDisabled: new FormControl(true)
  });

  countryConnector = countryConnector;

  fields: FormlyFieldConfig[] = [
    {
      key: 'catCheckbox',
      type: CatCheckboxFieldType,
      props: {
        label: 'Custom Cat Checkbox'
      }
    },
    {
      key: 'catToggle',
      type: CatToggleFieldType,
      props: {
        label: 'Custom Cat Toggle'
      }
    },
    {
      key: 'catRadio',
      type: CatRadioFieldType,
      props: {
        label: 'Custom Cat Radio'
      }
    },
    {
      key: 'catInput',
      type: CatInputFieldType,
      defaultValue: 'type here',
      props: {
        label: 'Custom Cat Input',
        clearable: true,
        required: true
      }
    },
    {
      key: 'catTextarea',
      type: CatTextareaFieldType,
      defaultValue: 'type inside textarea',
      props: {
        label: 'Custom Cat Input',
        rows: 1
      }
    },
    {
      key: 'catRadioGroup',
      type: CatRadioGroupFieldType,
      defaultValue: 'two',
      props: {
        a11yLabel: 'Radio Group 1',
        labelLeft: false,
        options: [
          {
            label: 'Option 1 - Group 1',
            value: 'one'
          },
          {
            label: 'Option 2 - Group 1',
            value: 'two'
          },
          {
            label: 'Option 3 - Group 1',
            value: 'three',
            checked: true
          }
        ]
      }
    },
    {
      key: 'catDatepicker',
      type: CatDatepickerFieldType,
      defaultValue: '2022-12-12T00:00:00Z',
      props: {
        label: 'Select a date',
        clearable: true,
        mode: 'datetime',
        required: true
      }
    },
    {
      key: 'catSelect',
      type: CatSelectFieldType,
      props: {
        label: 'Select a country',
        connector: this.countryConnector,
        required: true
      }
    }
  ];

  constructor(
    private dialog: CatDialogService,
    @Inject(CAT_ICON_REGISTRY_TOKEN) readonly iconRegistry: CatIconRegistry,
    @Inject(CAT_I18N_REGISTRY_TOKEN) readonly i18nRegistry: CatI18nRegistry
  ) {
    i18nRegistry.set({
      'error.required': 'This field is required',
      'error.minlength': 'This field is too short',
      'error.pattern': 'This field is invalid',
      'input.optional': 'optional',
      'input.clear': 'Clear',
      'select.empty': 'No items',
      'select.close': 'Close',
      'select.open': 'Open',
      'datepicker.year': 'Year',
      'datepicker.month': 'Month',
      'datepicker.hour': 'Hour',
      'datepicker.minute': 'Minute',
      'datepicker.scroll': 'Scroll to increment',
      'datepicker.toggle': 'Click to toggle'
    });
    iconRegistry.addIcons(ci);
  }

  ngOnInit(): void {
    this.form.controls.test.valueChanges.subscribe(() => {
      this.form.controls.relatedInput.updateValueAndValidity();
    });
    if (this.form.controls.datepickerDisabled.value) {
      this.form.controls.date.disable();
    } else {
      this.form.controls.date.enable();
    }
  }

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.form.controls.date.disable();
    } else {
      this.form.controls.date.enable();
    }
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
