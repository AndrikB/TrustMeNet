import {Image} from "./Image";

export class Announcement {
  id: number;
  title: string;
  subtitle: string;
  fullText: string;
  authorLogin: string;
  authorId: number;
  isPublished: boolean;
  createdDate: Date;
  imageId: number = -1;
  image: Image;
}
