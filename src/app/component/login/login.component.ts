import {Component} from '@angular/core';
import {AuthService} from "../../core/service/auth.service";
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
  }

  onSubmit(): void {
    let {email, password} = this.loginForm.value;
    this.authService.authorization(email, password).subscribe(tokenResult => {
      localStorage.setItem('token', tokenResult.token);
      this.router.navigate(['/home']);
    });
  }
}
