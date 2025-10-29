import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatDialogHeaderComponent } from './dialog-header.component';
import { CAT_I18N_REGISTRY_TOKEN } from '../injection-token';

describe('CatDialogHeaderComponent', () => {
  let component: CatDialogHeaderComponent;
  let fixture: ComponentFixture<CatDialogHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatDialogHeaderComponent],
      providers: [
        {
          provide: CAT_I18N_REGISTRY_TOKEN,
          useValue: { t: (key: string) => key }
        }
      ]
    })
      .overrideTemplate(CatDialogHeaderComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CatDialogHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
