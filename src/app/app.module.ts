import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {FooterComponent} from './core/component/footer/footer.component';
import {MyProfileComponent} from './component/my-profile/my-profile.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './component/home/home.component';
import {TokenInterceptorService} from "./core/interceptor/token-interceptor.service";
import {RegisterComponent} from './component/register/register.component';
import {ToastrModule} from "ngx-toastr";
import {MatCardModule} from "@angular/material/card";
import {ResetPwdModalComponent} from './component/reset-pwd-modal/reset-pwd-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {ContactComponent} from './component/contact/contact.component';
import {MyOrdersComponent} from './component/my-orders/my-orders.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {DrumRequestComponent} from './component/drum-request/drum-request.component';
import {GetnetButtonComponent} from './component/getnet-button/getnet-button.component';
import {DropDownPlacesComponent} from './component/drop-down-places/drop-down-places.component';
import {VerticalMenuComponent} from './component/vertical-menu/vertical-menu.component';
import {HeaderComponent} from './component/header/header.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {PlaceComponent} from './component/place/place.component';
import {ClientsComponent} from './component/clients/clients.component';
import {ClientFormComponent} from './component/client-form/client-form.component';
import {MatSelectModule} from '@angular/material/select';
import {UsersComponent} from './component/users/users.component';
import {FormPlaceComponent} from './component/form-place/form-place.component';
import {ConfigurationComponent} from './component/configuration/configuration.component';
import {DrumsAvailableComponent} from './component/drums-available/drums-available.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    MyProfileComponent,
    HomeComponent,
    RegisterComponent,
    ResetPwdModalComponent,
    MyOrdersComponent,
    DrumRequestComponent,
    DrumsAvailableComponent,
    ClientsComponent,
    ClientFormComponent,
    UsersComponent,
    ConfigurationComponent,
    GetnetButtonComponent,
    DropDownPlacesComponent,
    ContactComponent,
    VerticalMenuComponent,
    HeaderComponent,
    FormPlaceComponent,
    PlaceComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    LoadingBarHttpClientModule,
    ToastrModule.forRoot(),
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  exports: [
    VerticalMenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
