import { Component } from '@angular/core';
import { IconCheckComponent } from '../icon-check/icon-check.component';
import { ButtonBuyComponent } from '../button-buy/button-buy.component';

@Component({
    selector: 'app-section-advantages',
    templateUrl: './section-advantages.component.html',
    imports: [IconCheckComponent, ButtonBuyComponent],
    styleUrl: './section-advantages.component.scss',
    standalone: true,
})
export class SectionAdvantagesComponent {

  constructor() { }

}
