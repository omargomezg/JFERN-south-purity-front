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
import {HeaderComponent} from './component/header/header.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {PlaceComponent} from './component/place/place.component';
import {ClientsComponent} from './component/clients/clients.component';
import {ClientFormComponent} from './component/client-form/client-form.component';
import {MatSelectModule} from '@angular/material/select';
import {UsersComponent} from './component/users/users.component';
import {FormPlaceComponent} from './component/form-place/form-place.component';
import {DrumsAvailableComponent} from './component/drums-available/drums-available.component';
import {DrumsComponent} from './component/drums/drums.component';
import {BuildPaymentResultComponent} from './component/build-payment-result/build-payment-result.component';
import {MatIconModule} from '@angular/material/icon';
import {RestorePasswordComponent} from './component/restore-password/restore-password.component';
import {ResetPwdWithCodeComponent} from './component/reset-pwd-with-code/reset-pwd-with-code.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatMenuModule} from "@angular/material/menu";
import {UserFormComponent} from './component/user-form/user-form.component';
import {MyCustomerProfileComponent} from "./component/my-customer-profile/my-customer-profile.component";
import {MyAdminProfileComponent} from "./component/my-admin-profile/my-admin-profile.component";

/*import { MyCustomerProfileComponent } from './component/my-customer-profile/my-customer-profile.component';
import { MyAdminProfileComponent } from './component/my-admin-profile/my-admin-profile.component';*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    MyProfileComponent,
    HomeComponent,
    BuildPaymentResultComponent,
    RegisterComponent,
    ResetPwdModalComponent,
    MyOrdersComponent,
    DrumsAvailableComponent,
    DrumsComponent,
    ClientsComponent,
    ClientFormComponent,
    UsersComponent,
    ContactComponent,
    HeaderComponent,
    FormPlaceComponent,
    PlaceComponent,
    DashboardComponent,
    RestorePasswordComponent,
    ResetPwdWithCodeComponent,
    UserFormComponent,
    MyCustomerProfileComponent,
    MyAdminProfileComponent
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
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule,
    MatMenuModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
