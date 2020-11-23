import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticationModule} from "./authentication/authentication.module";
import {AuthenticationRoutingModule} from "./authentication/authentication-routing.module";
import {CoreModule} from "./core/core.module";
import {BasicAuthHttpInterceptorService} from "./core/services/auth-http-interceptor.service";
import {AuthGuardService} from "./core/services/auth-guard.service";
import {RoleGuardService} from "./core/services/role-guard.service";
import {JWT_OPTIONS} from "@auth0/angular-jwt";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
    AuthenticationRoutingModule,
    CoreModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true},
    AuthGuardService, RoleGuardService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},],
  bootstrap: [AppComponent]
})
export class AppModule {
}
