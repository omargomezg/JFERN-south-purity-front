import {RouterModule, Routes} from "@angular/router";
import {ConfigurationComponent} from "./configuration/configuration.component";
import {NgModule} from "@angular/core";
import {SalesComponent} from "./sales/sales.component";

const routes: Routes = [
  {path: '', component: ConfigurationComponent},
  {path: 'ventas', component: SalesComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule {
}
