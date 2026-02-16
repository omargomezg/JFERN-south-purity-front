import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonAdminService, ProductService} from "../../core/service";
import {PaginationModel, ProductInterface} from "../../core/model";
import {PageEvent} from "@angular/material/paginator";
import {STATUS_BOTTLES} from "../../core/constant/app.constants";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-drums-available',
  templateUrl: './drums-available.component.html',
  styleUrls: ['./drums-available.component.scss']
})
export class DrumsAvailableComponent implements OnInit, OnChanges {

  @Input() placeId: string | undefined | null;
  @Input() reload: string = '';
  displayedColumns: string[] = ['number', 'description', 'key', 'createdDate', 'status', 'options'];
  selectedPlaceId: string | undefined | null;
  dataSource: ProductInterface[];
  totalElements: number = 0
  pagination: PaginationModel = new PaginationModel();
  statuses = STATUS_BOTTLES;
  selectedStatus: string = STATUS_BOTTLES[0].code;
  public filterForm: FormGroup;

  constructor(private commonAdminService: CommonAdminService,
              private productService: ProductService,
              private formBuilder: FormBuilder,
              private toast: ToastrService) {
    this.dataSource = [];
    // Set default selected status to the first entry of STATUS_BOTTLES (code: '') => "Todos"
    this.filterForm = this.formBuilder.group({status: [STATUS_BOTTLES[0].code]});
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

  trackByStatusCode(index: number, status: any): string {
    return status.code;
  }

  unTake(product: ProductInterface) {
    this.commonAdminService.untakenProduct(product.id, this.placeId as string).subscribe((result) => {
      if (result === true) {
        this.toast.success('Product liberado');
        this.getOrders()
      } else {
        this.toast.error('No es posible liberar el producto');
      }
    })
  }

  delete(product: ProductInterface) {
    if (confirm('Are you sure to delete this product?') == true) {
      this.productService.delete(product.id).subscribe(() => {
        this.getOrders();
      });
    }
  }
}
