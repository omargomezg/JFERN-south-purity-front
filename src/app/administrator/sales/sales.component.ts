import {Component} from '@angular/core';
import {PaginationModel, SaleOrderInterface} from "../../core/model";
import {SaleOrderService} from "../../core/service";
import {PageEvent} from "@angular/material/paginator";
import {HistoryInterface} from "../../core/model/sale-order/history.interface";
import {MatDialog} from "@angular/material/dialog";
import {ModalHistoryComponent} from "../modal-history/modal-history.component";
import {PaymentDetailInterface} from "../../core/model/sale-order/payment-detail.interface";
import {ModalTransactionComponent} from "../modal-transaction/modal-transaction.component";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {
  sales: SaleOrderInterface[] = [];
  displayedColumns: string[] = ['createdDate', 'status', 'client', 'total', 'payment', 'options'];
    pagination: PaginationModel = new PaginationModel()

  constructor(private saleOrderService: SaleOrderService, public matDialog: MatDialog) {
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

  openHistory(histories: string[] | HistoryInterface[]) {
    this.matDialog.open(ModalHistoryComponent, {
      data: histories
    });
  }

  openTransaction(paymentDetail: PaymentDetailInterface) {
    this.matDialog.open(ModalTransactionComponent, {
      data: paymentDetail
    });

  }
}
