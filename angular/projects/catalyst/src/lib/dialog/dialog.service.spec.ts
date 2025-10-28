import { TestBed } from '@angular/core/testing';
import { CatDialogService } from './dialog.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';

describe('CatDialogService', () => {
  let service: CatDialogService;
  let dialog = jasmine.createSpyObj('dialog', ['closeAll', 'open']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Dialog,
          useValue: dialog
        }
      ]
    });
    service = TestBed.inject(CatDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
