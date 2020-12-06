import {Message} from "./message";

export class WebsocketEvent {
  players: String[];
  message: Message;
  type:EventType;
}

export enum EventType {
  MESSAGE = "MESSAGE",
}
