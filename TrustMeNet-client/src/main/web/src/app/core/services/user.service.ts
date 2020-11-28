import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {api} from "../../../environments/environment.prod";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {User} from "../models/User";


@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  getUser(id: number) {
    return this.http.get<User>(`${api}users/${id}`, this.httpOptions)
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

  checkPasswords(login: string, oldPassword: string) {
    return this.http.get<boolean>(`${api}users/password/check?login=${login}&password=${oldPassword}`)
  }


  updateUser(editedUser: User): Observable<User> {
    return this.http.put<User>(`${api}users/`, editedUser);
  }


  changePassword(login: string, newPassword: string): Observable<string> {
    return this.http.put<string>(`${api}users/password/${login}`, newPassword);
  }

  getUsers(currentCount: number) {
    return this.http.get<User[]>(`${api}users?usersCount=${currentCount}`)
      .pipe(
        catchError(this.handleError<User[]>([]))
      );
  }
}
