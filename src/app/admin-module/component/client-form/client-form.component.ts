import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonAdminService} from "../../service/common-admin.service";
import {FormBuilder, Validators} from "@angular/forms";
import {UserInterface} from "../../service/interface/user.interface";
import {ToastrService} from "ngx-toastr";

interface UserStatus {
  label: string;
  value: string;
}

interface Role {
  label: string;
  value: string;
}

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  formUser = this.formBuilder.group({
    id: '',
    rut: ['', []],
    fullName: ['', [Validators.required]],
    status: ['', Validators.required],
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });
  user = {} as UserInterface;

  userStatus: UserStatus[] = [];
  roles: Role[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private commonAdminService: CommonAdminService,
              private formBuilder: FormBuilder) {
    this.userStatus.push({value: 'ACTIVE', label: 'Activo'});
    this.userStatus.push({value: 'DISABLED', label: 'Desactivado'});
    this.roles.push({value: 'ADMINISTRATOR', label: 'Administrador'});
    this.roles.push({value: 'CUSTOMER', label: 'Cliente'});
    this.roles.push({value: 'STOCKER', label: 'Reponedor'});

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      let {id} = param;
      this.commonAdminService.getUserById(id).subscribe(user => {
        this.user = user;
        this.formUser = this.formBuilder.group({
          id: user.id,
          rut: [user.rut, []],
          fullName: [user.fullName, [Validators.required]],
          status: [user.status, Validators.required],
          role: [user.role, Validators.required],
          email: [user.email, [Validators.required, Validators.email]]
        });
      });
    });
  }

  submit(): void {
    this.commonAdminService.putUser(this.formUser.value).subscribe(() => this.toastr.success('Usuario actualizado.'))
  }
}
