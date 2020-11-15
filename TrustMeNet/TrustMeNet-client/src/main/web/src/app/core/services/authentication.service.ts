import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {api} from "../../../environments/environment.prod";
import {catchError} from "rxjs/operators";
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

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
