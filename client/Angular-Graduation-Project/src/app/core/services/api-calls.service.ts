import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/shared/interfaces/iarticle';
import { IArticlePopulated } from 'src/app/shared/interfaces/iarticle-populated';
import { IComment } from 'src/app/shared/interfaces/icomment';
import { ICreateArticleFormData } from 'src/app/shared/interfaces/icreate-article-form-data';
import { IJwt } from 'src/app/shared/interfaces/ijwt';
import { ILoginFormData } from 'src/app/shared/interfaces/ilogin-form-data';
import { IRegisterFormData } from 'src/app/shared/interfaces/iregister-form-data';
import { ITopic } from 'src/app/shared/interfaces/itopic';
import { IUser } from 'src/app/shared/interfaces/iuser';
import { IUserPopulated } from 'src/app/shared/interfaces/iuser-populated';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  constructor(private http: HttpClient) {}

  // users
  getAllUsers(): Observable<{ users: IUser[] }> {
    const url = `http://localhost:3000/users/`;
    return this.http.get<{ users: IUser[] }>(url);
  }
  getSingleUser(id: string): Observable<{ user: IUserPopulated }> {
    const url = `http://localhost:3000/users/${id}`;
    return this.http.get<{ user: IUserPopulated }>(url);
  }
  subscribeToUser(subscribeeId: string): Observable<{ updatedUser: IUser }> {
    const url = `http://localhost:3000/users/${subscribeeId}/subscribe`;
    return this.http.post<{ updatedUser: IUser }>(url, subscribeeId);
  }
  getSingleUserLean(id: string): Observable<{ user: IUser }> {
    const url = `http://localhost:3000/users/${id}?action=lean`;
    return this.http.get<{ user: IUser }>(url);
  }

  // auth
  postRegisterForm(formData: IRegisterFormData): Observable<IJwt> {
    const url = `http://localhost:3000/auth/register`;
    return this.http.post<IJwt>(url, formData);
  }
  postLoginForm(formData: ILoginFormData): Observable<IJwt> {
    const url = `http://localhost:3000/auth/login`;
    return this.http.post<IJwt>(url, formData);
  }
  postEditUserForm(
    formData: IRegisterFormData,
    userId: string
  ): Observable<IJwt> {
    const url = `http://localhost:3000/auth/${userId}/edit`;
    return this.http.post<IJwt>(url, formData);
  }

  // articles
  getAllArticles(): Observable<{ articles: IArticle[] }> {
    const url = `http://localhost:3000/articles/`;
    return this.http.get<{ articles: IArticle[] }>(url);
  }
  getSingleArticle(id: string): Observable<{ article: IArticlePopulated }> {
    const url = `http://localhost:3000/articles/${id}`;
    return this.http.get<{ article: IArticlePopulated }>(url);
  }
  getSingleArticleLean(id: string): Observable<{ article: IArticle }> {
    const url = `http://localhost:3000/articles/${id}?action=lean`;
    return this.http.get<{ article: IArticle }>(url);
  }
  getSingleArticlePopulated(id: string): Observable<{ article: IArticle }> {
    const url = `http://localhost:3000/articles/${id}?action=populated`;
    return this.http.get<{ article: IArticle }>(url);
  }
  createArticle(
    formData: ICreateArticleFormData
  ): Observable<{ newArticle: IArticle }> {
    const url = `http://localhost:3000/articles/create`;
    return this.http.post<{ newArticle: IArticle }>(url, formData);
  }
  addComment(formData: IComment, id: string): Observable<{ message: string }> {
    const url = `http://localhost:3000/articles/${id}/comment/`;
    return this.http.post<{ message: string }>(url, formData);
  }
  likeArticle(id: string): Observable<{ updatedArticle: IArticle }> {
    const url = `http://localhost:3000/articles/${id}/like/`;
    return this.http.get<{ updatedArticle: IArticle }>(url);
  }
  editArticle(
    formData: ICreateArticleFormData,
    id: string
  ): Observable<{ article: IArticle }> {
    const url = `http://localhost:3000/articles/${id}/edit`;
    return this.http.post<{ article: IArticle }>(url, formData);
  }
  deleteArticle(articleId: string): Observable<{ message: string }> {
    const url = `http://localhost:3000/articles/${articleId}/delete`;
    return this.http.get<{ message: string }>(url);
  }

  // topics
  getSingleTopic(id: string): Observable<{ topic: ITopic }> {
    const url = `http://localhost:3000/topics/${id}`;
    return this.http.get<{ topic: ITopic }>(url);
  }
  getAllTopics(): Observable<{ topics: ITopic[] }> {
    const url = `http://localhost:3000/topics/`;
    return this.http.get<{ topics: ITopic[] }>(url);
  }

  //comments
  getCommentById(id: string): Observable<{ comment: IComment }> {
    const url = `http://localhost:3000/comments/${id}`;
    return this.http.get<{ comment: IComment }>(url);
  }
}
