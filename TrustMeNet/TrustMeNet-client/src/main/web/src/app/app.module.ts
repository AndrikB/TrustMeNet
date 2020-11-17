import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticationModule} from "./authentication/authentication.module";
import {AuthenticationRoutingModule} from "./authentication/authentication-routing.module";
import {CoreModule} from "./core/core.module";

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
