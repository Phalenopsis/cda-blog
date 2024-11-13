import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  #http: HttpClient = inject(HttpClient);

  #apiUrl: string = "http://localhost:3000/articles/";

  $getArticleById(articleId: number): Observable<Article> {
    return this.#http.get<Article>(`${this.#apiUrl}${articleId}`);
  }

  $getArticles(): Observable<Article[]> {
    return this.#http.get<Article[]>(`${this.#apiUrl}`);
  }
}
