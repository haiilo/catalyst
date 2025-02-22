import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { CatTooltip } from '../directives/proxies';

/**
 * A directive that can be used to add a Catalyst tooltip to an element.
 */
@Directive({
  selector: '[catTooltip]'
})
export class CatTooltipDirective implements OnInit {
  @Input() catTooltip!: string;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    const ref = (this.viewContainer.createComponent(CatTooltip, {
      projectableNodes: [this.viewContainer.createEmbeddedView(this.templateRef).rootNodes]
    }).instance.content = this.catTooltip);
  }
}
