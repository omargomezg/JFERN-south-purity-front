import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {MyProfileComponent} from "./component/my-profile/my-profile.component";
import {AuthGuard} from "./core/auth.guard";
import {HomeComponent} from "./component/home/home.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
