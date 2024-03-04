import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigurationComponent} from './configuration/configuration.component';
import {AdministratorRoutingModule} from "./administrator-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SalesComponent} from './sales/sales.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    ConfigurationComponent,
    SalesComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
      MatPaginatorModule
  ]
})
export class AdministratorModule {
}
