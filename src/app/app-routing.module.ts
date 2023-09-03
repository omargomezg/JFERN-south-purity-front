import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {MyProfileComponent} from "./component/my-profile/my-profile.component";
import {AuthGuard} from "./core/auth.guard";
import {HomeComponent} from "./component/home/home.component";
import {RegisterComponent} from "./component/register/register.component";
import {MyOrdersComponent} from './component/my-orders/my-orders.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {PlaceComponent} from './component/place/place.component';
import {ClientsComponent} from './component/clients/clients.component';
import {UsersComponent} from './component/users/users.component';
import {DrumsComponent} from './component/drums/drums.component';
import {BuildPaymentResultComponent} from './component/build-payment-result/build-payment-result.component';
import {ClientFormComponent} from './component/client-form/client-form.component';
import {ResetPwdWithCodeComponent} from "./component/reset-pwd-with-code/reset-pwd-with-code.component";

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled'
}

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registrate', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'puntos-de-venta', component: PlaceComponent},
  {path: 'agregar-bidones/:placeId', component: DrumsComponent, canActivate: [AuthGuard]},
  {path: 'clientes', component: ClientsComponent, canActivate: [AuthGuard]},
  {path: 'agregar-usuario', component: ClientFormComponent, canActivate: [AuthGuard]},
  {path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'usuario/:id', component: ClientFormComponent, canActivate: [AuthGuard]},
  {path: 'reset-password/:email', component: ResetPwdWithCodeComponent},
  {path: 'mis-datos', component: MyProfileComponent, canActivate: [AuthGuard]},
  {path: 'mis-pedidos', component: MyOrdersComponent, canActivate: [AuthGuard]},
  {path: 'payment-result/:reference', component: BuildPaymentResultComponent, canActivate: [AuthGuard]},
  {
    path: 'hacer-pedido',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./client-module/client-module.module').then(m => m.ClientModuleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'back-office',
    loadChildren: () => import('./administrator/administrator.module').then(m => m.AdministratorModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
