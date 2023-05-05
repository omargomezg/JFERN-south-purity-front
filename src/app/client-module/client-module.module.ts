import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientModuleRoutingModule } from './client-module-routing.module';
import { ClientModuleComponent } from './client-module.component';
import { DrumRequestComponent } from './component/drum-request/drum-request.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import {MatTableModule} from "@angular/material/table";
import { AddPlaceComponent } from './component/add-place/add-place.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    ClientModuleComponent,
    DrumRequestComponent,
    MyOrdersComponent,
    AddPlaceComponent
  ],
    imports: [
        CommonModule,
        ClientModuleRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
        MatDialogModule
    ]
})
export class ClientModuleModule { }
