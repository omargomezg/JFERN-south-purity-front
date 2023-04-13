import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModuleComponent } from './admin-module.component';
import { ClientsComponent } from './component/clients/clients.component';
import { PlaceComponent } from './component/place/place.component';
import { DrumsComponent } from './component/drums/drums.component';

const routes: Routes = [
  { path: '', component: AdminModuleComponent },
  { path: 'clientes', component: ClientsComponent },
  { path: 'lugares', component: PlaceComponent },
  { path: 'bidones', component: DrumsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
