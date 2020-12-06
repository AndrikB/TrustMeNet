import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

import {Achievement, AchievementCharacteristic} from "../models/achievement";
import {catchError} from "rxjs/operators";
import {api} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient) {
  }

  sendAchievement(achievement: Achievement){
    return this.http.post<string>(`${api}achievement/create`, achievement, this.httpOptions);
  }

  getCharacteristics(): Observable<AchievementCharacteristic[]> {
    return this.http.get<AchievementCharacteristic[]>(`${api}achievement/characteristics`)
      .pipe(
        catchError(this.handleError<AchievementCharacteristic[]>([]))
      );
  }

  getUserAchievements(currentId: number): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(`${api}profile/${currentId}/achievements/`)
      .pipe(
        catchError(this.handleError<Achievement[]>([]))
      );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  recalculateAchievements(){
    return this.http.put<string>(`${api}achievement/recalculate`, "" , this.httpOptions);
  }
}
