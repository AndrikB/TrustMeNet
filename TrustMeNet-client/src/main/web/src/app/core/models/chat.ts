import {User} from "./User";

export class Chat {
  id: number;
  name: string;
  creationDate: Date;
  users: User[] = [];
}
