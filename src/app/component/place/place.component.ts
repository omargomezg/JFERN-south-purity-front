import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormPlaceComponent} from "../form-place/form-place.component";
import {CommonAdminService} from "../../core/service/common-admin.service";
import {PlaceInterface} from "../../core/model";
import {Router} from '@angular/router';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent {
  displayedColumns: string[] = ['city', 'name', 'options'];
  dataSource: PlaceInterface[] = [];

  constructor(private dialog: MatDialog, private commonAdminService: CommonAdminService,
              private router: Router) {
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

  addBottles(): void {
    this.router.navigateByUrl('/agregar-bidones');
  }
}
