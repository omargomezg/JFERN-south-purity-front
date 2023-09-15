import {Component} from '@angular/core';
import {SaleOrderInterface} from "../../core/model";
import {SaleOrderService} from "../../core/service";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  sales: SaleOrderInterface[] = [];
  displayedColumns: string[] = ['createdDate', 'status', 'client', 'total', 'payment', 'options'];

  constructor(private saleOrderService: SaleOrderService) {
    this.loadSales();
  }

  loadSales(): void {
    this.saleOrderService.get().subscribe(sales => {
      this.sales = sales.content;
    });
  }

}
