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
  articlesCreated: string[];
  articlesLiked: string[];
  subscribedTo: string[];
  subscriptions: string[];
  commentsCreated: string[];
}
