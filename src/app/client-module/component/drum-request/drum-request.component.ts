import {Component, OnInit} from '@angular/core';
import {PlaceInterface} from "../../service/model/place.interface";
import {CommonClientService} from "../../service/common-client.service";
import {MatDialog} from "@angular/material/dialog";
import {AddPlaceComponent} from "../add-place/add-place.component";
import {MatSelectChange} from "@angular/material/select";
import {CartInterface, DrumRequestModel} from "../../service/model";

export enum ProductEnum {
  'WATER_DRUM', 'WATER_DRUM_WITH_BOTTLE'
}

@Component({
  selector: 'app-drum-request',
  templateUrl: './drum-request.component.html',
  styleUrls: ['./drum-request.component.css']
})
export class DrumRequestComponent implements OnInit {
  config = new DrumRequestModel();
  places: PlaceInterface[];
  products = ProductEnum;
  cart: CartInterface[] = [];

  constructor(private commonService: CommonClientService,
              private matDialog: MatDialog) {
    this.places = []
  }

  sendRequest(): void {
    this.commonService.createSaleOrder(this.places[0].id, this.cart).subscribe(response => {
      window.open(response.url, "_self");
    });
  }

  ngOnInit(): void {
    this.loadPlaces();
    this.loadPrice();
  }

  loadPrice(): void {
    // this.commonService.getPrice().subscribe(con => this.config = price);
  }

  loadWaterDrumsAvailable(place: string): void {
    this.commonService.getWaterDrumsAvailable(place).subscribe(config => {
      this.config = config;
    });
  }

  loadPlaces(): void {
    this.commonService.getMyPlaces().subscribe(places => {
      if (places.length > 0) {
        this.places = places;
        this.loadWaterDrumsAvailable(places[0].id);
      } else {
        const dialogRef = this.matDialog.open(AddPlaceComponent);

        dialogRef.afterClosed().subscribe(result => {
          this.loadPlaces();
        });
      }
    });
  }

  selectedPlace($event: MatSelectChange) {
    this.loadWaterDrumsAvailable($event.value);
  }

  addToCart(product: ProductEnum, description: string, price: number): void {
    if (this.getTotalElements() === this.config.available) {
      return;
    }
    if (this.existsElement(description)) {
      this.cart.forEach(item => {
        if (item.description === description) {
          item.quantity++;
          item.subtotal = item.quantity * item.price;
        }
      })
    } else {
      let item: CartInterface = {
        quantity: 1,
        price,
        description,
        subtotal: price
      };
      this.cart.push(item);
    }
  }


  existsElement(description: string): boolean {
    return this.cart.filter(item => item.description === description).length > 0;
  }

  getTotalElements(): number {
    return this.cart.reduce((accumulator, object) => {
      return accumulator + object.quantity;
    }, 0);
  }

  getSubtotal(): number {
    return this.cart.reduce((accumulator, object) => {
      return accumulator + object.subtotal;
    }, 0);
  }
}
