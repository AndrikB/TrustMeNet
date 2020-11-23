import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {User} from "../../core/models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  confirmPassword: string

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {

  }


  registerUser() {
    this.authenticationService.register(this.user)
      .subscribe(
        data => {
          this.router.navigate(['login'])
        },
        error => {
          console.log(error)
        }
      );
  }
}
