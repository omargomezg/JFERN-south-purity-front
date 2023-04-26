import {Component, OnInit} from '@angular/core';
import {PlaceInterface} from "../../service/interface/place.interface";
import {CommonClientService} from "../../service/common-client.service";

@Component({
  selector: 'app-drum-request',
  templateUrl: './drum-request.component.html',
  styleUrls: ['./drum-request.component.css']
})
export class DrumRequestComponent implements OnInit {
  formRequest: any;
  places: PlaceInterface[];

  constructor(private commonService: CommonClientService) {
    this.places = []
  }

  sendRequest(): void {

  }

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.commonService.getPlaces().subscribe(places => this.places = places);
  }

}
