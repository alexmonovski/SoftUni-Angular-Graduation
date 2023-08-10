import { HttpClient } from '@angular/common/http';
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
}
