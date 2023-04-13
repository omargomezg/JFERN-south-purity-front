import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModuleRoutingModule } from './admin-module-routing.module';
import { AdminModuleComponent } from './admin-module.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ClientsComponent } from './component/clients/clients.component';
import { DrumsComponent } from './component/drums/drums.component';
import { PlaceComponent } from './component/place/place.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    AdminModuleComponent,
    DashboardComponent,
    ClientsComponent,
    DrumsComponent,
    PlaceComponent
  ],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class AdminModuleModule { }
