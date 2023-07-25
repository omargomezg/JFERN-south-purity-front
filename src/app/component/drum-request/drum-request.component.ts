import {Component, OnInit} from '@angular/core';
import {CommonClientService} from "../../client-module/service/common-client.service";
import {MatDialog} from "@angular/material/dialog";
import {AddPlaceComponent} from "../../client-module/component/add-place/add-place.component";
import {CartModel, DrumRequestModel} from "../../client-module/service/model";
import {PublicService} from '../../core/service/public.service';
import {PlaceInterface} from '../../core/model';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';
import {CartDetailModel} from '../../client-module/service/model/cart/cart-detail.model';

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
  loading = {
    waterDrums: true
  }
  isLogged: boolean;
  selectedPlace?: string;
  products = ProductEnum;
  cart: CartModel = new CartModel('');

  constructor(private commonService: CommonClientService,
              private publicService: PublicService,
              public authService: AuthService,
              private router: Router,
              private matDialog: MatDialog) {
    this.isLogged = this.authService.isLogged();
    this.places = []
  }

  sendRequest(): void {
    this.commonService.createSaleOrder(this.cart).subscribe(response => {
      sessionStorage.removeItem('cart');
      window.open(response.url, "_self");
    });
  }

  ngOnInit(): void {
    let cart =sessionStorage.getItem('cart');
    if(sessionStorage.getItem('cart') != null) {
      console.log(cart);
      // @ts-ignore
      this.cart = JSON.parse(cart);
    }

    this.loadWaterDrumsAvailable(this.selectedPlace as string);
  }

  loadWaterDrumsAvailable(place: string): void {
    this.loading.waterDrums = true;
    this.commonService.getWaterDrumsAvailable(place).subscribe(config => {
      this.config = config;
      this.loading.waterDrums = false;
    });
  }

  loadPlaces(): void {
    this.publicService.getPlaces().subscribe(places => {
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

  setPlace($event: string) {
    this.selectedPlace = $event;
    this.cart.place = $event;
    this.loadWaterDrumsAvailable($event);
  }

  addToCart(product: ProductEnum, description: string, price: number): void {
    if (this.selectedPlace === '') {
      return;
    }
    /*if (this.getTotalElements() === this.config.available) {
      return;
    }*/
    if (this.existsElement(description)) {
      this.cart.items.forEach(item => {
        if (item.description === description) {
          item.quantity++;
          item.subtotal = item.quantity * item.price;
        }
      })
    } else {
      let item = new CartDetailModel(1, price, description, price);
      this.cart.items.push(item);
      sessionStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }


  existsElement(description: string): boolean {
    return this.cart.items.filter(item => item.description === description).length > 0;
  }

  getTotalElements(): number {
    return this.cart.items.reduce((accumulator, object) => {
      return accumulator + object.quantity;
    }, 0);
  }

  getSubtotal(): number {
    return this.cart.items.reduce((accumulator, object) => {
      return accumulator + object.subtotal;
    }, 0);
  }

  showLogin(): void {
    this.router.navigateByUrl('/login');
  }

  delete(index: number): void {
    this.cart.items.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
