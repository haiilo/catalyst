import { TestBed } from '@angular/core/testing';
import { CatDialogService } from './dialog.service';
import { Dialog } from '@angular/cdk/dialog';

describe('CatDialogService', () => {
  let service: CatDialogService;
  let dialog = {
    closeAll: vi.fn().mockName('dialog.closeAll'),
    open: vi.fn().mockName('dialog.open')
  };
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
