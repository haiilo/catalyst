import { Directive, ElementRef, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'cat-button[routerLink]'
})
export class CatButtonRouterLinkDirective implements OnInit {
  constructor(private readonly elem: ElementRef, private readonly routerLink: RouterLink) {}

  ngOnInit(): void {
    const onFirstRender = (event: CustomEvent<'button' | 'a'>) => {
      if (event.detail === 'button') {
        this.elem.nativeElement.href = '#';
      } else if (event.detail === 'a') {
        this.elem.nativeElement.removeEventListener('catFirstRender', onFirstRender);
        const anchor = this.elem.nativeElement.shadowRoot.querySelector('a');
        if (anchor) {
          this.routerLink['el'].nativeElement = anchor;
          this.routerLink['isAnchorElement'] = true;
          this.routerLink['ngOnChanges']({});
        }
      }
    };
    this.elem.nativeElement.addEventListener('catFirstRender', onFirstRender);
  }
}
