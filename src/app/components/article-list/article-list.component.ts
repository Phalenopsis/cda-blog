import { Component, inject } from '@angular/core';
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';
import { ArticleThumbnailComponent } from '../article-thumbnail/article-thumbnail.component';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, Observable, take, takeUntil, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ArticleThumbnailComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent {
  #apiService: ApiService = inject(ApiService);

  $articles: Observable<Article[]> = this.getArticles();

  getArticles(): Observable<Article[]> {
    return this.#apiService.$getArticles();
  }

  handleLike(article: Article) {
    article.isLiked = !article.isLiked;
  }
}
