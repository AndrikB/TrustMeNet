import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationComponent} from './registration/registration.component';
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from './login/login.component';
import {MailConfirmComponent} from './mail-confirm/mail-confirm.component';
import { PassRecoveryComponent } from './pass-recovery/pass-recovery.component';
import { PassRecoveryConfirmComponent } from './pass-recovery-confirm/pass-recovery-confirm.component';


@NgModule({
  declarations: [RegistrationComponent, LoginComponent, MailConfirmComponent, PassRecoveryComponent, PassRecoveryConfirmComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
  ]
})
export class AuthenticationModule {
}
