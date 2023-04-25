import {Component} from '@angular/core';

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
  dataSource = ELEMENT_DATA;

}
