import {PlaceModel} from "./place.model";

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
  place: PlaceModel;
}

interface PasswordReset {
  code: string;
}
