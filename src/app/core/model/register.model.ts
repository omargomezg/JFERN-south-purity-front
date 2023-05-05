export class RegisterModel {
  rut: string;
  fullName: string;
  email: string;
  password: string;
  role: string = 'CUSTOMER';

  constructor(rut: string, fullName: string, email: string, password: string) {
    this.rut = rut;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }
}
