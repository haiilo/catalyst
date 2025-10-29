import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef } from '@angular/cdk/dialog';
import { CatDialogComponent } from './dialog.component';

describe('CatDialogComponent', () => {
  let component: CatDialogComponent;
  let fixture: ComponentFixture<CatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatDialogComponent],
      providers: [
        {
          provide: DialogRef,
          useValue: { close: jasmine.createSpy() }
        }
      ]
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
