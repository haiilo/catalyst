import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { CatTextareaFieldType } from './formly-textarea.component';
import { CatalystFormlyModule } from '../formly.module';

vi.mock('@haiilo/catalyst/loader', () => ({
  defineCustomElements: vi.fn(() => Promise.resolve())
}));

describe('CatTextareaFieldType', () => {
  let fixture: ComponentFixture<CatTextareaFieldType>;
  let component: CatTextareaFieldType;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalystFormlyModule]
    });

    fixture = TestBed.createComponent(CatTextareaFieldType);
    component = fixture.componentInstance;

    component.field = {
      key: 'description',
      props: { label: 'Description' },
      formControl: new FormControl(''),
      form: new FormGroup({}),
      model: {},
      options: { formState: {} }
    } as any;

    fixture.detectChanges();
  });

  it('should render cat-textarea element', () => {
    expect(fixture.nativeElement.querySelector('cat-textarea')).not.toBeNull();
  });
});