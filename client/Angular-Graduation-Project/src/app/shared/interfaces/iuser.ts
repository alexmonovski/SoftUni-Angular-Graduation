export interface IUser {
  _id: string;
  name: string;
  email: string;
  description: string;
  password: string;
  topics: string[];
  articlesCreated: string[];
  articlesLiked: string[];
  subscribedTo: string[];
  subscriptions: string[];
  commentsCreated: string[];
}
