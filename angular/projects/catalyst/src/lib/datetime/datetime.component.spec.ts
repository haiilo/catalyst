import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalystModule } from '../catalyst.module';

// Mock Stencil loader to prevent initialization errors in tests
vi.mock('@haiilo/catalyst/loader', () => ({
  defineCustomElements: vi.fn(() => Promise.resolve())
}));

describe('DatetimeComponent', () => {
  @Component({
    template: `
      <cat-datetime>
        <cat-date></cat-date>
        <cat-time></cat-time>
      </cat-datetime>
    `,
    standalone: true,
    imports: [CatalystModule]
  })
  class TestComponent {}

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
