import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientModuleRoutingModule} from './client-module-routing.module';
import {ClientModuleComponent} from './client-module.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {AddPlaceComponent} from './component/add-place/add-place.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    ClientModuleComponent,
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
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ]
})
export class ClientModuleModule {
}
