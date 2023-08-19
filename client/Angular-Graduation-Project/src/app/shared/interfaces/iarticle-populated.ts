import { IComment } from './icomment';
import { ITopic } from './itopic';
import { IUser } from './iuser';

export interface IArticlePopulated {
  _id: string;
  title: string;
  description: string;
  content: string;
  authorName: string;
  author: string;
  usersLiked: string[];
  topics: ITopic[];
  comments: string[];
  createdAt: Date;
  lastEdit: Date;
}
