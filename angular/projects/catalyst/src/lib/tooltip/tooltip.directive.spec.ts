import type { MockedObject } from 'vitest';
import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { CatTooltipDirective } from './tooltip.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalystModule } from '../catalyst.module';

// Mock Stencil loader to prevent initialization errors in tests
vi.mock('@haiilo/catalyst/loader', () => ({
  defineCustomElements: vi.fn(() => Promise.resolve())
}));

describe('CatTooltipDirective', () => {
  let fixture: ComponentFixture<CatTooltipDirectiveHostComponent>;
  let templateRef: MockedObject<TemplateRef<unknown>>;
  let viewContainer: MockedObject<ViewContainerRef>;

  @Component({
    template: ` <div class="test" *catTooltip="test">123</div>`,
    standalone: false
  })
  class CatTooltipDirectiveHostComponent {}

  beforeEach(() => {
    templateRef = {
      createEmbeddedView: vi.fn().mockName('TemplateRef.createEmbeddedView')
    } as MockedObject<TemplateRef<unknown>>;
    viewContainer = {
      createComponent: vi.fn().mockName('ViewContainerRef.createComponent'),
      createEmbeddedView: vi.fn().mockName('ViewContainerRef.createEmbeddedView')
    } as MockedObject<ViewContainerRef>;

    TestBed.configureTestingModule({
      imports: [CatalystModule.forRoot()],
      declarations: [CatTooltipDirective, CatTooltipDirectiveHostComponent],
      providers: [
        { provide: TemplateRef, useValue: templateRef },
        { provide: ViewContainerRef, useValue: viewContainer }
      ]
    });

    fixture = TestBed.createComponent(CatTooltipDirectiveHostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.nativeElement.querySelector('cat-tooltip')).not.toBeNull();
  });
});
