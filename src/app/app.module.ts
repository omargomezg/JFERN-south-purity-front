import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { FooterComponent } from './core/component/footer/footer.component';
import { MyProfileComponent } from './component/my-profile/my-profile.component';
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withFetch } from "@angular/common/http";
import { TokenInterceptorService } from "./core/interceptor/token-interceptor.service";
import { RegisterComponent } from './component/register/register.component';
import { ToastrModule } from "ngx-toastr";
import { MatCardModule } from "@angular/material/card";
import { ResetPwdModalComponent } from './component/reset-pwd-modal/reset-pwd-modal.component';
import { MatDialogModule } from "@angular/material/dialog";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from './component/header/header.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { PlaceComponent } from './component/place/place.component';
import { ClientsComponent } from './component/clients/clients.component';
import { ClientFormComponent } from './component/client-form/client-form.component';
import { MatSelectModule } from '@angular/material/select';
import { UsersComponent } from './component/users/users.component';
import { FormPlaceComponent } from './component/form-place/form-place.component';
import { DrumsAvailableComponent } from './component/drums-available/drums-available.component';
import { DrumsComponent } from './component/drums/drums.component';
import { BuildPaymentResultComponent } from './component/build-payment-result/build-payment-result.component';
import { MatIconModule } from '@angular/material/icon';
import { RestorePasswordComponent } from './component/restore-password/restore-password.component';
import { ResetPwdWithCodeComponent } from './component/reset-pwd-with-code/reset-pwd-with-code.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { UserFormComponent } from './component/user-form/user-form.component';
import { MyCustomerProfileComponent } from "./component/my-customer-profile/my-customer-profile.component";
import { MyAdminProfileComponent } from "./component/my-admin-profile/my-admin-profile.component";
import { SocialLoginModule, SocialAuthServiceConfig, SOCIAL_AUTH_CONFIG, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

import { NgxGa4Module } from '@kattoshi/ngx-ga4';
import { ParagraphH1Component } from './component/paragraph-h1/paragraph-h1.component';
import { MatRadioModule } from "@angular/material/radio";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { RutValidatorDirective } from './core/directive/rut-validator.directive';
import { RutFormatPipe } from './core/pipe/rut-format.pipe';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        FooterComponent,
        MyProfileComponent,
        BuildPaymentResultComponent,
        RegisterComponent,
        ResetPwdModalComponent,
        MyOrdersComponent,
        DrumsAvailableComponent,
        DrumsComponent,
        ClientsComponent,
        ClientFormComponent,
        UsersComponent,
        HeaderComponent,
        FormPlaceComponent,
        PlaceComponent,
        DashboardComponent,
        RestorePasswordComponent,
        ResetPwdWithCodeComponent,
        UserFormComponent,
        MyCustomerProfileComponent,
        MyAdminProfileComponent,
        ParagraphH1Component,
        RutValidatorDirective,
        RutFormatPipe
    ],
    exports: [
        ParagraphH1Component
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        NgOptimizedImage,
        AppRoutingModule,
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
        MatMenuModule,
        NgxGa4Module.forRoot({ measurementId: 'G-FVKGFK1ZQD' }),
        MatRadioModule,
        MatAutocompleteModule,
        SocialLoginModule,
        GoogleSigninButtonModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
        {
            provide: SOCIAL_AUTH_CONFIG,
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('862673757450-dq2ojmbu0v48mosunvo2cs0citcgir3f.apps.googleusercontent.com', {
                            oneTapEnabled: false
                        })
                    }
                ],
                onError: (err) => {
                    console.error(err);
                }
            } as SocialAuthServiceConfig
        },
        provideClientHydration(),
        provideHttpClient(withInterceptorsFromDi(), withFetch())
    ]
})
export class AppModule {
}
