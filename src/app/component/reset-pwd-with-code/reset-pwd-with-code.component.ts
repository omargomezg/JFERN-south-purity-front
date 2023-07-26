import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {matchValidator} from "../../core/match-validator";
import {ToastrService} from "ngx-toastr";
import {UserInterface} from "../../core/model/user.interface";
import {AuthService} from "../../core/service/auth.service";

@Component({
  selector: 'app-reset-pwd-with-code',
  templateUrl: './reset-pwd-with-code.component.html',
  styleUrls: ['./reset-pwd-with-code.component.css']
})
export class ResetPwdWithCodeComponent implements OnInit {

  formPwdReset = this.formBuilder.group({
    code: ['', Validators.required],
    email: '',
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
      matchValidator('confirmPassword', true)]
    ],
    confirmPassword: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
      matchValidator('password')]]
  });

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
              private toastr: ToastrService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['email'])
        this.formPwdReset.controls['email'].setValue(params['email'] as string);
    });
  }


  send(): void {
    let user = {
      email: this.formPwdReset.controls['email'].value as string,
      password: this.formPwdReset.controls['password'].value as string,
      passwordReset: {
        code: this.formPwdReset.controls['code'].value as string
      }
    };
    this.authService.restoreAccountWithCode(user as UserInterface).subscribe(result =>{
      console.log(result);
    });
  }
}
