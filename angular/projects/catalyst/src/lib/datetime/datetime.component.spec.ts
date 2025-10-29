import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DatetimeComponent } from './datetime.component';

describe('DatetimeComponent', () => {
  let component: DatetimeComponent;
  let fixture: ComponentFixture<DatetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatetimeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .overrideTemplate(DatetimeComponent, '<cat-date></cat-date><cat-time></cat-time>')
      .compileComponents();

    fixture = TestBed.createComponent(DatetimeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
