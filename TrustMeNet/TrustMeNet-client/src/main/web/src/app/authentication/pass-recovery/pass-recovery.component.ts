import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
  selector: 'app-pass-recovery',
  templateUrl: './pass-recovery.component.html',
  styleUrls: ['./pass-recovery.component.css']
})
export class PassRecoveryComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }
  reset(email: string) {
    email = email.trim();
    if (!email) {
      return;
    }

    this.authenticationService.resetPass(email)
      .subscribe(
        data => {
          //add alert
        },
        error => {
          //add alert
        });
  }
}
