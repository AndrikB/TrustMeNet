import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {User} from "../../core/models/User";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  confirmPassword: string

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {

  }


  registerUser() {
    this.authenticationService.register(this.user)
      .subscribe(
        data => {
          console.log(data)
        },
        error => {
          console.log(error)
        }
      );
  }
}
