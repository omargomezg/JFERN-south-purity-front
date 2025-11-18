import {Component} from '@angular/core';
import {CartModel, DrumRequestModel} from "../../client-module/service/model";
import {PlaceInterface} from "../../core/model";
import {CommonClientService} from "../../client-module/service/common-client.service";
import {AuthService} from "../../core/service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CartDetailModel} from "../../client-module/service/model/cart/cart-detail.model";
import {PAYMENT_TYPE, TYPE_OF_BOTTLES} from "../../core/constant/app.constants";
import {ModalTimeToPayComponent} from "../modal-time-to-pay/modal-time-to-pay.component";
import {ModalAvailableBottlesComponent} from "../modal-available-bottles/modal-available-bottles.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  config: DrumRequestModel[] = [];
  places: PlaceInterface[];
  loading = {
    waterDrums: true
  }
  isLogged: boolean;
  profile = this.authService.getProfile();
  products = TYPE_OF_BOTTLES;
  cart: CartModel = new CartModel();
  protected readonly PAYMENT_TYPE = PAYMENT_TYPE;

  constructor(private readonly commonService: CommonClientService,
              public authService: AuthService,
              private readonly router: Router,
              private readonly toastr: ToastrService,
              private readonly matDialog: MatDialog) {
    this.isLogged = this.authService.isLogged();
    this.places = []
  }

  ngOnInit(): void {
    let cart = sessionStorage.getItem('cart');
    if (cart != null) {
      this.cart = JSON.parse(cart) as CartModel;
      if (this.cart.place)
        this.loadWaterDrumsAvailable();
    } else {
      //this.loadWaterDrumsAvailable();
    }
    this.setAuthenticatedClient();
  }

  setAuthenticatedClient(): void {
    let profile = this.authService.getProfile();
    if (profile?.role == 'CUSTOMER') {
      this.cart.client.id = profile.id;
    }
  }

  loadWaterDrumsAvailable(): void {
    if (this.cart.place !== undefined && this.cart.place.id) {
      this.loading.waterDrums = true;
      this.commonService.getWaterDrumsAvailable(this.cart.place).subscribe((bottles: DrumRequestModel[]) => {
        this.config = bottles.map(bottle => ({
          available: bottle.available,
          description: bottle.description,
          refillPrice: bottle.refillPrice,
          bottlePrice: bottle.bottlePrice,
          isRefill: true
        }));
        this.loading.waterDrums = false;
      });
    } else {
      this.config = [];
    }
  }

  onSelectedPlace(place: PlaceInterface): void {
    this.cart.place = place;
    this.loadWaterDrumsAvailable();
  }

  addToCart(price: DrumRequestModel): void {
    if (!this.cart.place.id) {
      return;
    }
    if (this.existsElement(price.description)) {
      this.cart.items.forEach(item => {
        if (item.description === price.description) {
          item.quantity++;
          item.subtotal += this.isTrue(price.isRefill) ? price.refillPrice : price.refillPrice + price.bottlePrice;
        }
      })
    } else {
      let item = new CartDetailModel(1, this.isTrue(price.isRefill) ? price.refillPrice : price.refillPrice + price.bottlePrice, price.description);
      this.cart.items.push(item);
      sessionStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  hasAvailableBottles(description: string, available: number): boolean {
    let bottle = this.config.find(bottle => bottle.description === description)?.available ?? 0;
    let cart = this.cart.items.find(item => item.description === description)?.quantity ?? 0;
    return bottle > cart;
  }

  isTrue(value: boolean): boolean {
    if (value === undefined || value === null)
      return true;
    return value;
  }

  existsElement(description: string): boolean {
    return this.cart.items.filter(item => item.description === description).length > 0;
  }

  getSubtotal(): number {
    return this.cart.items.reduce((accumulator, object) => {
      return accumulator + object.subtotal;
    }, 0);
  }

  showLogin(): void {
    this.router.navigateByUrl('/login');
  }

  delete(index: number, quantity: number): void {
    this.cart.products.splice(quantity);
    this.cart.items.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  pay(): void {
    if (this.cart.paymentType === PAYMENT_TYPE.GETNET || this.cart.paymentType === PAYMENT_TYPE.TRANSBANK) {
      const payDialog = this.matDialog.open(ModalTimeToPayComponent, {
        data: this.cart
      });
      payDialog.afterClosed().subscribe(() => {

      });
    } else {
      this.commonService.createSaleOrder(this.cart).subscribe(() => {
        this.clearForm();
        this.toastr.success('Venta al Contado realizada con éxito', 'Venta al Contado');
      });
    }
  }

  showAvailableBottles() {
    const payDialog = this.matDialog.open(ModalAvailableBottlesComponent, {
      data: this.cart,
      height: '100vh',
      width: '320px',
      position: {right: '10px', top: '10px'}
    });
    payDialog.afterClosed().subscribe(cart => {
      if (cart != undefined) {
        this.cart = cart;
        sessionStorage.setItem('cart', JSON.stringify(this.cart));
      }
    });
  }

  onChangeClient(clientId: string): void {
    this.cart.client.id = clientId;
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearForm(): void {
    let place = this.cart.place;
    sessionStorage.removeItem('cart');
    this.cart = new CartModel();
    this.cart.place = place;
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  onChangePaymentType(paymentType: string): void {
    this.cart.paymentType = paymentType;
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
