import {Component} from '@angular/core';
import {CommonClientService} from "../../client-module/service/common-client.service";
import {AuthService} from "../../core/service";
import {PaginationModel, SaleOrderInterface} from "../../core/model";
import {PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-my-requests',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
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
            orders.content.forEach((order: SaleOrderInterface) => {
                if (order.status !== 'APPROVED') {
                    order.total = 0;
                }
                order.status = this.convertState(order.status);
            });
            this.dataSource = orders.content;
            this.pagination.length = orders.totalElements;
        });
    }

    convertState(state: string): string {
        switch (state) {
            case 'APPROVED':
                return 'Aprobado';
            case 'REJECTED':
                return 'Rechazado';
            case 'PENDING':
                return 'Pendiente';
            case 'TIMEOUT':
                return 'Expirado';
            case 'UNKNOWN':
                return '--';
            default:
                return '---';
        }
    }

    handlePageEvent(pageEvent: PageEvent): void {
        this.pagination.length = pageEvent.length;
        this.pagination.pageSize = pageEvent.pageSize;
        this.pagination.pageIndex = pageEvent.pageIndex;
        this.loadMyOrders();
    }

}
