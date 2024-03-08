import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserInterface} from "../../core/model/user.interface";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../core/service";

@Component({
  selector: 'app-my-admin-profile',
  templateUrl: './my-admin-profile.component.html',
  styleUrls: ['./my-admin-profile.component.scss']
})
export class MyAdminProfileComponent implements OnChanges{
  @Input() user: UserInterface = {} as UserInterface;
  formProfile: FormGroup

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private userService: UserService) {
    this.formProfile = this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      this.formProfile = this.buildForm();
    }
  }


  buildForm(): FormGroup {
    return this.formBuilder.group({
      rut: [this.user.rut, Validators.required],
      fullName: [this.user.fullName, Validators.required],
      email: [this.user.email, Validators.required],
      telephone: [this.user.telephone]
    });
  }

  submit(): void {
    this.user.rut = this.formProfile.controls['rut'].value as string;
    this.user.fullName = this.formProfile.controls['fullName'].value as string;
    this.user.email = this.formProfile.controls['email'].value as string;
    this.user.telephone = this.formProfile.controls['telephone'].value as string;
    this.userService.update(this.user).subscribe(() => this.toastr.success('Perfil actualizado'))
  }
}
