import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'cat-button[routerLink]'
})
export class CatButtonRouterLinkDirective implements OnInit, AfterViewInit {
  constructor(private readonly el: ElementRef, private readonly routerLink: RouterLink) {
    console.log(routerLink);
    // (routerLink as any)['el'].nativeElement = ;
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(this.el.nativeElement.shadowRoot.childNodes[0]);
      (this.routerLink as any)['el'].nativeElement = this.el.nativeElement.shadowRoot.childNodes[0];
      console.log(this.el.nativeElement.shadowRoot);
      (this.routerLink as any).isAnchorElement = true;
      debugger;
      (this.routerLink as any).ngOnChanges();
    }, 50);
      
  }
  ngOnInit(): void {
    console.log(this.el.nativeElement.button);
  }
}
