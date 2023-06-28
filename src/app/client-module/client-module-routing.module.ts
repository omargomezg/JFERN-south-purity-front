import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientModuleComponent} from './client-module.component';
import {DrumRequestComponent} from "./component/drum-request/drum-request.component";
import {MyOrdersComponent} from "./component/my-orders/my-orders.component";
import {BuildPaymentResultComponent} from "./component/build-payment-result/build-payment-result.component";

const routes: Routes = [
  {path: '', component: ClientModuleComponent},
  {path: 'hacer-pedido', component: DrumRequestComponent},
  {path: 'mis-pedidos', component: MyOrdersComponent},
  {path: 'payment-result/:reference', component: BuildPaymentResultComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientModuleRoutingModule {
}
