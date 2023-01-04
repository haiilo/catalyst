import { TestBed } from '@angular/core/testing';
import { CatDialogService } from './dialog.service';

describe('CatDialogService', () => {
  let service: CatDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
