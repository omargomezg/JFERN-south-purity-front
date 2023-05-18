import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {UserInterface} from "../../service/interface/user.interface";
import {CommonAdminService} from "../../service/common-admin.service";
import {OrderInterface} from "../../service/interface/order.interface";

@Component({
  selector: 'app-drums-available',
  templateUrl: './drums-available.component.html',
  styleUrls: ['./drums-available.component.css']
})
export class DrumsAvailableComponent implements OnChanges{

  @Input() placeId: string | undefined | null;
  @Input() reload: string = '';
  displayedColumns: string[] = ['id', 'number'];
  dataSource: OrderInterface[];

  constructor(private commonAdminService: CommonAdminService) {
    this.dataSource =[];
  }

  getOrders(id: string): void {
    this.commonAdminService.getOrders(id).subscribe(orders => this.dataSource = orders.content )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.placeId) {
      this.getOrders(this.placeId);
    }
  }

}
