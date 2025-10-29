import { TestBed } from '@angular/core/testing';
import { Dialog } from '@angular/cdk/dialog';
import { CatDialogService } from './dialog.service';

describe('CatDialogService', () => {
  let service: CatDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Dialog,
          useValue: { open: jasmine.createSpy(), closeAll: jasmine.createSpy() }
        }
      ]
    });
    service = TestBed.inject(CatDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
