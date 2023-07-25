import {CartDetailModel} from './cart-detail.model';

export class CartModel {
  place: string;
  createdDate: Date;
  items: CartDetailModel[];

  constructor(place: string) {
    this.place = place
    this.createdDate = new Date();
    this.items = [];
  }

}
