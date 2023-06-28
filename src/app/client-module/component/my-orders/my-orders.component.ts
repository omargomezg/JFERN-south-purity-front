import {Component} from '@angular/core';
import {CommonClientService} from "../../service/common-client.service";
import {MyOrderInterface} from "../../service/model";
import {AuthService} from "../../../core/service/auth.service";

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  displayedColumns: string[] = ['correlative'];
  dataSource: MyOrderInterface[];

  constructor(private commonClientService: CommonClientService,
              private authService: AuthService) {
    this.dataSource = [];
    this.loadMyOrders();
  }

  loadMyOrders(): void {
    let id = this.authService.getProfile()?.id as string;
    this.commonClientService.getOrders(id).subscribe(orders => this.dataSource = orders);
  }

}
