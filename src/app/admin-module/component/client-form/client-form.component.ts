import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
    status: ['ACTIVE', Validators.required],
    password: Math.random().toString(36).slice(2, 12),
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });
  user = {} as UserInterface;

  userStatus: UserStatus[] = [];
  roles: Role[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private commonAdminService: CommonAdminService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.userStatus.push({value: 'ACTIVE', label: 'Activo'});
    this.userStatus.push({value: 'DISABLED', label: 'Desactivado'});
    this.roles.push({value: 'ADMINISTRATOR', label: 'Administrador'});
    this.roles.push({value: 'CUSTOMER', label: 'Cliente'});
    this.roles.push({value: 'STOCKER', label: 'Reponedor'});

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      let {id} = param;
      if (id) {
        this.commonAdminService.getUserById(id).subscribe(user => {
          this.user = user;
          this.formUser = this.formBuilder.group({
            id: user.id,
            rut: [user.rut, []],
            fullName: [user.fullName, [Validators.required]],
            password: '',
            status: [user.status, Validators.required],
            role: [user.role, Validators.required],
            email: [user.email, [Validators.required, Validators.email]]
          });
        });
      }
    });
  }

  submit(): void {
    if (this.user.id) {
      this.commonAdminService.putUser(this.formUser.value).subscribe(() => this.showMessageAndRedirect('Usuario actualizado.'))
    } else {
      this.commonAdminService.postUser(this.formUser.value).subscribe(() => this.showMessageAndRedirect('Usuario actualizado.'))
    }
  }

  showMessageAndRedirect(message: string): void {
    this.toastr.success(message);
    this.router.navigate(['/administrador/usuarios'])
  }

  randomPassword(): void {
    let pwd = Math.random().toString(36).slice(2, 12);
    this.formUser.controls['password'].setValue(pwd);
  }
}
