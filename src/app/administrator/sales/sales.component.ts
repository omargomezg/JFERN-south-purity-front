import {Component} from '@angular/core';
import {PaginationModel, SaleOrderInterface} from "../../core/model";
import {SaleOrderService} from "../../core/service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  sales: SaleOrderInterface[] = [];
  displayedColumns: string[] = ['createdDate', 'status', 'client', 'total', 'payment', 'options'];
  totalElements: number = 0
  pagination: PaginationModel = new PaginationModel();

  constructor(private saleOrderService: SaleOrderService) {
    this.loadSales();
  }

  loadSales(): void {
    this.saleOrderService.get().subscribe(sales => {
      this.sales = sales.content;
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pagination.pageIndex = e.pageIndex;
    this.pagination.pageSize = e.pageSize;
    this.loadSales();
  }
}
