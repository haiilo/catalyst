import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { CatCheckboxFieldType } from './formly-checkbox.component';
import { CatalystFormlyModule } from '../formly.module';

vi.mock('@haiilo/catalyst/loader', () => ({
  defineCustomElements: vi.fn(() => Promise.resolve())
}));

describe('CatCheckboxFieldType', () => {
  let fixture: ComponentFixture<CatCheckboxFieldType>;
  let component: CatCheckboxFieldType;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalystFormlyModule]
    });

    fixture = TestBed.createComponent(CatCheckboxFieldType);
    component = fixture.componentInstance;

    component.field = {
      key: 'accepted',
      props: { label: 'Accept' },
      formControl: new FormControl(false),
      form: new FormGroup({}),
      model: {},
      options: { formState: {} }
    } as any;

    fixture.detectChanges();
  });

  it('should render cat-checkbox element', () => {
    expect(fixture.nativeElement.querySelector('cat-checkbox')).not.toBeNull();
  });
});
