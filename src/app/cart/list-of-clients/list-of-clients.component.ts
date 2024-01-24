import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CommonAdminService} from "../../core/service/common-admin.service";
import {PaginationModel, PlaceInterface, UserFilterModel} from "../../core/model";
import {UserInterface} from "../../core/model/user.interface";

@Component({
  selector: 'app-list-of-clients',
  templateUrl: './list-of-clients.component.html',
  styleUrls: ['./list-of-clients.component.scss']
})
export class ListOfClientsComponent implements OnChanges {
  @Input() place: PlaceInterface | undefined;
  @Output() clientId = new EventEmitter<string>();
  clients: UserInterface[] = [];
  selectedClient: string | undefined;
  pagination = new PaginationModel();

  constructor(private commonAdminService: CommonAdminService) {
    this.pagination.pageSize = 50;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.place) {
      let filter = new UserFilterModel();
      filter.placeId = this.place.id;
      this.commonAdminService.getUsers(filter, this.pagination).subscribe(response => {
        this.clients = response.content;
      });
    }
  }

  onClientChange(): void {
    console.log(this.selectedClient);
    this.clientId.emit(this.selectedClient);
  }
}
