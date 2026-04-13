import { IUser } from "./../user/user.interface";
export interface INote {
  title: string;
  content: string;
  isFavorite: boolean;
  userId: string;
  user?: IUser;
}
