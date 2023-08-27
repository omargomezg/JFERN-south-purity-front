import {Component, OnInit} from '@angular/core';
import {UserInterface} from "../../core/model/user.interface";
import {CommonAdminService} from "../../core/service/common-admin.service";
import {PageEvent} from "@angular/material/paginator";
import {PaginationModel, UserFilterModel} from "../../core/model";

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
        this.pagination.pageIndex = e.pageIndex;
        this.pagination.pageSize = e.pageSize;
        this.loadUsers();
    }

    loadUsers(): void {
        let filter = new UserFilterModel();
        filter.role = 'ADMINISTRATOR,CUSTOMER';
        this.commonAdminService.getUsers(filter, this.pagination).subscribe(customers => {
            this.totalElements = customers.totalElements;
            this.dataSource = customers.content;
        });
    }

}
