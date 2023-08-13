import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<any> {
    const url = `http://localhost:3000/articles/`;
    return this.http.get(url);
  }

  getSingleArticle(id: any): Observable<any> {
    const url = `http://localhost:3000/articles/${id}`;
    return this.http.get(url);
  }

  getSingleTopic(id: any): Observable<any> {
    const url = `http://localhost:3000/topics/${id}`;
    return this.http.get(url);
  }

  getSingleArticlePopulated(id: any): Observable<any> {
    const url = `http://localhost:3000/articles/${id}?action=populated`;
    return this.http.get(url);
  }

  addComment(comment: any, id: any): Observable<any> {
    const url = `http://localhost:3000/articles/${id}/comments/`;
    const requestBody = comment;
    return this.http.post<any>(url, requestBody);
  }

  likeArticle(id: any): Observable<any> {
    const url = `http://localhost:3000/articles/${id}/like/`;
    return this.http.get<any>(url);
  }

  postRegisterForm(formData: any) {
    const url = `http://localhost:3000/auth/register`;
    return this.http.post(url, formData);
  }

  postLoginForm(formData: any) {
    const url = `http://localhost:3000/auth/login`;
    return this.http.post(url, formData);
  }

  getAllTopics(): Observable<any> {
    const url = `http://localhost:3000/topics/`;
    return this.http.get(url);
  }
  getAllComments(): Observable<any> {
    const url = `http://localhost:3000/comments/`;
    return this.http.get(url);
  }

  getAllUsers(): Observable<any> {
    const url = `http://localhost:3000/users/`;
    return this.http.get(url);
  }

  getSingleUser(id: any): Observable<any> {
    const url = `http://localhost:3000/users/${id}`;
    return this.http.get(url);
  }
  getSingleUserLean(id: any): Observable<any> {
    const url = `http://localhost:3000/users/${id}?action=lean`;
    return this.http.get(url);
  }
  getSelf(): Observable<any> {
    const url = `http://localhost:3000/users/current`;
    return this.http.get(url);
  }
  createArticle(formData: any): Observable<any> {
    const url = `http://localhost:3000/articles/create`;
    return this.http.post(url, formData);
  }

  subscribeToUser(subscribeeId: any): Observable<any> {
    const url = `http://localhost:3000/users/${subscribeeId}/subscribe`;
    return this.http.post(url, subscribeeId);
  }
}

// access auth only resources
// sendToken(formData: any) {
//   const url = `http://localhost:3000/auth/login`;
//   const jwt = localStorage.getItem('authToken');
//   const httpOptions = {
//     headers: new HttpHeaders({
//       Authorization: `Bearer ${jwt}`,
//     }),
//   };
//   return this.http.post(url, formData, httpOptions);
// }
