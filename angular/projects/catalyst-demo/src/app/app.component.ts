import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CatI18nRegistry, CatIconRegistry } from '@haiilo/catalyst';
import { ci } from '@haiilo/catalyst-icons';
import { CAT_I18N_REGISTRY_TOKEN, CAT_ICON_REGISTRY_TOKEN, CatDialogService } from '../../../catalyst/src';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {

  form = new FormGroup({
    test: new FormControl('test', [Validators.pattern('a+'), Validators.required, Validators.minLength(3)]),
  });

  constructor(private dialog: CatDialogService,
              @Inject(CAT_ICON_REGISTRY_TOKEN) private readonly iconRegistry: CatIconRegistry,
              @Inject(CAT_I18N_REGISTRY_TOKEN) private readonly i18nRegistry: CatI18nRegistry) {
    i18nRegistry.set({
      'error.required': 'This field is required',
      'error.minlength': 'This field is too short',
      'error.pattern': 'This field is invalid',
      'input.optional': 'optional'
    });
    iconRegistry.addIcons(ci)
  }

  openDialog() {
    this.dialog.open(DialogComponent);
  }
}
