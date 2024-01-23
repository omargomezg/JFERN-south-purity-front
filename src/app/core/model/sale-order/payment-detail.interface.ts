export interface PaymentDetailInterface {
  requestId: number;
  processUrl: string;
  status: string;
  reason: string;
  message: string;
  date: Date;
  paymentType: string;
}
