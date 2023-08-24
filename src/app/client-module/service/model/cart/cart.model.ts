import {CartDetailModel} from './cart-detail.model';
import {ProductModel} from "../../../../core/model/product.model";
import {UserInterface} from "../../../../core/model/user.interface";
import {PlaceInterface} from "../../../../core/model";
import {PAYMENT_TYPE} from "../../../../core/constant/app.constants";

export class CartModel {
  place: PlaceInterface = {} as PlaceInterface;
  createdDate: Date;
  items: CartDetailModel[];
  client: UserInterface = {} as UserInterface;
  products: ProductModel[] = [];
  paymentType: string;


  constructor() {
    this.createdDate = new Date();
    this.items = [];
    this.paymentType = PAYMENT_TYPE.GETNET;
  }

}
