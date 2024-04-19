export class CartDetailModel {
  quantity: number;
  price: number;
  description: string;
  subtotal: number;

  constructor(quantity: number, price: number, description: string) {
    this.quantity = quantity;
    this.price = price;
    this.description = description;
    this.subtotal = price * quantity;
  }

}
