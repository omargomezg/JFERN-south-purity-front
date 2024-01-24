import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {UserInterface} from "../../core/model/user.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../core/service";

@Component({
  selector: 'app-my-customer-profile',
  templateUrl: './my-customer-profile.component.html',
  styleUrls: ['./my-customer-profile.component.scss']
})
export class MyCustomerProfileComponent implements OnChanges {
  @Input() user: UserInterface = {} as UserInterface;
  formProfile: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private userService: UserService) {
    this.formProfile = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      rut: [this.user.rut, Validators.required],
      fullName: [this.user.fullName, Validators.required],
      email: [this.user.email, Validators.required],
      telephone: [this.user.telephone],
      city: [this.user.city],
      address: [this.user.address]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      this.formProfile = this.buildForm();
    }
  }

  submit(): void {
    this.user.rut = this.formProfile.controls['rut'].value as string;
    this.user.fullName = this.formProfile.controls['fullName'].value as string;
    this.user.email = this.formProfile.controls['email'].value as string;
    this.user.telephone = this.formProfile.controls['telephone'].value as string;
    this.user.city = this.formProfile.controls['city'].value as string;
    this.user.address = this.formProfile.controls['address'].value as string;
    this.userService.update(this.user).subscribe(() => this.toastr.success('Perfil actualizado'))
  }
}
