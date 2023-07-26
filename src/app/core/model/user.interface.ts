export interface UserInterface {
  id: string;
  role: string;
  telephone: string;
  rut: string;
  email: string;
  status: string;
  fullName: string;
  password: string
  passwordReset: PasswordReset;
}


interface PasswordReset {
  code: string;
}
