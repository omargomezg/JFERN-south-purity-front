import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientModuleRoutingModule} from './client-module-routing.module';
import {ClientModuleComponent} from './client-module.component';
import {DrumRequestComponent} from '../component/drum-request/drum-request.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MyOrdersComponent} from './component/my-orders/my-orders.component';
import {MatTableModule} from "@angular/material/table";
import {AddPlaceComponent} from './component/add-place/add-place.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {BuildPaymentResultComponent} from './component/build-payment-result/build-payment-result.component';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {GetnetButtonComponent} from './component/getnet-button/getnet-button.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {AppModule} from '../app.module';

@NgModule({
  declarations: [
    ClientModuleComponent,
    DrumRequestComponent,
    MyOrdersComponent,
    AddPlaceComponent,
    BuildPaymentResultComponent,
    GetnetButtonComponent
  ],
    imports: [
        CommonModule,
        ClientModuleRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
        MatDialogModule,
        MatCheckboxModule,
        MatIconModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        AppModule
    ]
})
export class ClientModuleModule {
}
