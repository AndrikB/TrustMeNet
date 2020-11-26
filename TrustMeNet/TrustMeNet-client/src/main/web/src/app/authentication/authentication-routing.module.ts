import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";
import {MailConfirmComponent} from "./mail-confirm/mail-confirm.component";
import {PassRecoveryComponent} from "./pass-recovery/pass-recovery.component";
import {PassRecoveryConfirmComponent} from "./pass-recovery-confirm/pass-recovery-confirm.component";


const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'pass-recovery/:token', component: PassRecoveryConfirmComponent},
  {path: 'pass-recovery', component: PassRecoveryComponent},
  {path: 'registration/:token', component: MailConfirmComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
