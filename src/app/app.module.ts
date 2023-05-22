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
import { ResetPwdModalComponent } from './component/reset-pwd-modal/reset-pwd-modal.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    MyProfileComponent,
    HomeComponent,
    RegisterComponent,
    ResetPwdModalComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        MatCardModule,
        MatDialogModule
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
