import {PlaceInterface} from "./place.interface";

export interface UserInterface {
  id: string;
  role: string;
  telephone: string;
  rut: string;
  email: string;
  city: string;
  address: string;
  status: string;
  fullName: string;
  password: string
  passwordReset: PasswordReset;
  place: PlaceInterface;
}

interface PasswordReset {
  code: string;
}
