import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticationModule} from "./authentication/authentication.module";
import {AuthenticationRoutingModule} from "./authentication/authentication-routing.module";
import {CoreModule} from "./core/core.module";
import {ProfileModule} from "./profile/profile.module";
import {ProfileRoutingModule} from "./profile/profile-routing.module";
import {BasicAuthHttpInterceptorService} from "./core/services/auth-http-interceptor.service";
import {AuthGuardService} from "./core/services/auth-guard.service";
import {RoleGuardService} from "./core/services/role-guard.service";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {AnnouncementModule} from "./announcement/announcement.module";
import {AnnouncementRoutingModule} from "./announcement/announcement-routing.module";
import {FormsModule} from "@angular/forms";

import {ChatModule} from "./chat/chat.module";
import {ChatRoutingModule} from "./chat/chat-routing.module";

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
    AnnouncementModule,
    AnnouncementRoutingModule,
    CoreModule,
    ChatModule,
    ChatRoutingModule,
    ProfileModule,
    ProfileRoutingModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true},
    AuthGuardService, RoleGuardService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
