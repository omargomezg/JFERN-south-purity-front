import {Component, OnInit} from '@angular/core';
import {CommonAdminService} from "../../service/common-admin.service";
import {RoleEnum} from "../../../core/constant/role.enum";
import {UserInterface} from "../../service/interface/user.interface";
import {PaginationModel} from "../../service/interface/pagination.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['identification', 'name', 'email', 'place', 'options'];
  dataSource: UserInterface[];
  pagination: PaginationModel = new PaginationModel();
  totalElements: number = 0

  constructor(private commonAdminService: CommonAdminService,) {
    this.dataSource = [];
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  handlePageEvent(e: PageEvent) {
    this.pagination.page = e.pageIndex;
    this.pagination.size = e.pageSize;
    this.loadUsers();
  }

  loadUsers(): void {
    this.commonAdminService.getUsers(RoleEnum.CUSTOMER, this.pagination).subscribe(customers => {
      this.totalElements = customers.totalElements;
      this.dataSource = customers.content;
    });
  }

}
