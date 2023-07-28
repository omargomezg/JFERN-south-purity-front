import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlaceInterface} from '../../core/model';
import {PublicService} from '../../core/service/public.service';

@Component({
  selector: 'app-drop-down-places',
  templateUrl: './drop-down-places.component.html',
  styleUrls: ['./drop-down-places.component.css']
})
export class DropDownPlacesComponent implements OnInit {
  @Output() place = new EventEmitter<string>;

  places: PlaceInterface[] = [];
  selectPlace!: string;

  constructor(private publicService: PublicService) {
  }

  ngOnInit(): void {
    this.publicService.getPlaces().subscribe(places => {
      this.places = places
      this.places.push({
        id: '',
        country: '',
        address: 'Seleccione un punto de venta',
        availableStock: 0,
        padlocks: 0,
        status: 'ENABLED'
      });
      this.selectPlace = '';
      this.place.emit(this.selectPlace);
    });
  }

  emmitPlace(): void {
    this.place.emit(this.selectPlace);
  }
}
