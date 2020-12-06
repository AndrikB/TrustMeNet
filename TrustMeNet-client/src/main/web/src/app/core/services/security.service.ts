import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import decode from 'jwt-decode';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  providers: [
  ]

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
  }


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      return false;
    }
    if(!this.jwtHelper){
      return false;
    }
    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('Authorization');
      return false;
    }
    return true;
  }

  public getCurrentId() {
    const token = localStorage.getItem('Authorization');
    if (token) {
      // @ts-ignore
      return decode(token).userId;
    } else {
      return null;
    }
  }

  public getCurrentRole() {
    const token = localStorage.getItem('Authorization');
    if (token) {
      // @ts-ignore
      return decode(token).role;
    } else {
      return null;
    }
  }

  public logout() {
    localStorage.removeItem('Authorization')
  }
}
