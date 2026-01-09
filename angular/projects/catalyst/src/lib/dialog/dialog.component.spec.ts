import type { MockedObject } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatDialogComponent } from './dialog.component';
import { DialogRef } from '@angular/cdk/dialog';

describe('CatDialogComponent', () => {
  let component: CatDialogComponent;
  let fixture: ComponentFixture<CatDialogComponent>;
  let dialogRef: MockedObject<DialogRef>;

  beforeEach(async () => {
    dialogRef = { close: vi.fn().mockName('dialogRef.close') } as MockedObject<DialogRef>;
    await TestBed.configureTestingModule({
      declarations: [CatDialogComponent],
      providers: [
        {
          provide: DialogRef,
          useValue: dialogRef
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
