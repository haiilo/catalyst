import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatDialogHeaderComponent } from './dialog-header.component';

describe('CatDialogHeaderComponent', () => {
  let component: CatDialogHeaderComponent;
  let fixture: ComponentFixture<CatDialogHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatDialogHeaderComponent]
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
