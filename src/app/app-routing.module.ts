import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {MyProfileComponent} from "./component/my-profile/my-profile.component";
import {AuthGuard} from "./core/auth.guard";
import {HomeComponent} from "./component/home/home.component";
import {RegisterComponent} from "./component/register/register.component";
import {DrumRequestComponent} from './component/drum-request/drum-request.component';

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled'
}

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registrate', component: RegisterComponent},
  {path: 'hacer-pedido', component: DrumRequestComponent},
  {path: 'home', component: HomeComponent},
  {path: 'mi-perfil', component: MyProfileComponent, canActivate: [AuthGuard]},
  {
    path: 'cliente',
    loadChildren: () => import('./client-module/client-module.module').then(m => m.ClientModuleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'administrador',
    loadChildren: () => import('./admin-module/admin-module.module').then(m => m.AdminModuleModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
