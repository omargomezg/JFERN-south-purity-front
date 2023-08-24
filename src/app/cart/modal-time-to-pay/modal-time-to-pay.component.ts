import {Component, Inject, OnInit} from '@angular/core';
import {CartModel} from "../../client-module/service/model";
import {CommonClientService} from "../../client-module/service/common-client.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-time-to-pay',
  templateUrl: './modal-time-to-pay.component.html',
  styleUrls: ['./modal-time-to-pay.component.css']
})
export class ModalTimeToPayComponent implements OnInit {
  timeToPay: number = 0;

  constructor(private commonService: CommonClientService,
              public dialogRef: MatDialogRef<ModalTimeToPayComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CartModel) {
  }

  ngOnInit(): void {
    this.commonService.findConfiguration().subscribe(response => {
      this.timeToPay = Math.floor((response.timeToPay / 1000 / 60) % 60);
    });
  }

  sendRequest() {
    this.commonService.createSaleOrder(this.data).subscribe(response => {
      sessionStorage.removeItem('cart');
      window.open(response.url, "_self");
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
