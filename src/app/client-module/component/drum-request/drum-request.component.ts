import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../admin-module/service/common.service";

@Component({
  selector: 'app-drum-request',
  templateUrl: './drum-request.component.html',
  styleUrls: ['./drum-request.component.css']
})
export class DrumRequestComponent implements OnInit {
  formRequest: any;
  places: any;

  constructor(private commonService: CommonService) {
  }

  sendRequest(): void {

  }

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.commonService.getPlace().subscribe(places => this.places = places);
  }

}
