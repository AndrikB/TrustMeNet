import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from "rxjs/operators";

import {api} from "../../../environments/environment.prod";
import {Chat} from "../models/chat";
import {Message} from "../models/message";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  updateChat(chat: Chat) {
    return this.http.put<Chat>(`${api}chat`, chat, this.httpOptions).pipe(
      catchError(this.handleError<Chat>(null))
    );
  }

  createChat(chat: Chat, id: number) {
    return this.http.post<Chat>(`${api}users/${id}/createChat`, chat, this.httpOptions);
  }

  inviteToChat(user: User, chatId: number) {
    return this.http.post<Chat>(`${api}users/${user.id}/chat/${chatId}/invite`, this.httpOptions);
  }

  leaveChat(id:number, chatId:number){
    return this.http.delete<string>(`${api}users/${id}/chat/${chatId}`);
  }

  getUserChats(id: number) {
    return this.http.get<Chat[]>(`${api}users/${id}/chats`)
      .pipe(
        catchError(this.handleError<Chat[]>([]))
      );
  }

  getChat(chatId: number) {
    return this.http.get<Chat>(`${api}chat/${chatId}`)
      .pipe(
        catchError(this.handleError<Chat>(null))
      );
  }

  getMessages(chatId: number, currentCount: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${api}chat/${chatId}/messages?pageNumber=${Math.floor(currentCount/10)}`)
      .pipe(
        catchError(this.handleError<Message[]>([]))
      );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
