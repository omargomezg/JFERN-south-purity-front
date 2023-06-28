export interface PaymentResponseModel {
  url: string;
  message: string;
  paymentStatus: string;
  products: ProductsInPaymentResponseModel[];
}

export interface ProductsInPaymentResponseModel{
  key: string;
  value:string;
}
