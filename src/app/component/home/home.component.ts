import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTooltip } from "@angular/material/tooltip";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ RouterLink, MatTooltip],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  products: any[] = [];
  config: any;
  isMobile = signal<boolean>(false);

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 767px)']).subscribe(result => {
      this.isMobile.set(result.matches);
    });
  }  

  buy() {
    this.router.navigateByUrl('hacer-pedido');
  }
}
