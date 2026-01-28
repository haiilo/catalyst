import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { CatDateFieldType } from './formly-date.component';
import { CatalystFormlyModule } from '../formly.module';

vi.mock('@haiilo/catalyst/loader', () => ({
  defineCustomElements: vi.fn(() => Promise.resolve())
}));

describe('CatDateFieldType', () => {
  let fixture: ComponentFixture<CatDateFieldType>;
  let component: CatDateFieldType;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalystFormlyModule]
    });

    fixture = TestBed.createComponent(CatDateFieldType);
    component = fixture.componentInstance;

    component.field = {
      key: 'birthDate',
      props: { label: 'Birth Date' },
      formControl: new FormControl(''),
      form: new FormGroup({}),
      model: {},
      options: { formState: {} }
    } as any;

    fixture.detectChanges();
  });

  it('should render cat-date element', () => {
    expect(fixture.nativeElement.querySelector('cat-date')).not.toBeNull();
  });
});
