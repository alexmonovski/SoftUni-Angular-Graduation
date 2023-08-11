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
