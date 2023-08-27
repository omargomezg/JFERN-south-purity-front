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
    styleUrls: ['./cart.component.css']
})
export class CartComponent {
    config = new DrumRequestModel();
    places: PlaceInterface[];
    loading = {
        waterDrums: true
    }
    isLogged: boolean;
    profile = this.authService.getProfile();
    products = TYPE_OF_BOTTLES;
    cart: CartModel = new CartModel();
    protected readonly PAYMENT_TYPE = PAYMENT_TYPE;

    constructor(private commonService: CommonClientService,
                public authService: AuthService,
                private router: Router,
                private toastr: ToastrService,
                private matDialog: MatDialog) {
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
            this.commonService.getWaterDrumsAvailable(this.cart.place).subscribe((config: DrumRequestModel) => {
                this.config = config;
                this.loading.waterDrums = false;
            });
        } else {
            this.config = new DrumRequestModel();
        }
    }

    onSelectedPlace(place: PlaceInterface): void {
        this.cart.place = place;
        this.loadWaterDrumsAvailable();
    }

    addToCart(product: TYPE_OF_BOTTLES, description: string, price: number): void {
        if (this.cart.place.id === '') {
            return;
        }
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
        if (this.cart.paymentType === PAYMENT_TYPE.GETNET) {
            const payDialog = this.matDialog.open(ModalTimeToPayComponent, {
                data: this.cart
            });
            payDialog.afterClosed().subscribe(result => {

            });
        } else {
            this.commonService.createSaleOrder(this.cart).subscribe(response => {
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
