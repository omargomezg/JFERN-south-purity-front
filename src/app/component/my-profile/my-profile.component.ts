import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../core/service/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  formProfile = this.formBuilder.group({
    rut: ['', Validators.required],
    fullName: ['', Validators.required],
    email: ['', Validators.required],
    telephone: ['']
  });
  profile: any;
  address: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private toastr: ToastrService) {
  }

  submit(): void {
    this.profile.fullName = this.formProfile.controls['fullName'].value;
    this.profile.telephone = this.formProfile.controls['telephone'].value;
    this.authService.updateProfile(this.profile).subscribe(() => this.toastr.success('Perfil actualizado'))
  }

  ngOnInit(): void {
    this.authService.getMyProfile().subscribe(profile => {
      this.formProfile.controls['rut'].setValue(profile.rut);
      this.formProfile.controls['fullName'].setValue(profile.fullName);
      this.formProfile.controls['email'].setValue(profile.email);
      this.formProfile.controls['telephone'].setValue(profile.telephone);
      this.address = profile.address;
      this.profile = profile;
    })
  }
}
