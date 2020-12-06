import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {AlertService} from "../../core/services/alert.service";

@Component({
  selector: 'app-pass-recovery',
  templateUrl: './pass-recovery.component.html',
  styleUrls: ['./pass-recovery.component.css']
})
export class PassRecoveryComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private alert: AlertService) {
  }

  ngOnInit(): void {
  }
  reset(email: string) {
    email = email.trim();
    if (!email) {
      this.alert.error('please enter your mail');
      return;
    }

    this.authenticationService.resetPass(email)
      .subscribe(
        data => {
          this.alert.success('reset was successful. chek your mail', true);
        },
        error => {
          this.alert.error('error reset password');
        });
  }
}
