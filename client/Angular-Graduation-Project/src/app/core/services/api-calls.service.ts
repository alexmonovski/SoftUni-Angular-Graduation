import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  constructor(private http: HttpClient) {}
  // todo: cast these and make unified responses

  // users
  getAllUsers(): Observable<any> {
    const url = `http://localhost:3000/users/`;
    return this.http.get(url);
  }
  getSingleUser(id: any): Observable<any> {
    const url = `http://localhost:3000/users/${id}`;
    return this.http.get(url);
  }
  getSelf(): Observable<any> {
    const url = `http://localhost:3000/users/current`;
    return this.http.get(url);
  }
  subscribeToUser(subscribeeId: any): Observable<any> {
    const url = `http://localhost:3000/users/${subscribeeId}/subscribe`;
    return this.http.post(url, subscribeeId);
  }
  getSingleUserLean(id: any): Observable<any> {
    const url = `http://localhost:3000/users/${id}?action=lean`;
    return this.http.get(url);
  }

  // auth
  postRegisterForm(formData: any) {
    const url = `http://localhost:3000/auth/register`;
    return this.http.post(url, formData);
  }
  postLoginForm(formData: any) {
    const url = `http://localhost:3000/auth/login`;
    return this.http.post(url, formData);
  }

  // articles
  getAllArticles(): Observable<any> {
    const url = `http://localhost:3000/articles/`;
    return this.http.get(url);
  }
  getSingleArticle(id: any): Observable<any> {
    const url = `http://localhost:3000/articles/${id}`;
    return this.http.get(url);
  }
  getSingleArticleLean(id: any): Observable<any> {
    const url = `http://localhost:3000/articles/${id}?action=lean`;
    return this.http.get(url);
  }
  getSingleArticlePopulated(id: any): Observable<any> {
    const url = `http://localhost:3000/articles/${id}?action=populated`;
    return this.http.get(url);
  }
  createArticle(formData: any): Observable<any> {
    const url = `http://localhost:3000/articles/create`;
    return this.http.post(url, formData);
  }
  getArticlesByTopics(): Observable<any> {
    const url = `http://localhost:3000/articles/topics`;
    return this.http.get(url);
  }
  addComment(formData: any, id: any): Observable<any> {
    const url = `http://localhost:3000/articles/${id}/comments/`;
    return this.http.post<any>(url, formData);
  }
  likeArticle(id: any): Observable<any> {
    const url = `http://localhost:3000/articles/${id}/like/`;
    return this.http.get<any>(url);
  }

  // topics
  getSingleTopic(id: any): Observable<any> {
    const url = `http://localhost:3000/topics/${id}`;
    return this.http.get(url);
  }
  getAllTopics(): Observable<any> {
    const url = `http://localhost:3000/topics/`;
    return this.http.get(url);
  }

  //comments
  getAllComments(): Observable<any> {
    const url = `http://localhost:3000/comments/`;
    return this.http.get(url);
  }
  //comments
  getCommentById(id: any): Observable<any> {
    const url = `http://localhost:3000/comments/${id}`;
    return this.http.get(url);
  }
}
