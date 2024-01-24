import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PaymentDetailInterface} from "../../core/model/sale-order/payment-detail.interface";

@Component({
  selector: 'app-modal-transaction',
  templateUrl: './modal-transaction.component.html',
  styleUrls: ['./modal-transaction.component.scss']
})
export class ModalTransactionComponent {

  constructor(public matDialogRef: MatDialogRef<ModalTransactionComponent>,
              @Inject(MAT_DIALOG_DATA) public transaction: PaymentDetailInterface) {
  }

  reload() {
    window.location.reload();
  }
}
