import {Component, OnInit} from '@angular/core';
import {PlaceInterface} from "../../service/model/place.interface";
import {CommonClientService} from "../../service/common-client.service";
import {AuthService} from "../../../core/service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {AddPlaceComponent} from "../add-place/add-place.component";

@Component({
  selector: 'app-drum-request',
  templateUrl: './drum-request.component.html',
  styleUrls: ['./drum-request.component.css']
})
export class DrumRequestComponent implements OnInit {
  formRequest: any;
  places: PlaceInterface[];

  constructor(private commonService: CommonClientService, private matDialog: MatDialog) {
    this.places = []
  }

  sendRequest(): void {

  }

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.commonService.getMyPlaces().subscribe(places => {
      if (places.length > 0) {
        this.places = places
      } else {
        const dialogRef = this.matDialog.open(AddPlaceComponent);

        dialogRef.afterClosed().subscribe(result => {
            this.loadPlaces();
        });
      }
    });
  }

}
