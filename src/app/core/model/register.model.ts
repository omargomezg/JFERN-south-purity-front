export class RegisterModel {
  rut: string;
  fullName: string;
  email: string;
  password: string;

  constructor(rut: string, fullName: string, email: string, password: string) {
    this.rut = rut;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }
}
