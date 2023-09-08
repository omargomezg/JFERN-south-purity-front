import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService, UserService} from "../../core/service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {ResetPwdModalComponent} from "../reset-pwd-modal/reset-pwd-modal.component";

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
  profile = this.authService.getProfile();
  address: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private userService: UserService,
              private toastr: ToastrService, private matDialog: MatDialog) {
  }

  submit(): void {
    this.authService.updateProfile(this.profile).subscribe(() => this.toastr.success('Perfil actualizado'))
  }

  ngOnInit(): void {
    const id = this.authService.getProfile()?.id as string;
    this.userService.getById(id).subscribe(place => console.log(place));
    this.authService.getMyProfile().subscribe(profile => {
      this.formProfile.controls['rut'].setValue(profile.rut);
      this.formProfile.controls['fullName'].setValue(profile.fullName);
      this.formProfile.controls['email'].setValue(profile.email);
      this.formProfile.controls['telephone'].setValue(profile.telephone);
      this.address = profile.address;
      this.profile = profile;
    })
  }

  showModalPwd(): void {
    const dialogRef = this.matDialog.open(ResetPwdModalComponent, {data: {id: this.profile?.id}, disableClose: true});

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
