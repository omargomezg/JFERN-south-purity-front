import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModuleComponent } from './admin-module.component';
import { ClientsComponent } from './component/clients/clients.component';
import { PlaceComponent } from './component/place/place.component';
import { DrumsComponent } from './component/drums/drums.component';
import {ConfigurationComponent} from "./component/configuration/configuration.component";
import {ClientFormComponent} from "./component/client-form/client-form.component";
import {UsersComponent} from "./component/users/users.component";

const routes: Routes = [
  { path: '', component: AdminModuleComponent },
  { path: 'clientes', component: ClientsComponent },
  { path: 'cliente/:id', component: ClientFormComponent },
  { path: 'crear-cliente', component: ClientFormComponent },
  { path: 'usuarios', component: UsersComponent },
  { path: 'lugares', component: PlaceComponent },
  { path: 'bidones', component: DrumsComponent },
  { path: 'configuracion', component: ConfigurationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
