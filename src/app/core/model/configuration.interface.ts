interface SmtpInterface {
  host: string;
  port: number;
  username: string;
  password: string;
  protocol: string;
  auth: boolean;
  starttlsEnable: boolean;
  starttlsRequired: boolean;
}

export interface ConfigurationInterface {
  id: string;
  siteName: string;
  price: number;
  priceWithDrum: number;
  timeToPay: number;
  returnUrl: string;
  updatedDate: Date;
  createdDate: Date;
  smtp: SmtpInterface;
}
