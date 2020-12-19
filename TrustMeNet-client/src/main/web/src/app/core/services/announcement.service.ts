import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {api} from "../../../environments/environment.prod";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Announcement} from "../models/announcement";


@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  providers: [
  ];

  constructor(private http: HttpClient) {
  }


  putImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('myFile', image, "name");
    return this.http.put(`${api}image`, uploadData);
  }

  updateAnnouncement(announcement: Announcement) {
    return this.http.put<string>(`${api}announcement/`, announcement, this.httpOptions);
  }

  sendAnnouncement(announcement: Announcement) {
    return this.http.post<string>(`${api}announcement/`, announcement, this.httpOptions);
  }

  getById(id: string) {
    return this.http.get<Announcement>(`${api}announcement/${id}`).pipe(
      catchError(this.handleError<Announcement>())
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  deleteAnnouncement(announcement: Announcement) {
    return this.http.delete(`${api}announcement/${announcement.id}`);
  }

  getAll(isPublished:boolean){
    return this.http.get<Announcement[]>(`${api}announcements?isPublished=${isPublished}`).pipe(
      catchError(this.handleError<Announcement[]>())
    );
  }
}
