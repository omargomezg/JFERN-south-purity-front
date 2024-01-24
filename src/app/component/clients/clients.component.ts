import {Component, OnInit} from '@angular/core';
import {CommonAdminService} from "../../core/service";
import {UserInterface} from "../../core/model/user.interface";
import {PaginationModel, UserFilterModel} from "../../core/model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
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
    this.pagination.pageIndex = e.pageIndex;
    this.pagination.pageSize = e.pageSize;
    this.loadUsers();
  }

  loadUsers(): void {
    this.commonAdminService.getUsers(new UserFilterModel(), this.pagination).subscribe(customers => {
      this.totalElements = customers.totalElements;
      this.dataSource = customers.content;
    });
  }

}
