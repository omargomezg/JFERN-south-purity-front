import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormPlaceComponent} from "../form-place/form-place.component";
import {CommonService} from "../../service/common.service";
import {PlaceInterface} from "../../service/interface/place.interface";

export interface PeriodicElement {
  address: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {address: 'Condominio Las Luces #443',},
  {address: 'Condominio Las Luces #443',},
  {address: 'Altamar Norte #34',},
  {address: 'Las Cruces',},
  {address: 'Santa Filomena de Nos, Camino a la Ruta',},
];

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent {
  displayedColumns: string[] = ['name', 'options'];
  // @ts-ignore
  dataSource: PlaceInterface[];

  constructor(private dialog: MatDialog, private commonService: CommonService) {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.commonService.getPlaces().subscribe(places => this.dataSource = places);
  }

  addPlace() {
    const dialogRef = this.dialog.open(FormPlaceComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadPlaces();
    });
  }
}
