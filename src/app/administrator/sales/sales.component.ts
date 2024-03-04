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
    pagination: PaginationModel = new PaginationModel()

    constructor(private saleOrderService: SaleOrderService) {
        this.loadSales();
    }

    loadSales(): void {
        this.saleOrderService.get(this.pagination).subscribe(sales => {
            this.sales = sales.content;
            this.pagination.length = sales.totalElements;
        });
    }

    handlePageEvent(pageEvent: PageEvent): void {
        this.pagination.length = pageEvent.length;
        this.pagination.pageSize = pageEvent.pageSize;
        this.pagination.pageIndex = pageEvent.pageIndex;
        this.loadSales();
    }

}
