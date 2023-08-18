export interface IArticle {
  _id: string;
  title: string;
  description: string;
  content: string;
  authorName: string;
  author: string;
  usersLiked: string[];
  topics: string[];
  comments: string[];
  createdAt: Date;
  lastEdit: Date;
}
