import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.authenticationService.login(this.login, this.password)
      .subscribe(
        data => {
          this.router.navigate(['profile'])
        },
        error => {
          console.log(error)
        }
      );
  }
}
