import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormPlaceComponent} from "../form-place/form-place.component";
import {CommonAdminService} from "../../service/common-admin.service";
import {PlaceInterface} from "../../service/interface/place.interface";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent {
  displayedColumns: string[] = ['name', 'options'];
  // @ts-ignore
  dataSource: PlaceInterface[];

  constructor(private dialog: MatDialog, private commonAdminService: CommonAdminService) {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.commonAdminService.getPlaces().subscribe(places => this.dataSource = places);
  }

  add() {
    this.openModal(null);
  }

  edit(place: PlaceInterface): void {
    this.openModal(place);
  }

  openModal(place: PlaceInterface | null): void {
    const dialogRef = this.dialog.open(FormPlaceComponent, {
      data: place,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadPlaces();
    });
  }
}
