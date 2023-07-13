import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientModuleComponent} from './client-module.component';
import {MyOrdersComponent} from "../component/my-orders/my-orders.component";
import {AuthGuard} from '../core/auth.guard';

const routes: Routes = [
  {path: '', component: ClientModuleComponent},
  {path: 'mis-pedidos', component: MyOrdersComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientModuleRoutingModule {
}
