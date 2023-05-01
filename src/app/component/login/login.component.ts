import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/service/auth.service";
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {LoginModel} from "../../core/model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    rememberMe: false
  });

  constructor(private authService: AuthService, private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    let remember = localStorage.getItem('remember');
    if (remember) {
      let loginModel = JSON.parse(atob(remember));
      this.loginForm.controls['email'].setValue(loginModel.email);
      this.loginForm.controls['password'].setValue(loginModel.password);
      this.loginForm.controls['rememberMe'].setValue(loginModel.rememberMe);
    }
  }

  onSubmit(): void {
    let login = this.loginForm.value as LoginModel;
    if (login.rememberMe) {
      this.setRememberMe(login);
    }
    this.authService.authorization(login.email, login.password).subscribe(tokenResult => {
      localStorage.setItem('token', tokenResult.token);
      this.router.navigate(['/home']);
    });
  }

  setRememberMe(login: LoginModel): void {
    localStorage.setItem('remember', btoa(JSON.stringify(login)));
  }

}
