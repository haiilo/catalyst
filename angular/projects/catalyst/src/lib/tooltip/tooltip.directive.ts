import { ComponentRef, Directive, Input, OnChanges, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { CatTooltip } from '../directives/proxies';

/**
 * A directive that can be used to add a Catalyst tooltip to an element.
 */
@Directive({
  selector: '[catTooltip]',
  standalone: false
})
export class CatTooltipDirective implements OnInit, OnChanges {
  @Input() catTooltip!: string;

  private component?: ComponentRef<CatTooltip>;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.component = this.viewContainer.createComponent(CatTooltip, {
      projectableNodes: [this.viewContainer.createEmbeddedView(this.templateRef).rootNodes]
    });
    this.component.instance.content = this.catTooltip;
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.content = this.catTooltip;
    }
  }
}
