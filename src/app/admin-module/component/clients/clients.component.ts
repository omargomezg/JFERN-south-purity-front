import {Component, OnInit} from '@angular/core';
import {CommonAdminService} from "../../service/common-admin.service";
import {RoleEnum} from "../../../core/constant/role.enum";
import {UserInterface} from "../../service/interface/user.interface";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['identification', 'name', 'place', 'options'];
  dataSource: UserInterface[];

  constructor(private commonAdminService: CommonAdminService,) {
    this.dataSource = [];
  }

  ngOnInit(): void {
    this.commonAdminService.getUsers(RoleEnum.CUSTOMER).subscribe(customers => this.dataSource = customers);
  }

}
