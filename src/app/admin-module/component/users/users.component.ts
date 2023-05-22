import {Component, OnInit} from '@angular/core';
import {UserInterface} from "../../service/interface/user.interface";
import {CommonAdminService} from "../../service/common-admin.service";
import {RoleEnum} from "../../../core/constant/role.enum";
import {PageEvent} from "@angular/material/paginator";
import {PaginationModel} from "../../service/interface/pagination.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['identification', 'name', 'role', 'status', 'options'];
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
    console.log(e);
    this.pagination.page = e.pageIndex;
    this.pagination.size = e.pageSize;
    /*this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;*/
    this.loadUsers();
  }

  loadUsers(): void {
    this.commonAdminService.getUsers(undefined, this.pagination).subscribe(customers => {
      this.totalElements = customers.totalElements;
      this.dataSource = customers.content;
    });
  }

}