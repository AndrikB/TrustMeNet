import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.authenticationService.login(this.login, this.password)
      .subscribe(
        data => {
          // redirect
          console.log(data)
        },
        error => {
          console.log(error)
        }
      );
  }
}
