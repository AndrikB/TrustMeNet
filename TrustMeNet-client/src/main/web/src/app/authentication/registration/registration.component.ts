import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {User} from "../../core/models/User";
import {Router} from "@angular/router";
import {AlertService} from "../../core/services/alert.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  confirmPassword: string

  constructor(private authenticationService: AuthenticationService,
              private alert: AlertService,
              private router: Router) {
  }

  ngOnInit(): void {

  }


  registerUser() {
    if (!this.user.login || !this.user.firstName || !this.user.secondName || !this.user.mail) {
      this.alert.error('field is empty');
      return;
    }

    this.authenticationService.register(this.user)
      .subscribe(
        data => {
          this.alert.success('registration was successful', true);
          this.router.navigate(['login']).then()
        },
        error => {
          console.log(error)
          this.alert.error('registration was not successful', false);
        }
      );
  }
}
