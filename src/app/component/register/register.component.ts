import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterModel} from "../../core/model";
import {AuthService} from "../../core/service/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.formBuilder.group({
      rut: [''],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    },
    {
      validators: this.password.bind(this)
    });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  password(formGroup: FormGroup) {
    const {password} = formGroup.get('password')?.value;
    const {confirmPassword} = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordNotMatch: true};
  }

  submit(): void {
    let register = this.registerForm.value as RegisterModel;
    this.authService.register(register).subscribe(() => {

    })
  }

}
