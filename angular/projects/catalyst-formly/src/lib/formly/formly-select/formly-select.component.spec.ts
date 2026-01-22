import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { CatSelectFieldType } from './formly-select.component';
import { CatalystFormlyModule } from '../formly.module';

vi.mock('@haiilo/catalyst/loader', () => ({
  defineCustomElements: vi.fn(() => Promise.resolve())
}));

describe('CatSelectFieldType', () => {
  let fixture: ComponentFixture<CatSelectFieldType>;
  let component: CatSelectFieldType;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalystFormlyModule]
    });

    fixture = TestBed.createComponent(CatSelectFieldType);
    component = fixture.componentInstance;

    component.field = {
      key: 'country',
      props: { label: 'Country' },
      formControl: new FormControl(''),
      form: new FormGroup({}),
      model: {},
      options: { formState: {} }
    } as any;

    fixture.detectChanges();
  });

  it('should render cat-select element', () => {
    expect(fixture.nativeElement.querySelector('cat-select')).not.toBeNull();
  });
});