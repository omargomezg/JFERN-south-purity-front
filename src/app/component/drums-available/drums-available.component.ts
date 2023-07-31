import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonAdminService} from "../../core/service/common-admin.service";
import {ProductInterface} from "../../core/model/product.interface";
import {PageEvent} from "@angular/material/paginator";
import {PaginationModel} from "../../core/model";

@Component({
  selector: 'app-drums-available',
  templateUrl: './drums-available.component.html',
  styleUrls: ['./drums-available.component.css']
})
export class DrumsAvailableComponent implements OnChanges {

  @Input() placeId: string | undefined | null;
  @Input() reload: string = '';
  displayedColumns: string[] = ['id', 'number', 'key', 'createdDate'];
  selectedPlaceId: string | undefined | null;
  dataSource: ProductInterface[];
  totalElements: number = 0
  pagination: PaginationModel = new PaginationModel();

  constructor(private commonAdminService: CommonAdminService) {
    this.dataSource = [];
  }

  getOrders(): void {
    this.commonAdminService.getOrders(this.selectedPlaceId as string, this.pagination).subscribe(orders => {
      this.totalElements = orders.totalElements;
      this.dataSource = orders.content;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.placeId) {
      this.selectedPlaceId = this.placeId;
      this.getOrders();
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pagination.pageIndex = e.pageIndex;
    this.pagination.pageSize = e.pageSize;
    this.getOrders();
  }

}
