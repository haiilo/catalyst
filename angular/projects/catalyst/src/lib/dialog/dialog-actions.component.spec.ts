import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatDialogActionsComponent } from './dialog-actions.component';

describe('CatDialogActionsComponent', () => {
  let component: CatDialogActionsComponent;
  let fixture: ComponentFixture<CatDialogActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatDialogActionsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CatDialogActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
