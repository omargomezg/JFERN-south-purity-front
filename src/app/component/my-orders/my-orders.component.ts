import {Component} from '@angular/core';
import {CommonClientService} from "../../client-module/service/common-client.service";
import {MyOrderInterface} from "../../client-module/service/model";
import {AuthService} from "../../core/service/auth.service";
import {SaleOrderInterface} from "../../core/model";
import {PageEvent} from "@angular/material/paginator";
import {PaginationModel} from "../../core/model";

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  displayedColumns: string[] = ['orderNumber', 'createdAt', 'status', 'total'];
  dataSource: SaleOrderInterface[];
  pagination: PaginationModel = new PaginationModel()

  constructor(private commonClientService: CommonClientService,
              private authService: AuthService) {
    this.dataSource = [];
    this.loadMyOrders();
  }

  loadMyOrders(): void {
    let id = this.authService.getProfile()?.id as string;
    this.commonClientService.getSaleOrder(id, this.pagination).subscribe(orders => {
      this.dataSource = orders.content
      this.pagination.length = orders.totalElements;
    });
  }

  handlePageEvent(pageEvent: PageEvent): void {
    this.pagination.length = pageEvent.length;
    this.pagination.pageSize = pageEvent.pageSize;
    this.pagination.pageIndex = pageEvent.pageIndex;
    this.loadMyOrders();
  }
}
