import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeComponent } from './datetime.component';
import { DateValueAccessor } from '../directives/date-value-accessor';

describe('DatetimeComponent', () => {
  @Component({
    template: `
      <cat-datetime>
        <cat-date></cat-date>
        <cat-time></cat-time>
      </cat-datetime>
    `,
    standalone: false
  })
  class TestComponent {}

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatetimeComponent, DateValueAccessor]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
