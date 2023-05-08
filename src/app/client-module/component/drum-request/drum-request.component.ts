import {Component, OnInit} from '@angular/core';
import {PlaceInterface} from "../../service/model/place.interface";
import {CommonClientService} from "../../service/common-client.service";
import {AuthService} from "../../../core/service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {AddPlaceComponent} from "../add-place/add-place.component";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-drum-request',
  templateUrl: './drum-request.component.html',
  styleUrls: ['./drum-request.component.css']
})
export class DrumRequestComponent implements OnInit {
  formRequest = this.formBuilder.group({
    address: ['', Validators.required],
    quantity: ['', Validators.required]
  });
  places: PlaceInterface[];

  constructor(private commonService: CommonClientService, private matDialog: MatDialog,
              private formBuilder: FormBuilder) {
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
        this.places = places;
        this.formRequest.controls['address'].setValue(places[0].address);
      } else {
        const dialogRef = this.matDialog.open(AddPlaceComponent);

        dialogRef.afterClosed().subscribe(result => {
            this.loadPlaces();
        });
      }
    });
  }

}
