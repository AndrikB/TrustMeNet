import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {api} from "../../../environments/environment.prod";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {User} from "../models/User";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  providers: [
  ]

  constructor(private http: HttpClient) {
  }

  register(user: User) {
    return this.http.post<User>(`${api}registration`, user, this.httpOptions)
      .pipe(catchError(this.handleError<User>(null)));
  }

  login(login: string, password: string) {
    return this.http.post<string>(`${api}login`, {login, password})
      .pipe(map(
        data => {
          console.log(data);
          let tokenStr = 'Bearer ' + data['token'];
          localStorage.setItem('Authorization', tokenStr);
          return data;
        }
      )
      );
  }

  confirmMail(token: string) {
    return this.http.get<boolean>(`${api}registration/${token}`);

  }

  confirmResetPass(token: string) {
    return this.http.get<boolean>(`${api}/pass-recovery/${token}`);
  }

  resetPass(email: string) {
    return this.http.post<string>(`${api}pass-recovery`, email, this.httpOptions);
  }

  createNewPass(token: string, newPassword: string) {
    return this.http.put<string>(`${api}/pass-recovery/${token}`, newPassword, this.httpOptions);
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
