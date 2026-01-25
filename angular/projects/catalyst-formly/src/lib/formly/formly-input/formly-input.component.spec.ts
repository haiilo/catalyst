import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { CatInputFieldType } from './formly-input.component';
import { CatalystFormlyModule } from '../formly.module';

vi.mock('@haiilo/catalyst/loader', () => ({
  defineCustomElements: vi.fn(() => Promise.resolve())
}));

describe('CatInputFieldType', () => {
  let fixture: ComponentFixture<CatInputFieldType>;
  let component: CatInputFieldType;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalystFormlyModule]
    });

    fixture = TestBed.createComponent(CatInputFieldType);
    component = fixture.componentInstance;

    component.field = {
      key: 'name',
      props: { label: 'Name' },
      formControl: new FormControl(''),
      form: new FormGroup({}),
      model: {},
      options: { formState: {} }
    } as any;

    fixture.detectChanges();
  });

  it('should render cat-input element', () => {
    expect(fixture.nativeElement.querySelector('cat-input')).not.toBeNull();
  });
});
