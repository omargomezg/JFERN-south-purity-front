import {Component, OnInit} from '@angular/core';
import {PlaceInterface} from "../../service/model/place.interface";
import {CommonClientService} from "../../service/common-client.service";
import {MatDialog} from "@angular/material/dialog";
import {AddPlaceComponent} from "../add-place/add-place.component";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-drum-request',
  templateUrl: './drum-request.component.html',
  styleUrls: ['./drum-request.component.css']
})
export class DrumRequestComponent implements OnInit {
  max: number = 0;
  formRequest = this.formBuilder.group({
    address: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(0), Validators.max(this.max)]]
  });
  price = 1200;
  total = 0;
  places: PlaceInterface[];

  constructor(private commonService: CommonClientService, private matDialog: MatDialog,
              private formBuilder: FormBuilder) {
    this.places = []
  }

  sendRequest(): void {

  }

  ngOnInit(): void {
    this.loadPlaces();
    this.loadPrice();
  }

  loadPrice(): void {
    this.commonService.getPrice().subscribe(price => this.price = price);
  }

  loadWaterDrumsAvailable(place: string): void {
    this.commonService.getWaterDrumsAvailable(place).subscribe(quantity => {
      this.max = quantity;
      this.formRequest.controls['quantity'].setValidators([Validators.max(quantity), Validators.required]);
      this.setTotal();
    });
  }

  loadPlaces(): void {
    this.commonService.getMyPlaces().subscribe(places => {
      if (places.length > 0) {
        this.places = places;
        this.formRequest.controls['address'].setValue(places.filter(place => place.isPrimary)[0].id);
        this.loadWaterDrumsAvailable(places[0].id);
      } else {
        const dialogRef = this.matDialog.open(AddPlaceComponent);

        dialogRef.afterClosed().subscribe(result => {
          this.loadPlaces();
        });
      }
    });
  }

  setTotal(): void {
    const quantity = this.formRequest.controls['quantity'].value as number;
    this.total = this.price * quantity;
  }

  selectedPlace($event: MatSelectChange) {
    this.loadWaterDrumsAvailable($event.value);
  }
}
