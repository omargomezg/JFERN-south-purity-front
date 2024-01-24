import {Component, Inject} from '@angular/core';
import {HistoryInterface} from "../../core/model/sale-order/history.interface";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-history',
  templateUrl: './modal-history.component.html',
  styleUrls: ['./modal-history.component.scss']
})
export class ModalHistoryComponent {

  constructor(public matDialogRef: MatDialogRef<ModalHistoryComponent>,
              @Inject(MAT_DIALOG_DATA) public histories: HistoryInterface[]) {
  }

}
