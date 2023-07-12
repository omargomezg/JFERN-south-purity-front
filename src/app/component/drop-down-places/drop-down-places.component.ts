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
      this.selectPlace = places[0].id;
    });
  }

  emmitPlace(): void {
    this.place.emit(this.selectPlace);
  }
}
