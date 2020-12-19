import {Image} from "./Image";

export class User {
  id: number;
  firstName: string;
  secondName: string;
  login: string;
  mail: string;
  password: string;
  profile: string;
  registrationDate: Date;
  rating: number;
  imageId:  number;
  image: Image;
  status: string;
  role: string;
}
