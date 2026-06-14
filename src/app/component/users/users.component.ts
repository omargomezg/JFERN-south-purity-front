import {Component, OnInit} from '@angular/core';
import {UserInterface} from "../../core/model/user.interface";
import {CommonAdminService} from "../../core/service";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {PaginationModel, UserFilterModel} from "../../core/model";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";
import {ParagraphH1Component} from "../paragraph-h1/paragraph-h1.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [
    CommonModule,
    MatPaginatorModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    ParagraphH1Component
  ],
  standalone: true
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['identification', 'email', 'name', 'role', 'status', 'options'];
  dataSource: UserInterface[] = [];
  pagination: PaginationModel = new PaginationModel();
  totalElements: number = 0

  constructor(private commonAdminService: CommonAdminService,) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  handlePageEvent(e: PageEvent) {
    this.pagination.pageIndex = e.pageIndex;
    this.pagination.pageSize = e.pageSize;
    this.loadUsers();
  }

  loadUsers(): void {
    let filter = new UserFilterModel();
    filter.role = 'ADMINISTRATOR,STOCKER';
    this.commonAdminService.getUsers(filter, this.pagination).subscribe(customers => {
      console.log(customers.content);
      this.totalElements = customers.totalElements;
      this.dataSource = customers.content;
    });
  }

}
