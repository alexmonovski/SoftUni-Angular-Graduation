import { IArticle } from './iarticle';
import { IComment } from './icomment';
import { ITopic } from './itopic';
import { IUser } from './iuser';

export interface IUserPopulated {
  _id: string;
  name: string;
  email: string;
  description: string;
  password: string;
  topics: ITopic[];
  articlesCreated: IArticle[];
  articlesLiked: IArticle[];
  subscribedTo: IUser[];
  subscriptions: IUser[];
  commentsCreated: IComment[];
}
