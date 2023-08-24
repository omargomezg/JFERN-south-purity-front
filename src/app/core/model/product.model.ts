import {PRODUCT_STATUS} from "../constant/app.constants";

export class ProductModel {
  id: string = '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  shortName: string;
  place: string;
  padlockKey: number;
  lockNumber: number;
  status: string = PRODUCT_STATUS.AVAILABLE;

  constructor(shortName: string, place: string, padlockKey: number, lockNumber: number) {
    this.shortName = shortName;
    this.place = place;
    this.padlockKey = padlockKey;
    this.lockNumber = lockNumber;
  }
}
