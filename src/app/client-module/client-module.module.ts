import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientModuleRoutingModule } from './client-module-routing.module';
import { ClientModuleComponent } from './client-module.component';
import { DrumRequestComponent } from './component/drum-request/drum-request.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import { MyRequestsComponent } from './component/my-requests/my-requests.component';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    ClientModuleComponent,
    DrumRequestComponent,
    MyRequestsComponent
  ],
  imports: [
    CommonModule,
    ClientModuleRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class ClientModuleModule { }
