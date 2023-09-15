import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      identification: [''],
      email: [''],
      phone: [''],
      address: [''],
      password: [''],
      role: [''],
      status: [''],
    });
  }

}
