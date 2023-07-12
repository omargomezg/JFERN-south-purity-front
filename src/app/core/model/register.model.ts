export class RegisterModel {
  rut: string;
  fullName: string;
  email: string;
  password: string;
  city: string;
  address: string ;
  telephone: string ;
  role: string = 'CUSTOMER';

  constructor(rut: string, city: string, fullName: string, address: string, telephone: string, email: string, password: string) {
    this.rut = rut;
    this.city = city;
    this.fullName = fullName;
    this.address = address;
    this.telephone = telephone;
    this.email = email;
    this.password = password;
  }
}
