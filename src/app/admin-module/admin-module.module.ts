import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminModuleRoutingModule} from './admin-module-routing.module';
import {AdminModuleComponent} from './admin-module.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {ClientsComponent} from './component/clients/clients.component';
import {DrumsComponent} from './component/drums/drums.component';
import {PlaceComponent} from './component/place/place.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {FormPlaceComponent} from './component/form-place/form-place.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ConfigurationComponent } from './component/configuration/configuration.component';
import { ClientFormComponent } from './component/client-form/client-form.component';
import {MatTabsModule} from "@angular/material/tabs";
import { UsersComponent } from './component/users/users.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { DrumsAvailableComponent } from './component/drums-available/drums-available.component';
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    AdminModuleComponent,
    DashboardComponent,
    ClientsComponent,
    DrumsComponent,
    PlaceComponent,
    FormPlaceComponent,
    ConfigurationComponent,
    ClientFormComponent,
    UsersComponent,
    DrumsAvailableComponent
  ],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatCardModule
  ]
})
export class AdminModuleModule {
}
