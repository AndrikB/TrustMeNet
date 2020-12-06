import {User} from "./User";

export class Message {
  id: number;
  chatId: number;
  authorId: number;
  author: User;
  creationDate: Date;
  messageText: string;
}
