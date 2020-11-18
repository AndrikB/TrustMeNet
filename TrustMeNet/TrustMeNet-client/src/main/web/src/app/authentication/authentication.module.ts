import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationComponent} from './registration/registration.component';
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from './login/login.component';


@NgModule({
  declarations: [RegistrationComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
  ]
})
export class AuthenticationModule {
}
