import {Component} from '@angular/core';
import {CommonClientService} from "../../service/common-client.service";
import {MyOrderInterface} from "../../service/model/my-order.interface";

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  displayedColumns: string[] = ['correlative'];
  dataSource: MyOrderInterface[];

  constructor(private commonClientService: CommonClientService) {
    this.dataSource = [];
    this.loadMyOrders();
  }

  loadMyOrders(): void {
    this.commonClientService.getOrders().subscribe(orders => this.dataSource = orders);
  }

}
