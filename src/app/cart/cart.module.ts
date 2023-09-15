import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {CartComponent} from './cart/cart.component';
import {ModalTimeToPayComponent} from './modal-time-to-pay/modal-time-to-pay.component';
import {CartRoutingModule} from "./cart-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {DropDownPlacesComponent} from "./drop-down-places/drop-down-places.component";
import {GetnetButtonComponent} from "./getnet-button/getnet-button.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListOfClientsComponent} from './list-of-clients/list-of-clients.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ModalAvailableBottlesComponent} from './modal-available-bottles/modal-available-bottles.component';
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    CartComponent,
    ModalTimeToPayComponent,
    DropDownPlacesComponent,
    GetnetButtonComponent,
    ListOfClientsComponent,
    ModalAvailableBottlesComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }]
})
export class CartModule {
}
