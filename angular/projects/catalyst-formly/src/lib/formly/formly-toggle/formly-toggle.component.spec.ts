import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { CatToggleFieldType } from './formly-toggle.component';
import { CatalystFormlyModule } from '../formly.module';

vi.mock('@haiilo/catalyst/loader', () => ({
  defineCustomElements: vi.fn(() => Promise.resolve())
}));

describe('CatToggleFieldType', () => {
  let fixture: ComponentFixture<CatToggleFieldType>;
  let component: CatToggleFieldType;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalystFormlyModule]
    });

    fixture = TestBed.createComponent(CatToggleFieldType);
    component = fixture.componentInstance;

    component.field = {
      key: 'enabled',
      props: { label: 'Enable' },
      formControl: new FormControl(false),
      form: new FormGroup({}),
      model: {},
      options: { formState: {} }
    } as any;

    fixture.detectChanges();
  });

  it('should render cat-toggle element', () => {
    expect(fixture.nativeElement.querySelector('cat-toggle')).not.toBeNull();
  });
});
