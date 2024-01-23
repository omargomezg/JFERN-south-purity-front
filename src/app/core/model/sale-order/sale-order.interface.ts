import {KeyInterface} from "./key-interface";
import {PaymentDetailInterface} from "./payment-detail.interface";
import {ItemInterface} from "./item.interface";
import {HistoryInterface} from "./history.interface";

export interface SaleOrderInterface {
  createdDate: Date;
  items: ItemInterface[];
  serial: number;
  total: number;
  keys: KeyInterface[];
  paymentDetail: PaymentDetailInterface;
  history: HistoryInterface[];
  status: string;
}
