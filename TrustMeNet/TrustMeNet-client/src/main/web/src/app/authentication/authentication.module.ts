import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationComponent} from './registration/registration.component';
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
  ]
})
export class AuthenticationModule {
}
