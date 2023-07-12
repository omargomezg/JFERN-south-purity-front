import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientModuleComponent} from './client-module.component';
import {DrumRequestComponent} from "../component/drum-request/drum-request.component";
import {MyOrdersComponent} from "../component/my-orders/my-orders.component";
import {BuildPaymentResultComponent} from "./component/build-payment-result/build-payment-result.component";
import {AuthGuard} from '../core/auth.guard';

const routes: Routes = [
  {path: '', component: ClientModuleComponent},
  {path: 'mis-pedidos', component: MyOrdersComponent, canActivate: [AuthGuard]},
  {path: 'payment-result/:reference', component: BuildPaymentResultComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientModuleRoutingModule {
}
