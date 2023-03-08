import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteAComponent } from './route-a.component';

describe('RouteAComponent', () => {
  let component: RouteAComponent;
  let fixture: ComponentFixture<RouteAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouteAComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
