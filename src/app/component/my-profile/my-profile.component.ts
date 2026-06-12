import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService, UserService} from "../../core/service";
import {MatDialog} from "@angular/material/dialog";
import {ResetPwdModalComponent} from "../reset-pwd-modal/reset-pwd-modal.component";
import {UserInterface} from "../../core/model/user.interface";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  user: UserInterface = {} as UserInterface;
  address: string = '';
  loading: boolean = true;
  rolName: string = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    const id = this.authService.getProfile()?.id as string;
    this.userService.getById(id).subscribe(user => {
      this.user = user;
      this.setRolName();
      this.loading = false;
    });
  }

  showModalPwd(): void {
    const dialogRef = this.matDialog.open(ResetPwdModalComponent, {data: {id: this.user.id}, disableClose: true});

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  private setRolName(): void {
    switch (this.user.role) {
      case 'ADMINISTRATOR':
        this.rolName = 'Administrador';
        break;
      case 'STOCKER':
        this.rolName = 'Reponedor';
        break;
      default:
        this.rolName = '';
        break;
    }
  }

}
