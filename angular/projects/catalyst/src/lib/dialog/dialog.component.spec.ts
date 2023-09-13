import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatDialogComponent } from './dialog.component';

describe('CatDialogComponent', () => {
  let component: CatDialogComponent;
  let fixture: ComponentFixture<CatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatDialogComponent]
    })
      .overrideTemplate(CatDialogComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
