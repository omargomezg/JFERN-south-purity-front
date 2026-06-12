import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[appParallax]',
})
export class ParallaxDirective {
    constructor(private el: ElementRef) {}

    @HostListener('window:scroll', ['$event'])
    onScroll() {
        const offset = window.pageYOffset; this.el.nativeElement.style.backgroundPositionY = -(offset * 0.3) + 'px';
    }

}