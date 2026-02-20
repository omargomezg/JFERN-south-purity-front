import { Component } from '@angular/core';
import { IconCheckComponent } from "../icon-check/icon-check.component";
import { ButtonBuyComponent } from "../button-buy/button-buy.component";

@Component({
    selector: 'app-section-advantages',
    imports: [IconCheckComponent, ButtonBuyComponent],
    templateUrl: './section-advantages.component.html',
    styleUrl: './section-advantages.component.scss'
})
export class SectionAdvantagesComponent {

  constructor() { }

}
