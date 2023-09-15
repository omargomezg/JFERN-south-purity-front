import {RoleEnum} from "../constant/role.enum";

export class UserFilterModel {
  placeId?: string;
  role: string;

  constructor() {
    this.role = RoleEnum.CUSTOMER;
  }
}
