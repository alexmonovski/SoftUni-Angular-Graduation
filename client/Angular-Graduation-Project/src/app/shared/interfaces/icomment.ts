export interface IComment {
  _id: string;
  title: string;
  content: string;
  usersLiked: string[];
  createdAt: Date;
  lastEdit: Date;
  author: string;
  authorName: string;
}
