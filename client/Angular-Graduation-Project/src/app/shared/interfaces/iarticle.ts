export interface IArticle {
  title: string;
  description: string;
  content: string;
  createdAt: Date;
  lastEdit: Date;
  _id: string;
  author: string;
  usersLiked: string[];
  topics: string[];
}
