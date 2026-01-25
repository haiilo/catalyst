import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { CatRadioGroupFieldType } from './formly-radio-group.component';
import { CatalystFormlyModule } from '../formly.module';

vi.mock('@haiilo/catalyst/loader', () => ({
  defineCustomElements: vi.fn(() => Promise.resolve())
}));

describe('CatRadioGroupFieldType', () => {
  let fixture: ComponentFixture<CatRadioGroupFieldType>;
  let component: CatRadioGroupFieldType;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalystFormlyModule]
    });

    fixture = TestBed.createComponent(CatRadioGroupFieldType);
    component = fixture.componentInstance;

    component.field = {
      key: 'choice',
      props: { name: 'choice', options: [] },
      formControl: new FormControl(''),
      form: new FormGroup({}),
      model: {},
      options: { formState: {} }
    } as any;

    fixture.detectChanges();
  });

  it('should render cat-radio-group element', () => {
    expect(fixture.nativeElement.querySelector('cat-radio-group')).not.toBeNull();
  });
});
