import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { CatTooltipDirective } from './tooltip.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalystModule } from '../catalyst.module';

describe('CatTooltipDirective', () => {
  let fixture: ComponentFixture<CatTooltipDirectiveHostComponent>;
  let templateRef: jasmine.SpyObj<TemplateRef<unknown>>;
  let viewContainer: jasmine.SpyObj<ViewContainerRef>;

  @Component({
    template: ` <div class="test" *catTooltip="test">123</div>`,
    standalone: false
  })
  class CatTooltipDirectiveHostComponent {}

  beforeEach(() => {
    templateRef = jasmine.createSpyObj('TemplateRef', ['createEmbeddedView']);
    viewContainer = jasmine.createSpyObj('ViewContainerRef', ['createComponent', 'createEmbeddedView']);

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
