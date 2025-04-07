import { TemplateRef, ViewContainerRef } from '@angular/core';
import { CatTooltipDirective } from './tooltip.directive';

describe('CatTooltipDirective', () => {
  let templateRef: jasmine.SpyObj<TemplateRef<unknown>>;
  let viewContainer: jasmine.SpyObj<ViewContainerRef>;

  beforeEach(() => {
    templateRef = jasmine.createSpyObj('TemplateRef', ['createEmbeddedView']);
    viewContainer = jasmine.createSpyObj('ViewContainerRef', ['createComponent', 'createEmbeddedView']);
  });

  it('should create an instance', () => {
    const directive = new CatTooltipDirective(templateRef, viewContainer);
    expect(directive).toBeTruthy();
  });
});
