import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CommonAdminService} from "../../core/service/common-admin.service";
import {PaginationModel, PlaceInterface, UserFilterModel} from "../../core/model";

@Component({
  selector: 'app-list-of-clients',
  templateUrl: './list-of-clients.component.html',
  styleUrls: ['./list-of-clients.component.css']
})
export class ListOfClientsComponent implements OnChanges {
  @Input() place: PlaceInterface | undefined;
  @Output() clientId = new EventEmitter<string>();
  clients: any[] = [];
  pagination = new PaginationModel();

  constructor(private commonAdminService: CommonAdminService) {
    this.pagination.pageSize = 50;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.place) {
      let filter = new UserFilterModel();
      filter.placeId = this.place.id;
      this.commonAdminService.getUsers(filter, this.pagination).subscribe(response => {
        this.addDefaultValue(response.totalElements);
        response.content.forEach(client => this.clients.push(client));
      });
    }
  }

  addDefaultValue(size: number): void {
    if (size > 0) {
      this.clients.push({id: '', fullName: 'Seleccione un cliente'});
    }
  }

  onClientChange($event: any) {
    this.clientId.emit($event.target.value);
  }
}
