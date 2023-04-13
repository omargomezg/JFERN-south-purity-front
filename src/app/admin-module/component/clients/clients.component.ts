import { Component } from '@angular/core';
import {PeriodicElement} from "../../../client-module/component/my-requests/my-requests.component";
interface client {
  identification: string;
  name: string;
  place: string
}
const ELEMENT_DATA: client[] = [
  {identification: '15265145-K', name: 'Jose Antonio Diaz Robles', place: 'Condominio Los Notros'},
  {identification: '24354253-3', name: 'Mauricio Lopez', place: 'Condominio Los Notros'},
  {identification: '1123980-1', name: 'Maria Jose Puga', place: 'Parque San Peter'},
  {identification: '62566537-3', name: 'Katherine Vit', place: 'Parque San Peter'},
  {identification: '16768889-2', name: 'Rich Matamala', place: 'Condominio Los Notros'},
  {identification: '12888394-2', name: 'Amir Dalama Rojas', place: 'Las Acacias Int'},
  {identification: '23454289-2', name: 'Jopphre Raysuth Jo', place: 'Condominio Los Notros'},
  {identification: '19823990-1', name: 'Pedro Paladin Jhon', place: 'Las Acacias Int'},
];
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  displayedColumns: string[] = ['identification', 'name', 'place', 'options'];
  dataSource = ELEMENT_DATA;

}
