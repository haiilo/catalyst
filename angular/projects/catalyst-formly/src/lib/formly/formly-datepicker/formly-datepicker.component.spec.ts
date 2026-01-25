import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { CatDatepickerFieldType } from './formly-datepicker.component';
import { CatalystFormlyModule } from '../formly.module';

vi.mock('@haiilo/catalyst/loader', () => ({
  defineCustomElements: vi.fn(() => Promise.resolve())
}));

describe('CatDatepickerFieldType', () => {
  let fixture: ComponentFixture<CatDatepickerFieldType>;
  let component: CatDatepickerFieldType;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalystFormlyModule]
    });

    fixture = TestBed.createComponent(CatDatepickerFieldType);
    component = fixture.componentInstance;

    component.field = {
      key: 'date',
      props: { label: 'Date' },
      formControl: new FormControl(''),
      form: new FormGroup({}),
      model: {},
      options: { formState: {} }
    } as any;

    fixture.detectChanges();
  });

  it('should render cat-datepicker element', () => {
    expect(fixture.nativeElement.querySelector('cat-datepicker')).not.toBeNull();
  });
});
