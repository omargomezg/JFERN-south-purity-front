import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {MyProfileComponent} from "./component/my-profile/my-profile.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'mi-perfil', component: MyProfileComponent},
  {path: 'cliente', loadChildren: () => import('./client-module/client-module.module').then(m => m.ClientModuleModule)},
  {
    path: 'administrador',
    loadChildren: () => import('./admin-module/admin-module.module').then(m => m.AdminModuleModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
