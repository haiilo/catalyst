import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { CatRadioFieldType } from './formly-radio.component';
import { CatalystFormlyModule } from '../formly.module';

vi.mock('@haiilo/catalyst/loader', () => ({
  defineCustomElements: vi.fn(() => Promise.resolve())
}));

describe('CatRadioFieldType', () => {
  let fixture: ComponentFixture<CatRadioFieldType>;
  let component: CatRadioFieldType;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalystFormlyModule]
    });

    fixture = TestBed.createComponent(CatRadioFieldType);
    component = fixture.componentInstance;

    component.field = {
      key: 'option',
      props: { label: 'Option' },
      formControl: new FormControl(''),
      form: new FormGroup({}),
      model: {},
      options: { formState: {} }
    } as any;

    fixture.detectChanges();
  });

  it('should render cat-radio element', () => {
    expect(fixture.nativeElement.querySelector('cat-radio')).not.toBeNull();
  });
});
