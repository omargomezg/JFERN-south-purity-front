import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonAdminService} from "../../core/service/common-admin.service";
import {PaginationModel, ProductInterface} from "../../core/model";
import {PageEvent} from "@angular/material/paginator";
import {STATUS_BOTTLES} from "../../core/constant/app.constants";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-drums-available',
  templateUrl: './drums-available.component.html',
  styleUrls: ['./drums-available.component.css']
})
export class DrumsAvailableComponent implements OnInit, OnChanges {

  @Input() placeId: string | undefined | null;
  @Input() reload: string = '';
  displayedColumns: string[] = ['id', 'number', 'key', 'createdDate', 'status', 'options'];
  selectedPlaceId: string | undefined | null;
  dataSource: ProductInterface[];
  totalElements: number = 0
  pagination: PaginationModel = new PaginationModel();
  statuses = STATUS_BOTTLES;
  selectedStatus: string = STATUS_BOTTLES[0].code;
  public filterForm: FormGroup;

  constructor(private commonAdminService: CommonAdminService,
              private formBuilder: FormBuilder) {
    this.dataSource = [];
    this.filterForm = this.buildForm();
  }

  ngOnInit(): void {
    this.setValueChanges();
  }

  getOrders(): void {
    this.commonAdminService.getOrders(this.selectedPlaceId as string, this.selectedStatus, this.pagination).subscribe(orders => {
      this.totalElements = orders.totalElements;
      this.dataSource = orders.content;
    })
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      status: ['']
    });
  }

  setValueChanges(): void {
    this.filterForm.valueChanges.subscribe((form) => {
      this.selectedStatus = form.status;
      this.pagination.pageIndex = 0;
      this.getOrders();
    });
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

  unTake(element: ProductInterface) {

  }
}
