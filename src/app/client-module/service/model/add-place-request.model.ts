export class AddPlaceRequestModel {
  id: string = '';
  address: string = '';

  constructor(id: string, address: string) {
    this.id = id;
    this.address = address;
  }
}
